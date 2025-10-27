import React from 'react';
import * as THREE from 'three';
import BarStool from './BarStool';

function KitchenIsland({ position }) {
  const cabinetMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: 0.3,
    metalness: 0.0
  });

  const countertopMaterial = new THREE.MeshStandardMaterial({
    color: 0xE0E0E0,
    roughness: 0.2,
    metalness: 0.0
  });

  return (
    <group position={position} name="Kitchen_Island">
      {/* Island base */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow material={cabinetMaterial}>
        <boxGeometry args={[1.5, 0.9, 0.8]} />
      </mesh>

      {/* Countertop */}
      <mesh position={[0, 0.925, 0]} castShadow receiveShadow material={countertopMaterial}>
        <boxGeometry args={[1.6, 0.05, 0.85]} />
      </mesh>

      {/* Bar stools */}
      <BarStool position={[-0.5, 0, 0.6]} />
      <BarStool position={[0.5, 0, 0.6]} />

      {/* Decorative bowl */}
      <mesh position={[0, 0.95, 0]} castShadow material={new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.3 })}>
        <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>

      {/* Fruit in bowl */}
      {[0xFF6347, 0xFFD700, 0x32CD32].map((color, i) => (
        <mesh
          key={i}
          position={[-0.08 + i * 0.08, 0.98, 0]}
          castShadow
          material={new THREE.MeshStandardMaterial({ color, roughness: 0.6 })}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
        </mesh>
      ))}
    </group>
  );
}

export default KitchenIsland;
