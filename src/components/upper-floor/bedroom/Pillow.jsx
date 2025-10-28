import React, { useRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import { getFeatureConfig, getRandomAudioFile } from '../../../config/interactiveFeatures';
import { BEDROOM } from '../../../config/upperFloorCoordinates';
import { mediaManager } from '../../../utils/mediaManager';

function Pillow({ position = [0, 0, 0] }) {
  const config = getFeatureConfig('jobs');
  const { size, radius, smoothness, material } = BEDROOM.pillow;
  const audioRef = useRef(null);
  const setRandomAudioSource = () => {
    if (!audioRef.current) return;
    const randomSrc = getRandomAudioFile('jobs');
    if (!randomSrc) return;
    const absoluteNext = new URL(randomSrc, window.location.origin).href;
    if (audioRef.current.src !== absoluteNext) {
      audioRef.current.src = randomSrc;
      audioRef.current.load();
    }
  };

  // Initialize audio
  if (!audioRef.current) {
    audioRef.current = new Audio();
    audioRef.current.loop = false;
    setRandomAudioSource();
    audioRef.current.addEventListener('ended', () => {
      window.dispatchEvent(new CustomEvent(config.audio.endEvent, { detail: false }));
    });
  }

  const handleClick = async (e) => {
    e.stopPropagation();
    const wasPlaying = mediaManager.isPlaying(audioRef.current);
    if (!wasPlaying) {
      setRandomAudioSource();
    }
    await mediaManager.toggle(audioRef.current, config.audio.playEvent, config.audio.endEvent);
  };

  return (
    <RoundedBox
      args={[size.width, size.height, size.depth]}
      radius={radius}
      smoothness={smoothness}
      position={position}
      onClick={handleClick}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
      castShadow
    >
      <meshStandardMaterial color={material.color} roughness={material.roughness} />
    </RoundedBox>
  );
}

export default Pillow;
