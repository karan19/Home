import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { BOXING_RESIDENT as spot } from '../src/config/boxingResident.js';
import { OUTSIDE } from '../src/config/outsideCoordinates.js';
test('static red-glove resident is grounded with both elbows on the balcony rail',()=>{
 const b=fs.readFileSync('public'+spot.model),jl=b.readUInt32LE(12),d=JSON.parse(b.subarray(20,20+jl)),bin=b.subarray(28+jl);
 assert.equal(d.animations?.length??0,0);assert.equal(d.skins?.length??0,0);
 const feet=[Infinity,Infinity],elbows=[Infinity,Infinity];let triangles=0,penetration=0;const railZ=OUTSIDE.balcony.position[2]+OUTSIDE.balcony.topRail.front.positionZ;
 for(const m of d.meshes)for(const p of m.primitives){triangles+=d.accessors[p.indices].count/3;const a=d.accessors[p.attributes.POSITION],v=d.bufferViews[a.bufferView];for(let i=0;i<a.count;i++){
 const k=(v.byteOffset??0)+(a.byteOffset??0)+i*(v.byteStride??12),x=bin.readFloatLE(k),y=bin.readFloatLE(k+4),z=bin.readFloatLE(k+8),side=x<0?0:1;assert([x,y,z].every(Number.isFinite));feet[side]=Math.min(feet[side],y);
 if(Math.abs(spot.position[2]+z-railZ)<.025&&y>.9&&y<1.25){for(let j=0;j<2;j++)if(Math.abs(x-spot.elbowContactX[j])<.02){elbows[j]=Math.min(elbows[j],y);penetration=Math.max(penetration,1.025-y);}}
 if(y<.15){assert(spot.position[2]+z>3.75&&spot.position[2]+z<5.225);assert(spot.position[0]+x>-.6&&spot.position[0]+x<2.4);}
 }}
 console.log({feet,elbows,penetration,triangles});feet.forEach(y=>assert(Math.abs(y)<.006));elbows.forEach(y=>assert(y>=1.02&&y<1.055));assert(penetration<.005);assert(triangles<60000);
});
