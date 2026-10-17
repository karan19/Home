import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { COOKING_RESIDENT as spot } from '../src/config/cookingResident.js';
import { SPAWN_LOCATIONS } from '../src/components/character/residentSpawning.js';
test('cooking resident has grounded feet, clears the cabinet and participates in spawning',()=>{
 const b=fs.readFileSync('public'+spot.model),jl=b.readUInt32LE(12),d=JSON.parse(b.subarray(20,20+jl)),bin=b.subarray(28+jl);
 assert.equal(d.animations?.length??0,0);assert(SPAWN_LOCATIONS.includes('cooking'));
 const feet=[Infinity,Infinity];let triangles=0;
 for(const m of d.meshes)for(const p of m.primitives){triangles+=d.accessors[p.indices].count/3;const a=d.accessors[p.attributes.POSITION],v=d.bufferViews[a.bufferView];for(let i=0;i<a.count;i++){
 const k=(v.byteOffset??0)+(a.byteOffset??0)+i*(v.byteStride??12),x=bin.readFloatLE(k),y=bin.readFloatLE(k+4),z=bin.readFloatLE(k+8);assert([x,y,z].every(Number.isFinite));feet[x<0?0:1]=Math.min(feet[x<0?0:1],y);
 if(y<.8)assert(spot.position[2]-z>-3.19,'lower body must stay in front of cabinets');
 }}
 console.log({feet,triangles});feet.forEach(y=>assert(Math.abs(y)<.008));assert(triangles<60000);
});
