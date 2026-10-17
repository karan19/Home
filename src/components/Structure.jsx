import React, { useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useHousePalette } from '../context/HousePalette';

function Structure() {
  const palette = useHousePalette();
  // Memoize materials to prevent recreation on every render
  const materials = useMemo(() => ({
    base: new THREE.MeshStandardMaterial({
      color: palette.base,
      roughness: 0.7,
      metalness: 0.0
    }),
    wall: new THREE.MeshStandardMaterial({
      color: palette.wall,
      roughness: 0.8,
      metalness: 0.0
    }),
    hardwood: new THREE.MeshStandardMaterial({
      color: palette.floor,
      roughness: 0.4,
      metalness: 0.0,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1
    }),
    edge: new THREE.MeshStandardMaterial({
      color: palette.stairs,
      roughness: 0.4,
      metalness: 0.0
    }),
    roof: new THREE.MeshStandardMaterial({
      color: palette.roof,
      roughness: 0.7,
      metalness: 0.0
    })
  }), [palette]);
  useEffect(() => () => Object.values(materials).forEach(material => material.dispose()), [materials]);

  return (
    <group name="Structure">
      {/* Foundation */}
      <group name="Foundation">
        {/* Base slab */}
        <mesh position={[0, -0.1, 0]} receiveShadow material={materials.base}>
          <boxGeometry args={[8, 0.2, 8]} />
        </mesh>
      </group>

      {/* Walls */}
      <group name="Walls">
        {/* Back wall */}
        <mesh position={[0, 3, -4 + 0.125]} castShadow material={materials.wall}>
          <boxGeometry args={[8, 6, 0.25]} />
        </mesh>

        {/* Right wall */}
        <mesh position={[4 - 0.125, 3, 0]} castShadow material={materials.wall}>
          <boxGeometry args={[0.25, 6, 8]} />
        </mesh>
      </group>

      {/* Floors */}
      <group name="Floors">
        {/* Ground floor - with realistic thickness */}
        <mesh position={[0, -0.05, 0]} receiveShadow material={materials.hardwood}>
          <boxGeometry args={[8, 0.3, 8]} />
        </mesh>

        {/* Second floor - L-shaped with realistic thickness */}
        <mesh position={[0, 2.85, -1.9]} receiveShadow material={materials.hardwood}>
          <boxGeometry args={[8, 0.3, 4.2]} />
        </mesh>
        <mesh position={[0.9, 2.85, 1.9]} receiveShadow material={materials.hardwood}>
          <boxGeometry args={[6.2, 0.3, 3.8]} />
        </mesh>
      </group>

      {/* Roof */}
      <group name="Roof">
        <mesh position={[0, 6.2, 0]} castShadow receiveShadow={false} material={materials.roof}>
          <boxGeometry args={[8.6, 0.4, 8.6]} />
        </mesh>
      </group>
    </group>
  );
}

export default Structure;
