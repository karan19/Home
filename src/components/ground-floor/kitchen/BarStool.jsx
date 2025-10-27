import React from 'react';
import * as THREE from 'three';

function BarStool({ position }) {
  const woodMaterial = new THREE.MeshStandardMaterial({
    color: 0xD2B48C,
    roughness: 0.4,
    metalness: 0.0
  });

  const legMaterial = new THREE.MeshStandardMaterial({
    color: 0x2C2C2C,
    metalness: 0.5,
    roughness: 0.4
  });

  return (
    <group position={position} name="Kitchen_Stool">
      {/* Seat */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow material={woodMaterial}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
      </mesh>

      {/* Legs (4 legs angled outward) */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.15,
              0.375,
              Math.sin(angle) * 0.15
            ]}
            castShadow
            material={legMaterial}
          >
            <cylinderGeometry args={[0.02, 0.025, 0.75, 8]} />
          </mesh>
        );
      })}

      {/* Footrest ring */}
      <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]} material={legMaterial}>
        <torusGeometry args={[0.15, 0.015, 8, 16]} />
      </mesh>
    </group>
  );
}

export default BarStool;
