import React from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { SEATING_AREA } from '../../../config/upperFloorCoordinates';

function AccentChair({ position = [0, 0, 0], rotation = 0 }) {
  // Determine which chair config to use based on position
  const chairConfig = position[0] === 0 ? SEATING_AREA.accentChair1 : SEATING_AREA.accentChair2;
  const { material, mainCushion, backrest, armrest } = chairConfig;

  return (
    <group position={position} rotation={[0, rotation, 0]} name="Accent_Chair">
      {/* Main cushion body (base + seat combined) */}
      <RoundedBox 
        args={[mainCushion.width, mainCushion.height, mainCushion.depth]} 
        radius={mainCushion.radius} 
        smoothness={mainCushion.smoothness}
        position={[0, mainCushion.positionY, 0]} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial {...material} />
      </RoundedBox>

      {/* Backrest cushion (slanted, attached to seat) */}
      <RoundedBox 
        args={[backrest.width, backrest.height, backrest.depth]} 
        radius={backrest.radius} 
        smoothness={backrest.smoothness}
        position={[0, backrest.positionY, backrest.positionZ]} 
        rotation={[backrest.rotationX, 0, 0]}
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial {...material} />
      </RoundedBox>

      {/* Cushioned armrests (merged with seat) */}
      <RoundedBox 
        args={[armrest.width, armrest.height, armrest.depth]} 
        radius={armrest.radius} 
        smoothness={armrest.smoothness}
        position={[armrest.leftPositionX, armrest.positionY, 0]} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial {...material} />
      </RoundedBox>

      <RoundedBox 
        args={[armrest.width, armrest.height, armrest.depth]} 
        radius={armrest.radius} 
        smoothness={armrest.smoothness}
        position={[armrest.rightPositionX, armrest.positionY, 0]} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial {...material} />
      </RoundedBox>
    </group>
  );
}

export default AccentChair;
