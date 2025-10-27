import React from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function SmallTable({ position = [0, 0, 0] }) {
  return (
    <group position={position} name="Small_Table">
      {/* Tabletop */}
      <RoundedBox 
        args={[0.5, 0.05, 0.5]} 
        radius={0.02} 
        smoothness={4}
        position={[0, 0.5, 0]} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial color="#D2B48C" roughness={0.4} metalness={0} />
      </RoundedBox>

      {/* Legs (4 corners) */}
      {[
        [-0.2, 0.25, -0.2],
        [0.2, 0.25, -0.2],
        [-0.2, 0.25, 0.2],
        [0.2, 0.25, 0.2]
      ].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.5, 8]} />
          <meshStandardMaterial color="#D2B48C" roughness={0.4} metalness={0} />
        </mesh>
      ))}
    </group>
  );
}

export default SmallTable;
