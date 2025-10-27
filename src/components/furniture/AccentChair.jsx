import React from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function AccentChair({ position = [0, 0, 0], rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]} name="Accent_Chair">
      {/* Main cushion body (base + seat combined) */}
      <RoundedBox 
        args={[0.6, 0.52, 0.6]} 
        radius={0.08} 
        smoothness={4}
        position={[0, 0.26, 0]} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial color="#808080" roughness={0.7} metalness={0} />
      </RoundedBox>

      {/* Backrest cushion (slanted, attached to seat) */}
      <RoundedBox 
        args={[0.6, 0.5, 0.12]} 
        radius={0.05} 
        smoothness={4}
        position={[0, 0.65, -0.28]} 
        rotation={[-0.2, 0, 0]}
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial color="#808080" roughness={0.7} metalness={0} />
      </RoundedBox>

      {/* Cushioned armrests (merged with seat) */}
      <RoundedBox 
        args={[0.12, 0.4, 0.55]} 
        radius={0.06} 
        smoothness={4}
        position={[-0.31, 0.45, 0]} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial color="#808080" roughness={0.7} metalness={0} />
      </RoundedBox>

      <RoundedBox 
        args={[0.12, 0.4, 0.55]} 
        radius={0.06} 
        smoothness={4}
        position={[0.31, 0.45, 0]} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial color="#808080" roughness={0.7} metalness={0} />
      </RoundedBox>
    </group>
  );
}

export default AccentChair;
