import test from 'node:test';
import assert from 'node:assert/strict';
import {sampleStairMotion,STAIR_DURATION,STEP_SECONDS} from '../src/components/character/stairMotion.js';
test('support shoe remains fixed throughout every swing in both directions',()=>{
 for(const down of [false,true])for(let i=0;i<26;i++){
  const start=1+i*STEP_SECONDS;
  const a=sampleStairMotion(start+.01,down);
  const support=a.moving==='Left'?'Right':'Left';
  for(let u=.05;u<1;u+=.05){
   const b=sampleStairMotion(start+u*STEP_SECONDS,down);
   assert.deepEqual(a.targets[support],b.targets[support]);
  }
 }
});
test('contacts are continuous and finish with both feet on the landing',()=>{
 for(const down of [false,true]){
  let previous=sampleStairMotion(0,down);
  for(let t=.01;t<STAIR_DURATION;t+=.01){
   const next=sampleStairMotion(t,down);
   for(const side of ['Left','Right'])assert(Math.hypot(...next.targets[side].map((v,i)=>v-previous.targets[side][i]))<.03);
   previous=next;
  }
  const end=sampleStairMotion(STAIR_DURATION,down);
  assert(end.done);assert.equal(end.targets.Left[1],down?.1:3);assert.equal(end.targets.Right[1],down?.1:3);
 }
});
