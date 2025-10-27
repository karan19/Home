import React from 'react';
import { RoundedBox } from '@react-three/drei';

function CoffeeStationTable({ position = [0, 0, 0] }) {
  const tableWidth = 0.6;
  const tableHeight = 0.8;
  const tableDepth = 0.5;
  const legWidth = 0.05;
  
  // Wood material
  const woodMaterial = {
    color: 0x8B4513,
    roughness: 0.6,
    metalness: 0.1
  };

  return (
    <group position={position} name="Furniture_CoffeeStationTable">
      {/* Tabletop */}
      <RoundedBox
        args={[tableWidth, 0.05, tableDepth]}
        radius={0.01}
        smoothness={4}
        position={[0, tableHeight, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...woodMaterial} />
      </RoundedBox>

      {/* Front Left Leg */}
      <RoundedBox
        args={[legWidth, tableHeight, legWidth]}
        radius={0.005}
        smoothness={4}
        position={[-tableWidth/2 + legWidth/2, tableHeight/2, tableDepth/2 - legWidth/2]}
        castShadow
      >
        <meshStandardMaterial {...woodMaterial} />
      </RoundedBox>

      {/* Front Right Leg */}
      <RoundedBox
        args={[legWidth, tableHeight, legWidth]}
        radius={0.005}
        smoothness={4}
        position={[tableWidth/2 - legWidth/2, tableHeight/2, tableDepth/2 - legWidth/2]}
        castShadow
      >
        <meshStandardMaterial {...woodMaterial} />
      </RoundedBox>

      {/* Back Left Leg */}
      <RoundedBox
        args={[legWidth, tableHeight, legWidth]}
        radius={0.005}
        smoothness={4}
        position={[-tableWidth/2 + legWidth/2, tableHeight/2, -tableDepth/2 + legWidth/2]}
        castShadow
      >
        <meshStandardMaterial {...woodMaterial} />
      </RoundedBox>

      {/* Back Right Leg */}
      <RoundedBox
        args={[legWidth, tableHeight, legWidth]}
        radius={0.005}
        smoothness={4}
        position={[tableWidth/2 - legWidth/2, tableHeight/2, -tableDepth/2 + legWidth/2]}
        castShadow
      >
        <meshStandardMaterial {...woodMaterial} />
      </RoundedBox>
    </group>
  );
}

export default CoffeeStationTable;
