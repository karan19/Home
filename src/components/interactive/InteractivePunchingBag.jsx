import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FITNESS } from '../../config/upperFloorCoordinates';

/**
 * Interactive Punching Bag Component
 * 
 * Features:
 * - Click to make it swing
 * - Realistic pendulum physics
 * - Hover effect
 * - Auto-dampening (gradually stops swinging)
 */

function InteractivePunchingBag({ position = [0, 0, 0] }) {
  const { materials: mat, mount, chain, bag, animation } = FITNESS.punchingBag;
  const [isSwinging, setIsSwinging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const bagRef = useRef();
  const swingAngle = useRef(0);
  const swingVelocity = useRef(0);
  const swingAmplitude = useRef(0);

  useFrame((state) => {
    if (bagRef.current && isSwinging) {
      const time = state.clock.elapsedTime;
      
      // Damped pendulum motion
      if (swingAmplitude.current > 0.001) {
        // Apply damping
        swingAmplitude.current *= 0.98;
        
        // Calculate swing angle
        swingAngle.current = swingAmplitude.current * Math.sin(time * animation.speed);
        
        // Apply rotation
        bagRef.current.rotation.z = swingAngle.current * animation.rotationFactor;
      } else {
        // Stop swinging when amplitude is too small
        setIsSwinging(false);
        swingAmplitude.current = 0;
        swingAngle.current = 0;
        bagRef.current.rotation.z = 0;
      }
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    
    // Start swinging with initial amplitude
    setIsSwinging(true);
    swingAmplitude.current = animation.swingAmplitude;
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setIsHovered(false);
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
            color={isHovered ? new THREE.Color(mat.bag.color).multiplyScalar(1.2) : mat.bag.color}
            roughness={mat.bag.roughness}
            metalness={mat.bag.metalness}
          />
        </mesh>
      </group>
    </group>
  );
}

export default InteractivePunchingBag;
