import React from 'react';
import BarStool from './BarStool';
import IslandBreakfast from './IslandBreakfast';
import { KITCHEN } from '../../../config/groundFloorCoordinates';

function KitchenIsland({ position }) {
  const { cabinetMaterial, countertopMaterial, base, countertop, barStools } = KITCHEN.kitchenIsland;


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

      <IslandBreakfast />

      {/* Bar stools */}
      {barStools.positions.map((pos, i) => (
        <BarStool key={i} position={pos} />
      ))}

    </group>
  );
}

export default KitchenIsland;
