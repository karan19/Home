import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OUTSIDE } from '../../config/outsideCoordinates';

/**
 * Gym Equipment Model
 * 
 * Loads GLTF gym equipment model from Sketchfab
 * Auto-scales to appropriate size
 * Configuration centralized in outsideCoordinates.js
 */

function Gym() {
  const { position, rotation, targetSize, modelPath } = OUTSIDE.gym;
  const groupRef = useRef();
  const baseScaleRef = useRef(1);
  const readyRef = useRef(false);
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.setScalar(0.001);
    }
  }, []);

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
        baseScaleRef.current = scale;
        groupRef.current.scale.setScalar(scale);
        
        console.log('Gym model loaded and scaled:', scale);
        console.log('Gym position set to:', position);
        readyRef.current = true;
      }
    }
  }, [scene, targetSize, position]);

  // Lock gym position on every frame to prevent any movement during camera drag
  useFrame((state, delta) => {
    if (groupRef.current) {
      if (!readyRef.current) {
        return;
      }
      // Force all three axes to stay fixed at configured position
      groupRef.current.position.x = position[0];
      groupRef.current.position.y = position[1];
      groupRef.current.position.z = position[2];

      groupRef.current.scale.setScalar(baseScaleRef.current);
      groupRef.current.rotation.y = rotation;
      groupRef.current.position.y = position[1];
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

export default Gym;
