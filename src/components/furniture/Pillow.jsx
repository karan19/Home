import React, { useRef, useState } from 'react';
import { RoundedBox } from '@react-three/drei';
import { getFeatureConfig } from '../../config/interactiveFeatures';

function Pillow({ position = [0, 0, 0] }) {
  const config = getFeatureConfig('jobs');
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize audio
  if (!audioRef.current) {
    audioRef.current = new Audio(config.audio.file);
    audioRef.current.loop = false;
    audioRef.current.addEventListener('ended', () => {
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent('pillowPlaying', { detail: false }));
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

  return (
    <RoundedBox
      args={[0.3, 0.1, 0.3]}
      radius={0.05}
      smoothness={4}
      position={position}
      onClick={handleClick}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
      castShadow
    >
      <meshStandardMaterial color={0xF5F5DC} roughness={0.8} />
    </RoundedBox>
  );
}

export default Pillow;
