import React from 'react';
import * as THREE from 'three';
import { OUTSIDE } from '../../config/outsideCoordinates';

function Balcony({ position = [0, 3, 2] }) {
  const { materials: mat, floor, glassRailing, posts, topRail, supportBrackets } = OUTSIDE.balcony;

  return (
    <group position={position} name="Balcony">
      {/* Balcony floor platform (lowered to prevent z-fighting with upper floor) */}
      <mesh position={[0, floor.positionY, 0]} castShadow receiveShadow>
        <boxGeometry args={[floor.width, floor.height, floor.depth]} />
        <meshStandardMaterial 
          {...mat.floor}
          polygonOffset={true}
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* Glass railing - Front */}
      <mesh position={[0, glassRailing.front.positionY, glassRailing.front.positionZ]} castShadow receiveShadow>
        <boxGeometry args={[glassRailing.front.width, glassRailing.front.height, glassRailing.front.depth]} />
        <meshStandardMaterial {...mat.glass} />
      </mesh>

      {/* Glass railing - Left side */}
      <mesh position={[glassRailing.left.positionX, glassRailing.left.positionY, 0]} castShadow receiveShadow>
        <boxGeometry args={[glassRailing.left.width, glassRailing.left.height, glassRailing.left.depth]} />
        <meshStandardMaterial {...mat.glass} />
      </mesh>

      {/* Glass railing - Right side */}
      <mesh position={[glassRailing.right.positionX, glassRailing.right.positionY, 0]} castShadow receiveShadow>
        <boxGeometry args={[glassRailing.right.width, glassRailing.right.height, glassRailing.right.depth]} />
        <meshStandardMaterial {...mat.glass} />
      </mesh>

      {/* Metal posts (4 corners) */}
      {posts.positions.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[posts.radius, posts.radius, posts.height, posts.segments]} />
          <meshStandardMaterial {...mat.metal} />
        </mesh>
      ))}

      {/* Top rail (metal) - Front */}
      <mesh position={[0, topRail.front.positionY, topRail.front.positionZ]} castShadow>
        <boxGeometry args={[topRail.front.width, topRail.front.height, topRail.front.depth]} />
        <meshStandardMaterial 
          {...mat.metal}
          polygonOffset={true}
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* Top rail (metal) - Left */}
      <mesh position={[topRail.left.positionX, topRail.left.positionY, 0]} castShadow>
        <boxGeometry args={[topRail.left.width, topRail.left.height, topRail.left.depth]} />
        <meshStandardMaterial 
          {...mat.metal}
          polygonOffset={true}
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* Top rail (metal) - Right */}
      <mesh position={[topRail.right.positionX, topRail.right.positionY, 0]} castShadow>
        <boxGeometry args={[topRail.right.width, topRail.right.height, topRail.right.depth]} />
        <meshStandardMaterial 
          {...mat.metal}
          polygonOffset={true}
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* Support brackets (under platform) */}
      {supportBrackets.xPositions.map((x, i) => (
        <mesh key={i} position={[x, supportBrackets.positionY, 0]} castShadow>
          <boxGeometry args={[supportBrackets.width, supportBrackets.height, supportBrackets.depth]} />
          <meshStandardMaterial {...mat.support} />
        </mesh>
      ))}

    </group>
  );
}

export default Balcony;
