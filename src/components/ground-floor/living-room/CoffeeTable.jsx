import React from 'react';
import * as THREE from 'three';
import { LIVING_ROOM } from '../../../config/groundFloorCoordinates';

function CoffeeTable({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { material, tabletop, leg } = LIVING_ROOM.coffeeTable;

  return (
    <group position={position} rotation={rotation} name="Coffee_Table">
      {/* Tabletop */}
      <mesh position={[0, tabletop.positionY, 0]} castShadow receiveShadow>
        <boxGeometry args={[tabletop.width, tabletop.height, tabletop.depth]} />
        <meshStandardMaterial 
          color={material.color} 
          roughness={material.roughness} 
          metalness={material.metalness} 
        />
      </mesh>

      {/* Legs (4 corners) */}
      {leg.positions.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[leg.width, leg.height, leg.depth]} />
          <meshStandardMaterial 
            color={material.color} 
            roughness={material.roughness} 
            metalness={material.metalness} 
          />
        </mesh>
      ))}
    </group>
  );
}

export default CoffeeTable;
