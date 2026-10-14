// Local simplification for static, vertex-colored GLBs produced by the cleanup script.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { MeshoptSimplifier } from 'meshoptimizer';
const [input,output,target='12000']=process.argv.slice(2);
assert(input && output && !fs.existsSync(output));
await MeshoptSimplifier.ready; MeshoptSimplifier.useExperimentalFeatures=true;
const b=fs.readFileSync(input), len=b.readUInt32LE(12), bin=b.subarray(28+len);
const d=JSON.parse(b.subarray(20,20+len)), views=d.bufferViews, accessors=d.accessors;
assert(!d.skins && !d.animations && !d.images,'Static colored geometry only');
function read(id,n){const a=accessors[id],v=views[a.bufferView],size={5126:4,5125:4,5123:2}[a.componentType],fn={5126:'readFloatLE',5125:'readUInt32LE',5123:'readUInt16LE'}[a.componentType];assert(size);return Array.from({length:a.count},(_,i)=>Array.from({length:n},(_,c)=>bin[fn]((v.byteOffset||0)+(a.byteOffset||0)+i*(v.byteStride||n*size)+c*size)));}
d.bufferViews=[];d.accessors=[];const chunks=[];let offset=0;
function add(array,n,type){const bytes=Buffer.from(array.buffer,array.byteOffset,array.byteLength);const view=d.bufferViews.length;d.bufferViews.push({buffer:0,byteOffset:offset,byteLength:bytes.length});chunks.push(bytes);offset+=bytes.length;const a={bufferView:view,componentType:type,count:array.length/n,type:n===1?'SCALAR':'VEC3'};if(n===3){a.min=[0,1,2].map(c=>{let v=Infinity;for(let i=c;i<array.length;i+=3)v=Math.min(v,array[i]);return v;});a.max=[0,1,2].map(c=>{let v=-Infinity;for(let i=c;i<array.length;i+=3)v=Math.max(v,array[i]);return v;});}d.accessors.push(a);return d.accessors.length-1;}
for(const mesh of d.meshes)for(const p of mesh.primitives){
 const pos=read(p.attributes.POSITION,3),norm=read(p.attributes.NORMAL,3),color=read(p.attributes.COLOR_0,3),ix=read(p.indices,1).flat();
 const lookup=new Map(),weld=[],remap=[];
 pos.forEach((v,i)=>{const key=v.map(x=>Math.round(x*1e6)).join(',');if(!lookup.has(key)){lookup.set(key,weld.length);weld.push({p:v,n:[0,0,0],c:[0,0,0],count:0});}const id=lookup.get(key),w=weld[id];remap.push(id);w.count++;for(let k=0;k<3;k++){w.n[k]+=norm[i][k];w.c[k]+=color[i][k];}});
 const positions=new Float32Array(weld.flatMap(w=>w.p));
 const attrs=new Float32Array(weld.flatMap(w=>{const mag=Math.hypot(...w.n)||1;return [...w.n.map(v=>v/mag),...w.c.map(v=>v/w.count)];}));
 const indices=new Uint32Array(ix.map(i=>remap[i]));
 const [reduced,error]=MeshoptSimplifier.simplifyWithAttributes(indices,positions,3,attrs,6,[0.05,0.05,0.05,0.5,0.5,0.5],null,Math.min(indices.length,Number(target)*3),0.01);
 const used=[...new Set(reduced)],compact=new Map(used.map((v,i)=>[v,i]));
 p.attributes={POSITION:add(new Float32Array(used.flatMap(i=>Array.from(positions.subarray(i*3,i*3+3)))),3,5126),NORMAL:add(new Float32Array(used.flatMap(i=>Array.from(attrs.subarray(i*6,i*6+3)))),3,5126),COLOR_0:add(new Float32Array(used.flatMap(i=>Array.from(attrs.subarray(i*6+3,i*6+6)))),3,5126)};
 p.indices=add(new Uint32Array(Array.from(reduced,i=>compact.get(i))),1,5125);
 console.log(JSON.stringify({input,output,originalTriangles:ix.length/3,triangles:reduced.length/3,error}));
}
const binary=Buffer.concat(chunks);d.buffers=[{byteLength:binary.length}];const json=Buffer.from(JSON.stringify(d)),pad=Buffer.concat([json,Buffer.alloc((4-json.length%4)%4,32)]);const h=Buffer.alloc(20);h.writeUInt32LE(0x46546c67);h.writeUInt32LE(2,4);h.writeUInt32LE(28+pad.length+binary.length,8);h.writeUInt32LE(pad.length,12);h.writeUInt32LE(0x4e4f534a,16);const bh=Buffer.alloc(8);bh.writeUInt32LE(binary.length);bh.writeUInt32LE(0x004e4942,4);fs.writeFileSync(output,Buffer.concat([h,pad,bh,binary]),{flag:'wx'});
