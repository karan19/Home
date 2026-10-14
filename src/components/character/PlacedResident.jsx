import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import CookingProps from './CookingProps';
import { RESIDENT_SPOTS } from './residentSpots';
import { useResident } from '../../context/ResidentContext';
import { solveLimb } from './residentIK';
import { measureBootContacts } from './stairRig';
import { inPlaceClip } from './residentClips';

const MODEL = '/models/lofi-resident-v3/resident.glb';
const IDLE = '/models/lofi-resident-v3/idle.glb';
const SEATED = '/models/lofi-resident-v3/seated.glb';
const UP = new THREE.Vector3(0, 1, 0);

export default function LofiResident() {
  const {camera,controls}=useThree();
  const gltf = useGLTF(MODEL);
  const idleGltf = useGLTF(IDLE);
  const seatedGltf=useGLTF(SEATED);
  const resident = useResident();
  const [location,setLocation]=useState('sofa');
  const [hidden,setHidden]=useState(false);
  const reducedMotion=useMemo(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches,[]);
  const transition=useRef({location:'sofa',opacity:1,dirty:true});
  const workPoint=useMemo(()=>new THREE.Vector3(),[]);
  const polePoint=useMemo(()=>new THREE.Vector3(),[]);
  const targetRotation=useMemo(()=>new THREE.Quaternion(),[]);
  const actions=useRef();
  const root=useRef();

  const character = useMemo(() => {
    const scene = clone(gltf.scene);
    scene.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = 1.7 / size.y;
    // V3 is generated without accessories. Preserve its complete mesh and skin
    // weights; the old headset surgery and V2 leg repair do not apply to this rig.
    const contacts=measureBootContacts(scene,scale);
    const materials = [];
    const textures = [];
    scene.traverse(object => {
      if (!object.isMesh) return;
      object.castShadow = true;
      // Keep a ground shadow without self-shadow acne on the animated surface.
      object.receiveShadow = false;
      // Animated bounds can otherwise cull limbs using the bind-pose box.
      object.frustumCulled = false;
      const soften = original => {
        const material = original.clone();
        material.roughness = 0.9;
        material.metalness = 0;
        material.normalMap = null;
        material.roughnessMap = null;
        material.metalnessMap = null;
        if (material.map) {
          material.map = material.map.clone();
          material.map.minFilter = THREE.LinearFilter;
          material.map.magFilter = THREE.LinearFilter;
          material.map.generateMipmaps = false;
          material.map.needsUpdate = true;
          textures.push(material.map);
        }
        materials.push(material);
        return material;
      };
      object.material = Array.isArray(object.material) ? object.material.map(soften) : soften(object.material);
    });
    const idle = inPlaceClip(idleGltf.animations[0], scene, 'resident-idle');
    const seated=inPlaceClip(seatedGltf.animations[0],scene,'resident-seated');
    const bones = Object.fromEntries(['Spine','Spine01','Spine02','Head','LeftArm','LeftForeArm','LeftHand','RightArm','RightForeArm','RightHand','Hips','LeftUpLeg','LeftLeg','LeftFoot','RightUpLeg','RightLeg','RightFoot'].map(name=>[name,scene.getObjectByName(name)]));
    const footRotations = {};
    for(const side of ['Left','Right'])footRotations[side]=bones[side+'Foot'].getWorldQuaternion(new THREE.Quaternion());
    const hipHeight=bones.Hips.getWorldPosition(new THREE.Vector3()).y*scale-box.min.y*scale;
    const mixer = new THREE.AnimationMixer(scene);
    return { scene, scale, offset: [-center.x, -box.min.y, -center.z], mixer, idle, seated, bones, footRotations, hipHeight, contacts, materials, textures };
  }, [gltf.scene, gltf.animations, idleGltf.animations,seatedGltf.animations]);

  useEffect(() => {
    const idle = character.mixer.clipAction(character.idle).reset().setEffectiveWeight(1).play();
    const seated=character.mixer.clipAction(character.seated).reset().setEffectiveWeight(0).play();
    actions.current = { idle,seated };
    transition.current.dirty=true;
    character.mixer.update(0);
    return () => {
      actions.current = null;
      character.mixer.stopAllAction();
      character.mixer.uncacheRoot(character.scene);
      character.materials.forEach(material => material.dispose());
      character.textures.forEach(texture => texture.dispose());
    };
  }, [character]);

  useFrame((_,delta)=>{
    if(!root.current||!actions.current)return;
    const state=transition.current;
    const changing=state.location!==location;
    const target=hidden||changing?0:1;
    state.opacity=reducedMotion?target:(state.opacity+THREE.MathUtils.clamp(target-state.opacity,-Math.min(delta,.05)*4,Math.min(delta,.05)*4));
    if(changing&&state.opacity===0){state.location=location;state.dirty=true;}
    const spot=RESIDENT_SPOTS[state.location]??RESIDENT_SPOTS.sofa;
    resident.current={laptop:'desk',tv:!hidden&&spot.tv,paused:false,location:state.location,hidden:hidden||state.opacity<.5};
    root.current.visible=state.opacity>0;
    for(const material of character.materials){
      const transparent=state.opacity<1;
      if(material.transparent!==transparent){material.transparent=transparent;material.needsUpdate=true;}
      material.opacity=state.opacity;material.depthWrite=!transparent;
    }
    if(!state.dirty)return;
    state.dirty=false;
    root.current.position.set(...spot.position);
    root.current.position.y+=spot.seatLift??0;
    root.current.rotation.set(0,spot.heading,0);
    actions.current.idle.setEffectiveWeight(spot.seated?0:1);
    actions.current.seated.setEffectiveWeight(spot.seated?1:0);
    // Sample once, then keep the entire pose still. No navigation or animation clock.
    character.mixer.setTime(.25);
    root.current.updateMatrixWorld(true);
    if(!spot.seated){
      const bounds=new THREE.Box3().setFromObject(character.scene,true);
      root.current.position.y+=spot.position[1]-bounds.min.y+(spot.hangingLift??0);
      root.current.updateMatrixWorld(true);
    }
    if(spot.lean){
      // Meshy's Spine02 is the lumbar joint; Spine is the upper chest.
      // Distribute the lean from the lower back instead of bending only the neck/chest.
      for(const [name,weight] of [['Spine02',.65],['Spine01',.35]]){
        const spine=character.bones[name];
        const world=spine.getWorldQuaternion(new THREE.Quaternion());
        const axis=new THREE.Vector3(1,0,0).applyQuaternion(root.current.quaternion);
        spine.quaternion.copy(spine.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(new THREE.Quaternion().setFromAxisAngle(axis,spot.lean*weight)).multiply(world));
        spine.updateWorldMatrix(false,true);
      }
    }
    for(const [side,sign] of [['Left',1],['Right',-1]]){
      const bones=character.bones;
      const index=side==='Left'?0:1;
      if(spot.worldHands)workPoint.set(...spot.worldHands[index]);
      else{workPoint.set(...spot.hands[index]);root.current.localToWorld(workPoint);}
      polePoint.set(sign*(spot.elbowWidth??.38),spot.elbowHeight??.6,spot.elbowForward??.08);root.current.localToWorld(polePoint);
      solveLimb(bones[side+'Arm'],bones[side+'ForeArm'],bones[side+'Hand'],workPoint,polePoint);
      // Preserve the authored wrist orientation relative to the forearm.
      // Forcing every palm toward the same axis caused visibly twisted wrists.
      if(spot.handDirection){
        const hand=bones[side+'Hand'];
        const world=hand.getWorldQuaternion(new THREE.Quaternion());
        const direction=new THREE.Vector3(...spot.handDirection).applyQuaternion(root.current.quaternion).normalize();
        const turn=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0).applyQuaternion(world).normalize(),direction);
        hand.quaternion.copy(hand.parent.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(turn).multiply(world));
        hand.updateWorldMatrix(false,true);
      }
      if(!spot.seated)continue;
      const footPlacement=spot.feet?.[index]??[sign*.12,spot.feetForward??.37];
      workPoint.set(footPlacement[0],character.contacts[side].height,footPlacement[1]+character.contacts[side].forward);
      root.current.localToWorld(workPoint);
      workPoint.y=spot.position[1]+character.contacts[side].height;
      polePoint.set(footPlacement[0],.45,.8);root.current.localToWorld(polePoint);
      solveLimb(bones[side+'UpLeg'],bones[side+'Leg'],bones[side+'Foot'],workPoint,polePoint);
      const foot=bones[side+'Foot'];
      foot.parent.getWorldQuaternion(targetRotation).invert();
      foot.quaternion.copy(targetRotation.multiply(new THREE.Quaternion().setFromAxisAngle(UP,spot.heading)).multiply(character.footRotations[side]));
      foot.updateWorldMatrix(false,true);
    }
  },-1);

  const focusResident=()=>{
    const spot=RESIDENT_SPOTS[location]??RESIDENT_SPOTS.sofa;
    camera.position.set(...spot.camera);
    controls?.target.set(spot.position[0],spot.position[1]+.8,spot.position[2]);
    controls?.update();
  };

  return <>
    <CookingProps />
    <group ref={root} name="Lofi_Resident"  userData={{ skipExport: true }}>
      <group scale={character.scale}>
        <primitive object={character.scene} position={character.offset} dispose={null} />
      </group>
    </group>
    <Html fullscreen calculatePosition={(_, __, size) => [size.width / 2, size.height / 2]}
      zIndexRange={[10, 0]} style={{pointerEvents:'none'}}>
      <div style={{position:'absolute',bottom:20,left:20,pointerEvents:'auto',display:'flex',alignItems:'center',gap:7,flexWrap:'wrap',maxWidth:310,
        padding:'10px 14px',borderRadius:12,background:'rgba(45,49,44,.88)',color:'#f6f3ec',font:'12px system-ui'}}>
        <span>Lofi resident</span>
        <select aria-label="Resident location" value={location} onChange={e=>{setLocation(e.target.value);setHidden(false);}}
          style={{font:'inherit',background:'#41483d',color:'inherit',border:'1px solid #ffffff40',borderRadius:6,padding:5}}>
          {Object.entries(RESIDENT_SPOTS).map(([id,spot])=><option key={id} value={id}>{spot.label}</option>)}
        </select>
        <button type="button" onClick={focusResident} style={{font:'inherit',cursor:'pointer'}}>Focus</button>
        <button type="button" onClick={()=>setHidden(value=>!value)} style={{font:'inherit',cursor:'pointer'}}>{hidden?'Show':'Hide'}</button>
      </div>
    </Html>
  </>;
}
