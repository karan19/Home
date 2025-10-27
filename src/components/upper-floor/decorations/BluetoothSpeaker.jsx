import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function BluetoothSpeaker({ position = [0, 0, 0] }) {
  const lightRef = useRef();

  // Blinking animation
  useFrame((state) => {
    if (lightRef.current) {
      // Blink every second (smooth sine wave)
      const time = state.clock.elapsedTime;
      const intensity = Math.sin(time * 3) * 0.5 + 0.5; // Oscillates 0-1
      lightRef.current.material.emissiveIntensity = intensity * 2;
    }
  });

  return (
    <group position={position} name="Furniture_BluetoothSpeaker">
      {/* Main cylindrical body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.15, 32]} />
        <meshStandardMaterial
          color={0x2C2C2C}
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>

      {/* Blinking light on top */}
      <mesh ref={lightRef} position={[0, 0.08, 0]}>
        <sphereGeometry args={[0.008, 16, 16]} />
        <meshStandardMaterial
          color={0x0080FF}
          emissive={0x0080FF}
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}

export default BluetoothSpeaker;
