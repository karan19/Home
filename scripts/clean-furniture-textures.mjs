// Bake generated albedo into smooth vertex colors; retain mesh shape and UVs.
// Usage: node scripts/clean-furniture-textures.mjs source.glb output.glb
import fs from 'node:fs';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const [input, output] = process.argv.slice(2);
assert(input && output && input !== output);
assert(!fs.existsSync(output), 'Output exists');
const source = fs.readFileSync(input);
assert.equal(source.readUInt32LE(0), 0x46546c67);
const n = source.readUInt32LE(12), start = n + 28;
const doc = JSON.parse(source.subarray(20,20+n));
const originalBin = source.subarray(start, start + doc.buffers[0].byteLength);
const chunks = [originalBin, Buffer.alloc((4-originalBin.length%4)%4)];
let offset = chunks.reduce((s,b)=>s+b.length,0);
function read(index, components) {
  const a=doc.accessors[index], v=doc.bufferViews[a.bufferView];
  assert(!a.sparse, 'Sparse accessors unsupported');
  const sizes={5126:4,5125:4,5123:2,5121:1};
  const size=sizes[a.componentType];assert(size);
  const methods={5126:'readFloatLE',5125:'readUInt32LE',5123:'readUInt16LE',5121:'readUInt8'};
  return Array.from({length:a.count},(_,i)=>Array.from({length:components},(_,c)=>originalBin[methods[a.componentType]]((v.byteOffset||0)+(a.byteOffset||0)+i*(v.byteStride||components*size)+c*size)));
}
const linear = c => c <= 0.04045 ? c/12.92 : ((c+0.055)/1.055)**2.4;
for (const mesh of doc.meshes) for (const p of mesh.primitives) {
  const m=doc.materials[p.material], pbr=m.pbrMetallicRoughness;
  if (!pbr?.baseColorTexture) continue;
  const im=doc.images[doc.textures[pbr.baseColorTexture.index].source];
  const view=doc.bufferViews[im.bufferView];
  const {data,info}=await sharp(originalBin.subarray(view.byteOffset,view.byteOffset+view.byteLength)).removeAlpha().raw().toBuffer({resolveWithObject:true});
  const pos=read(p.attributes.POSITION,3), uv=read(p.attributes.TEXCOORD_0,2);
  const indices=p.indices===undefined?pos.map((_,i)=>i):read(p.indices,1).flat();
  const groups=[], lookup=new Map(), ids=[];
  for (const xyz of pos) {
    const key=xyz.map(v=>Math.round(v*100000)).join(',');
    if(!lookup.has(key)){lookup.set(key,groups.length);groups.push({sum:[0,0,0],weight:0,neighbors:new Set()});}
    ids.push(lookup.get(key));
  }
  function sample(u,v) {
    const x=Math.max(0,Math.min(info.width-1,Math.round(u*(info.width-1))));
    const y=Math.max(0,Math.min(info.height-1,Math.round(v*(info.height-1))));
    return [0,1,2].map(c=>linear(data[(y*info.width+x)*info.channels+c]/255));
  }
  for(let i=0;i<indices.length;i+=3){
    const verts=indices.slice(i,i+3), center=[0,1].map(c=>verts.reduce((s,j)=>s+uv[j][c],0)/3);
    // Sample inside each face, away from packed UV seams.
    const taps=[sample(...center),...verts.map(j=>sample(...[0,1].map(c=>uv[j][c]*0.65+center[c]*0.35)))];
    const color=[0,1,2].map(c=>taps.reduce((s,t)=>s+t[c],0)/taps.length);
    for(const j of verts){const g=groups[ids[j]];g.weight++;color.forEach((v,c)=>g.sum[c]+=v);for(const k of verts)if(ids[k]!==ids[j])g.neighbors.add(ids[k]);}
  }
  let colors=groups.map(g=>g.sum.map(v=>v/Math.max(1,g.weight)));
  for(let pass=0;pass<8;pass++) colors=groups.map((g,i)=>{
    const out=colors[i].map(v=>v*2);let weight=2;
    for(const j of g.neighbors){
      const distance=colors[i].reduce((s,v,c)=>s+(v-colors[j][c])**2,0);
      const w=Math.exp(-distance/0.12);weight+=w;
      out.forEach((_,c)=>out[c]+=colors[j][c]*w);
    }
    return out.map(v=>v/weight);
  });
  const bytes=Buffer.alloc(pos.length*12);
  ids.forEach((id,i)=>colors[id].forEach((v,c)=>bytes.writeFloatLE(v,i*12+c*4)));
  const bv=doc.bufferViews.length;doc.bufferViews.push({buffer:0,byteOffset:offset,byteLength:bytes.length,target:34962});
  p.attributes.COLOR_0=doc.accessors.length;
  doc.accessors.push({bufferView:bv,componentType:5126,count:pos.length,type:'VEC3'});
  chunks.push(bytes);offset+=bytes.length;
  delete pbr.baseColorTexture; delete pbr.metallicRoughnessTexture;
  delete m.normalTexture; delete m.occlusionTexture;
  pbr.metallicFactor=0;pbr.roughnessFactor=0.85;
  console.log(`${mesh.name || input}: ${pos.length} vertices, smooth surface colors`);
}
let binary=Buffer.concat(chunks); assert(binary.subarray(0,originalBin.length).equals(originalBin),'Original geometry must be untouched');
// Remove the now-unused texture payloads, retaining every non-image buffer byte.
assert(!JSON.stringify(doc.materials).match(/"[a-zA-Z]*Texture"/), 'Unexpected remaining material texture');
const imageViews = new Set((doc.images || []).map(image => image.bufferView));
const remap = new Map(), compact = [], compactViews = [];
let compactOffset = 0;
for (const [index, view] of doc.bufferViews.entries()) {
  if (imageViews.has(index)) continue;
  remap.set(index, compactViews.length);
  const bytes = binary.subarray(view.byteOffset || 0, (view.byteOffset || 0) + view.byteLength);
  compactViews.push({...view, byteOffset:compactOffset});
  compact.push(bytes, Buffer.alloc((4-bytes.length%4)%4));
  compactOffset += bytes.length + (4-bytes.length%4)%4;
}
for (const accessor of doc.accessors) {
  assert(remap.has(accessor.bufferView));
  accessor.bufferView = remap.get(accessor.bufferView);
}
doc.bufferViews = compactViews;
delete doc.images; delete doc.textures; delete doc.samplers;
binary = Buffer.concat(compact);
doc.buffers[0].byteLength=binary.length;
const j=Buffer.from(JSON.stringify(doc)), padded=Buffer.concat([j,Buffer.alloc((4-j.length%4)%4,32)]);
const header=Buffer.alloc(20);header.writeUInt32LE(0x46546c67);header.writeUInt32LE(2,4);header.writeUInt32LE(28+padded.length+binary.length,8);header.writeUInt32LE(padded.length,12);header.writeUInt32LE(0x4e4f534a,16);
const binHeader=Buffer.alloc(8);binHeader.writeUInt32LE(binary.length);binHeader.writeUInt32LE(0x004e4942,4);
fs.writeFileSync(output,Buffer.concat([header,padded,binHeader,binary]),{flag:'wx'});
