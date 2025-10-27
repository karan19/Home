import React from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function Bed({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation} name="Bed">
      {/* Bed Frame Base */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.5, 2]} />
        <meshStandardMaterial color="#D2B48C" roughness={0.4} metalness={0} />
      </mesh>

      {/* Mattress/Cushion - with rounded corners */}
      <RoundedBox 
        args={[1.7, 0.3, 1.9]} 
        radius={0.05} 
        smoothness={4}
        position={[0, 0.55, 0]} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial color="#FFFFFF" roughness={0.7} metalness={0} />
      </RoundedBox>

      {/* Blanket - Folded and Flowing Design */}
      {/* Main blanket body - draped over bed */}
      <mesh position={[0, 0.72, 0.3]} rotation={[0.1, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.05, 1.2]} />
        <meshStandardMaterial color="#808080" roughness={0.6} metalness={0} />
      </mesh>

      {/* Blanket fold 1 - creates wave effect */}
      <mesh position={[0, 0.75, -0.1]} rotation={[-0.15, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.05, 0.4]} />
        <meshStandardMaterial color="#808080" roughness={0.6} metalness={0} />
      </mesh>

      {/* Blanket fold 2 - another wave */}
      <mesh position={[0, 0.78, -0.4]} rotation={[0.1, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.05, 0.3]} />
        <meshStandardMaterial color="#808080" roughness={0.6} metalness={0} />
      </mesh>

      {/* Blanket edge - draped over side */}
      <mesh position={[0.7, 0.65, 0.5]} rotation={[0, 0, -0.3]} castShadow receiveShadow>
        <boxGeometry args={[0.15, 0.05, 0.8]} />
        <meshStandardMaterial color="#808080" roughness={0.6} metalness={0} />
      </mesh>

      {/* Blanket corner fold - adds asymmetry */}
      <mesh position={[-0.6, 0.73, 0.6]} rotation={[0.2, 0.3, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.05, 0.3]} />
        <meshStandardMaterial color="#808080" roughness={0.6} metalness={0} />
      </mesh>

      {/* Pillow 1 - Conventional rectangular with rounded edges */}
      {/* Main pillow body */}
      <mesh position={[-0.4, 0.78, -0.7]} rotation={[-0.05, 0, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.15, 0.35]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.7} metalness={0} />
      </mesh>
      
      {/* Pillow 1 - soft rounded top */}
      <mesh position={[-0.4, 0.85, -0.7]} rotation={[-0.05, 0, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[0.48, 0.08, 0.33]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.7} metalness={0} />
      </mesh>

      {/* Pillow 2 - Conventional rectangular with rounded edges */}
      {/* Main pillow body */}
      <mesh position={[0.4, 0.78, -0.7]} rotation={[-0.05, 0, 0.05]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.15, 0.35]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.7} metalness={0} />
      </mesh>
      
      {/* Pillow 2 - soft rounded top */}
      <mesh position={[0.4, 0.85, -0.7]} rotation={[-0.05, 0, 0.05]} castShadow receiveShadow>
        <boxGeometry args={[0.48, 0.08, 0.33]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.7} metalness={0} />
      </mesh>

      {/* Bed Legs (4 corners) */}
      <mesh position={[-0.85, 0.1, -0.95]} castShadow>
        <boxGeometry args={[0.08, 0.2, 0.08]} />
        <meshStandardMaterial color="#654321" roughness={0.3} metalness={0} />
      </mesh>
      <mesh position={[0.85, 0.1, -0.95]} castShadow>
        <boxGeometry args={[0.08, 0.2, 0.08]} />
        <meshStandardMaterial color="#654321" roughness={0.3} metalness={0} />
      </mesh>
      <mesh position={[-0.85, 0.1, 0.95]} castShadow>
        <boxGeometry args={[0.08, 0.2, 0.08]} />
        <meshStandardMaterial color="#654321" roughness={0.3} metalness={0} />
      </mesh>
      <mesh position={[0.85, 0.1, 0.95]} castShadow>
        <boxGeometry args={[0.08, 0.2, 0.08]} />
        <meshStandardMaterial color="#654321" roughness={0.3} metalness={0} />
      </mesh>
    </group>
  );
}

export default Bed;
