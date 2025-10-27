import React from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { LIVING_ROOM } from '../../../config/groundFloorCoordinates';

function Sofa({ position }) {
  const { fabricMaterial, woodMaterial, seatBase, backCushion, armrest, leg } = LIVING_ROOM.sofa;

  const fabricMat = new THREE.MeshStandardMaterial({
    color: fabricMaterial.color,
    roughness: fabricMaterial.roughness,
    metalness: fabricMaterial.metalness
  });

  const woodMat = new THREE.MeshStandardMaterial({
    color: woodMaterial.color,
    roughness: woodMaterial.roughness,
    metalness: woodMaterial.metalness
  });

  return (
    <group position={position} name="Furniture_Sofa">
      {/* Main seat base (single unified piece - shorter) */}
      <RoundedBox
        args={[seatBase.width, seatBase.height, seatBase.depth]}
        radius={seatBase.radius}
        smoothness={seatBase.smoothness}
        position={[0, seatBase.positionY, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color={fabricMaterial.color} 
          roughness={fabricMaterial.roughness} 
          metalness={fabricMaterial.metalness} 
        />
      </RoundedBox>

      {/* Back cushion (single unified piece - shorter) */}
      <RoundedBox
        args={[backCushion.width, backCushion.height, backCushion.depth]}
        radius={backCushion.radius}
        smoothness={backCushion.smoothness}
        position={[0, backCushion.positionY, backCushion.positionZ]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color={fabricMaterial.color} 
          roughness={fabricMaterial.roughness} 
          metalness={fabricMaterial.metalness} 
        />
      </RoundedBox>

      {/* Armrests (left and right - shorter) */}
      <RoundedBox
        args={[armrest.width, armrest.height, armrest.depth]}
        radius={armrest.radius}
        smoothness={armrest.smoothness}
        position={[armrest.leftPositionX, armrest.positionY, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color={fabricMaterial.color} 
          roughness={fabricMaterial.roughness} 
          metalness={fabricMaterial.metalness} 
        />
      </RoundedBox>

      <RoundedBox
        args={[armrest.width, armrest.height, armrest.depth]}
        radius={armrest.radius}
        smoothness={armrest.smoothness}
        position={[armrest.rightPositionX, armrest.positionY, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color={fabricMaterial.color} 
          roughness={fabricMaterial.roughness} 
          metalness={fabricMaterial.metalness} 
        />
      </RoundedBox>

      {/* Legs (4 cylindrical legs) */}
      {leg.positions.map((pos, i) => (
        <mesh key={`leg-${i}`} position={pos} castShadow material={woodMat}>
          <cylinderGeometry args={[leg.radius, leg.radius, leg.height, leg.segments]} />
        </mesh>
      ))}
    </group>
  );
}

export default Sofa;
