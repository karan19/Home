import React, { useMemo, useEffect } from 'react';
import { useHousePalette } from '../context/HousePalette';
import { STAIRCASE, STAIR_TREADS } from '../config/staircase';
import * as THREE from 'three';

function Stairs() {
  const palette = useHousePalette();
  const treadMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: palette.stairs,
    roughness: 0.4,
    metalness: 0.0
  }), [palette]);
  useEffect(() => () => treadMaterial.dispose(), [treadMaterial]);

  const treads = [];
  const risers = [];
  const { x: stairStartX, depth: treadDepth, width: treadWidth, thickness: treadThickness } = STAIRCASE;
  const riserThickness = 0.02;

  for (let i = 0; i < STAIR_TREADS.length; i++) {
    const yPos = STAIR_TREADS[i].y - treadThickness / 2;
    const zPos = STAIR_TREADS[i].z;
    const riserHeight = (STAIR_TREADS[i+1]?.y ?? STAIRCASE.upper) - STAIR_TREADS[i].y;
    // Add tread
    treads.push(
      <mesh
        key={`tread-${i}`}
        position={[stairStartX, yPos, zPos]}
        castShadow
        receiveShadow
        material={treadMaterial}
      >
        <boxGeometry args={[treadWidth, treadThickness, treadDepth]} />
      </mesh>
    );

    // Add riser (vertical panel between steps)
    if (i < 11) {
      const riserYPos = yPos + treadThickness / 2 + riserHeight / 2;
      const riserZPos = zPos - treadDepth / 2;
      
      risers.push(
        <mesh
          key={`riser-${i}`}
          position={[stairStartX, riserYPos, riserZPos]}
          castShadow
          receiveShadow
          material={treadMaterial}
        >
          <boxGeometry args={[treadWidth, riserHeight, riserThickness]} />
        </mesh>
      );
    }
  }

  return (
    <group name="Stairs">
      <group name="Treads">
        {treads}
      </group>
      <group name="Risers">
        {risers}
      </group>
    </group>
  );
}

export default Stairs;
