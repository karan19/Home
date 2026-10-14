import React from 'react';
import { useGLTF } from '@react-three/drei';
import FittedModel from '../../FittedModel';
import { BEDROOM } from '../../../config/upperFloorCoordinates';

export default function Bed({ position = BEDROOM.bed.position, rotation = BEDROOM.bed.rotation }) {
  return <group position={position} rotation={rotation} name="Furniture_Bed">
    <FittedModel modelPath={BEDROOM.bed.modelPath} modelSize={BEDROOM.bed.modelSize}
      floorOffset={BEDROOM.bed.floorOffset} name="Meshy_Bed" />
  </group>;
}
useGLTF.preload(BEDROOM.bed.modelPath);
