import { useInteractiveAudio } from '../../../hooks/useInteractiveAudio';
import React from 'react';
import { useGLTF } from '@react-three/drei';
import FittedModel from '../../FittedModel';
import { LIVING_ROOM } from '../../../config/groundFloorCoordinates';

function Bookshelf({
  position = LIVING_ROOM.bookshelf.position,
  rotation = LIVING_ROOM.bookshelf.rotation
}) {
  const { toggle } = useInteractiveAudio('kalam');
  const { modelPath, modelSize, floorOffset } = LIVING_ROOM.bookshelf;

  return (
    <group position={position} rotation={rotation} name="Bookshelf"
      onClick={event => { event.stopPropagation(); toggle(); }}
      onPointerOver={event => { event.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}>
      <FittedModel
        modelPath={modelPath}
        modelSize={modelSize}
        floorOffset={floorOffset}
        name="Meshy_Bookshelf"
      />
    </group>
  );
}

export default Bookshelf;

useGLTF.preload(LIVING_ROOM.bookshelf.modelPath);
