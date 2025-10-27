import React, { useRef, useState } from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { getFeatureConfig } from '../../../config/interactiveFeatures';

function WorkDesk({ position = [2, 3, -2], rotation = 0 }) {
  const config = getFeatureConfig('musk');
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!audioRef.current) {
    audioRef.current = new Audio(config.audio.file);
    audioRef.current.loop = false;
    audioRef.current.addEventListener('ended', () => {
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent('laptopPlaying', { detail: false }));
    });
  }

  const handleMacBookClick = async (e) => {
    e.stopPropagation();
    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        window.dispatchEvent(new CustomEvent(config.audio.playEvent, { detail: true }));
      } catch (error) {
        console.log('Audio play interrupted:', error);
      }
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent(config.audio.endEvent, { detail: false }));
    }
  };
  return (
    <group position={position} rotation={[0, rotation, 0]} name="Work_Desk">
      {/* DESK */}
      <group name="Desk">
        {/* Desktop surface */}
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.05, 0.8]} />
          <meshStandardMaterial color="#D2B48C" roughness={0.4} metalness={0} />
        </mesh>

        {/* Desk legs (4 corners) */}
        {[
          [-0.7, 0.375, -0.35],
          [0.7, 0.375, -0.35],
          [-0.7, 0.375, 0.35],
          [0.7, 0.375, 0.35]
        ].map((pos, i) => (
          <mesh key={i} position={pos} castShadow>
            <boxGeometry args={[0.05, 0.75, 0.05]} />
            <meshStandardMaterial color="#D2B48C" roughness={0.4} metalness={0} />
          </mesh>
        ))}
      </group>

      {/* MACBOOK LAPTOP */}
      <group 
        name="MacBook" 
        position={[-0.2, 0.775, 0]}
        onClick={handleMacBookClick}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
      >
        {/* Laptop base (keyboard) */}
        <RoundedBox args={[0.35, 0.02, 0.25]} radius={0.01} smoothness={4} castShadow>
          <meshStandardMaterial color="#C0C0C0" roughness={0.3} metalness={0.7} />
        </RoundedBox>

        {/* Laptop screen */}
        <mesh position={[0, 0.15, -0.1]} rotation={[-0.3, 0, 0]} castShadow>
          <boxGeometry args={[0.35, 0.22, 0.02]} />
          <meshStandardMaterial color="#2C2C2C" roughness={0.2} metalness={0.5} />
        </mesh>

        {/* Screen display (glowing) */}
        <mesh position={[0, 0.15, -0.09]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[0.33, 0.2, 0.01]} />
          <meshStandardMaterial 
            color="#4A90E2"
            emissive="#4A90E2"
            emissiveIntensity={0.3}
            roughness={0.1}
            metalness={0}
          />
        </mesh>

        {/* Apple logo (optional - small circle) */}
        <mesh position={[0, 0.15, -0.12]} rotation={[-0.3, 0, 0]}>
          <circleGeometry args={[0.02, 16]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>

      {/* EXTERNAL MONITOR */}
      <group name="Monitor" position={[0.3, 0.775, -0.3]}>
        {/* Monitor stand base */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
          <meshStandardMaterial color="#2C2C2C" roughness={0.4} metalness={0.3} />
        </mesh>

        {/* Monitor stand pole */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 12]} />
          <meshStandardMaterial color="#2C2C2C" roughness={0.4} metalness={0.3} />
        </mesh>

        {/* Monitor frame */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[0.6, 0.35, 0.05]} />
          <meshStandardMaterial color="#1C1C1C" roughness={0.3} metalness={0.2} />
        </mesh>

        {/* Monitor screen (glowing) */}
        <mesh position={[0, 0.45, 0.03]}>
          <boxGeometry args={[0.55, 0.3, 0.01]} />
          <meshStandardMaterial 
            color="#1A1A2E"
            emissive="#4A90E2"
            emissiveIntensity={0.2}
            roughness={0.1}
            metalness={0}
          />
        </mesh>
      </group>

      {/* OFFICE CHAIR */}
      <group name="Office_Chair" position={[0, 0, 0.5]} rotation={[0, Math.PI, 0]}>
        {/* Seat */}
        <RoundedBox args={[0.5, 0.1, 0.5]} radius={0.05} smoothness={4} position={[0, 0.5, 0]} castShadow>
          <meshStandardMaterial color="#808080" roughness={0.6} metalness={0} />
        </RoundedBox>

        {/* Backrest */}
        <RoundedBox args={[0.5, 0.6, 0.1]} radius={0.05} smoothness={4} position={[0, 0.8, -0.2]} castShadow>
          <meshStandardMaterial color="#808080" roughness={0.6} metalness={0} />
        </RoundedBox>

        {/* Chair base (5-star) */}
        <mesh position={[0, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.25, 0.05, 5]} />
          <meshStandardMaterial color="#2C2C2C" roughness={0.4} metalness={0.3} />
        </mesh>

        {/* Center pole */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.4, 12]} />
          <meshStandardMaterial color="#2C2C2C" roughness={0.4} metalness={0.3} />
        </mesh>

        {/* Wheels (5 casters) */}
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * 0.2;
          const z = Math.sin(rad) * 0.2;
          return (
            <mesh key={i} position={[x, 0.05, z]} castShadow>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial color="#1C1C1C" roughness={0.3} metalness={0.2} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export default WorkDesk;
