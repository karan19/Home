import React, { useRef, useEffect } from 'react';
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
  const { scene } = useGLTF(modelPath);

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
        
        // Apply scale
        groupRef.current.scale.set(scale, scale, scale);
        
        console.log('Car model loaded and scaled:', scale);
        console.log('Car position set to:', position);
      }
    }
  }, [scene, targetSize, position]);

  // Lock car position on every frame to prevent any movement during camera drag
  useFrame(() => {
    if (groupRef.current) {
      // Force all three axes to stay fixed at configured position
      groupRef.current.position.x = position[0];
      groupRef.current.position.y = position[1];
      groupRef.current.position.z = position[2];
    }
  });

  return (
    <group ref={groupRef} rotation-y={rotation}>
      <primitive 
        object={scene.clone()} 
        castShadow 
        receiveShadow 
      />
    </group>
  );
}

// Preload the model
useGLTF.preload('/Car/scene.gltf');

export default Car;
