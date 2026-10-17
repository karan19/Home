import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { AnimationMixer } from 'three';
import { clone as cloneSkeleton } from 'three/addons/utils/SkeletonUtils.js';
import { OUTSIDE } from '../../config/outsideCoordinates';
const DIPS_RESIDENT = { model: '/models/dips-resident/dips.glb?animation=5&shirt=clean-1', position: OUTSIDE.gym.position, heading: OUTSIDE.gym.rotation };
import { CHARACTER_REVIEW_MODE } from '../../config/characterReview';
import { useResident } from '../../context/ResidentContext';
import { addResidentFormation, residentFormationDepth } from './residentFormation';
import { addStairReaderColors } from './stairReaderColors';

// The GLB is authored in the fitted gym’s local space, with hands on its grips.
export default function DipsResident() {
  const { scene, animations } = useGLTF(DIPS_RESIDENT.model);
  const resident = useResident();
  const root = useRef();
  const amount = useMemo(() => ({ value: 0 }), []);
  const model = useMemo(() => {
    const clone = cloneSkeleton(scene);
    clone.traverse(object => {
      if (!object.isMesh) return;
      object.castShadow = true;
      object.receiveShadow = true;
      const prepare = original => {
        const material = original.clone();
        addResidentFormation(material, amount);
        addStairReaderColors(material, { fabricFloor: 0.80 });
        return material;
      };
      object.material = Array.isArray(object.material) ? object.material.map(prepare) : prepare(object.material);
      object.customDepthMaterial = residentFormationDepth(amount);
    });
    return clone;
  }, [scene, amount]);
  const reducedMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const mixer = useMemo(() => new AnimationMixer(model), [model]);
  useEffect(() => {
    const clip = animations.find(clip => clip.name === 'Controlled_Dips') ?? animations[0];
    if (clip) mixer.clipAction(clip).play();
    return () => { mixer.stopAllAction(); mixer.uncacheRoot(model); };
  }, [mixer, model, animations]);
  useEffect(() => () => model.traverse(object => {
    if (!object.isMesh) return;
    [object.material].flat().forEach(material => material.dispose());
    object.customDepthMaterial.dispose();
  }), [model]);
  // The main resident updates the shared schedule at priority -1, before this callback.
  useFrame((_, delta) => {
    const state = resident.current;
    amount.value = CHARACTER_REVIEW_MODE ? 1 : state.formation ?? 0;
    root.current.visible = CHARACTER_REVIEW_MODE || state.location === 'dips' && !state.hidden && amount.value > .001;
    if ((!CHARACTER_REVIEW_MODE && (state.location !== 'dips' || state.hidden)) || reducedMotion) mixer.setTime(0);
    else if (amount.value >= .999) mixer.update(Math.min(delta, .1));
  });
  return <primitive ref={root} object={model} visible={false} position={DIPS_RESIDENT.position} rotation={[0, DIPS_RESIDENT.heading, 0]} name="Dips_Character" dispose={null} />;
}
useGLTF.preload(DIPS_RESIDENT.model);
