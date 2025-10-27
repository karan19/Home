import React, { useState, useRef, useEffect } from 'react';
import { RoundedBox } from '@react-three/drei';
import { getFeatureConfig } from '../../../config/interactiveFeatures';
import { SEATING_AREA } from '../../../config/upperFloorCoordinates';

function OpenBook({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const config = getFeatureConfig('bezos');
  const { materials: mat, leftPage, rightPage, binding, cover, pageStack } = SEATING_AREA.openBook;
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
        args={[leftPage.width, leftPage.height, leftPage.depth]}
        radius={leftPage.radius}
        smoothness={leftPage.smoothness}
        position={[leftPage.positionX, 0, 0]}
        rotation={[0, leftPage.rotationY, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...mat.page} />
      </RoundedBox>

      {/* Right page */}
      <RoundedBox
        args={[rightPage.width, rightPage.height, rightPage.depth]}
        radius={rightPage.radius}
        smoothness={rightPage.smoothness}
        position={[rightPage.positionX, 0, 0]}
        rotation={[0, rightPage.rotationY, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...mat.page} />
      </RoundedBox>

      {/* Spiral binding (metal coils) */}
      {Array.from({ length: binding.count }).map((_, i) => {
        const z = binding.startZ + i * binding.spacing;
        return (
          <mesh key={i} position={[0, binding.positionY, z]} rotation={[binding.rotationX, 0, 0]} castShadow>
            <torusGeometry args={[binding.radius, binding.tube, binding.radialSegments, binding.tubularSegments]} />
            <meshStandardMaterial {...mat.binding} />
          </mesh>
        );
      })}

      {/* Cardboard cover (bottom) */}
      <RoundedBox
        args={[cover.width, cover.height, cover.depth]}
        radius={cover.radius}
        smoothness={cover.smoothness}
        position={[0, cover.positionY, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...mat.cover} />
      </RoundedBox>

      {/* Page stack (shows thickness) */}
      <mesh position={[0, pageStack.positionY, 0]} castShadow>
        <boxGeometry args={[pageStack.width, pageStack.height, pageStack.depth]} />
        <meshStandardMaterial {...mat.page} />
      </mesh>
    </group>
  );
}

export default OpenBook;
