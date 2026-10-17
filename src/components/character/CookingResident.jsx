import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { COOKING_RESIDENT } from '../../config/cookingResident';
import { CHARACTER_REVIEW_MODE } from '../../config/characterReview';
import { useResident } from '../../context/ResidentContext';
import { addResidentFormation, residentFormationDepth } from './residentFormation';

const FORMATION = {};

// Static cooking pose, facing the hob with grounded feet.
export default function CookingResident() {
  const { camera, controls } = useThree();
  useEffect(() => {
    if (!controls || new URLSearchParams(window.location.search).get('view') !== 'cooking') return;
    camera.position.set(-.3, 2.5, -.5);
    controls.target.set(-2.55, 1, -3);
    controls.update();
  }, [camera, controls]);
  const { scene } = useGLTF(COOKING_RESIDENT.model);
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
    root.current.visible = CHARACTER_REVIEW_MODE || state.location === 'cooking' && !state.hidden && amount.value > .001;
  });
  return <primitive ref={root} object={model} visible={false} position={COOKING_RESIDENT.position} rotation={[0, COOKING_RESIDENT.heading, 0]} name="Cooking_Character" dispose={null} />;
}
useGLTF.preload(COOKING_RESIDENT.model);
