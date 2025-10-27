import React from 'react';
import * as THREE from 'three';

function Balcony({ position = [0, 3, 2] }) {
  return (
    <group position={position} name="Balcony">
      {/* Balcony floor platform (lowered to prevent z-fighting with upper floor) */}
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.1, 1.5]} />
        <meshStandardMaterial 
          color="#C19A6B" 
          roughness={0.4} 
          metalness={0}
          polygonOffset={true}
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* Glass railing - Front */}
      <mesh position={[0, 0.5, 0.75]} castShadow receiveShadow>
        <boxGeometry args={[3, 1, 0.02]} />
        <meshStandardMaterial 
          color="#F0F8FF" 
          transparent 
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Glass railing - Left side */}
      <mesh position={[-1.5, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.02, 1, 1.5]} />
        <meshStandardMaterial 
          color="#F0F8FF" 
          transparent 
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Glass railing - Right side */}
      <mesh position={[1.5, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.02, 1, 1.5]} />
        <meshStandardMaterial 
          color="#F0F8FF" 
          transparent 
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Metal posts (4 corners) */}
      {[
        [-1.5, 0.5, -0.75],
        [1.5, 0.5, -0.75],
        [-1.5, 0.5, 0.75],
        [1.5, 0.5, 0.75]
      ].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 1, 8]} />
          <meshStandardMaterial color="#808080" roughness={0.3} metalness={0.7} />
        </mesh>
      ))}

      {/* Top rail (metal) - Front */}
      <mesh position={[0, 1, 0.75]} castShadow>
        <boxGeometry args={[3, 0.05, 0.05]} />
        <meshStandardMaterial 
          color="#808080" 
          roughness={0.3} 
          metalness={0.7}
          polygonOffset={true}
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* Top rail (metal) - Left */}
      <mesh position={[-1.5, 1, 0]} castShadow>
        <boxGeometry args={[0.05, 0.05, 1.5]} />
        <meshStandardMaterial 
          color="#808080" 
          roughness={0.3} 
          metalness={0.7}
          polygonOffset={true}
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* Top rail (metal) - Right */}
      <mesh position={[1.5, 1, 0]} castShadow>
        <boxGeometry args={[0.05, 0.05, 1.5]} />
        <meshStandardMaterial 
          color="#808080" 
          roughness={0.3} 
          metalness={0.7}
          polygonOffset={true}
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </mesh>

      {/* Support brackets (under platform) */}
      {[-1, 0, 1].map((x, i) => (
        <mesh key={i} position={[x, -0.15, 0]} castShadow>
          <boxGeometry args={[0.1, 0.2, 1.5]} />
          <meshStandardMaterial color="#808080" roughness={0.4} metalness={0.6} />
        </mesh>
      ))}

    </group>
  );
}

export default Balcony;
