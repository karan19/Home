import React from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { SEATING_AREA } from '../../../config/upperFloorCoordinates';

function SmallTable({ position = [0, 0, 0] }) {
  const { material, tabletop, leg } = SEATING_AREA.smallTable;

  return (
    <group position={position} name="Small_Table">
      {/* Tabletop */}
      <RoundedBox 
        args={[tabletop.width, tabletop.height, tabletop.depth]} 
        radius={tabletop.radius} 
        smoothness={tabletop.smoothness}
        position={[0, tabletop.positionY, 0]} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial {...material} />
      </RoundedBox>

      {/* Legs (4 corners) */}
      {leg.positions.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[leg.radius, leg.radius, leg.height, leg.segments]} />
          <meshStandardMaterial {...material} />
        </mesh>
      ))}
    </group>
  );
}

export default SmallTable;
