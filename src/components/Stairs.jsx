import React from 'react';
import * as THREE from 'three';

function Stairs() {
  const treadMaterial = new THREE.MeshStandardMaterial({
    color: 0x654321,
    roughness: 0.4,
    metalness: 0.0
  });

  const treads = [];
  const risers = [];
  const stairStartX = -2.75;
  const stairStartZ = 3.36; // Moved one step forward (3.08 + 0.28 = 3.36)
  const treadDepth = 0.28;
  const riserHeight = 0.25;
  const treadWidth = 1.2;
  const treadThickness = 0.05;
  const riserThickness = 0.02;

  for (let i = 0; i < 12; i++) {
    const yPos = riserHeight * i + treadThickness / 2; // At ground level
    const zPos = stairStartZ - (treadDepth * i);
    
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
