import React from 'react';
import * as THREE from 'three';

function Rug({ position = [0, 0, 0], width = 2, depth = 2 }) {
  return (
    <group position={position} name="Rug">
      {/* Main rug surface */}
      <mesh position={[0, 0.01, 0]} receiveShadow>
        <boxGeometry args={[width, 0.01, depth]} />
        <meshStandardMaterial 
          color="#8B4513" 
          roughness={0.9} 
          metalness={0}
        />
      </mesh>

      {/* Rug pattern (simple stripes) */}
      {[-0.3, 0, 0.3].map((offset, i) => (
        <mesh key={i} position={[0, 0.015, offset * depth / 2]} receiveShadow>
          <boxGeometry args={[width * 0.9, 0.005, 0.05]} />
          <meshStandardMaterial 
            color="#654321" 
            roughness={0.9} 
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  );
}

export default Rug;
