import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import { stabilizeResidentWaist } from './residentWaist';
import { createResidentFists } from './residentFists';
import { scheduleResidentVisit } from './residentSpawning';
import { addResidentFormation, residentFormationDepth, formationAmount } from './residentFormation';
import { COOKING_RESIDENT } from '../../config/cookingResident';
import { ISLAND_RESIDENT } from '../../config/islandResident';
import { MEDITATION_RESIDENT } from '../../config/meditationResident';
import { STARGAZER } from '../../config/stargazer';
import { COFFEE_RESIDENT } from '../../config/coffeeResident';
import { BOXING_RESIDENT } from '../../config/boxingResident';
import { STAIR_READER } from '../../config/stairReader';
import { OUTSIDE } from '../../config/outsideCoordinates';
import { CHARACTER_REVIEW_MODE } from '../../config/characterReview';
import { SEATED_VIEWS, seatedRigData, applySeatedPose } from './seatedPoses';
import { measureBootContacts } from './stairRig';
import { useTVPlayback } from '../../context/TVPlaybackContext';
import { useResident } from '../../context/ResidentContext';
import { applyBookReach, captureBonePose, restoreBonePose, applyRelaxedArms } from './bookReachPose';

const MODEL='/models/lofi-resident-v4/resident.glb';
// Seated eye height above the couch, looking at the center of the TV.
// Keep the TV viewing camera ahead of the seated character’s face.
const TV_EYE=[1.5,1.15,1.78];
const TV_TARGET=[1.5,.875,3.7];
function focusTV(camera,controls){
 window.dispatchEvent(new CustomEvent('house-tv-view',{detail:true}));
 if(controls)controls.minDistance=.75;
 camera.position.set(...TV_EYE);camera.lookAt(...TV_TARGET);
 if(controls){controls.target.set(...TV_TARGET);controls.update();}
}
const VIEWS={
 stargazer:{...STARGAZER,label:"Stargazing",camera:[-.6,1.5,8]},
 meditation:{...MEDITATION_RESIDENT,label:"Meditation",camera:[1.4,4.8,.2]},
 island:{...ISLAND_RESIDENT,label:"Island stool",camera:[-4.4,2.2,1.7]},
 cooking:{...COOKING_RESIDENT,label:"Cooking",camera:[-.3,2.5,-.5]},
 coffee:{...COFFEE_RESIDENT,label:"Morning coffee",camera:[4.6,5.1,1.2]},
 boxing:{...BOXING_RESIDENT,label:"Balcony rest",camera:[3.8,5.2,8.3]},
 ...SEATED_VIEWS,
 dips:{label:"Dips machine",position:OUTSIDE.gym.position,heading:OUTSIDE.gym.rotation,camera:[-9,2.4,3]},
 stairs:{label:"Reading on the steps",position:STAIR_READER.position,heading:0,camera:[-4,2.7,5]},
 sofa:{label:"Watching TV",position:[1.25,.1,.28],heading:Math.atan2(.25,3.42),camera:[-1,2.0,2.8],tv:true},
 character:{position:[.1,.1,.1],heading:0,camera:[-1.5,1.7,3.0]},
 bookshelf:{position:[3.20,.1,-2.91],heading:Math.PI,camera:[.5,2.3,.9]},
};

// The selected character uses authored poses fitted to each furniture contact.
export default function BookReachResident({ fixedView } = {}){
 const {camera,controls}=useThree();
 const showDevTools=!fixedView&&!CHARACTER_REVIEW_MODE&&import.meta.env.DEV&&new URLSearchParams(window.location.search).get('debug')==='1';
 const {scene:source}=useGLTF(MODEL);
 const resident=useResident();
 const root=useRef();
 const tvActive=Boolean(useTVPlayback()?.active);
 const [selectedView,setView]=useState('sofa');
 const view=fixedView??(tvActive||CHARACTER_REVIEW_MODE?'sofa':selectedView);
 const [reaching,setReaching]=useState(false);
 const [userHidden,setHidden]=useState(false);
 const hidden=CHARACTER_REVIEW_MODE||tvActive?false:userHidden;
 const [roamingEnabled,setAutomatic]=useState(true);
 const automatic=roamingEnabled&&!tvActive&&!CHARACTER_REVIEW_MODE&&!fixedView;
 const [roamingDeparture,setDeparting]=useState(false);
 const departing=roamingDeparture&&!tvActive&&!CHARACTER_REVIEW_MODE&&!fixedView;
 const progress=useRef(0);
 const transitionTime=useRef(0);
 const dirty=useRef(true);
 const ready=useRef(false);
 const reducedMotion=useMemo(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches,[]);
 const character=useMemo(()=>{
  const scene=clone(source);scene.updateMatrixWorld(true);
  const bounds=new THREE.Box3().setFromObject(scene),center=bounds.getCenter(new THREE.Vector3());
  const scale=1.76/(bounds.max.y-bounds.min.y);
  const geometries=stabilizeResidentWaist(scene);
  const setFists=createResidentFists(scene);
  const materials=[];
  const formation={value:1};
  scene.traverse(mesh=>{
   if(!mesh.isMesh)return;
   mesh.customDepthMaterial=residentFormationDepth(formation);materials.push(mesh.customDepthMaterial);
   mesh.castShadow=true;mesh.receiveShadow=false;mesh.frustumCulled=false;
   const soften=original=>{
    const m=original.clone();m.roughness=.86;m.metalness=0;
    m.normalMap=null;m.roughnessMap=null;m.metalnessMap=null;
    addResidentFormation(m,formation);materials.push(m);return m;
   };
   mesh.material=Array.isArray(mesh.material)?mesh.material.map(soften):soften(mesh.material);
  });
  return {scene,scale,setFists,formation,offset:[-center.x,-bounds.min.y,-center.z],stance:captureBonePose(scene),rig:seatedRigData(scene,scale),contacts:measureBootContacts(scene,scale),materials,geometries};
 },[source]);
 const focus=(id=view)=>{
  if(tvActive){focusTV(camera,controls);return;}
  window.dispatchEvent(new CustomEvent('house-tv-view',{detail:false}));
  const spot=VIEWS[id];camera.position.set(...spot.camera);
  controls?.target.set(spot.position[0],spot.position[1]+.9,spot.position[2]);controls?.update();
 };
 useEffect(()=>{
  if(fixedView)return;
  const returnToTV=()=>focusTV(camera,controls);
  window.addEventListener('house-tv-focus',returnToTV);
  return()=>window.removeEventListener('house-tv-focus',returnToTV);
 },[camera,controls,fixedView]);
 useEffect(()=>{
  if(!tvActive||fixedView)return;
  // Keep the seated view after playback; only explicit navigation exits it.
  focusTV(camera,controls);
 },[tvActive,camera,controls,fixedView]);
 useEffect(()=>{
  ready.current=true;dirty.current=true;
  return()=>{ready.current=false;character.materials.forEach(m=>m.dispose());character.geometries.forEach(g=>g.dispose());};
 },[character]);
 useEffect(()=>{progress.current=0;dirty.current=true;setReaching(false);},[view]);
 useEffect(()=>{
  if(!automatic||hidden){setDeparting(false);return;}
  let stop=()=>{};
  const resume=()=>{
   stop();setDeparting(false);
   if(document.hidden)return;
   stop=scheduleResidentVisit(view,()=>setDeparting(true),next=>{
    setView(next);setDeparting(false);
   });
  };
  resume();document.addEventListener('visibilitychange',resume);
  return()=>{stop();document.removeEventListener('visibilitychange',resume);};
 },[automatic,hidden,view]);
 useEffect(()=>{transitionTime.current=0;},[view,departing,automatic]);
 useFrame((_,delta)=>{
  if(!root.current||!ready.current)return;
  transitionTime.current+=Math.min(delta,.1)*1000;
  const amount=automatic&&!reducedMotion?formationAmount(transitionTime.current,departing):departing?0:1;
  character.formation.value=amount;
  if(!fixedView)resident.current={formation:amount,laptop:'desk',tv:!!VIEWS[view].tv&&!hidden&&!departing,paused:!automatic,location:view,hidden:hidden||amount<=0.001};
  root.current.visible=view!=='stairs'&&view!=='desk'&&view!=='dips'&&view!=='reading'&&view!=='bookshelf'&&view!=='sofa'&&view!=='boxing'&&view!=='coffee'&&view!=='stargazer'&&view!=='meditation'&&view!=='island'&&view!=='cooking'&&!hidden&&amount>0.001;
  if(view==='stairs'||view==='desk'||view==='dips')return;
  const target=view==='bookshelf'&&(reaching||automatic||CHARACTER_REVIEW_MODE)?1:0;
  const next=reducedMotion?target:THREE.MathUtils.clamp(target,progress.current-delta/.9,progress.current+delta/.9);
  if(next===progress.current&&!dirty.current)return;
  progress.current=next;dirty.current=false;
  const spot=VIEWS[view];
  character.setFists(spot.foldedHands?1:0);
  root.current.position.set(...spot.position);root.current.rotation.set(0,spot.heading,0);
  restoreBonePose(character.stance);root.current.updateMatrixWorld(true);
  if(spot.seat!==undefined){
   applySeatedPose(character.scene,root.current,spot,character.rig,character.contacts);
  }else{
   const bounds=new THREE.Box3().setFromObject(character.scene,true);
   root.current.position.y+=spot.position[1]-bounds.min.y;root.current.updateMatrixWorld(true);
   applyRelaxedArms(character.scene,root.current);
   if(view==='sofa'){
    const head=character.scene.getObjectByName('Head');
    const world=head.getWorldQuaternion(new THREE.Quaternion());
    const pitch=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0).applyQuaternion(root.current.quaternion),.12);
    head.quaternion.copy(head.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(pitch).multiply(world));
    head.updateWorldMatrix(false,true);
   }
   if(view==='bookshelf')applyBookReach(character.scene,THREE.MathUtils.smoothstep(next,0,1));
  }

 },-1);
 const changeView=e=>{setAutomatic(false);setDeparting(false);setView(e.target.value);setHidden(false);focus(e.target.value);};
 const buttonStyle={font:'inherit',cursor:'pointer',padding:'5px 8px',borderRadius:5,border:'1px solid #ffffff40',background:'#41483d',color:'inherit'};
 return <>
  <group ref={root} name="Lofi_Resident" userData={{skipExport:true}}>
   <group scale={character.scale}><primitive object={character.scene} position={character.offset} dispose={null}/></group>
  </group>
  {showDevTools && <Html fullscreen calculatePosition={(_,__,size)=>[size.width/2,size.height/2]} zIndexRange={[10,0]} style={{pointerEvents:'none'}}>
   <div style={{position:'absolute',bottom:20,left:20,maxWidth:310,pointerEvents:'auto',display:'flex',gap:7,flexWrap:'wrap',alignItems:'center',padding:'10px 14px',borderRadius:12,background:'rgba(45,49,44,.92)',color:'#f6f3ec',font:'12px system-ui'}}>
    <span>Resident</span>
    <select aria-label="Resident view" value={view} disabled={tvActive} onChange={changeView} style={buttonStyle}>
     <option value="cooking">Cooking</option><option value="island">Island stool</option><option value="meditation">Meditation</option><option value="stargazer">Stargazing</option><option value="coffee">Morning coffee</option><option value="boxing">Balcony rest</option><option value="dips">Dips machine</option><option value="stairs">Reading on the steps</option><option value="character">Character</option><option value="bookshelf">Bookshelf reach</option><option value="sofa">Watching TV</option>
     {Object.entries(SEATED_VIEWS).map(([id,spot])=><option key={id} value={id}>{spot.label}</option>)}
    </select>
    {view==='bookshelf'&&!automatic&&<button style={buttonStyle} onClick={()=>setReaching(v=>!v)}>{reaching?'Lower arm':'Reach for book'}</button>}
    <button style={buttonStyle} aria-pressed={automatic} disabled={tvActive} onClick={()=>{setAutomatic(v=>!v);setDeparting(false);}}>{tvActive?'Watching TV…':automatic?'Pause roaming':'Auto roam'}</button>
    <button style={buttonStyle} onClick={()=>focus()}>Focus</button>
    <button style={buttonStyle} disabled={tvActive} onClick={()=>setHidden(v=>!v)}>{hidden?'Show':'Hide'}</button>
   </div>
  </Html>}
 </>;
}
