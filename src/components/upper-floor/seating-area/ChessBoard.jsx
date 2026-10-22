import React, { useState } from 'react';
import { useCursor, useGLTF } from '@react-three/drei';
import FittedModel from '../../FittedModel';
import { SEATING_AREA } from '../../../config/upperFloorCoordinates';
import { useInteractiveAudio } from '../../../hooks/useInteractiveAudio';

const MODEL = '/models/chess-set/chess-set.glb';

export default function ChessBoard() {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const { toggle } = useInteractiveAudio('bezos');
  const { position, tabletop } = SEATING_AREA.smallTable;
  return <group name="Upstairs_Chess_Set" position={[position[0], position[1] + tabletop.positionY + tabletop.height / 2, position[2]]}
    onPointerOver={event => { event.stopPropagation(); setHovered(true); }}
    onPointerOut={() => setHovered(false)}
    onClick={event => { event.stopPropagation(); if (event.delta <= 5) void toggle(); }}>
    <FittedModel modelPath={MODEL} targetSize={.42} name="Chess_Set" />
  </group>;
}

useGLTF.preload(MODEL);
