import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { SEATED_VIEWS } from './seatedPoses';
import { useInteractiveAudio } from '../../hooks/useInteractiveAudio';
import { STAIR_READER } from '../../config/stairReader';
import { CHARACTER_REVIEW_MODE } from '../../config/characterReview';
import { useResident } from '../../context/ResidentContext';
import { addResidentFormation, residentFormationDepth } from './residentFormation';
import { addStairReaderColors } from './stairReaderColors';
import { createReadingCover, addReadingCover } from './stairReaderBook';

// The GLB is already authored in metres with feet at local y=0 and facing +Z.
export default function StairReader({ placement = 'stairs' }) {
  const upstairs = placement === 'reading';
  const { toggle } = useInteractiveAudio('bezos');
  const { scene } = useGLTF(STAIR_READER.model);
  const resident = useResident();
  const root = useRef();
  const cover = useMemo(createReadingCover, []);
  useEffect(() => () => cover.dispose(), [cover]);
  const amount = useMemo(() => ({ value: 0 }), []);
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse(object => {
      if (!object.isMesh) return;
      if (upstairs) {
        // Fit the 50cm stair seat to the 43.5cm chair cushion. Keep the
        // upper body/book unchanged; the root offset returns soles to the floor.
        object.geometry = object.geometry.clone();
        const positions = object.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
          const y = positions.getY(i);
          if (y < .5) positions.setY(i, .065 + y * .87);
        }
        positions.needsUpdate = true;
        // Preserve the repaired shirt normals on the unchanged upper body.
        object.geometry.computeBoundingBox();
        object.geometry.computeBoundingSphere();
      }
      object.castShadow = true;
      object.receiveShadow = true;
      const prepare = original => {
        const material = original.clone();
        addResidentFormation(material, amount);
        addStairReaderColors(material);
        addReadingCover(material, cover);
        return material;
      };
      object.material = Array.isArray(object.material) ? object.material.map(prepare) : prepare(object.material);
      object.customDepthMaterial = residentFormationDepth(amount);
    });
    return clone;
  }, [scene, amount, cover, upstairs]);
  useEffect(() => () => model.traverse(object => {
    if (!object.isMesh) return;
    [object.material].flat().forEach(material => material.dispose());
    object.customDepthMaterial.dispose();
    if (upstairs) object.geometry.dispose();
  }), [model, upstairs]);
  // The main resident updates the shared schedule at priority -1, before this callback.
  useFrame(() => {
    const state = resident.current;
    amount.value = CHARACTER_REVIEW_MODE ? 1 : state.formation ?? 0;
    root.current.visible = CHARACTER_REVIEW_MODE || state.location === placement && !state.hidden && amount.value > .001;
  });
  const seat = SEATED_VIEWS.reading;
  const position = upstairs ? [seat.position[0] + .125, seat.position[1] - .065, seat.position[2]] : STAIR_READER.position;
  return <primitive ref={root} object={model} visible={false} position={position} rotation={[0, upstairs ? seat.heading : 0, 0]}
    onClick={upstairs ? event => { event.stopPropagation(); toggle(); } : undefined}
    name={upstairs ? 'Upstairs_Reading_Character' : 'Stair_Reading_Character'} dispose={null} />;
}
useGLTF.preload(STAIR_READER.model);
