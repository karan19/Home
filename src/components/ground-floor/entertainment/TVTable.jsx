import React from 'react';
import { RoundedBox } from '@react-three/drei';
import { ENTERTAINMENT } from '../../../config/groundFloorCoordinates';

function TVTable({ position = [0, 0, 0] }) {
  const { tabletop, leg, material } = ENTERTAINMENT.tvTable;

  return (
    <group position={position} name="Furniture_TVTable">
      {/* Tabletop */}
      <RoundedBox
        args={[tabletop.width, tabletop.thickness, tabletop.depth]}
        radius={tabletop.radius}
        smoothness={tabletop.smoothness}
        position={[0, tabletop.positionY, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color={material.color}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </RoundedBox>

      {/* Front Left Leg */}
      <RoundedBox
        args={[leg.width, leg.height, leg.depth]}
        radius={leg.radius}
        smoothness={leg.smoothness}
        position={[-tabletop.width/2 + leg.width/2, leg.height/2, tabletop.depth/2 - leg.width/2]}
        castShadow
      >
        <meshStandardMaterial 
          color={material.color}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </RoundedBox>

      {/* Front Right Leg */}
      <RoundedBox
        args={[leg.width, leg.height, leg.depth]}
        radius={leg.radius}
        smoothness={leg.smoothness}
        position={[tabletop.width/2 - leg.width/2, leg.height/2, tabletop.depth/2 - leg.width/2]}
        castShadow
      >
        <meshStandardMaterial 
          color={material.color}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </RoundedBox>

      {/* Back Left Leg */}
      <RoundedBox
        args={[leg.width, leg.height, leg.depth]}
        radius={leg.radius}
        smoothness={leg.smoothness}
        position={[-tabletop.width/2 + leg.width/2, leg.height/2, -tabletop.depth/2 + leg.width/2]}
        castShadow
      >
        <meshStandardMaterial 
          color={material.color}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </RoundedBox>

      {/* Back Right Leg */}
      <RoundedBox
        args={[leg.width, leg.height, leg.depth]}
        radius={leg.radius}
        smoothness={leg.smoothness}
        position={[tabletop.width/2 - leg.width/2, leg.height/2, -tabletop.depth/2 + leg.width/2]}
        castShadow
      >
        <meshStandardMaterial 
          color={material.color}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </RoundedBox>
    </group>
  );
}

export default TVTable;
