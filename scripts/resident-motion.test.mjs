import test from 'node:test';
import assert from 'node:assert/strict';
import { createMotion, advanceMotion } from '../src/components/character/residentMotion.js';
import { routeSegments } from '../src/components/character/residentRoute.js';
const route = routeSegments();
test('resident finishes circuit without getting stuck at a corner', () => {
 const state=createMotion();
 for(let i=0;i<30000 && !state.laps;i++) {
  const frame=advanceMotion(state,route,1/60,false);
  assert(frame.position.every(Number.isFinite));
  assert(state.speed>=0 && state.speed<=0.721);
 }
 assert.equal(state.laps,1);
});
test('pause smoothly stops and resume accelerates',()=>{
 const s=createMotion(); s.rest=0;
 for(let i=0;i<60;i++) advanceMotion(s,route,1/60,false);
 assert(s.speed>0);
 for(let i=0;i<120;i++) advanceMotion(s,route,1/60,true);
 assert.equal(s.speed,0);const distance=s.distance;
 advanceMotion(s,route,1/60,true);assert.equal(s.distance,distance);
 advanceMotion(s,route,1/60,false);assert(s.speed>0 && s.speed<0.1);
});
test('pause on stairs waits until a landing',()=>{
 const s=createMotion();s.rest=0;s.segment=route.findIndex(s=>s.stairs);s.speed=.36;
 let frame;
 for(let i=0;i<3000;i++){frame=advanceMotion(s,route,1/60,true);if(frame.resting)break;}
 assert(frame.resting); assert(!frame.stairs); assert.equal(s.speed,0);
});
