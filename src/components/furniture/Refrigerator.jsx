import React from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function Refrigerator({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation} name="Refrigerator">
      {/* Main refrigerator body */}
      <RoundedBox 
        args={[0.9, 1.8, 0.7]} 
        radius={0.02} 
        smoothness={4}
        position={[0, 0.9, 0]} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial 
          color="#C0C0C0" 
          roughness={0.3} 
          metalness={0.7} 
        />
      </RoundedBox>

      {/* FRENCH DOORS (Top Section) */}
      <group name="French_Doors" position={[0, 1.15, 0]}>
        {/* Left door */}
        <mesh position={[-0.225, 0, 0.36]} castShadow>
          <boxGeometry args={[0.43, 1.2, 0.02]} />
          <meshStandardMaterial 
            color="#B8B8B8" 
            roughness={0.3} 
            metalness={0.7} 
          />
        </mesh>

        {/* Right door */}
        <mesh position={[0.225, 0, 0.36]} castShadow>
          <boxGeometry args={[0.43, 1.2, 0.02]} />
          <meshStandardMaterial 
            color="#B8B8B8" 
            roughness={0.3} 
            metalness={0.7} 
          />
        </mesh>

        {/* Left door handle (vertical bar) */}
        <mesh position={[-0.02, 0, 0.37]} castShadow>
          <boxGeometry args={[0.02, 0.4, 0.03]} />
          <meshStandardMaterial 
            color="#808080" 
            roughness={0.2} 
            metalness={0.8} 
          />
        </mesh>

        {/* Right door handle (vertical bar) */}
        <mesh position={[0.02, 0, 0.37]} castShadow>
          <boxGeometry args={[0.02, 0.4, 0.03]} />
          <meshStandardMaterial 
            color="#808080" 
            roughness={0.2} 
            metalness={0.8} 
          />
        </mesh>

        {/* Water/Ice dispenser on left door */}
        <group position={[-0.225, 0.3, 0.37]}>
          {/* Dispenser panel */}
          <mesh castShadow>
            <boxGeometry args={[0.2, 0.3, 0.01]} />
            <meshStandardMaterial color="#2C2C2C" roughness={0.4} metalness={0.3} />
          </mesh>
          
          {/* Dispenser opening */}
          <mesh position={[0, -0.08, 0.01]}>
            <boxGeometry args={[0.08, 0.06, 0.01]} />
            <meshStandardMaterial color="#1C1C1C" roughness={0.6} metalness={0.2} />
          </mesh>

          {/* Control buttons */}
          <mesh position={[-0.05, 0.08, 0.01]}>
            <boxGeometry args={[0.03, 0.03, 0.005]} />
            <meshStandardMaterial color="#3C3C3C" roughness={0.4} metalness={0.3} />
          </mesh>
          <mesh position={[0.05, 0.08, 0.01]}>
            <boxGeometry args={[0.03, 0.03, 0.005]} />
            <meshStandardMaterial color="#3C3C3C" roughness={0.4} metalness={0.3} />
          </mesh>
        </group>
      </group>

      {/* FREEZER DRAWER (Bottom Section) */}
      <group name="Freezer_Drawer" position={[0, 0.25, 0]}>
        {/* Drawer front */}
        <mesh position={[0, 0, 0.36]} castShadow>
          <boxGeometry args={[0.86, 0.48, 0.02]} />
          <meshStandardMaterial 
            color="#B8B8B8" 
            roughness={0.3} 
            metalness={0.7} 
          />
        </mesh>

        {/* Drawer handle (horizontal bar) */}
        <mesh position={[0, 0.15, 0.37]} castShadow>
          <boxGeometry args={[0.5, 0.02, 0.03]} />
          <meshStandardMaterial 
            color="#808080" 
            roughness={0.2} 
            metalness={0.8} 
          />
        </mesh>
      </group>

      {/* Door seam (center vertical line) */}
      <mesh position={[0, 1.15, 0.365]}>
        <boxGeometry args={[0.01, 1.2, 0.01]} />
        <meshStandardMaterial color="#909090" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Brand logo area (optional subtle detail) */}
      <mesh position={[0, 1.65, 0.365]}>
        <boxGeometry args={[0.15, 0.05, 0.005]} />
        <meshStandardMaterial color="#A0A0A0" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  );
}

export default Refrigerator;
