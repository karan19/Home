import React from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function Sofa({ position }) {
  const fabricMaterial = new THREE.MeshStandardMaterial({
    color: 0xF5F5DC,
    roughness: 0.6,
    metalness: 0.0
  });

  const woodMaterial = new THREE.MeshStandardMaterial({
    color: 0x654321,
    roughness: 0.4,
    metalness: 0.0
  });

  return (
    <group position={position} name="Furniture_Sofa">
      {/* Main seat base (single unified piece - shorter) */}
      <RoundedBox
        args={[1.8, 0.45, 1.2]}
        radius={0.08}
        smoothness={4}
        position={[0, 0.225, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={0xF5F5DC} roughness={0.6} metalness={0.0} />
      </RoundedBox>

      {/* Back cushion (single unified piece - shorter) */}
      <RoundedBox
        args={[1.8, 0.5, 0.25]}
        radius={0.06}
        smoothness={4}
        position={[0, 0.7, -0.475]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={0xF5F5DC} roughness={0.6} metalness={0.0} />
      </RoundedBox>

      {/* Armrests (left and right - shorter) */}
      <RoundedBox
        args={[0.2, 0.5, 1.2]}
        radius={0.05}
        smoothness={4}
        position={[-1.0, 0.5, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={0xF5F5DC} roughness={0.6} metalness={0.0} />
      </RoundedBox>

      <RoundedBox
        args={[0.2, 0.5, 1.2]}
        radius={0.05}
        smoothness={4}
        position={[1.0, 0.5, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={0xF5F5DC} roughness={0.6} metalness={0.0} />
      </RoundedBox>

      {/* Legs (4 cylindrical legs) */}
      {[
        [-0.8, 0.075, -0.55],
        [0.8, 0.075, -0.55],
        [-0.8, 0.075, 0.55],
        [0.8, 0.075, 0.55]
      ].map((pos, i) => (
        <mesh key={`leg-${i}`} position={pos} castShadow material={woodMaterial}>
          <cylinderGeometry args={[0.04, 0.04, 0.15, 16]} />
        </mesh>
      ))}
    </group>
  );
}

export default Sofa;
