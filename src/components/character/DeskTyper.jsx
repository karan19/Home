import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { SEATED_VIEWS } from './seatedPoses';
const DESK_TYPER = { model: '/models/desk-typer/typer.glb?shirt=clean-1', ...SEATED_VIEWS.desk };
import { CHARACTER_REVIEW_MODE } from '../../config/characterReview';
import { useResident } from '../../context/ResidentContext';
import { addResidentFormation, residentFormationDepth } from './residentFormation';
import { addStairReaderColors } from './stairReaderColors';

// The GLB is already authored in metres with feet at local y=0 and facing +Z.
export default function DeskTyper() {
  const { scene } = useGLTF(DESK_TYPER.model);
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
        addStairReaderColors(material);
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
    root.current.visible = CHARACTER_REVIEW_MODE || state.location === 'desk' && !state.hidden && amount.value > .001;
  });
  return <primitive ref={root} object={model} visible={false} position={DESK_TYPER.position} rotation={[0, DESK_TYPER.heading, 0]} name="Desk_Typing_Character" dispose={null} />;
}
useGLTF.preload(DESK_TYPER.model);
