import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import FittedModel from '../../FittedModel';
import { DECORATIONS } from '../../../config/upperFloorCoordinates';

export default function PottedPlant({ position, height = 1.2, rotation = 0 }) {
  const size = useMemo(() => [height * 0.55, height, height * 0.45], [height]);
  return <group position={position} rotation={[0, rotation, 0]} name="Furniture_Plant">
    <FittedModel modelPath={DECORATIONS.plantModelPath} modelSize={size} name="Meshy_Plant" />
  </group>;
}
useGLTF.preload(DECORATIONS.plantModelPath);
