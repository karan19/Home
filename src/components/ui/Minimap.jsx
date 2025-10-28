import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Minimap Component
 * 
 * Features:
 * - Top-down 2D view of the house
 * - Shows camera position and direction
 * - Updates in real-time
 * - Positioned in corner of screen
 */

function Minimap({ enabled = true, size = 200 }) {
  const canvasRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = size;
    canvas.height = size;

    return () => {
      // Cleanup
    };
  }, [enabled, size]);

  useFrame(() => {
    if (!enabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, size, size);

    // Draw border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, size, size);

    // Scale factor (world units to pixels)
    const scale = size / 20; // 20 world units = canvas size
    const centerX = size / 2;
    const centerY = size / 2;

    // Draw house outline (8x8 meters)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    const houseSize = 8 * scale;
    ctx.strokeRect(
      centerX - houseSize / 2,
      centerY - houseSize / 2,
      houseSize,
      houseSize
    );

    // Draw ground floor (filled)
    ctx.fillStyle = 'rgba(100, 100, 100, 0.3)';
    ctx.fillRect(
      centerX - houseSize / 2,
      centerY - houseSize / 2,
      houseSize,
      houseSize
    );

    // Draw upper floor (L-shape)
    ctx.fillStyle = 'rgba(120, 120, 120, 0.3)';
    // Main section
    ctx.fillRect(
      centerX - houseSize / 2,
      centerY - houseSize / 2,
      houseSize,
      houseSize * 0.525
    );
    // Extended section
    ctx.fillRect(
      centerX - houseSize * 0.3875,
      centerY - houseSize / 2 + houseSize * 0.525,
      houseSize * 0.775,
      houseSize * 0.475
    );

    // Draw camera position
    const camX = centerX + camera.position.x * scale;
    const camZ = centerY + camera.position.z * scale;

    // Camera direction indicator
    ctx.save();
    ctx.translate(camX, camZ);
    
    // Calculate camera rotation (looking direction)
    const lookVector = new THREE.Vector3(0, 0, -1);
    lookVector.applyQuaternion(camera.quaternion);
    const angle = Math.atan2(lookVector.x, lookVector.z);
    ctx.rotate(-angle);

    // Draw camera triangle
    ctx.fillStyle = '#00FF00';
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(-6, 6);
    ctx.lineTo(6, 6);
    ctx.closePath();
    ctx.fill();

    // Draw camera outline
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();

    // Draw compass (N indicator)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('N', centerX, 20);

    // Draw scale indicator
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '10px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('8m', 10, size - 10);
  });

  if (!enabled) return null;

  return (
    <Html
      position={[0, 0, 0]}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        pointerEvents: 'none',
        zIndex: 1000
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
        }}
      />
    </Html>
  );
}

export default Minimap;
