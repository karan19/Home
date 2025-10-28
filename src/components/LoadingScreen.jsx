import React from 'react';
import { Html, useProgress } from '@react-three/drei';

/**
 * Loading Screen Component
 * 
 * Displays loading progress for GLTF models and assets
 * Shows percentage and loaded/total items
 */

function LoadingScreen() {
  const { active, progress, errors, item, loaded, total } = useProgress();

  return (
    <Html center>
      <div style={{
        background: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        padding: '40px 60px',
        borderRadius: '12px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        minWidth: '300px'
      }}>
        <h2 style={{ 
          margin: '0 0 20px 0', 
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          Loading 3D House
        </h2>
        
        {/* Progress Bar */}
        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '15px'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #4A90E2, #50C878)',
            transition: 'width 0.3s ease',
            borderRadius: '4px'
          }} />
        </div>
        
        {/* Progress Text */}
        <div style={{ 
          fontSize: '18px', 
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>
          {progress.toFixed(0)}%
        </div>
        
        {/* Items Loaded */}
        <div style={{ 
          fontSize: '14px', 
          opacity: 0.8,
          marginBottom: '10px'
        }}>
          {loaded} / {total} items loaded
        </div>
        
        {/* Current Item */}
        {item && (
          <div style={{ 
            fontSize: '12px', 
            opacity: 0.6,
            marginTop: '10px',
            maxWidth: '250px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            Loading: {item}
          </div>
        )}
        
        {/* Errors */}
        {errors.length > 0 && (
          <div style={{ 
            color: '#FF6B6B', 
            fontSize: '12px', 
            marginTop: '10px' 
          }}>
            {errors.length} error(s) occurred
          </div>
        )}
      </div>
    </Html>
  );
}

export default LoadingScreen;
