import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { BOOKSHELF_RESIDENT } from '../src/config/bookshelfResident.js';
test('bookshelf replacement is grounded and its raised hand clears the shelf front',()=>{
 const data=fs.readFileSync('public/models/bookshelf-resident/bookshelf.glb'),jl=data.readUInt32LE(12),doc=JSON.parse(data.subarray(20,20+jl)),bin=data.subarray(28+jl);
 let triangles=0,lowest=Infinity,highest=0,handGap=Infinity;const feet=[Infinity,Infinity];
 for(const mesh of doc.meshes)for(const p of mesh.primitives){
  triangles+=doc.accessors[p.indices].count/3;const a=doc.accessors[p.attributes.POSITION],v=doc.bufferViews[a.bufferView];
  for(let i=0;i<a.count;i++){const off=(v.byteOffset??0)+(a.byteOffset??0)+i*(v.byteStride??12),x=bin.readFloatLE(off),y=bin.readFloatLE(off+4),z=bin.readFloatLE(off+8);assert([x,y,z].every(Number.isFinite));lowest=Math.min(lowest,y);highest=Math.max(highest,y);feet[x<0?0:1]=Math.min(feet[x<0?0:1],y);
   if(y>1.75){const worldZ=BOOKSHELF_RESIDENT.position[2]-z;handGap=Math.min(handGap,worldZ-(-3.4));}
  }
 }
 console.log({triangles,feet,lowest,highest,handGap});assert(triangles<=60000);assert(lowest>=-.001);feet.forEach(y=>assert(y<.025));assert(highest>1.8&&highest<2.1);assert(handGap>-.01&&handGap<.10);
});
