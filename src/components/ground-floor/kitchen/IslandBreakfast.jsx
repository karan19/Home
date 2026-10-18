import React from 'react';
import { useGLTF } from '@react-three/drei';
import FittedModel from '../../FittedModel';
import { ISLAND_BREAKFAST } from '../../../config/islandBreakfast';

export default function IslandBreakfast() {
  return <group name="Island_Breakfast">
    {ISLAND_BREAKFAST.map(({ position, ...prop }) => <group key={prop.name} position={position}>
      <FittedModel {...prop} />
    </group>)}
  </group>;
}
ISLAND_BREAKFAST.forEach(prop => useGLTF.preload(prop.modelPath));
