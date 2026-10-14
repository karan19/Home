import React from 'react';
import { useGLTF } from '@react-three/drei';
import { OUTSIDE } from '../../config/outsideCoordinates';
import FittedModel from '../FittedModel';

export default function Gym() {
  const { position, rotation, targetSize, modelPath } = OUTSIDE.gym;
  return <group name="Outdoor_Gym" position={position} rotation={[0, rotation, 0]}>
    <FittedModel modelPath={modelPath} targetSize={targetSize} name="Gym_Model" />
  </group>;
}
useGLTF.preload(OUTSIDE.gym.modelPath);
