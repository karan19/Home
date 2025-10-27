import React from 'react';
import { RoundedBox } from '@react-three/drei';

function DrawerTable({ position = [0, 0, 0] }) {
  const tableWidth = 0.4;
  const tableHeight = 0.5;
  const tableDepth = 0.4;
  
  // Wood material
  const woodMaterial = {
    color: 0x8B4513,
    roughness: 0.7,
    metalness: 0.1
  };

  return (
    <group position={position} name="Furniture_DrawerTable">
      {/* Main cabinet body */}
      <RoundedBox
        args={[tableWidth, tableHeight, tableDepth]}
        radius={0.01}
        smoothness={4}
        position={[0, tableHeight / 2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...woodMaterial} />
      </RoundedBox>

      {/* Drawer front (slightly lighter wood) */}
      <RoundedBox
        args={[tableWidth - 0.04, tableHeight * 0.3, 0.02]}
        radius={0.005}
        smoothness={4}
        position={[0, tableHeight * 0.35, tableDepth / 2 + 0.01]}
        castShadow
      >
        <meshStandardMaterial
          color={0xA0522D}
          roughness={0.6}
          metalness={0.1}
        />
      </RoundedBox>

      {/* Drawer handle (metal) */}
      <RoundedBox
        args={[0.08, 0.015, 0.02]}
        radius={0.003}
        smoothness={4}
        position={[0, tableHeight * 0.35, tableDepth / 2 + 0.03]}
        castShadow
      >
        <meshStandardMaterial
          color={0xC0C0C0}
          roughness={0.3}
          metalness={0.8}
        />
      </RoundedBox>

      {/* Tabletop edge detail (darker wood trim) */}
      <RoundedBox
        args={[tableWidth + 0.02, 0.03, tableDepth + 0.02]}
        radius={0.005}
        smoothness={4}
        position={[0, tableHeight, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={0x654321}
          roughness={0.6}
          metalness={0.1}
        />
      </RoundedBox>
    </group>
  );
}

export default DrawerTable;
