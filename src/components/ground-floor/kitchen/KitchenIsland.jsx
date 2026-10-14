import React from 'react';
import BarStool from './BarStool';
import { KITCHEN } from '../../../config/groundFloorCoordinates';

function KitchenIsland({ position }) {
  const { cabinetMaterial, countertopMaterial, base, countertop, barStools, bowl, fruit } = KITCHEN.kitchenIsland;


  return (
    <group position={position} name="Kitchen_Island">
      {/* Island base */}
      <mesh position={[0, base.positionY, 0]} castShadow receiveShadow>
        <boxGeometry args={[base.width, base.height, base.depth]} />
        <meshStandardMaterial {...cabinetMaterial} />
      </mesh>

      {/* Countertop */}
      <mesh position={[0, countertop.positionY, 0]} castShadow receiveShadow>
        <boxGeometry args={[countertop.width, countertop.height, countertop.depth]} />
        <meshStandardMaterial {...countertopMaterial} />
      </mesh>

      {/* Bar stools */}
      {barStools.positions.map((pos, i) => (
        <BarStool key={i} position={pos} />
      ))}

      {/* Decorative bowl */}
      <mesh 
        position={[0, bowl.positionY, 0]} 
        castShadow 
      >
        <meshStandardMaterial color={bowl.color} roughness={bowl.roughness} />
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
        >
          <sphereGeometry args={[fruit.radius, fruit.segments, fruit.segments]} />
          <meshStandardMaterial color={color} roughness={fruit.roughness} />
        </mesh>
      ))}
    </group>
  );
}

export default KitchenIsland;
