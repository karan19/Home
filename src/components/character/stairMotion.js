import { STAIRCASE, STAIR_CONTACTS } from '../../config/staircase.js';
const smooth=t=>t*t*t*(t*(t*6-15)+10);
const clamp=t=>Math.max(0,Math.min(1,t));
export const STEP_SECONDS=1.25;
export const STAIR_DURATION=1+(STAIR_CONTACTS.length-1)*2*STEP_SECONDS;
// Deliberate step-to gait. Each landing is exact, and support feet never slide.
export function sampleStairMotion(time, descending=false){
 const contacts=descending?STAIR_CONTACTS.toReversed().map(p=>({...p,z:p.z+.07})):STAIR_CONTACTS.map(p=>({...p,z:p.z+.03}));
 const heading=descending?0:Math.PI;
 const travel=Math.max(0,Math.min(STAIR_DURATION-1,time-1));
 const index=Math.min((contacts.length-1)*2-1,Math.floor(travel/STEP_SECONDS));
 const progress=clamp((travel-index*STEP_SECONDS)/STEP_SECONDS);
 const level=Math.floor(index/2),moving=index%2===0?'Left':'Right';
 const from=contacts[level],to=contacts[level+1];
 const targets={};
 for(const side of ['Left','Right']){
  const start=side===moving?from:(moving==='Left'?from:to);
  let y=start.y,z=start.z;
  if(side===moving){
   // Lift vertically before crossing a riser, then lower onto the next tread.
   const high=Math.max(from.y,to.y)+.13;
   if(progress<.28)y=from.y+(high-from.y)*smooth(progress/.28);
   else if(progress<.72){y=high;z=from.z+(to.z-from.z)*smooth((progress-.28)/.44);}
   else{y=high+(to.y-high)*smooth((progress-.72)/.28);z=to.z;}
  }
  targets[side]=[STAIRCASE.x+(side==='Left'?1:-1)*(descending?1:-1)*.12,y,z];
 }
 const done=time>=STAIR_DURATION;
 if(done)for(const side of ['Left','Right'])targets[side][1]=contacts.at(-1).y,targets[side][2]=contacts.at(-1).z;
 const center=[STAIRCASE.x,(targets.Left[1]+targets.Right[1])/2,(targets.Left[2]+targets.Right[2])/2];
 // Pelvis follows the supporting levels, not the swing-foot lift.
 center[1]=from.y+(to.y-from.y)*(index%2===0?.5*smooth(progress):.5+.5*smooth(progress));
 if(done)center[1]=contacts.at(-1).y;
 const crouch=done?.04:.04+.13*Math.sin(Math.PI*((index%2)+progress)/2);
 return {targets,center,crouch,heading,moving,progress,done,step:Math.min(contacts.length-1,level+1),label:done?'at the landing':time<1?'ready':descending?'stepping down':'stepping up'};
}
