import React from 'react';
import { RoundedBox } from '@react-three/drei';
import { KITCHEN } from '../../../config/groundFloorCoordinates';

function CoffeeStationTable({ position = [0, 0, 0] }) {
  const { woodMaterial, dimensions, tabletop, leg } = KITCHEN.coffeeStationTable;
  const { tableWidth, tableHeight, tableDepth, legWidth } = dimensions;

  return (
    <group position={position} name="Furniture_CoffeeStationTable">
      {/* Tabletop */}
      <RoundedBox
        args={[tableWidth, tabletop.height, tableDepth]}
        radius={tabletop.radius}
        smoothness={tabletop.smoothness}
        position={[0, tableHeight, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...woodMaterial} />
      </RoundedBox>

      {/* Front Left Leg */}
      <RoundedBox
        args={[legWidth, tableHeight, legWidth]}
        radius={leg.radius}
        smoothness={leg.smoothness}
        position={[-tableWidth/2 + legWidth/2, tableHeight/2, tableDepth/2 - legWidth/2]}
        castShadow
      >
        <meshStandardMaterial {...woodMaterial} />
      </RoundedBox>

      {/* Front Right Leg */}
      <RoundedBox
        args={[legWidth, tableHeight, legWidth]}
        radius={leg.radius}
        smoothness={leg.smoothness}
        position={[tableWidth/2 - legWidth/2, tableHeight/2, tableDepth/2 - legWidth/2]}
        castShadow
      >
        <meshStandardMaterial {...woodMaterial} />
      </RoundedBox>

      {/* Back Left Leg */}
      <RoundedBox
        args={[legWidth, tableHeight, legWidth]}
        radius={leg.radius}
        smoothness={leg.smoothness}
        position={[-tableWidth/2 + legWidth/2, tableHeight/2, -tableDepth/2 + legWidth/2]}
        castShadow
      >
        <meshStandardMaterial {...woodMaterial} />
      </RoundedBox>

      {/* Back Right Leg */}
      <RoundedBox
        args={[legWidth, tableHeight, legWidth]}
        radius={leg.radius}
        smoothness={leg.smoothness}
        position={[tableWidth/2 - legWidth/2, tableHeight/2, -tableDepth/2 + legWidth/2]}
        castShadow
      >
        <meshStandardMaterial {...woodMaterial} />
      </RoundedBox>
    </group>
  );
}

export default CoffeeStationTable;
