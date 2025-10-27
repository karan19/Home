import React from 'react';
import * as THREE from 'three';

function PottedPlant({ position = [0, 0, 0], height = 1 }) {
  const potHeight = height * 0.3;
  const plantHeight = height * 0.7;

  return (
    <group position={position} name="Potted_Plant">
      {/* Ceramic pot */}
      <mesh position={[0, potHeight / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.12, potHeight, 16]} />
        <meshStandardMaterial color="#E8E8E8" roughness={0.3} metalness={0} />
      </mesh>

      {/* Soil */}
      <mesh position={[0, potHeight, 0]} receiveShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.02, 16]} />
        <meshStandardMaterial color="#654321" roughness={0.8} metalness={0} />
      </mesh>

      {/* Plant stems (3 main stems) */}
      {[0, 0.4, -0.4].map((angle, i) => {
        const x = Math.sin(angle) * 0.05;
        const z = Math.cos(angle) * 0.05;
        return (
          <mesh key={i} position={[x, potHeight + plantHeight / 2, z]} castShadow>
            <cylinderGeometry args={[0.01, 0.015, plantHeight, 8]} />
            <meshStandardMaterial color="#2D5016" roughness={0.6} metalness={0} />
          </mesh>
        );
      })}

      {/* Realistic ellipsoid leaves (stretched spheres) */}
      {[
        // Top leaves
        { pos: [0, plantHeight * 0.9, 0], rot: [0.3, 0, 0], scale: [1, 0.3, 2.5] },
        { pos: [0.1, plantHeight * 0.85, 0.05], rot: [0.2, 0.5, 0.3], scale: [1, 0.3, 2.2] },
        { pos: [-0.1, plantHeight * 0.85, -0.05], rot: [-0.2, -0.5, -0.3], scale: [1, 0.3, 2.2] },
        
        // Middle leaves
        { pos: [0.12, plantHeight * 0.7, 0.08], rot: [0.4, 0.8, 0.2], scale: [1, 0.3, 2] },
        { pos: [-0.12, plantHeight * 0.7, -0.08], rot: [-0.4, -0.8, -0.2], scale: [1, 0.3, 2] },
        { pos: [0.08, plantHeight * 0.65, -0.1], rot: [0.3, -0.6, 0.4], scale: [1, 0.3, 1.8] },
        { pos: [-0.08, plantHeight * 0.65, 0.1], rot: [-0.3, 0.6, -0.4], scale: [1, 0.3, 1.8] },
        
        // Lower leaves
        { pos: [0.15, plantHeight * 0.5, 0], rot: [0.5, 1, 0.1], scale: [1, 0.3, 1.8] },
        { pos: [-0.15, plantHeight * 0.5, 0], rot: [-0.5, -1, -0.1], scale: [1, 0.3, 1.8] },
        { pos: [0, plantHeight * 0.45, 0.12], rot: [0.4, 0, 0.5], scale: [1, 0.3, 1.6] },
        { pos: [0, plantHeight * 0.45, -0.12], rot: [-0.4, 0, -0.5], scale: [1, 0.3, 1.6] }
      ].map((leaf, i) => (
        <mesh 
          key={i} 
          position={[leaf.pos[0], potHeight + leaf.pos[1], leaf.pos[2]]} 
          rotation={leaf.rot}
          scale={leaf.scale}
          castShadow
        >
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#228B22" : "#2E8B57"} 
            roughness={0.7} 
            metalness={0} 
          />
        </mesh>
      ))}
    </group>
  );
}

export default PottedPlant;
