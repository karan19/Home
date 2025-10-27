import React from 'react';
import { RoundedBox } from '@react-three/drei';

function TVTable({ position = [0, 0, 0] }) {
  const legHeight = 0.5;
  const legWidth = 0.05;
  const tableTopWidth = 1.4;
  const tableTopDepth = 0.4;
  const tableTopThickness = 0.05;
  
  // Wood material properties
  const woodMaterial = {
    color: 0x5D4037,
    roughness: 0.8,
    metalness: 0.1
  };

  return (
    <group position={position} name="Furniture_TVTable">
      {/* Tabletop */}
      <RoundedBox
        args={[tableTopWidth, tableTopThickness, tableTopDepth]}
        radius={0.01}
        smoothness={4}
        position={[0, legHeight, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...woodMaterial} />
      </RoundedBox>

      {/* Front Left Leg */}
      <RoundedBox
        args={[legWidth, legHeight, legWidth]}
        radius={0.005}
        smoothness={4}
        position={[-tableTopWidth/2 + legWidth/2, legHeight/2, tableTopDepth/2 - legWidth/2]}
        castShadow
      >
        <meshStandardMaterial {...woodMaterial} />
      </RoundedBox>

      {/* Front Right Leg */}
      <RoundedBox
        args={[legWidth, legHeight, legWidth]}
        radius={0.005}
        smoothness={4}
        position={[tableTopWidth/2 - legWidth/2, legHeight/2, tableTopDepth/2 - legWidth/2]}
        castShadow
      >
        <meshStandardMaterial {...woodMaterial} />
      </RoundedBox>

      {/* Back Left Leg */}
      <RoundedBox
        args={[legWidth, legHeight, legWidth]}
        radius={0.005}
        smoothness={4}
        position={[-tableTopWidth/2 + legWidth/2, legHeight/2, -tableTopDepth/2 + legWidth/2]}
        castShadow
      >
        <meshStandardMaterial {...woodMaterial} />
      </RoundedBox>

      {/* Back Right Leg */}
      <RoundedBox
        args={[legWidth, legHeight, legWidth]}
        radius={0.005}
        smoothness={4}
        position={[tableTopWidth/2 - legWidth/2, legHeight/2, -tableTopDepth/2 + legWidth/2]}
        castShadow
      >
        <meshStandardMaterial {...woodMaterial} />
      </RoundedBox>
    </group>
  );
}

export default TVTable;
