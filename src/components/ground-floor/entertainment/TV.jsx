import React, { useRef, useState } from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { getFeatureConfig, getRandomAudioFile } from '../../../config/interactiveFeatures';
import { ENTERTAINMENT } from '../../../config/groundFloorCoordinates';
import { mediaManager } from '../../../utils/mediaManager';

function TV({ position }) {
  const config = getFeatureConfig('messi');
  const { frame, screen } = ENTERTAINMENT.tv;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const setRandomAudioSource = () => {
    if (!audioRef.current) return;
    const randomSrc = getRandomAudioFile('messi');
    if (!randomSrc) return;
    const absoluteNext = new URL(randomSrc, window.location.origin).href;
    if (audioRef.current.src !== absoluteNext) {
      audioRef.current.src = randomSrc;
      audioRef.current.load();
    }
  };

  // Initialize audio on first render
  if (!audioRef.current) {
    audioRef.current = new Audio();
    audioRef.current.loop = false;
    setRandomAudioSource();
    
    // Auto-hide poster when audio ends
    audioRef.current.addEventListener('ended', () => {
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent(config.audio.endEvent, { detail: false }));
    });
  }

  const handleClick = async (e) => {
    e.stopPropagation();
    
    // Use media manager to handle audio/poster
    const wasPlaying = mediaManager.isPlaying(audioRef.current);
    if (!wasPlaying) {
      setRandomAudioSource();
    }
    await mediaManager.toggle(audioRef.current, config.audio.playEvent, config.audio.endEvent);
    
    // Update local state for screen glow effect
    setIsPlaying(!wasPlaying);
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
        args={[frame.width, frame.height, frame.depth]}
        radius={frame.radius}
        smoothness={frame.smoothness}
        castShadow
      >
        <meshStandardMaterial
          color={frame.color}
          roughness={frame.roughness}
          metalness={frame.metalness}
        />
      </RoundedBox>

      {/* Screen (slightly inset with emissive glow) */}
      <RoundedBox
        args={[screen.width, screen.height, screen.depth]}
        radius={screen.radius}
        smoothness={screen.smoothness}
        position={[0, 0, screen.positionZ]}
      >
        <meshStandardMaterial
          color={isPlaying ? screen.colorOn : screen.colorOff}
          emissive={isPlaying ? screen.emissiveOn : screen.emissiveOff}
          emissiveIntensity={isPlaying ? screen.emissiveIntensityOn : screen.emissiveIntensityOff}
          roughness={screen.roughness}
        />
      </RoundedBox>
    </group>
  );
}

export default TV;
