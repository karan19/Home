import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { ISLAND_RESIDENT as spot } from '../src/config/islandResident.js';
import { KITCHEN } from '../src/config/groundFloorCoordinates.js';
import { OUTSIDE } from '../src/config/outsideCoordinates.js';
import { SPAWN_LOCATIONS } from '../src/components/character/residentSpawning.js';
test('island resident sits on the pulled-back stool facing the dips machine',()=>{
 const stool=KITCHEN.kitchenIsland.barStools.positions[0];assert(stool[2]>1);assert(SPAWN_LOCATIONS.includes('island'));
 const dx=OUTSIDE.gym.position[0]-spot.position[0],dz=OUTSIDE.gym.position[2]-spot.position[2];assert(Math.abs(Math.atan2(dx,dz)-spot.heading)<1e-8);
 const b=fs.readFileSync('public'+spot.model),jl=b.readUInt32LE(12),d=JSON.parse(b.subarray(20,20+jl)),bin=b.subarray(28+jl);let contact=Infinity,foot=Infinity;
 for(const m of d.meshes)for(const p of m.primitives){const a=d.accessors[p.attributes.POSITION],v=d.bufferViews[a.bufferView];for(let i=0;i<a.count;i++){
 const k=(v.byteOffset??0)+(a.byteOffset??0)+i*(v.byteStride??12),x=bin.readFloatLE(k),y=bin.readFloatLE(k+4)+spot.modelOffset[1],z=bin.readFloatLE(k+8)+spot.modelOffset[2];
 foot=Math.min(foot,y);if(Math.hypot(x,z)<.19)contact=Math.min(contact,y);
 }}
 const seat=KITCHEN.barStool.seat.positionY+KITCHEN.barStool.seat.height/2;
 console.log({contact,seat,foot});assert(contact>=seat-.005&&contact<seat+.012);assert(foot>.1);
});
