import {formationAmount} from '../src/components/character/residentFormation.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {scheduleResidentVisit,nextResidentLocation,SPAWN_LOCATIONS} from '../src/components/character/residentSpawning.js';
function clock(){let now=0,id=0;const timers=new Map();return {
 schedule:(fn,delay)=>{timers.set(++id,{fn,at:now+delay});return id;},cancel:id=>timers.delete(id),
 tick(ms){const end=now+ms;while(true){const next=[...timers].sort((a,b)=>a[1].at-b[1].at)[0];if(!next||next[1].at>end)break;now=next[1].at;timers.delete(next[0]);next[1].fn();}now=end;}
};}
test('resident stays forms, stays five seconds, dissolves, then spawns somewhere different',()=>{
 const c=clock(),events=[];
 scheduleResidentVisit('sofa',()=>events.push('hidden'),next=>events.push(next),{...c,random:()=>0});
 c.tick(6199);assert.deepEqual(events,[]);c.tick(1);assert.deepEqual(events,['hidden']);
 c.tick(1349);assert.deepEqual(events,['hidden']);c.tick(1);assert.deepEqual(events,['hidden','desk']);
});
test('pause or hide cancels departure and pending arrival',()=>{
 for(const elapsed of [100,6300]){
  const c=clock(),events=[];const stop=scheduleResidentVisit('sofa',()=>events.push('hidden'),next=>events.push(next),c);
  c.tick(elapsed);stop();const before=[...events];c.tick(10000);assert.deepEqual(events,before);
 }
});
test('random selection uses all established placements without immediate repeats',()=>{
 for(const current of SPAWN_LOCATIONS){
  const selected=Array.from({length:SPAWN_LOCATIONS.length-1},(_,i)=>nextResidentLocation(current,()=> (i+.5)/(SPAWN_LOCATIONS.length-1)));
  assert(!selected.includes(current));assert.deepEqual(new Set(selected),new Set(SPAWN_LOCATIONS.filter(x=>x!==current)));
 }
});

test('formation and dissolution reach exact endpoints smoothly',()=>{
 assert.equal(formationAmount(0,false),0);assert.equal(formationAmount(1200,false),1);
 assert.equal(formationAmount(0,true),1);assert.equal(formationAmount(1100,true),0);
 assert.equal(formationAmount(600,false),.5);assert.equal(formationAmount(550,true),.5);
});
