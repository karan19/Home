import React, { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getFeatureConfig } from '../../config/interactiveFeatures';

function BezosPost() {
  const config = getFeatureConfig('bezos');
  const [isVisible, setIsVisible] = useState(false);
  const [scale, setScale] = useState(0);
  const meshRef = useRef();
  const textureRef = useRef();

  useEffect(() => {
    // Load the SVG texture from config
    const loader = new THREE.TextureLoader();
    loader.load(config.poster.svg, (texture) => {
      textureRef.current = texture;
    });

    // Listen for events from config
    const handleBezosPlay = () => {
      setIsVisible(true);
      setScale(0);
    };

    const handleBezosEnd = () => {
      setIsVisible(false);
      setScale(0);
    };

    window.addEventListener(config.audio.playEvent, handleBezosPlay);
    window.addEventListener(config.audio.endEvent, handleBezosEnd);

    return () => {
      window.removeEventListener(config.audio.playEvent, handleBezosPlay);
      window.removeEventListener(config.audio.endEvent, handleBezosEnd);
    };
  }, [config]);

  // Animate scale on appearance
  useEffect(() => {
    if (isVisible && scale < 1) {
      const timer = setTimeout(() => {
        setScale(Math.min(scale + 0.05, 1));
      }, 16);
      return () => clearTimeout(timer);
    }
  }, [isVisible, scale]);

  // Pulse animation while visible
  useFrame((state) => {
    if (meshRef.current && isVisible && scale >= 1) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.02 + 1;
      meshRef.current.scale.set(scale * pulse, scale * pulse, 1);
    } else if (meshRef.current && isVisible) {
      meshRef.current.scale.set(scale, scale, 1);
    }
  });

  if (!isVisible) return null;

  return (
    <mesh
      ref={meshRef}
      position={config.poster.position}
      rotation={config.poster.rotation}
      name="BezosPost"
    >
      <planeGeometry args={config.poster.size} />
      <meshBasicMaterial
        map={textureRef.current}
        transparent
        opacity={scale}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default BezosPost;
