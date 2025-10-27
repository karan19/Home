import React from 'react';
import { RoundedBox } from '@react-three/drei';

function CoffeeMachine({ position = [0, 0, 0] }) {
  return (
    <group position={position} name="Furniture_CoffeeMachine">
      {/* Base/Drip Tray (black) */}
      <RoundedBox
        args={[0.35, 0.05, 0.4]}
        radius={0.005}
        smoothness={4}
        position={[0, 0.025, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={0x1C1C1C}
          roughness={0.4}
          metalness={0.3}
        />
      </RoundedBox>

      {/* Main Body (stainless steel) */}
      <RoundedBox
        args={[0.32, 0.3, 0.35]}
        radius={0.01}
        smoothness={4}
        position={[0, 0.2, 0]}
        castShadow
      >
        <meshStandardMaterial
          color={0xC0C0C0}
          roughness={0.2}
          metalness={0.8}
        />
      </RoundedBox>

      {/* Water Tank (transparent, back) */}
      <RoundedBox
        args={[0.15, 0.25, 0.08]}
        radius={0.005}
        smoothness={4}
        position={[0, 0.225, -0.16]}
        castShadow
      >
        <meshStandardMaterial
          color={0x87CEEB}
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
        />
      </RoundedBox>

      {/* Group Head (where coffee comes out) */}
      <mesh position={[0, 0.25, 0.18]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.08, 16]} />
        <meshStandardMaterial
          color={0x8B8B8B}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Portafilter Handle (left side) */}
      <group position={[-0.1, 0.22, 0.2]}>
        {/* Handle */}
        <mesh rotation={[0, 0, -Math.PI / 6]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.12, 12]} />
          <meshStandardMaterial
            color={0x2C2C2C}
            roughness={0.5}
            metalness={0.2}
          />
        </mesh>
        {/* Filter basket */}
        <mesh position={[0, -0.04, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
          <meshStandardMaterial
            color={0x8B8B8B}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      </group>

      {/* Steam Wand (right side) */}
      <group position={[0.12, 0.25, 0.1]}>
        {/* Wand arm */}
        <mesh rotation={[0, 0, Math.PI / 4]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.15, 12]} />
          <meshStandardMaterial
            color={0xC0C0C0}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        {/* Wand tip */}
        <mesh position={[0.08, -0.08, 0]} castShadow>
          <coneGeometry args={[0.01, 0.02, 12]} />
          <meshStandardMaterial
            color={0xC0C0C0}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* Dual Drip Spouts */}
      <mesh position={[-0.02, 0.18, 0.2]} castShadow>
        <cylinderGeometry args={[0.008, 0.006, 0.04, 12]} />
        <meshStandardMaterial
          color={0x8B8B8B}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <mesh position={[0.02, 0.18, 0.2]} castShadow>
        <cylinderGeometry args={[0.008, 0.006, 0.04, 12]} />
        <meshStandardMaterial
          color={0x8B8B8B}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Control Panel (front, upper) */}
      <RoundedBox
        args={[0.2, 0.08, 0.02]}
        radius={0.003}
        smoothness={4}
        position={[0, 0.32, 0.18]}
        castShadow
      >
        <meshStandardMaterial
          color={0x1C1C1C}
          roughness={0.3}
          metalness={0.5}
        />
      </RoundedBox>

      {/* Buttons on control panel */}
      {[-0.06, -0.02, 0.02, 0.06].map((x, i) => (
        <mesh key={i} position={[x, 0.32, 0.19]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.01, 12]} />
          <meshStandardMaterial
            color={i === 1 ? 0xFF4444 : 0x4444FF}
            emissive={i === 1 ? 0xFF0000 : 0x0000FF}
            emissiveIntensity={0.3}
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
      ))}

      {/* Pressure Gauge (circular dial) */}
      <mesh position={[0, 0.38, 0.17]} rotation={[Math.PI / 6, 0, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.01, 24]} />
        <meshStandardMaterial
          color={0xF5F5F5}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>

      {/* Gauge needle */}
      <mesh position={[0, 0.38, 0.175]} rotation={[Math.PI / 6, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.001, 0.02, 0.001]} />
        <meshStandardMaterial color={0xFF0000} />
      </mesh>

      {/* Cup Warmer Platform (top) */}
      <RoundedBox
        args={[0.3, 0.02, 0.32]}
        radius={0.005}
        smoothness={4}
        position={[0, 0.44, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={0x8B8B8B}
          roughness={0.3}
          metalness={0.7}
        />
      </RoundedBox>

      {/* Coffee cup on warmer */}
      <group position={[0.08, 0.47, 0.05]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.03, 0.025, 0.04, 16]} />
          <meshStandardMaterial
            color={0xFFFFFF}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
        {/* Handle */}
        <mesh position={[0.035, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <torusGeometry args={[0.015, 0.003, 8, 12, Math.PI]} />
          <meshStandardMaterial
            color={0xFFFFFF}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}

export default CoffeeMachine;
