import React from 'react';

function Pen({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation} name="Furniture_Pen">
      {/* Pen body (main cylinder) */}
      <mesh castShadow>
        <cylinderGeometry args={[0.004, 0.004, 0.12, 12]} />
        <meshStandardMaterial
          color={0x1E3A8A}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Pen tip (cone) */}
      <mesh position={[0, -0.065, 0]} castShadow>
        <coneGeometry args={[0.004, 0.01, 12]} />
        <meshStandardMaterial
          color={0xC0C0C0}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Pen cap/top */}
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.005, 0.004, 0.02, 12]} />
        <meshStandardMaterial
          color={0x1E3A8A}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Pen clip */}
      <mesh position={[0.005, 0.055, 0]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.002, 0.025, 0.003]} />
        <meshStandardMaterial
          color={0xC0C0C0}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

export default Pen;
