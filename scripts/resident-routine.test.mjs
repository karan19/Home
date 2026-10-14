import test from 'node:test';
import assert from 'node:assert/strict';
import {ROUTINE,ROUTINE_DURATION,sampleRoutine,activityStart} from '../src/components/character/residentRoutine.js';
test('routine carries one laptop between desk and sofa and returns it',()=>{
 assert.equal(sampleRoutine(activityStart('work')+1).laptop,'desk');
 assert.equal(sampleRoutine(activityStart('down')+1).laptop,'carry');
 const relax=sampleRoutine(activityStart('relax')+1);
 assert.equal(relax.laptop,'lap');assert.equal(relax.tv,true);assert.equal(relax.seat,1);
 assert.equal(sampleRoutine(ROUTINE_DURATION+1).laptop,'desk');
});
test('all floor changes remain in the staircase and positions are continuous',()=>{
 let previous=sampleRoutine(0);
 for(let t=.02;t<ROUTINE_DURATION;t+=.02){
  const p=sampleRoutine(t);assert(p.position.every(Number.isFinite));assert(Number.isFinite(p.heading));
  assert(Math.hypot(...p.position.map((v,i)=>v-previous.position[i]))<.04);
  if(p.position[1]>.11&&p.position[1]<2.99)assert(Math.abs(p.position[0]+2.75)<.01);
  assert(p.seat>=0&&p.seat<=1);previous=p;
 }
});
test('each phase ends at the next activity anchor',()=>{
 for(const phase of ROUTINE){
  const end=sampleRoutine(activityStart(phase.id)+phase.duration-.0001);
  const next=sampleRoutine(activityStart(phase.id)+phase.duration+.0001);
  assert(Math.hypot(...end.position.map((v,i)=>v-next.position[i]))<.001,phase.id);
 }
});
