import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Interactive Book Component
 * 
 * Features:
 * - Click to open/close book
 * - Smooth page opening animation
 * - Hover effect
 * - Realistic book appearance
 */

function InteractiveBook({ 
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  bookColor = 0x8B4513,
  pageColor = 0xFFFAF0,
  size = { width: 0.15, height: 0.02, depth: 0.22 },
  id = 'book'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const leftPageRef = useRef();
  const rightPageRef = useRef();
  const targetLeftRotation = useRef(0);
  const targetRightRotation = useRef(0);
  const currentLeftRotation = useRef(0);
  const currentRightRotation = useRef(0);

  // Smooth page opening animation
  useFrame(() => {
    if (leftPageRef.current && rightPageRef.current) {
      // Lerp towards target rotation
      currentLeftRotation.current = THREE.MathUtils.lerp(
        currentLeftRotation.current,
        targetLeftRotation.current,
        0.08
      );
      currentRightRotation.current = THREE.MathUtils.lerp(
        currentRightRotation.current,
        targetRightRotation.current,
        0.08
      );
      
      leftPageRef.current.rotation.y = currentLeftRotation.current;
      rightPageRef.current.rotation.y = currentRightRotation.current;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    
    const newState = !isOpen;
    setIsOpen(newState);
    
    // Set target rotations for pages
    const openAngle = Math.PI * 0.4; // 72 degrees
    targetLeftRotation.current = newState ? -openAngle : 0;
    targetRightRotation.current = newState ? openAngle : 0;
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
    <group 
      position={position} 
      rotation={rotation} 
      name={`Interactive_Book_${id}`}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Book cover (bottom) */}
      <RoundedBox
        args={[size.width * 2, size.height, size.depth]}
        radius={0.003}
        smoothness={4}
        position={[0, -size.height / 2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={isHovered ? new THREE.Color(bookColor).multiplyScalar(1.15) : bookColor}
          roughness={0.8}
          metalness={0.0}
        />
      </RoundedBox>

      {/* Binding (spine) */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.01, size.height * 1.5, size.depth]} />
        <meshStandardMaterial
          color={new THREE.Color(bookColor).multiplyScalar(0.8)}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Left page */}
      <group position={[-size.width / 2, 0, 0]}>
        <group ref={leftPageRef}>
          <RoundedBox
            args={[size.width, size.height, size.depth]}
            radius={0.002}
            smoothness={4}
            position={[size.width / 2, 0, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color={pageColor}
              roughness={0.9}
              metalness={0.0}
            />
          </RoundedBox>
        </group>
      </group>

      {/* Right page */}
      <group position={[size.width / 2, 0, 0]}>
        <group ref={rightPageRef}>
          <RoundedBox
            args={[size.width, size.height, size.depth]}
            radius={0.002}
            smoothness={4}
            position={[-size.width / 2, 0, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color={pageColor}
              roughness={0.9}
              metalness={0.0}
            />
          </RoundedBox>
        </group>
      </group>

      {/* Page stack (visible when closed) */}
      {!isOpen && (
        <mesh position={[0, -size.height / 4, 0]}>
          <boxGeometry args={[size.width * 2 - 0.01, size.height / 2, size.depth - 0.01]} />
          <meshStandardMaterial
            color={0xFFFAF0}
            roughness={0.95}
            metalness={0.0}
          />
        </mesh>
      )}
    </group>
  );
}

export default InteractiveBook;
