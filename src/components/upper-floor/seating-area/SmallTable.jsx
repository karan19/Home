import React from 'react';
import { RoundedBox } from '@react-three/drei';
import RepeatedMesh from '../../RepeatedMesh';
import { SEATING_AREA } from '../../../config/upperFloorCoordinates';

function SmallTable({ position = [0, 0, 0] }) {
  const { material, tabletop, leg } = SEATING_AREA.smallTable;

  return (
    <group position={position} name="Small_Table">
      {/* Tabletop */}
      <RoundedBox 
        args={[tabletop.width, tabletop.height, tabletop.depth]} 
        radius={tabletop.radius} 
        smoothness={tabletop.smoothness}
        position={[0, tabletop.positionY, 0]} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial {...material} />
      </RoundedBox>

      {/* Legs (4 corners) */}
      <RepeatedMesh name="Table_Legs" shape="cylinder" args={[leg.radius, leg.radius, leg.height, leg.segments]}
        positions={leg.positions} material={material} castShadow />
    </group>
  );
}

export default SmallTable;
