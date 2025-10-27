import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FlyingPaper() {
  const paperRef = useRef();

  useFrame((state) => {
    if (paperRef.current) {
      const time = state.clock.elapsedTime;
      const cycleTime = 38; // Total: 8s animation + 30s wait
      const animTime = time % cycleTime;

      // Mailbox target position
      const mailboxPos = new THREE.Vector3(-0.05, 1.3, 8.076);
      
      // Start position (high and to the left)
      const startPos = new THREE.Vector3(-8, 4, 12);

      let x, y, z, rotationX, rotationY, rotationZ, scale, visible;

      if (animTime < 5) {
        // Phase 1: Flying Approach (0-5 seconds)
        const t = animTime / 5;
        
        // Bezier curve for smooth arc
        const midPoint = new THREE.Vector3(-2, 3, 10);
        
        const pos = new THREE.Vector3();
        pos.x = (1 - t) * (1 - t) * startPos.x + 2 * (1 - t) * t * midPoint.x + t * t * (-0.05);
        pos.y = (1 - t) * (1 - t) * startPos.y + 2 * (1 - t) * t * midPoint.y + t * t * 2.5;
        pos.z = (1 - t) * (1 - t) * startPos.z + 2 * (1 - t) * t * midPoint.z + t * t * 8.5;
        
        // Add bobbing
        pos.y += Math.sin(time * 2) * 0.15;
        
        x = pos.x;
        y = pos.y;
        z = pos.z;
        
        // Active tumbling
        rotationX = time * 0.8;
        rotationY = time * 0.6;
        rotationZ = time * 1.0;
        scale = 1;
        visible = true;
        
      } else if (animTime < 8) {
        // Phase 2: Descent to Mailbox (5-8 seconds)
        const t = (animTime - 5) / 3;
        const eased = t * t; // Ease in (accelerate)
        
        x = THREE.MathUtils.lerp(-0.05, mailboxPos.x, eased);
        y = THREE.MathUtils.lerp(2.5, mailboxPos.y + 0.2, eased);
        z = THREE.MathUtils.lerp(8.5, mailboxPos.z + 0.1, eased);
        
        // Slow down rotation, start aligning
        const rotSlowdown = 1 - t * 0.7;
        rotationX = time * 0.8 * rotSlowdown;
        rotationY = time * 0.6 * rotSlowdown;
        rotationZ = time * 1.0 * rotSlowdown;
        scale = 1;
        visible = true;
        
      } else if (animTime < 11) {
        // Phase 3: Landing/Insertion (8-11 seconds)
        const t = (animTime - 8) / 3;
        const eased = t * t; // Ease in quadratic (smooth, not too slow)
        
        x = mailboxPos.x;
        // Slow descent from above mailbox into the slot
        y = THREE.MathUtils.lerp(mailboxPos.y + 0.3, mailboxPos.y - 0.1, eased);
        // Slide forward into mailbox
        z = THREE.MathUtils.lerp(mailboxPos.z + 0.2, mailboxPos.z - 0.1, eased);
        
        // Align horizontally and face mailbox
        rotationX = THREE.MathUtils.lerp(0, 0, t);
        rotationY = THREE.MathUtils.lerp(0, Math.PI / 2, Math.min(t * 2, 1)); // Quick align
        rotationZ = THREE.MathUtils.lerp(0, 0, t);
        
        // Keep full size - no compression
        scale = 1.0;
        visible = true;
        
      } else {
        // Phase 4: Wait/Reset (11-38 seconds)
        // Hide paper inside mailbox
        x = mailboxPos.x;
        y = mailboxPos.y;
        z = mailboxPos.z - 0.1; // Inside mailbox
        rotationX = 0;
        rotationY = Math.PI / 2;
        rotationZ = 0;
        scale = 0.01; // Make tiny/invisible
        visible = false;
      }

      paperRef.current.position.set(x, y, z);
      paperRef.current.rotation.set(rotationX, rotationY, rotationZ);
      paperRef.current.scale.set(scale, scale, scale);
      paperRef.current.visible = visible;
    }
  });

  return (
    <mesh ref={paperRef} castShadow>
      <planeGeometry args={[0.21, 0.297]} /> {/* A4 paper size */}
      <meshStandardMaterial
        color={0xFFFFF0}
        roughness={0.9}
        metalness={0.0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default FlyingPaper;
