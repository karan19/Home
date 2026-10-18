import React from 'react';
import { useGLTF } from '@react-three/drei';
import FittedModel from '../../FittedModel';
import { ENTERTAINMENT } from '../../../config/groundFloorCoordinates';

export default function PlayStation({ position }) {
  const { modelPath, height, rotation } = ENTERTAINMENT.playstation;
  return <group position={position} rotation={rotation} name="PlayStation_Console">
    <FittedModel modelPath={modelPath} targetSize={height} name="PS5_Upright" />
  </group>;
}
useGLTF.preload(ENTERTAINMENT.playstation.modelPath);
