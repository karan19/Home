import React from 'react';
import { useGLTF } from '@react-three/drei';
import FittedModel from '../../FittedModel';
import { LIVING_ROOM } from '../../../config/groundFloorCoordinates';

function Sofa({ position = LIVING_ROOM.sofa.position }) {
  const { modelPath, modelSize, rotation, floorOffset } = LIVING_ROOM.sofa;

  return (
    <group position={position} rotation={rotation} name="Furniture_Sofa">
      <FittedModel
        modelPath={modelPath}
        modelSize={modelSize}
        floorOffset={floorOffset}
        name="Meshy_Sofa"
      />
    </group>
  );
}

export default Sofa;

useGLTF.preload(LIVING_ROOM.sofa.modelPath);
