import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { BOXING_RESIDENT } from '../../config/boxingResident';
import { CHARACTER_REVIEW_MODE } from '../../config/characterReview';
import { useResident } from '../../context/ResidentContext';
import { addResidentFormation, residentFormationDepth } from './residentFormation';

const FORMATION = {};

// Static rest pose with red gloves on the balcony rail; no skeletal animation.
export default function BoxingResident() {
  const { camera, controls } = useThree();
  useEffect(() => {
    if (!controls || new URLSearchParams(window.location.search).get('view') !== 'boxing') return;
    camera.position.set(3.8, 5.2, 8.3);
    controls.target.set(.9, 3.95, 4.9);
    controls.update();
  }, [camera, controls]);
  const { scene } = useGLTF(BOXING_RESIDENT.model);
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
        addResidentFormation(material, amount, FORMATION);
        return material;
      };
      object.material = Array.isArray(object.material) ? object.material.map(prepare) : prepare(object.material);
      object.customDepthMaterial = residentFormationDepth(amount, FORMATION);
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
    root.current.visible = CHARACTER_REVIEW_MODE || state.location === 'boxing' && !state.hidden && amount.value > .001;
  });
  return <primitive ref={root} object={model} visible={false} position={BOXING_RESIDENT.position} rotation={[0, BOXING_RESIDENT.heading, 0]} name="Balcony_Rest_Character" dispose={null} />;
}
useGLTF.preload(BOXING_RESIDENT.model);
