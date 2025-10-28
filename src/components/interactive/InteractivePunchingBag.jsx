import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FITNESS } from '../../config/upperFloorCoordinates';
import { getFeatureConfig, getRandomAudioFile } from '../../config/interactiveFeatures';
import { mediaManager } from '../../utils/mediaManager';

/**
 * Interactive Punching Bag Component
 * 
 * Features:
 * - Swings continuously (always animated)
 * - Click to play audio and show poster (like TV, Pillow, etc.)
 * - Realistic pendulum physics
 */

function InteractivePunchingBag({ position = [0, 0, 0] }) {
  const config = getFeatureConfig('ali');
  const { materials: mat, mount, chain, bag, animation } = FITNESS.punchingBag;
  const bagRef = useRef();
  const audioRef = useRef(null);
  const setRandomAudioSource = () => {
    if (!audioRef.current) return;
    const randomSrc = getRandomAudioFile('ali');
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

  // Continuous swinging animation
  useFrame((state) => {
    if (bagRef.current) {
      const time = state.clock.elapsedTime;
      
      // Continuous gentle swinging
      const swingAngle = animation.swingAmplitude * Math.sin(time * animation.speed);
      bagRef.current.rotation.z = swingAngle * animation.rotationFactor;
    }
  });

  const handleClick = async (e) => {
    e.stopPropagation();
    const wasPlaying = mediaManager.isPlaying(audioRef.current);
    if (!wasPlaying) {
      setRandomAudioSource();
    }
    await mediaManager.toggle(audioRef.current, config.audio.playEvent, config.audio.endEvent);
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
    <group position={position} name="Interactive_Punching_Bag">
      {/* Ceiling mount */}
      <mesh position={[0, mount.positionY, 0]} castShadow>
        <cylinderGeometry args={[mount.radius, mount.radius, mount.height, mount.segments]} />
        <meshStandardMaterial {...mat.mount} />
      </mesh>

      {/* Chain */}
      <mesh position={[0, chain.positionY, 0]} castShadow>
        <cylinderGeometry args={[chain.radius, chain.radius, chain.height, chain.segments]} />
        <meshStandardMaterial {...mat.chain} />
      </mesh>

      {/* Punching bag (swings on click) */}
      <group ref={bagRef}>
        <mesh 
          position={[0, bag.positionY, 0]} 
          castShadow 
          receiveShadow
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <capsuleGeometry args={[bag.radius, bag.length, bag.capSegments, bag.radialSegments]} />
          <meshStandardMaterial 
            color={mat.bag.color}
            roughness={mat.bag.roughness}
            metalness={mat.bag.metalness}
          />
        </mesh>
      </group>
    </group>
  );
}

export default InteractivePunchingBag;
