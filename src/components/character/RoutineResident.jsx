// Parked while staircase locomotion is validated; not mounted by House.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import { sampleRoutine, activityStart, DESK } from './residentRoutine';
import { useResident } from '../../context/ResidentContext';
import { MacBook } from '../upper-floor/office/MacBook';
import { solveLimb } from './residentIK';
import { inPlaceClip, measureStride } from './residentClips';

const MODEL = '/models/lofi-resident-v2/walking.glb';
const IDLE = '/models/lofi-resident-v2/idle.glb';
const SEATED = '/models/lofi-resident-v2/seated.glb';
const UP = new THREE.Vector3(0, 1, 0);

export default function RoutineResident() {
  const gltf = useGLTF(MODEL);
  const idleGltf = useGLTF(IDLE);
  const seatedGltf = useGLTF(SEATED);
  const resident = useResident();
  const laptop = useRef();
  const lid = useRef();
  const time = useRef(0);
  const workPoint = useMemo(() => new THREE.Vector3(), []);
  const polePoint = useMemo(() => new THREE.Vector3(), []);
  const actions = useRef();
  const statusRef = useRef('taking a breath');
  const [status, setStatus] = useState('taking a breath');
  const root = useRef();

  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const targetRotation = useMemo(() => new THREE.Quaternion(), []);

  const character = useMemo(() => {
    const scene = clone(gltf.scene);
    scene.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = 1.7 / size.y;
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
    const walk = inPlaceClip(gltf.animations[0], scene, 'resident-walk');
    const idle = inPlaceClip(idleGltf.animations[0], scene, 'resident-idle');
    const seated = inPlaceClip(seatedGltf.animations[0], scene, 'resident-seated');
    const bones = Object.fromEntries(['LeftArm','LeftForeArm','LeftHand','RightArm','RightForeArm','RightHand','LeftUpLeg','LeftLeg','LeftFoot','RightUpLeg','RightLeg','RightFoot'].map(name=>[name,scene.getObjectByName(name)]));
    const stride = measureStride(scene, walk, scale);
    const mixer = new THREE.AnimationMixer(scene);
    return { scene, scale, offset: [-center.x, -box.min.y, -center.z], mixer, walk, idle, seated, bones, stride, materials, textures };
  }, [gltf.scene, gltf.animations, idleGltf.animations, seatedGltf.animations]);

  useEffect(() => {
    const walk = character.mixer.clipAction(character.walk).reset().setEffectiveWeight(0).play();
    const idle = character.mixer.clipAction(character.idle).reset().setEffectiveWeight(1).play();
    const seated = character.mixer.clipAction(character.seated).reset().setEffectiveWeight(0).play();
    actions.current = { walk, idle, seated, weight: 0 };
    character.mixer.update(0);
    return () => {
      actions.current = null;
      character.mixer.stopAllAction();
      character.mixer.uncacheRoot(character.scene);
      character.materials.forEach(material => material.dispose());
      character.textures.forEach(texture => texture.dispose());
    };
  }, [character]);

  useFrame((_, delta) => {
    if (!root.current || !actions.current) return;
    const dt = Math.min(delta, 0.05);
    if (!paused) time.current += dt;
    const motion = sampleRoutine(time.current);
    resident.current = {...motion, paused};
    root.current.position.set(...motion.position);
    targetRotation.setFromAxisAngle(UP, motion.heading);
    root.current.quaternion.copy(targetRotation);
    const animation = actions.current;
    const targetWeight = THREE.MathUtils.smoothstep(motion.speed, 0.015, 0.3) * (1-motion.seat);
    animation.weight = THREE.MathUtils.damp(animation.weight, targetWeight, 10, dt);
    animation.weight = Math.min(animation.weight,1-motion.seat);
    animation.walk.setEffectiveWeight(animation.weight);
    animation.idle.setEffectiveWeight(Math.max(0,1-animation.weight-motion.seat));
    animation.seated.setEffectiveWeight(motion.seat);
    animation.walk.setEffectiveTimeScale(Math.max(0.12, motion.speed * character.walk.duration / character.stride));
    character.mixer.update(paused ? 0 : dt);
    root.current.updateWorldMatrix(true,true);

    const carried = motion.laptop !== 'desk';
    const lap = motion.laptop === 'lap';
    const prop = laptop.current;
    prop.visible = carried;
    if(carried){
      // Closed, two-handed carry. Opening and lowering onto the lap blend during sitting.
      const seated = motion.seat;
      workPoint.set(0,1.02-(.28*seated),.34);
      root.current.localToWorld(workPoint);
      prop.position.copy(workPoint);
      prop.quaternion.copy(root.current.quaternion).multiply(new THREE.Quaternion().setFromAxisAngle(UP,Math.PI));
      const transfer = motion.id === 'pick' ? motion.t : motion.id === 'put' ? 1-motion.t : 1;
      if(transfer<1){
        const e=THREE.MathUtils.smoothstep(transfer,0,1);
        prop.position.lerpVectors(new THREE.Vector3(-2.9,3.781,-1.62),workPoint,e);
        prop.quaternion.slerpQuaternions(new THREE.Quaternion().setFromAxisAngle(UP,Math.PI/2),new THREE.Quaternion().setFromAxisAngle(UP,motion.heading+Math.PI),e);
      }
      lid.current.rotation.x = THREE.MathUtils.lerp(-Math.PI/2,-.22,transfer<1?1-transfer:lap?1:seated);
      prop.updateWorldMatrix(true,true);
    }
    for(const [side,sign] of [['Left',1],['Right',-1]]){
      const bones=character.bones;
      let armWeight = carried ? 1 : motion.id==='work' ? motion.seat : 0;
      if(carried){
        workPoint.set(-sign*.14, .018+(lap ? .008*Math.sin(time.current*8+sign):0), .025);
        prop.localToWorld(workPoint);
      }else{
        // World positions over the Magic Keyboard, after the desk's quarter-turn.
        workPoint.set(-2.79,3.80+Math.sin(time.current*9+sign)*.006,-2.10+sign*.10);
      }
      polePoint.set(sign*.48,.72,.05);root.current.localToWorld(polePoint);
      solveLimb(bones[side+'Arm'],bones[side+'ForeArm'],bones[side+'Hand'],workPoint,polePoint,armWeight);
      if(motion.stairs){
        bones[side+'Foot'].getWorldPosition(workPoint);
        const tread=workPoint.z<.2?3:Math.max(.1,Math.min(11,Math.floor((3.5-workPoint.z)/.28))*.25+.05);
        workPoint.y=Math.max(workPoint.y,tread+.09);
        polePoint.set(sign*.16,.45,.65);root.current.localToWorld(polePoint);
        solveLimb(bones[side+'UpLeg'],bones[side+'Leg'],bones[side+'Foot'],workPoint,polePoint);
      }
      if(motion.seat>.01){
        workPoint.set(sign*.13,.10,.37);root.current.localToWorld(workPoint);
        polePoint.set(sign*.16,.45,.65);root.current.localToWorld(polePoint);
        solveLimb(bones[side+'UpLeg'],bones[side+'Leg'],bones[side+'Foot'],workPoint,polePoint,motion.seat);
      }
    }
    const nextStatus = paused ? 'paused' : motion.label;
    if (statusRef.current !== nextStatus) { statusRef.current = nextStatus; setStatus(nextStatus); }
  }, -1);

  return <>
    <group ref={root} name="Lofi_Resident" position={DESK} userData={{ skipExport: true }}>
      <group scale={character.scale}>
        <primitive object={character.scene} position={character.offset} dispose={null} />
      </group>
    </group>
    <MacBook ref={laptop} lidRef={lid} userData={{skipExport:true}} />
    <Html fullscreen calculatePosition={(_, __, size) => [size.width / 2, size.height / 2]}
      zIndexRange={[10, 0]} style={{pointerEvents:'none'}}>
      <div style={{position:'absolute',bottom:20,left:20,pointerEvents:'auto',display:'flex',alignItems:'center',gap:12,
        padding:'10px 14px',borderRadius:12,background:'rgba(45,49,44,.88)',color:'#f6f3ec',font:'12px system-ui'}}>
        <span style={{maxWidth:150}}>Lofi resident · {status}</span>
        <select aria-label="Resident activity" defaultValue="work" onChange={e=>{time.current=activityStart(e.target.value);setPaused(false);}}
          style={{maxWidth:78,font:'inherit',background:'#41483d',color:'inherit',border:'1px solid #ffffff40',borderRadius:6,padding:5}}>
          <option value="work">Desk</option><option value="down">Walk</option><option value="relax">Sofa + TV</option>
        </select>
        <button type="button" aria-label={paused ? 'Resume resident walk' : 'Pause resident walk'}
          onClick={() => setPaused(value => !value)} style={{font:'inherit',cursor:'pointer',border:'1px solid #ffffff40',
            borderRadius:6,padding:'5px 9px',background:'#ffffff15',color:'inherit'}}>{paused ? 'Resume' : 'Pause'}</button>
      </div>
    </Html>
  </>;
}
