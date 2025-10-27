import React from 'react';
import * as THREE from 'three';
import { DECORATIONS } from '../../../config/upperFloorCoordinates';

function PottedPlant({ position = [0, 0, 0], height = 1 }) {
  // Determine which plant config to use based on height
  const plantConfig = height === 1.2 ? DECORATIONS.pottedPlant1 : DECORATIONS.pottedPlant2;
  const { heightFactors, materials: mat, pot, soil, stem, leaf } = plantConfig;
  
  const potHeight = height * heightFactors.pot;
  const plantHeight = height * heightFactors.plant;

  return (
    <group position={position} name="Potted_Plant">
      {/* Ceramic pot */}
      <mesh position={[0, potHeight / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[pot.radiusTop, pot.radiusBottom, potHeight, pot.segments]} />
        <meshStandardMaterial {...mat.pot} />
      </mesh>

      {/* Soil */}
      <mesh position={[0, potHeight, 0]} receiveShadow>
        <cylinderGeometry args={[soil.radius, soil.radius, soil.height, soil.segments]} />
        <meshStandardMaterial {...mat.soil} />
      </mesh>

      {/* Plant stems (3 main stems) */}
      {stem.angles.map((angle, i) => {
        const x = Math.sin(angle) * stem.radialDistance;
        const z = Math.cos(angle) * stem.radialDistance;
        return (
          <mesh key={i} position={[x, potHeight + plantHeight / 2, z]} castShadow>
            <cylinderGeometry args={[stem.radiusTop, stem.radiusBottom, plantHeight, stem.segments]} />
            <meshStandardMaterial {...mat.stem} />
          </mesh>
        );
      })}

      {/* Realistic ellipsoid leaves (stretched spheres) */}
      {leaf.positions.map((leafData, i) => (
        <mesh 
          key={i} 
          position={[leafData.pos[0], potHeight + leafData.pos[1] * plantHeight, leafData.pos[2]]} 
          rotation={leafData.rot}
          scale={leafData.scale}
          castShadow
        >
          <sphereGeometry args={[leaf.radius, leaf.segments, leaf.segments]} />
          <meshStandardMaterial {...(i % 2 === 0 ? mat.leafEven : mat.leafOdd)} />
        </mesh>
      ))}
    </group>
  );
}

export default PottedPlant;
