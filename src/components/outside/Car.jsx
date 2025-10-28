import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OUTSIDE } from '../../config/outsideCoordinates';

/**
 * Car Model
 * 
 * Loads GLTF car model from Sketchfab
 * Auto-scales to appropriate size
 * Configuration centralized in outsideCoordinates.js
 */

function Car() {
  const { position, rotation, targetSize, modelPath } = OUTSIDE.car;
  const groupRef = useRef();
  const baseScaleRef = useRef(1);
  const { scene } = useGLTF(modelPath);
  const [spawnProgress, setSpawnProgress] = useState(0);
  const [spawned, setSpawned] = useState(false);
  const animationDuration = 0.6; // seconds

  // Initialize position and scale the model
  useEffect(() => {
    if (groupRef.current) {
      // Set initial position IMMEDIATELY to prevent any drift
      groupRef.current.position.set(position[0], position[1], position[2]);
      
      if (scene) {
        // Calculate bounding box
        const box = new THREE.Box3().setFromObject(scene);
        const size = box.getSize(new THREE.Vector3());
        
        // Use target size from config
        const maxDimension = Math.max(size.x, size.y, size.z);
        const scale = targetSize / maxDimension;
        baseScaleRef.current = scale;

        console.log('Car model loaded and scaled:', scale);
        console.log('Car position set to:', position);
      }
    }
  }, [scene, targetSize, position]);

  // Lock car position on every frame to prevent any movement during camera drag
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Force all three axes to stay fixed at configured position
      groupRef.current.position.x = position[0];
      groupRef.current.position.y = position[1];
      groupRef.current.position.z = position[2];

      if (!spawned) {
        setSpawnProgress(prev => {
          const next = Math.min(prev + delta / animationDuration, 1);
          if (next >= 1) {
            setSpawned(true);
          }
          return next;
        });
      }

      const eased = spawnProgress < 1 ? easeOutElastic(spawnProgress) : 1;
      groupRef.current.scale.setScalar(baseScaleRef.current * eased);
      groupRef.current.rotation.y = rotation + (1 - eased) * 0.6;
      groupRef.current.position.y = position[1] + (1 - eased) * 0.6;
    }
  });

  if (!scene) return null;

  return (
    <group ref={groupRef}>
      <primitive 
        object={scene.clone()} 
        castShadow 
        receiveShadow 
      />
    </group>
  );
}

const easeOutElastic = (t) => {
  if (t === 0 || t === 1) return t;
  const c4 = (2 * Math.PI) / 3;
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
};

export default Car;

useGLTF.preload(OUTSIDE.car.modelPath);
