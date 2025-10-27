import React from 'react';
import * as THREE from 'three';

function Structure() {
  // Materials
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0xE8E8E8,
    roughness: 0.7,
    metalness: 0.0
  });

  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xF5F5DC,
    roughness: 0.8,
    metalness: 0.0
  });

  const hardwoodMaterial = new THREE.MeshStandardMaterial({
    color: 0xC19A6B,
    roughness: 0.4,
    metalness: 0.0,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1
  });

  const edgeMaterial = new THREE.MeshStandardMaterial({
    color: 0x654321,
    roughness: 0.4,
    metalness: 0.0
  });

  const roofMaterial = new THREE.MeshStandardMaterial({
    color: 0xD2B48C,
    roughness: 0.7,
    metalness: 0.0
  });

  return (
    <group name="Structure">
      {/* Foundation */}
      <group name="Foundation">
        {/* Base slab */}
        <mesh position={[0, -0.1, 0]} receiveShadow material={baseMaterial}>
          <boxGeometry args={[8, 0.2, 8]} />
        </mesh>

      </group>

      {/* Walls */}
      <group name="Walls">
        {/* Back wall */}
        <mesh position={[0, 3, -4 + 0.125]} castShadow material={wallMaterial}>
          <boxGeometry args={[8, 6, 0.25]} />
        </mesh>

        {/* Right wall */}
        <mesh position={[4 - 0.125, 3, 0]} castShadow material={wallMaterial}>
          <boxGeometry args={[0.25, 6, 8]} />
        </mesh>
      </group>

      {/* Floors */}
      <group name="Floors">
        {/* Ground floor - with realistic thickness */}
        <mesh position={[0, -0.05, 0]} receiveShadow material={hardwoodMaterial}>
          <boxGeometry args={[8, 0.3, 8]} />
        </mesh>

        {/* Second floor - L-shaped with realistic thickness */}
        <mesh position={[0, 2.85, -1.9]} receiveShadow material={hardwoodMaterial}>
          <boxGeometry args={[8, 0.3, 4.2]} />
        </mesh>
        <mesh position={[0.9, 2.85, 1.9]} receiveShadow material={hardwoodMaterial}>
          <boxGeometry args={[6.2, 0.3, 3.8]} />
        </mesh>

      </group>

      {/* Roof */}
      <group name="Roof">
        <mesh position={[0, 6.2, 0]} castShadow receiveShadow material={roofMaterial}>
          <boxGeometry args={[8.6, 0.4, 8.6]} />
        </mesh>
      </group>
    </group>
  );
}

export default Structure;
