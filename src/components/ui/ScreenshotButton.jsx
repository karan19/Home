import React from 'react';
import { useThree } from '@react-three/fiber';

/**
 * Screenshot Button Component
 * 
 * Features:
 * - Capture current view as image
 * - Download as PNG
 * - Configurable resolution
 * - Simple button interface
 */

function ScreenshotButton({ enabled = true, resolution = 1920 }) {
  const { gl, scene, camera } = useThree();

  const takeScreenshot = () => {
    try {
      // Get current canvas size
      const width = gl.domElement.width;
      const height = gl.domElement.height;

      // Render at higher resolution if specified
      if (resolution > width) {
        const scale = resolution / width;
        gl.setSize(resolution, height * scale);
        gl.render(scene, camera);
      }

      // Convert canvas to data URL
      const dataURL = gl.domElement.toDataURL('image/png');

      // Restore original size
      gl.setSize(width, height);

      // Create download link
      const link = document.createElement('a');
      link.download = `3d-house-${Date.now()}.png`;
      link.href = dataURL;
      link.click();
    } catch (error) {
      console.error('Screenshot failed:', error);
      alert('Screenshot failed. Please try again.');
    }
  };

  if (!enabled) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}
    >
      <button
        onClick={takeScreenshot}
        style={{
          padding: '12px 24px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(0, 0, 0, 0.9)';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'rgba(0, 0, 0, 0.8)';
          e.target.style.transform = 'scale(1)';
        }}
      >
        📸 Screenshot
      </button>
    </div>
  );
}

export default ScreenshotButton;
