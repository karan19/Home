import React from 'react';
import { useGLTF } from '@react-three/drei';
import FittedModel from '../../FittedModel';
import { SEATING_AREA } from '../../../config/upperFloorCoordinates';

export default function AccentChair({ position, rotation = 0 }) {
  return <group position={position} rotation={[0, rotation, 0]} name="Furniture_AccentChair">
    <FittedModel {...SEATING_AREA.chairModel} name="Meshy_AccentChair" />
  </group>;
}
useGLTF.preload(SEATING_AREA.chairModel.modelPath);
