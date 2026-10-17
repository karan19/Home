import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { COFFEE_RESIDENT } from '../../config/coffeeResident';
import { CHARACTER_REVIEW_MODE } from '../../config/characterReview';
import { useResident } from '../../context/ResidentContext';
import { addResidentFormation, residentFormationDepth } from './residentFormation';

const FORMATION = {};

// Seated coffee pose, fitted to the front corner of the bed.
export default function CoffeeResident() {
  const { camera, controls } = useThree();
  useEffect(() => {
    if (!controls || new URLSearchParams(window.location.search).get('view') !== 'coffee') return;
    camera.position.set(4.6, 5.1, 1.2);
    controls.target.set(2.3, 3.85, -2.1);
    controls.update();
  }, [camera, controls]);
  const { scene } = useGLTF(COFFEE_RESIDENT.model);
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
    root.current.visible = CHARACTER_REVIEW_MODE || state.location === 'coffee' && !state.hidden && amount.value > .001;
  });
  return <primitive ref={root} object={model} visible={false} position={COFFEE_RESIDENT.position} rotation={[0, COFFEE_RESIDENT.heading, 0]} name="Morning_Coffee_Character" dispose={null} />;
}
useGLTF.preload(COFFEE_RESIDENT.model);
