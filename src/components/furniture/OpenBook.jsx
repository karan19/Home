import React, { useState, useRef, useEffect } from 'react';
import { RoundedBox } from '@react-three/drei';
import { getFeatureConfig } from '../../config/interactiveFeatures';

function OpenBook({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const config = getFeatureConfig('bezos');
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef(null);

  // Handle cursor change on hover
  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [isHovered]);

  const handleClick = async () => {
    // Create audio on first click using config
    if (!audioRef.current) {
      audioRef.current = new Audio(config.audio.file);
      audioRef.current.loop = false;
      audioRef.current.addEventListener('ended', () => {
        window.dispatchEvent(new Event(config.audio.endEvent));
      });
    }

    // Toggle play/pause with proper Promise handling
    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        window.dispatchEvent(new Event(config.audio.playEvent));
      } catch (error) {
        console.log('Audio play interrupted:', error);
      }
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      window.dispatchEvent(new Event(config.audio.endEvent));
    }
  };

  return (
    <group 
      position={position} 
      rotation={rotation} 
      name="Furniture_OpenBook"
      onClick={handleClick}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {/* Left page */}
      <RoundedBox
        args={[0.11, 0.02, 0.16]}
        radius={0.002}
        smoothness={4}
        position={[-0.055, 0, 0]}
        rotation={[0, -0.12, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={0xFFFAF0}
          roughness={0.9}
          metalness={0.0}
        />
      </RoundedBox>

      {/* Right page */}
      <RoundedBox
        args={[0.11, 0.02, 0.16]}
        radius={0.002}
        smoothness={4}
        position={[0.055, 0, 0]}
        rotation={[0, 0.12, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={0xFFFAF0}
          roughness={0.9}
          metalness={0.0}
        />
      </RoundedBox>

      {/* Spiral binding (metal coils) */}
      {Array.from({ length: 15 }).map((_, i) => {
        const z = -0.07 + i * 0.01;
        return (
          <mesh key={i} position={[0, 0.01, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[0.006, 0.001, 8, 12]} />
            <meshStandardMaterial
              color={0xC0C0C0}
              roughness={0.3}
              metalness={0.8}
            />
          </mesh>
        );
      })}

      {/* Cardboard cover (bottom) */}
      <RoundedBox
        args={[0.23, 0.004, 0.165]}
        radius={0.003}
        smoothness={4}
        position={[0, -0.012, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={0x8B7355}
          roughness={0.8}
          metalness={0.0}
        />
      </RoundedBox>

      {/* Page stack (shows thickness) */}
      <mesh position={[0, -0.005, 0]} castShadow>
        <boxGeometry args={[0.22, 0.015, 0.16]} />
        <meshStandardMaterial
          color={0xFFFAF0}
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>
    </group>
  );
}

export default OpenBook;
