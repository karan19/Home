import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { TV_RESIDENT } from '../../config/tvResident';
import { CHARACTER_REVIEW_MODE } from '../../config/characterReview';
import { useResident } from '../../context/ResidentContext';
import { addResidentFormation, residentFormationDepth } from './residentFormation';

// The GLB is already authored in metres with feet at local y=0 and facing +Z.
export default function TVResident() {
  const { camera, controls } = useThree();
  useEffect(() => {
    if (!controls || new URLSearchParams(window.location.search).get('view') !== 'sofa') return;
    camera.position.set(4, 2.1, 3.6);
    controls.target.set(1.5, .8, 1.2);
    controls.update();
  }, [camera, controls]);
  const { scene } = useGLTF(TV_RESIDENT.model);
  const resident = useResident();
  const root = useRef();
  const amount = useMemo(() => ({ value: 0 }), []);
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse(object => {
      if (!object.isMesh) return;
      object.castShadow = true;
      object.receiveShadow = true;
      const prepare = original => {
        const material = original.clone();
        addResidentFormation(material, amount);
        return material;
      };
      object.material = Array.isArray(object.material) ? object.material.map(prepare) : prepare(object.material);
      object.customDepthMaterial = residentFormationDepth(amount);
    });
    return clone;
  }, [scene, amount]);
  useEffect(() => () => model.traverse(object => {
    if (!object.isMesh) return;
    [object.material].flat().forEach(material => material.dispose());
    object.customDepthMaterial.dispose();
  }), [model]);
  // The main resident updates the shared schedule at priority -1, before this callback.
  useFrame(() => {
    const state = resident.current;
    amount.value = CHARACTER_REVIEW_MODE ? 1 : state.formation ?? 0;
    root.current.visible = CHARACTER_REVIEW_MODE || state.location === 'sofa' && !state.hidden && amount.value > .001;
  });
  return <primitive ref={root} object={model} visible={false} position={TV_RESIDENT.position} rotation={[0, TV_RESIDENT.heading, 0]} name="TV_Seated_Character" dispose={null} />;
}
useGLTF.preload(TV_RESIDENT.model);
