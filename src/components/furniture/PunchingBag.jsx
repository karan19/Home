import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { getFeatureConfig } from '../../config/interactiveFeatures';

function PunchingBag({ position = [0, 3, 0] }) {
  const config = getFeatureConfig('ali');
  const bagRef = useRef();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const baseX = position[0];

  // Initialize audio
  if (!audioRef.current) {
    audioRef.current = new Audio(config.audio.file);
    audioRef.current.loop = false;
    audioRef.current.addEventListener('ended', () => {
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent('punchingBagPlaying', { detail: false }));
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

  useFrame((state) => {
    if (bagRef.current) {
      const swing = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      bagRef.current.position.x = baseX + swing;
      bagRef.current.rotation.z = swing * 0.3;
    }
  });

  return (
    <group 
      ref={bagRef} 
      position={position}
      onClick={handleClick}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
    >
      {/* Ceiling mount (touches ceiling at Y=6) */}
      <mesh position={[0, 3.0, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} />
        <meshStandardMaterial color={0x808080} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Chain */}
      <mesh position={[0, 2.45, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 1.1, 8]} />
        <meshStandardMaterial color={0x606060} metalness={0.9} roughness={0.4} />
      </mesh>

      {/* Main bag body with curved edges - smooth cylinder */}
      <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.175, 1.0, 16, 32]} />
        <meshStandardMaterial color={0xFF0000} roughness={0.7} metalness={0.1} />
      </mesh>
    </group>
  );
}

export default PunchingBag;
