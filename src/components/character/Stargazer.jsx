import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { STARGAZER } from '../../config/stargazer';
import { CHARACTER_REVIEW_MODE } from '../../config/characterReview';
import { useResident } from '../../context/ResidentContext';
import { addResidentFormation, residentFormationDepth } from './residentFormation';

const FORMATION = {};

// Authored seated pose looking upward from the garden bench.
export default function Stargazer() {
  const { camera, controls } = useThree();
  useEffect(() => {
    if (!controls || new URLSearchParams(window.location.search).get('view') !== 'stargazer') return;
    camera.position.set(-.6, 1.5, 8);
    controls.target.set(-3.4, .6, 5.8);
    controls.update();
  }, [camera, controls]);
  const { scene } = useGLTF(STARGAZER.model);
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
    root.current.visible = CHARACTER_REVIEW_MODE || state.location === 'stargazer' && !state.hidden && amount.value > .001;
  });
  return <primitive ref={root} object={model} visible={false} position={STARGAZER.position} rotation={[0, STARGAZER.heading, 0]} name="Stargazing_Character" dispose={null} />;
}
useGLTF.preload(STARGAZER.model);
