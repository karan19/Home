import React, { useRef, useState } from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { getFeatureConfig } from '../../config/interactiveFeatures';

function TV({ position }) {
  const config = getFeatureConfig('messi');
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize audio on first render
  if (!audioRef.current) {
    audioRef.current = new Audio(config.audio.file);
    audioRef.current.loop = false;
    
    // Auto-hide poster when audio ends
    audioRef.current.addEventListener('ended', () => {
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent('tvPlaying', { detail: false }));
    });
  }

  const handleClick = async (e) => {
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

  const handlePointerOver = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'default';
  };

  return (
    <group 
      position={position} 
      name="Furniture_TV"
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* TV Frame with rounded edges */}
      <RoundedBox
        args={[1.2, 0.7, 0.05]}
        radius={0.02}
        smoothness={4}
        castShadow
      >
        <meshStandardMaterial
          color={0x1C1C1C}
          roughness={0.4}
          metalness={0.3}
        />
      </RoundedBox>

      {/* Screen (slightly inset with emissive glow) */}
      <RoundedBox
        args={[1.15, 0.65, 0.01]}
        radius={0.015}
        smoothness={4}
        position={[0, 0, 0.03]}
      >
        <meshStandardMaterial
          color={isPlaying ? 0x1A1A3A : 0x0A0A1A}
          emissive={isPlaying ? 0x2A2A5A : 0x0A0A1A}
          emissiveIntensity={isPlaying ? 0.4 : 0.2}
          roughness={0.1}
        />
      </RoundedBox>
    </group>
  );
}

export default TV;
