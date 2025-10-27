import React from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function PlayStation({ position }) {
  const consoleMaterial = new THREE.MeshStandardMaterial({
    color: 0x1C1C1C, // Matte black
    roughness: 0.6,
    metalness: 0.1,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1
  });

  const glossyMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000, // Glossy black
    roughness: 0.2,
    metalness: 0.3
  });

  const blueLightMaterial = new THREE.MeshStandardMaterial({
    color: 0x0066FF,
    emissive: 0x0066FF,
    emissiveIntensity: 0.5,
    roughness: 0.3
  });

  return (
    <group position={position} name="PlayStation_Console">
      {/* Main console body (PS5-like shape) */}
      <RoundedBox
        args={[0.35, 0.08, 0.25]}
        radius={0.015}
        smoothness={4}
        position={[0, 0.04, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={0xFFFFFF} roughness={0.4} metalness={0.1} />
      </RoundedBox>

      {/* Black accent panel */}
      <RoundedBox
        args={[0.15, 0.08, 0.25]}
        radius={0.01}
        smoothness={4}
        position={[-0.1, 0.04, 0]}
        castShadow
      >
        <meshStandardMaterial {...consoleMaterial} />
      </RoundedBox>

      {/* Power indicator light */}
      <mesh position={[0.12, 0.08, 0.08]} material={blueLightMaterial}>
        <sphereGeometry args={[0.005, 8, 8]} />
      </mesh>

      {/* Disc slot (thin line) */}
      <mesh position={[0, 0.06, 0.126]} material={glossyMaterial}>
        <boxGeometry args={[0.12, 0.002, 0.001]} />
      </mesh>

      {/* USB ports (small details) */}
      {[0, 1].map((i) => (
        <mesh
          key={i}
          position={[0.05 + i * 0.02, 0.02, 0.126]}
          material={glossyMaterial}
        >
          <boxGeometry args={[0.015, 0.008, 0.001]} />
        </mesh>
      ))}

      {/* Stand/base */}
      <RoundedBox
        args={[0.3, 0.01, 0.2]}
        radius={0.005}
        smoothness={4}
        position={[0, 0.005, 0]}
        receiveShadow
      >
        <meshStandardMaterial color={0x2C2C2C} roughness={0.5} />
      </RoundedBox>
    </group>
  );
}

export default PlayStation;
