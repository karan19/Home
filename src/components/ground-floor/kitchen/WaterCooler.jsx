import React from 'react';
import { RoundedBox } from '@react-three/drei';

function WaterCooler({ position = [0, 0, 0] }) {
  return (
    <group position={position} name="Furniture_WaterCooler">
      {/* Base cabinet (dark gray) */}
      <RoundedBox
        args={[0.3, 0.3, 0.3]}
        radius={0.01}
        smoothness={4}
        position={[0, 0.15, 0]}
        castShadow
      >
        <meshStandardMaterial
          color={0x404040}
          roughness={0.6}
          metalness={0.2}
        />
      </RoundedBox>

      {/* Main body (white/light gray) */}
      <RoundedBox
        args={[0.28, 0.5, 0.28]}
        radius={0.01}
        smoothness={4}
        position={[0, 0.55, 0]}
        castShadow
      >
        <meshStandardMaterial
          color={0xF0F0F0}
          roughness={0.4}
          metalness={0.1}
        />
      </RoundedBox>

      {/* Water bottle (blue transparent) */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.3, 16]} />
        <meshStandardMaterial
          color={0x4A90E2}
          transparent
          opacity={0.6}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Bottle cap (white) */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
        <meshStandardMaterial
          color={0xFFFFFF}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Hot water tap (red) */}
      <mesh position={[-0.08, 0.45, 0.15]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.06, 8]} />
        <meshStandardMaterial
          color={0xCC0000}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>

      {/* Cold water tap (blue) */}
      <mesh position={[0.08, 0.45, 0.15]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.06, 8]} />
        <meshStandardMaterial
          color={0x0066CC}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>

      {/* Drip tray (dark gray) */}
      <RoundedBox
        args={[0.25, 0.02, 0.15]}
        radius={0.005}
        smoothness={4}
        position={[0, 0.35, 0.15]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={0x303030}
          roughness={0.5}
          metalness={0.3}
        />
      </RoundedBox>
    </group>
  );
}

export default WaterCooler;
