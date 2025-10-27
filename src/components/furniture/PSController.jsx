import React from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function PSController({ position, rotation = [0, 0, 0] }) {
  const controllerMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF, // White DualSense
    roughness: 0.5,
    metalness: 0.1
  });

  const blackMaterial = new THREE.MeshStandardMaterial({
    color: 0x1C1C1C,
    roughness: 0.4,
    metalness: 0.2
  });

  const blueMaterial = new THREE.MeshStandardMaterial({
    color: 0x0066FF,
    emissive: 0x0033AA,
    emissiveIntensity: 0.3,
    roughness: 0.3
  });

  return (
    <group position={position} rotation={rotation} name="PS_Controller">
      {/* Main controller body */}
      <RoundedBox
        args={[0.15, 0.04, 0.1]}
        radius={0.01}
        smoothness={4}
        position={[0, 0.02, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...controllerMaterial} />
      </RoundedBox>

      {/* Left grip */}
      <RoundedBox
        args={[0.03, 0.06, 0.04]}
        radius={0.008}
        smoothness={4}
        position={[-0.06, 0, -0.03]}
        rotation={[0.3, 0, 0]}
        castShadow
      >
        <meshStandardMaterial {...controllerMaterial} />
      </RoundedBox>

      {/* Right grip */}
      <RoundedBox
        args={[0.03, 0.06, 0.04]}
        radius={0.008}
        smoothness={4}
        position={[0.06, 0, -0.03]}
        rotation={[0.3, 0, 0]}
        castShadow
      >
        <meshStandardMaterial {...controllerMaterial} />
      </RoundedBox>

      {/* Touchpad (center) */}
      <RoundedBox
        args={[0.06, 0.001, 0.03]}
        radius={0.003}
        smoothness={4}
        position={[0, 0.041, 0.01]}
        castShadow
      >
        <meshStandardMaterial color={0x2C2C2C} roughness={0.2} metalness={0.4} />
      </RoundedBox>

      {/* PlayStation button (center) */}
      <mesh position={[0, 0.041, -0.02]} material={blueMaterial}>
        <cylinderGeometry args={[0.006, 0.006, 0.002, 16]} />
      </mesh>

      {/* Left analog stick */}
      <group position={[-0.03, 0.041, -0.01]}>
        <mesh castShadow material={blackMaterial}>
          <cylinderGeometry args={[0.012, 0.012, 0.008, 16]} />
        </mesh>
        <mesh position={[0, 0.006, 0]} material={blackMaterial}>
          <cylinderGeometry args={[0.008, 0.008, 0.004, 16]} />
        </mesh>
      </group>

      {/* Right analog stick */}
      <group position={[0.03, 0.041, -0.01]}>
        <mesh castShadow material={blackMaterial}>
          <cylinderGeometry args={[0.012, 0.012, 0.008, 16]} />
        </mesh>
        <mesh position={[0, 0.006, 0]} material={blackMaterial}>
          <cylinderGeometry args={[0.008, 0.008, 0.004, 16]} />
        </mesh>
      </group>

      {/* D-pad (left side) */}
      {[
        [0, 0.008],    // Up
        [0, -0.008],   // Down
        [-0.008, 0],   // Left
        [0.008, 0]     // Right
      ].map((offset, i) => (
        <RoundedBox
          key={i}
          args={i < 2 ? [0.006, 0.002, 0.012] : [0.012, 0.002, 0.006]}
          radius={0.001}
          smoothness={2}
          position={[-0.05 + offset[0], 0.042, 0.02 + offset[1]]}
          castShadow
        >
          <meshStandardMaterial color={0x2C2C2C} roughness={0.4} />
        </RoundedBox>
      ))}

      {/* Action buttons (right side - X, O, Square, Triangle) */}
      {[
        { x: 0, z: 0.008, color: 0x0066FF },      // Triangle (blue)
        { x: 0, z: -0.008, color: 0xFF1493 },     // X (pink)
        { x: -0.008, z: 0, color: 0xFF69B4 },     // Square (pink)
        { x: 0.008, z: 0, color: 0xFF0000 }       // Circle (red)
      ].map((btn, i) => (
        <mesh
          key={i}
          position={[0.05 + btn.x, 0.042, 0.02 + btn.z]}
          castShadow
          material={new THREE.MeshStandardMaterial({ color: btn.color, roughness: 0.3 })}
        >
          <cylinderGeometry args={[0.006, 0.006, 0.002, 16]} />
        </mesh>
      ))}
    </group>
  );
}

export default PSController;
