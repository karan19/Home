import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { MEDITATION_RESIDENT as spot } from '../src/config/meditationResident.js';
import { DECORATIONS } from '../src/config/upperFloorCoordinates.js';
import { SPAWN_LOCATIONS } from '../src/components/character/residentSpawning.js';
test('meditation pose rests on the upstairs rug and fits completely inside it',()=>{
 const b=fs.readFileSync('public'+spot.model),jl=b.readUInt32LE(12),d=JSON.parse(b.subarray(20,20+jl)),bin=b.subarray(28+jl);let min=Infinity,max=-Infinity,triangles=0;
 assert.equal(d.animations?.length??0,0);assert(SPAWN_LOCATIONS.includes('meditation'));
 for(const m of d.meshes)for(const p of m.primitives){triangles+=d.accessors[p.indices].count/3;const a=d.accessors[p.attributes.POSITION],v=d.bufferViews[a.bufferView];for(let i=0;i<a.count;i++){
 const k=(v.byteOffset??0)+(a.byteOffset??0)+i*(v.byteStride??12),x=bin.readFloatLE(k),y=bin.readFloatLE(k+4),z=bin.readFloatLE(k+8);assert([x,y,z].every(Number.isFinite));min=Math.min(min,y);max=Math.max(max,y);assert(Math.abs(x)<DECORATIONS.rug.width/2-.1);assert(Math.abs(z)<DECORATIONS.rug.depth/2-.1);
 }}
 assert(Math.abs(min)<.005);assert(max>.85&&max<1);assert(triangles<60000);assert(Math.abs(spot.position[1]+min-3.0175)<.006);
 console.log({min,max,triangles});
});
