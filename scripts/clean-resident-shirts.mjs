import fs from 'node:fs';
import sharp from 'sharp';
// Add a garment mask without changing geometry, UVs, skin weights or animation.
// Close small enclosed non-fabric patches (the generated tears) on a welded mesh.
for (const [name,floor] of [['stair-reader',.44],['desk-typer',.44],['dips-resident',.80]]) {
 if(process.argv[2]&&process.argv[2]!==name)continue;
 const file=`public/models/${name}/${name==='stair-reader'?'reader':name==='desk-typer'?'typer':'dips'}.glb`;
 const backup=`.meshy/clean-shirts/${name}.glb`;
 if(!fs.existsSync(backup))fs.copyFileSync(file,backup);
 const src=fs.readFileSync(backup),jl=src.readUInt32LE(12),doc=JSON.parse(src.subarray(20,20+jl));
 const bin=src.subarray(28+jl);const chunks=[bin];let size=bin.length;
 function read(i){const a=doc.accessors[i],v=doc.bufferViews[a.bufferView],n={SCALAR:1,VEC2:2,VEC3:3,VEC4:4}[a.type],bytes={5126:4,5125:4,5123:2,5121:1}[a.componentType];const values=[];for(let k=0;k<a.count;k++){const row=[];for(let j=0;j<n;j++){const o=(v.byteOffset??0)+(a.byteOffset??0)+k*(v.byteStride??n*bytes)+j*bytes;row.push(a.componentType===5126?bin.readFloatLE(o):bytes===4?bin.readUInt32LE(o):bytes===2?bin.readUInt16LE(o):bin[o]);}values.push(row);}return values;}
 for(const mesh of doc.meshes)for(const p of mesh.primitives){
 const pos=read(p.attributes.POSITION),uv=read(p.attributes.TEXCOORD_0),indices=read(p.indices).flat();
 const texture=doc.textures[doc.materials[p.material].pbrMetallicRoughness.baseColorTexture.index],im=doc.images[texture.source],bv=doc.bufferViews[im.bufferView];
 const {data,info}=await sharp(bin.subarray(bv.byteOffset,bv.byteOffset+bv.byteLength)).removeAlpha().raw().toBuffer({resolveWithObject:true});
 const weld=new Map(),verts=[],mapping=[];
 for(let i=0;i<pos.length;i++){const key=pos[i].map(x=>Math.round(x*100000)).join(',');let id=weld.get(key);if(id===undefined){id=verts.length;weld.set(key,id);verts.push({p:pos[i],green:0,tone:0,samples:0,neighbors:new Set()});}mapping.push(id);const v=verts[id],x=Math.max(0,Math.min(info.width-1,Math.round(uv[i][0]*(info.width-1)))),y=Math.max(0,Math.min(info.height-1,Math.round(uv[i][1]*(info.height-1))));const off=(y*info.width+x)*info.channels;const [r,g,b]=data.subarray(off,off+3);v.samples++;v.tone+=Math.max(r,g,b)/255;if(pos[i][1]>floor&&(g-r)/Math.max(r,g,1)>.018&&(g-b)/Math.max(r,g,1)>.055)v.green++;}
 for(let i=0;i<indices.length;i+=3){const ids=indices.slice(i,i+3).map(x=>mapping[x]);for(const a of ids)for(const b of ids)if(a!==b)verts[a].neighbors.add(b);}
 const seeds=verts.map(v=>v.green/v.samples>=.5);
 const mask=[...seeds];
 // Restrict color seeds to the garment; exclude green-tinted hair/pants pixels.
 function garment([x,y,z]) {
  if(name==='stair-reader')return y>(z>.05?.62:.54)&&y<1.24&&(y<1.055||z<-.075);
  if(name==='desk-typer')return y>.57&&y<1.30&&(y<1.11||z<-.11);
  return y>.98&&y<1.48&&(y<1.40||z>.10);
 }
 mask.forEach((_,i)=>{if(!garment(verts[i].p))mask[i]=false;});
 const expand=mask.flatMap((v,i)=>v?[i]:[]);
 while(expand.length){const id=expand.pop();for(const n of verts[id].neighbors)if(seeds[n]&&!mask[n]){mask[n]=true;expand.push(n);}}
 const seen=new Set();let filled=0,patches=0;const repairs=new Set();
 for(let start=0;start<verts.length;start++){if(mask[start]||seen.has(start))continue;const stack=[start],component=[];seen.add(start);let boundary=0;const lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];while(stack.length){const id=stack.pop(),v=verts[id];component.push(id);v.p.forEach((x,k)=>{lo[k]=Math.min(lo[k],x);hi[k]=Math.max(hi[k],x);});for(const next of v.neighbors){if(mask[next])boundary++;else if(!seen.has(next)){seen.add(next);stack.push(next);}}}
 const extent=Math.max(...hi.map((x,k)=>x-lo[k]));if(boundary>=3&&lo[1]>floor+.01&&extent<.105){component.forEach(id=>{mask[id]=true;repairs.add(id);});filled+=component.length;patches++;}}
 // The reader's dark nape strands touch the hood; never classify them as fabric.
 if(name==='stair-reader')verts.forEach((v,id)=>{if(v.p[1]>1.02&&v.tone/v.samples<.24){mask[id]=false;repairs.delete(id);}});
 // Soften the faceted shading around repaired patches without moving vertices.
 const sourceNormals=read(p.attributes.NORMAL),normals=verts.map(()=>[0,0,0]);
 mapping.forEach((id,i)=>sourceNormals[i].forEach((x,k)=>normals[id][k]+=x));
 normals.forEach(n=>{const len=Math.hypot(...n)||1;n.forEach((x,k)=>n[k]=x/len);});
 let region=new Set(repairs);
 for(let ring=0;ring<3;ring++){const next=new Set(region);for(const id of region)for(const n of verts[id].neighbors)if(mask[n])next.add(n);region=next;}
 for(let step=0;step<12;step++){const changes=[];for(const id of region){const v=verts[id];if([...v.neighbors].some(n=>!mask[n]))continue;const avg=[0,0,0];for(const n of v.neighbors)normals[n].forEach((x,k)=>avg[k]+=x/v.neighbors.size);const q=normals[id].map((x,k)=>x*.5+avg[k]*.5),len=Math.hypot(...q)||1;changes.push([id,q.map(x=>x/len)]);}changes.forEach(([id,n])=>normals[id]=n);}
 const na=doc.accessors[p.attributes.NORMAL],nv=doc.bufferViews[na.bufferView];mapping.forEach((id,i)=>{if(region.has(id))normals[id].forEach((x,k)=>bin.writeFloatLE(x,(nv.byteOffset??0)+(na.byteOffset??0)+i*(nv.byteStride??12)+k*4));});
 const buffer=Buffer.alloc(pos.length*4);mapping.forEach((id,i)=>buffer.writeFloatLE(mask[id]?1:0,i*4));
 doc.bufferViews.push({buffer:0,byteOffset:size,byteLength:buffer.length,target:34962});doc.accessors.push({bufferView:doc.bufferViews.length-1,componentType:5126,count:pos.length,type:'SCALAR',min:[0],max:[1]});p.attributes._SHIRT_MASK=doc.accessors.length-1;chunks.push(buffer);size+=buffer.length;
 console.log(name,{patches,filled,clothVertices:mask.filter(Boolean).length,total:verts.length});
 }
 doc.buffers[0].byteLength=size;const json=Buffer.from(JSON.stringify(doc)),j=Buffer.concat([json,Buffer.alloc((4-json.length%4)%4,32)]),b=Buffer.concat(chunks),header=Buffer.alloc(20),bh=Buffer.alloc(8);header.write('glTF');header.writeUInt32LE(2,4);header.writeUInt32LE(28+j.length+b.length,8);header.writeUInt32LE(j.length,12);header.writeUInt32LE(0x4e4f534a,16);bh.writeUInt32LE(b.length);bh.writeUInt32LE(0x004e4942,4);fs.writeFileSync(file,Buffer.concat([header,j,bh,b]));
}
