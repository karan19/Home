import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function TableFan({ position }) {
  const bladesRef = useRef();

  // Animate fan blades
  useFrame(() => {
    if (bladesRef.current) {
      bladesRef.current.rotation.x += 0.15;
    }
  });

  const plasticMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: 0.3,
    metalness: 0.1
  });

  const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080,
    roughness: 0.2,
    metalness: 0.8
  });

  const bladeMaterial = new THREE.MeshStandardMaterial({
    color: 0xE0E0E0,
    roughness: 0.4,
    metalness: 0.2,
    side: THREE.DoubleSide
  });

  // Generate 3 blades
  const blades = [];
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2;
    blades.push(
      <mesh
        key={i}
        position={[
          Math.cos(angle) * 0.06,
          0,
          Math.sin(angle) * 0.06
        ]}
        rotation={[0.1, angle, 0]}
        castShadow
        material={bladeMaterial}
      >
        <boxGeometry args={[0.12, 0.01, 0.03]} />
      </mesh>
    );
  }

  return (
    <group position={position} name="TableFan">
      {/* Base */}
      <mesh position={[0, 0.01, 0]} castShadow receiveShadow material={plasticMaterial}>
        <cylinderGeometry args={[0.08, 0.1, 0.02, 16]} />
      </mesh>

      {/* Stand */}
      <mesh position={[0, 0.095, 0]} castShadow material={metalMaterial}>
        <cylinderGeometry args={[0.015, 0.015, 0.15, 8]} />
      </mesh>

      {/* Motor housing */}
      <mesh position={[0, 0.17, 0]} rotation={[0, 0, Math.PI / 2]} castShadow material={plasticMaterial}>
        <cylinderGeometry args={[0.04, 0.04, 0.06, 16]} />
      </mesh>

      {/* Blades group (animated) */}
      <group ref={bladesRef} position={[0, 0.17, 0]}>
        {blades}
      </group>

      {/* Front cage */}
      <group position={[0.04, 0.17, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh material={metalMaterial}>
          <torusGeometry args={[0.09, 0.005, 8, 16]} />
        </mesh>
        <mesh material={metalMaterial}>
          <torusGeometry args={[0.06, 0.003, 8, 16]} />
        </mesh>
        <mesh material={metalMaterial}>
          <torusGeometry args={[0.03, 0.003, 8, 16]} />
        </mesh>
      </group>

      {/* Back cage */}
      <group position={[-0.04, 0.17, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh material={metalMaterial}>
          <torusGeometry args={[0.09, 0.005, 8, 16]} />
        </mesh>
        <mesh material={metalMaterial}>
          <torusGeometry args={[0.06, 0.003, 8, 16]} />
        </mesh>
        <mesh material={metalMaterial}>
          <torusGeometry args={[0.03, 0.003, 8, 16]} />
        </mesh>
      </group>
    </group>
  );
}

export default TableFan;
