import React from 'react';
import * as THREE from 'three';
import BarStool from './BarStool';
import { KITCHEN } from '../../../config/groundFloorCoordinates';

function KitchenIsland({ position }) {
  const { cabinetMaterial, countertopMaterial, base, countertop, barStools, bowl, fruit } = KITCHEN.kitchenIsland;

  const cabinetMat = new THREE.MeshStandardMaterial(cabinetMaterial);
  const countertopMat = new THREE.MeshStandardMaterial(countertopMaterial);

  return (
    <group position={position} name="Kitchen_Island">
      {/* Island base */}
      <mesh position={[0, base.positionY, 0]} castShadow receiveShadow material={cabinetMat}>
        <boxGeometry args={[base.width, base.height, base.depth]} />
      </mesh>

      {/* Countertop */}
      <mesh position={[0, countertop.positionY, 0]} castShadow receiveShadow material={countertopMat}>
        <boxGeometry args={[countertop.width, countertop.height, countertop.depth]} />
      </mesh>

      {/* Bar stools */}
      {barStools.positions.map((pos, i) => (
        <BarStool key={i} position={pos} />
      ))}

      {/* Decorative bowl */}
      <mesh 
        position={[0, bowl.positionY, 0]} 
        castShadow 
        material={new THREE.MeshStandardMaterial({ color: bowl.color, roughness: bowl.roughness })}
      >
        <sphereGeometry 
          args={[
            bowl.radius, 
            bowl.widthSegments, 
            bowl.heightSegments, 
            bowl.phiStart, 
            bowl.phiLength, 
            bowl.thetaStart, 
            bowl.thetaLength
          ]} 
        />
      </mesh>

      {/* Fruit in bowl */}
      {fruit.colors.map((color, i) => (
        <mesh
          key={i}
          position={[fruit.baseX + i * fruit.spacing, fruit.positionY, 0]}
          castShadow
          material={new THREE.MeshStandardMaterial({ color, roughness: fruit.roughness })}
        >
          <sphereGeometry args={[fruit.radius, fruit.segments, fruit.segments]} />
        </mesh>
      ))}
    </group>
  );
}

export default KitchenIsland;
