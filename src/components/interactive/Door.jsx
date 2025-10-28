import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { interactionManager } from '../../utils/interactionManager';

/**
 * Interactive Door Component
 * 
 * Features:
 * - Click to open/close with smooth animation
 * - Hover effect (cursor change)
 * - Configurable position, size, and swing direction
 * - Door handle with realistic placement
 */

function Door({ 
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 0.9,
  height = 2.1,
  depth = 0.05,
  swingDirection = 'left', // 'left' or 'right'
  doorColor = 0x8B7355,
  handleColor = 0xC0C0C0,
  id = 'door'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const doorRef = useRef();
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);

  // Smooth door animation
  useFrame(() => {
    if (doorRef.current) {
      // Lerp towards target rotation for smooth animation
      currentRotation.current = THREE.MathUtils.lerp(
        currentRotation.current,
        targetRotation.current,
        0.1 // Animation speed
      );
      
      doorRef.current.rotation.y = currentRotation.current;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    
    const newState = !isOpen;
    setIsOpen(newState);
    
    // Calculate target rotation based on swing direction
    const maxRotation = Math.PI / 2; // 90 degrees
    targetRotation.current = newState 
      ? (swingDirection === 'left' ? -maxRotation : maxRotation)
      : 0;
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

  // Handle position based on swing direction
  const hingeOffset = swingDirection === 'left' ? -width / 2 : width / 2;

  return (
    <group position={position} rotation={rotation} name={`Door_${id}`}>
      {/* Door pivot point (hinge) */}
      <group position={[hingeOffset, 0, 0]}>
        <group ref={doorRef}>
          {/* Door panel */}
          <RoundedBox
            args={[width, height, depth]}
            radius={0.02}
            smoothness={4}
            position={[-hingeOffset, height / 2, 0]}
            castShadow
            receiveShadow
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          >
            <meshStandardMaterial
              color={isHovered ? new THREE.Color(doorColor).multiplyScalar(1.1) : doorColor}
              roughness={0.6}
              metalness={0.1}
            />
          </RoundedBox>

          {/* Door handle - opposite side from hinge */}
          <group position={[
            swingDirection === 'left' ? -0.15 : -width + 0.15,
            height / 2,
            depth / 2 + 0.02
          ]}>
            {/* Handle base (cylinder) */}
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.015, 0.015, 0.12, 12]} />
              <meshStandardMaterial
                color={handleColor}
                roughness={0.3}
                metalness={0.8}
              />
            </mesh>
            
            {/* Handle knob */}
            <mesh position={[0.06, 0, 0]} castShadow>
              <sphereGeometry args={[0.02, 12, 12]} />
              <meshStandardMaterial
                color={handleColor}
                roughness={0.3}
                metalness={0.8}
              />
            </mesh>
          </group>

          {/* Door panels (decorative) */}
          {[
            [-hingeOffset, height * 0.3, depth / 2 + 0.001],
            [-hingeOffset, height * 0.7, depth / 2 + 0.001]
          ].map((pos, i) => (
            <mesh key={i} position={pos}>
              <boxGeometry args={[width * 0.7, height * 0.3, 0.01]} />
              <meshStandardMaterial
                color={new THREE.Color(doorColor).multiplyScalar(0.95)}
                roughness={0.7}
                metalness={0.05}
              />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

export default Door;
