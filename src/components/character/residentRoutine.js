// One shared timeline owns navigation, posture, the laptop and TV.
const stairs = Array.from({length:12},(_,i)=>[-2.75,Math.max(.1,i*.25+.05),3.36-i*.28]);
export const DESK = [-2.30,3,-2.10];
export const SOFA = [1.25,.1,1.22];
const sofaApproach=[1.25,.1,1.78];
const downstairs = [DESK,[-2.30,3,-1.35],[-1.8,3,-1.35],[-1.8,3,-.65],[-2.75,3,-.65],[-2.75,3,.05],...stairs.toReversed(),[-2.75,.1,3.6],[-1.5,.1,3.6],[-.15,.1,2.9],[-.15,.1,1.8],sofaApproach];
const pathDuration = points => points.slice(1).reduce((s,p,i)=>s+Math.hypot(...p.map((v,a)=>v-points[i][a]))/(Math.abs(p[1]-points[i][1])>.01?.36:.65)+.55,0);
export const ROUTINE = [
 {id:'work',label:'working upstairs',duration:18,at:DESK,heading:-Math.PI/2,seat:1,laptop:'desk'},
 {id:'rise',label:'getting up',duration:2.5,at:DESK,heading:-Math.PI/2,seatFrom:1,seatTo:0,laptop:'desk'},
 {id:'pick',label:'picking up the laptop',duration:3,at:DESK,heading:-Math.PI/2,laptop:'pickup'},
 {id:'down',label:'taking the laptop downstairs',duration:pathDuration(downstairs),path:downstairs,laptop:'carry'},
 {id:'sit',label:'settling onto the sofa',duration:2.5,at:SOFA,heading:0,seatFrom:0,seatTo:1,laptop:'carry'},
 {id:'relax',label:'laptop and TV time',duration:22,at:SOFA,heading:0,seat:1,laptop:'lap',tv:true},
 {id:'stand',label:'heading back upstairs',duration:2.5,at:SOFA,heading:0,seatFrom:1,seatTo:0,laptop:'carry'},
 {id:'up',label:'bringing the laptop back',duration:pathDuration(downstairs),path:downstairs.toReversed(),laptop:'carry'},
 {id:'put',label:'returning the laptop',duration:3,at:DESK,heading:-Math.PI/2,laptop:'putdown'},
 {id:'sitDesk',label:'back to work',duration:2.5,at:DESK,heading:-Math.PI/2,seatFrom:0,seatTo:1,laptop:'desk'},
];
export const ROUTINE_DURATION = ROUTINE.reduce((s,p)=>s+p.duration,0);
export const activityStart = id => ROUTINE.slice(0,ROUTINE.findIndex(p=>p.id===id)).reduce((s,p)=>s+p.duration,0);
const smooth = t=>t*t*(3-2*t);
const lerpAngle = (a,b,t)=>a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*t;
export function sampleRoutine(time) {
 let local=((time%ROUTINE_DURATION)+ROUTINE_DURATION)%ROUTINE_DURATION;
 let phase=ROUTINE[0];
 for(const p of ROUTINE){phase=p;if(local<p.duration)break;local-=p.duration;}
 const t=Math.min(1,local/phase.duration);
 let position=phase.at,heading=phase.heading,speed=0,stairs=false;
 if(phase.path){
  const points=phase.path;let elapsed=local;
  let previousHeading=phase.id==='down'?-Math.PI/2:0;
  for(let i=0;i<points.length-1;i++){
   const a=points[i],b=points[i+1];const length=Math.hypot(...b.map((v,k)=>v-a[k]));
   const isStair=Math.abs(b[1]-a[1])>.01;const cruise=isStair?.36:.65;const duration=length/cruise+.55;
   const target=Math.atan2(b[0]-a[0],b[2]-a[2]);
   if(elapsed<=duration||i===points.length-2){
    const turn=Math.min(1,elapsed/.55);heading=lerpAngle(previousHeading,target,smooth(turn));
    const u=Math.max(0,Math.min(1,(elapsed-.55)/(duration-.55)));
    // Ease each segment's endpoints; rotate before moving to avoid sideways sliding.
    const v=smooth(u);position=a.map((x,k)=>x+(b[k]-x)*v);
    speed=6*u*(1-u)*cruise;stairs=isStair;break;
   }
   elapsed-=duration;previousHeading=target;
  }
 }
 const seat=phase.seat??((phase.seatFrom??0)+((phase.seatTo??0)-(phase.seatFrom??0))*smooth(t));
 // Turn toward the furniture during the initial sitting / prop interaction.
 if(phase.id==='sit'){
  heading=lerpAngle(Math.PI/2,0,smooth(Math.min(1,t*3)));
  position=sofaApproach.map((v,i)=>v+(SOFA[i]-v)*smooth(t));
 }
 if(phase.id==='stand')position=SOFA.map((v,i)=>v+(sofaApproach[i]-v)*smooth(t));
 if(phase.id==='put')heading=lerpAngle(Math.PI,-Math.PI/2,smooth(Math.min(1,t*3)));
 return {...phase,t,local,position,heading,speed,stairs,seat};
}
