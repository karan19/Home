import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { ISLAND_RESIDENT } from '../../config/islandResident';
import { CHARACTER_REVIEW_MODE } from '../../config/characterReview';
import { useResident } from '../../context/ResidentContext';
import { addResidentFormation, residentFormationDepth } from './residentFormation';

const FORMATION = {};

// Reuse the seated coffee model, fitted to the pulled-back island stool.
export default function IslandResident() {
  const { camera, controls } = useThree();
  useEffect(() => {
    if (!controls || new URLSearchParams(window.location.search).get('view') !== 'island') return;
    camera.position.set(-4.4, 2.2, 1.7);
    controls.target.set(-2, .95, -.45);
    controls.update();
  }, [camera, controls]);
  const { scene } = useGLTF(ISLAND_RESIDENT.model);
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
    root.current.visible = CHARACTER_REVIEW_MODE || state.location === 'island' && !state.hidden && amount.value > .001;
  });
  return <group ref={root} visible={false} position={ISLAND_RESIDENT.position} rotation={[0, ISLAND_RESIDENT.heading, 0]} name="Island_Character"><primitive object={model} position={ISLAND_RESIDENT.modelOffset} dispose={null} /></group>;
}
useGLTF.preload(ISLAND_RESIDENT.model);
