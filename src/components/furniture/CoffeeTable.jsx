import React from 'react';
import * as THREE from 'three';

function CoffeeTable({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation} name="Coffee_Table">
      {/* Tabletop */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.05, 0.6]} />
        <meshStandardMaterial color="#D2B48C" roughness={0.4} metalness={0} />
      </mesh>

      {/* Legs (4 corners) */}
      <mesh position={[-0.55, 0.175, -0.25]} castShadow>
        <boxGeometry args={[0.05, 0.35, 0.05]} />
        <meshStandardMaterial color="#D2B48C" roughness={0.4} metalness={0} />
      </mesh>
      <mesh position={[0.55, 0.175, -0.25]} castShadow>
        <boxGeometry args={[0.05, 0.35, 0.05]} />
        <meshStandardMaterial color="#D2B48C" roughness={0.4} metalness={0} />
      </mesh>
      <mesh position={[-0.55, 0.175, 0.25]} castShadow>
        <boxGeometry args={[0.05, 0.35, 0.05]} />
        <meshStandardMaterial color="#D2B48C" roughness={0.4} metalness={0} />
      </mesh>
      <mesh position={[0.55, 0.175, 0.25]} castShadow>
        <boxGeometry args={[0.05, 0.35, 0.05]} />
        <meshStandardMaterial color="#D2B48C" roughness={0.4} metalness={0} />
      </mesh>
    </group>
  );
}

export default CoffeeTable;
