import React, { useRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import { getFeatureConfig } from '../../../config/interactiveFeatures';
import { BEDROOM } from '../../../config/upperFloorCoordinates';
import { mediaManager } from '../../../utils/mediaManager';

function Pillow({ position = [0, 0, 0] }) {
  const config = getFeatureConfig('jobs');
  const { size, radius, smoothness, material } = BEDROOM.pillow;
  const audioRef = useRef(null);

  // Initialize audio
  if (!audioRef.current) {
    audioRef.current = new Audio(config.audio.file);
    audioRef.current.loop = false;
    audioRef.current.addEventListener('ended', () => {
      window.dispatchEvent(new CustomEvent(config.audio.endEvent, { detail: false }));
    });
  }

  const handleClick = async (e) => {
    e.stopPropagation();
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
