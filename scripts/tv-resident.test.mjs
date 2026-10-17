import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { TV_RESIDENT } from '../src/config/tvResident.js';
test('TV resident has two full grounded legs, clear shins and a cushion-height seat',()=>{
 const b=fs.readFileSync('public'+TV_RESIDENT.model.split('?')[0]),jl=b.readUInt32LE(12),doc=JSON.parse(b.subarray(20,20+jl)),bin=b.subarray(28+jl);
 const feet=[Infinity,Infinity],shins=[0,0];let seat=Infinity,triangles=0;
 for(const mesh of doc.meshes)for(const p of mesh.primitives){triangles+=doc.accessors[p.indices].count/3;const a=doc.accessors[p.attributes.POSITION],v=doc.bufferViews[a.bufferView];for(let i=0;i<a.count;i++){
 const k=(v.byteOffset??0)+(a.byteOffset??0)+i*(v.byteStride??12),x=bin.readFloatLE(k),y=bin.readFloatLE(k+4),z=bin.readFloatLE(k+8),side=x<0?0:1;assert([x,y,z].every(Number.isFinite));
 if(z>.5&&y<.2)feet[side]=Math.min(feet[side],y);
 if(y>.10&&y<.27){assert(z>.44,'lower leg must be beyond sofa front');shins[side]++;}
 if(z>.15&&z<.35&&y<.6)seat=Math.min(seat,y);
 }}
 console.log({feet,shins,seat,triangles});feet.forEach(y=>assert(Math.abs(y)<.008));shins.forEach(n=>assert(n>100));assert(seat>.415&&seat<.44);assert(triangles<100000);
});
