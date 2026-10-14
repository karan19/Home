// Parked staircase study; not mounted by House.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import { sampleStairMotion, STAIR_DURATION } from './stairMotion';
import { useResident } from '../../context/ResidentContext';
import { solveLimb } from './residentIK';
import { stabilizeBootWeights, measureBootContacts } from './stairRig';
import { inPlaceClip } from './residentClips';

const MODEL = '/models/lofi-resident-v2/walking.glb';
const IDLE = '/models/lofi-resident-v2/idle.glb';
const UP = new THREE.Vector3(0, 1, 0);

export default function StairResident() {
  const {camera,controls}=useThree();
  const gltf = useGLTF(MODEL);
  const idleGltf = useGLTF(IDLE);
  const [descending,setDescending]=useState(false);
  const resident = useResident();
  const [scrub,setScrub]=useState(0);
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
    const geometries=stabilizeBootWeights(scene,scale,box.min.y);
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
    const bones = Object.fromEntries(['Hips','LeftUpLeg','LeftLeg','LeftFoot','RightUpLeg','RightLeg','RightFoot'].map(name=>[name,scene.getObjectByName(name)]));
    const footRotations = {};
    for(const side of ['Left','Right'])footRotations[side]=bones[side+'Foot'].getWorldQuaternion(new THREE.Quaternion());
    const hipHeight=bones.Hips.getWorldPosition(new THREE.Vector3()).y*scale-box.min.y*scale;
    const mixer = new THREE.AnimationMixer(scene);
    return { scene, scale, offset: [-center.x, -box.min.y, -center.z], mixer, idle, bones, footRotations, hipHeight, contacts, geometries, materials, textures };
  }, [gltf.scene, gltf.animations, idleGltf.animations]);

  useEffect(() => {
    const idle = character.mixer.clipAction(character.idle).reset().setEffectiveWeight(1).play();
    actions.current = { idle };
    character.mixer.update(0);
    return () => {
      actions.current = null;
      character.mixer.stopAllAction();
      character.mixer.uncacheRoot(character.scene);
      character.geometries.forEach(geometry=>geometry.dispose());
      character.materials.forEach(material => material.dispose());
      character.textures.forEach(texture => texture.dispose());
    };
  }, [character]);

  useFrame((_, delta) => {
    if (!root.current || !actions.current) return;
    if(!paused)time.current=Math.min(STAIR_DURATION,time.current+Math.min(delta,.04));
    const motion=sampleStairMotion(time.current,descending);
    resident.current={laptop:'desk',tv:false,paused};
    // A fixed idle sample provides relaxed arms; legs are authored by contacts below.
    character.mixer.setTime(.25);
    root.current.position.set(...motion.center);
    root.current.quaternion.setFromAxisAngle(UP,motion.heading);
    root.current.updateWorldMatrix(true,true);
    character.bones.Hips.getWorldPosition(workPoint);
    // Keep the pelvis low enough for both legs to reach, through the weight transfer.
    root.current.position.y += motion.center[1]+character.hipHeight-motion.crouch-workPoint.y;
    root.current.updateWorldMatrix(true,true);
    for(const side of ['Left','Right']){
      const bones=character.bones;
      workPoint.set(...motion.targets[side]);
      // Calibrated against this rig’s skinned shoe vertices, not just its ankle joint.
      workPoint.y+=character.contacts[side].height;
      workPoint.z+=Math.cos(motion.heading)*character.contacts[side].forward;
      polePoint.set(side==='Left'?.12:-.12,.45,.8);
      root.current.localToWorld(polePoint);
      solveLimb(bones[side+'UpLeg'],bones[side+'Leg'],bones[side+'Foot'],workPoint,polePoint);
      // Keep the sole level: knee IK must not rotate a planted shoe into the riser.
      const foot=bones[side+'Foot'];
      foot.parent.getWorldQuaternion(targetRotation).invert();
      foot.quaternion.copy(targetRotation.multiply(new THREE.Quaternion().setFromAxisAngle(UP,motion.heading)).multiply(character.footRotations[side]));
      foot.updateWorldMatrix(false,true);
    }
    if(Math.abs(time.current-scrub)>.12 || (motion.done && scrub!==STAIR_DURATION))setScrub(time.current);
    const nextStatus=(paused?'paused · ': '')+motion.label+' · '+motion.step+'/13';
    if(statusRef.current!==nextStatus){statusRef.current=nextStatus;setStatus(nextStatus);}
  }, -1);

  return <>
    <group ref={root} name="Lofi_Resident"  userData={{ skipExport: true }}>
      <group scale={character.scale}>
        <primitive object={character.scene} position={character.offset} dispose={null} />
      </group>
    </group>
    <Html fullscreen calculatePosition={(_, __, size) => [size.width / 2, size.height / 2]}
      zIndexRange={[10, 0]} style={{pointerEvents:'none'}}>
      <div style={{position:'absolute',bottom:20,left:20,pointerEvents:'auto',display:'flex',alignItems:'center',gap:7,flexWrap:'wrap',maxWidth:310,
        padding:'10px 14px',borderRadius:12,background:'rgba(45,49,44,.88)',color:'#f6f3ec',font:'12px system-ui'}}>
        <span style={{maxWidth:120}}>Stair practice · {status}</span>
        <select aria-label="Stair direction" value={descending?'down':'up'} onChange={e=>{setDescending(e.target.value==='down');time.current=0;setScrub(0);setPaused(false);}}
          style={{font:'inherit',background:'#41483d',color:'inherit',border:'1px solid #ffffff40',borderRadius:6,padding:5}}>
          <option value="up">Upstairs</option><option value="down">Downstairs</option>
        </select>
        <button type="button" onClick={()=>{time.current=0;setScrub(0);setPaused(false);}} style={{font:'inherit',cursor:'pointer'}}>Replay</button>
        <button type="button" aria-label={paused ? 'Resume resident walk' : 'Pause resident walk'}
          onClick={() => setPaused(value => !value)} style={{font:'inherit',cursor:'pointer',border:'1px solid #ffffff40',
            borderRadius:6,padding:'5px 9px',background:'#ffffff15',color:'inherit'}}>{paused ? 'Resume' : 'Pause'}</button>
        <button type="button" onClick={()=>{camera.position.set(-6.8,3.9,6.5);controls?.target.set(-2.75,2,1.6);controls?.update();}}
          style={{font:'inherit',cursor:'pointer'}}>Focus stairs</button>
        <label style={{display:'flex',width:'100%',alignItems:'center',gap:8}}>Inspect step
          <input aria-label="Inspect stair movement" type="range" min="0" max={STAIR_DURATION} step="0.02" value={scrub}
            onChange={e=>{const value=Number(e.target.value);time.current=value;setScrub(value);setPaused(true);}} style={{flex:1}} />
        </label>
      </div>
    </Html>
  </>;
}
