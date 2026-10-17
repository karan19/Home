import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COFFEE_RESIDENT as spot} from '../src/config/coffeeResident.js';
import {SPAWN_LOCATIONS} from '../src/components/character/residentSpawning.js';
test('coffee pose sits on the mattress corner with support block removed and shins outside the bed',()=>{
 const b=fs.readFileSync('public/models/coffee-resident/coffee.glb'),jl=b.readUInt32LE(12),d=JSON.parse(b.subarray(20,20+jl)),bin=b.subarray(28+jl);let seat=Infinity,low=Infinity,shin=Infinity,tris=0;
 for(const m of d.meshes)for(const p of m.primitives){tris+=d.accessors[p.indices].count/3;const a=d.accessors[p.attributes.POSITION],v=d.bufferViews[a.bufferView];for(let i=0;i<a.count;i++){
  const k=(v.byteOffset??0)+(a.byteOffset??0)+i*(v.byteStride??12),x=bin.readFloatLE(k),y=bin.readFloatLE(k+4),z=bin.readFloatLE(k+8);assert([x,y,z].every(Number.isFinite));low=Math.min(low,y);
  if(z<-.1&&y<.85)seat=Math.min(seat,y);
  if(y<.65)shin=Math.min(shin,spot.position[2]+z);
 }}
 console.log({seat,low,shin,tris});assert(Math.abs(seat-.708)<.01);assert(low>.15&&low<.25);assert(shin>-1.45);assert(tris<60000);assert(SPAWN_LOCATIONS.includes('coffee'));assert(!SPAWN_LOCATIONS.includes('sleeping'));
});
