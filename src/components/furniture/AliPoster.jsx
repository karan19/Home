import React, { Suspense, useRef, useEffect, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { getFeatureConfig } from '../../config/interactiveFeatures';

function AliPoster() {
  const config = getFeatureConfig('ali');
  const texture = useLoader(TextureLoader, config.poster.svg);
  const groupRef = useRef();
  const scaleRef = useRef(0);
  const opacityRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);

  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  useEffect(() => {
    const handlePunchingBagPlaying = (e) => {
      setIsPlaying(e.detail);
      if (e.detail) {
        scaleRef.current = 0;
        opacityRef.current = 0;
      }
    };
    
    window.addEventListener(config.audio.playEvent, handlePunchingBagPlaying);
    return () => window.removeEventListener(config.audio.playEvent, handlePunchingBagPlaying);
  }, [config]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const target = isPlaying ? 1 : 0;
      scaleRef.current += (target - scaleRef.current) * delta * 5;
      opacityRef.current += (target - opacityRef.current) * delta * 5;
      
      const scale = scaleRef.current * (1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
      groupRef.current.scale.set(scale, scale, scale);
      
      if (groupRef.current.children[0]?.material) {
        groupRef.current.children[0].material.opacity = opacityRef.current;
      }
    }
  });

  // Right wall position at N20-O21 (upper area)
  return (
    <group ref={groupRef} position={config.poster.position} rotation={config.poster.rotation}>
      <mesh>
        <planeGeometry args={config.poster.size} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function AliPosterWithSuspense(props) {
  return (
    <Suspense fallback={null}>
      <AliPoster {...props} />
    </Suspense>
  );
}
