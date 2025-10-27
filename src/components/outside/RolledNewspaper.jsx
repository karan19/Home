import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RolledNewspaper() {
  const groupRef = useRef();
  
  // Check visibility - do this AFTER hooks to follow Rules of Hooks
  const hour = new Date().getHours();
  const isVisible = hour >= 6 && hour < 18;

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      const cycleTime = 15; // 15 second cycle
      const animTime = time % cycleTime;

      // Start and end positions
      const startPos = new THREE.Vector3(-8, 3, 10);
      const endPos = new THREE.Vector3(0, 0, 4.5);

      let x, y, z, rotationX, rotationY, rotationZ;

      if (animTime < 2) {
        // Phase 1: Throw arc (0-2 seconds)
        const t = animTime / 2;
        
        // Parabolic arc
        x = THREE.MathUtils.lerp(startPos.x, endPos.x, t);
        z = THREE.MathUtils.lerp(startPos.z, endPos.z, t);
        
        // Parabolic Y (arc peaks in middle)
        const arcHeight = 1.5; // Peak height above start
        y = startPos.y + arcHeight * (1 - Math.pow(2 * t - 1, 2)) + 
            (endPos.y - startPos.y) * t;
        
        // Spinning
        rotationX = time * 4;
        rotationY = 0.3;
        rotationZ = Math.PI / 2;
        
      } else if (animTime < 3) {
        // Phase 2: Settle/bounce (2-3 seconds)
        const t = (animTime - 2);
        const bounce = Math.abs(Math.sin(t * Math.PI * 3)) * 0.05 * (1 - t);
        
        x = endPos.x;
        y = endPos.y + bounce;
        z = endPos.z;
        
        // Smoothly transition rotation from spinning to resting
        // Calculate rotation value at end of Phase 1 (t=2)
        const phase1EndRotX = (2 * 4) % (Math.PI * 2);
        
        // Interpolate from end of Phase 1 to final resting rotation
        rotationX = THREE.MathUtils.lerp(phase1EndRotX, 0, t);
        rotationY = 0.3;
        rotationZ = Math.PI / 2;
        
      } else {
        // Phase 3: Rest (3-15 seconds)
        x = endPos.x;
        y = endPos.y;
        z = endPos.z;
        
        rotationX = 0;
        rotationY = 0.3;
        rotationZ = Math.PI / 2;
      }

      groupRef.current.position.set(x, y, z);
      groupRef.current.rotation.set(rotationX, rotationY, rotationZ);
    }
  });

  return (
    <group ref={groupRef} name="Rolled_Newspaper">
      {/* Main newspaper roll (cylinder) */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.6, 16]} />
        <meshStandardMaterial
          color={0xE8E8E0}
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* Newspaper texture/pages (darker bands) */}
      {[0, 0.2, -0.2].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <cylinderGeometry args={[0.061, 0.061, 0.015, 16]} />
          <meshStandardMaterial
            color={0xD0D0C8}
            roughness={0.95}
            metalness={0.0}
          />
        </mesh>
      ))}

      {/* Rubber band (red) */}
      <mesh castShadow>
        <torusGeometry args={[0.062, 0.005, 8, 16]} />
        <meshStandardMaterial
          color={0xCC0000}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* End caps (show rolled paper edges) */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.055, 0.01, 16]} />
        <meshStandardMaterial
          color={0xF5F5E8}
          roughness={0.95}
          metalness={0.0}
        />
      </mesh>
      <mesh position={[0, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.055, 0.01, 16]} />
        <meshStandardMaterial
          color={0xF5F5E8}
          roughness={0.95}
          metalness={0.0}
        />
      </mesh>
    </group>
  );
}

export default RolledNewspaper;
