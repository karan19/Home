import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import NightSky from './NightSky';
import * as THREE from 'three';

/**
 * Weather System Component
 * 
 * Features:
 * - Dynamic sky with realistic sun position
 * - Rain particle system
 * - Seasonal variations
 * - Day/night cycle support
 */

function WeatherSystem({ 
  dayMode = true,
  weather = 'clear' // 'clear', 'rain', 'snow'
}) {
  const rainRef = useRef();
  const snowRef = useRef();

  // Sky configuration based on day/night
  const skyConfig = useMemo(() => {
    if (dayMode) {
      return {
        sunPosition: [100, 20, 100],
        turbidity: 8,
        rayleigh: 1,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.8,
        elevation: 2,
        azimuth: 180
      };
    } else {
      return {
        sunPosition: [100, -20, 100],
        turbidity: 10,
        rayleigh: 0.5,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.8,
        elevation: -2,
        azimuth: 180
      };
    }
  }, [dayMode]);

  // Rain particles (reduced for performance)
  const rainParticles = useMemo(() => {
    if (weather !== 'rain') return null;

    const count = 500; // Reduced from 1000
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30; // X
      positions[i * 3 + 1] = Math.random() * 15; // Y (height)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30; // Z
      velocities[i] = 0.1 + Math.random() * 0.2;
    }

    return { positions, velocities, count };
  }, [weather]);

  // Snow particles (reduced for performance)
  const snowParticles = useMemo(() => {
    if (weather !== 'snow') return null;

    const count = 250; // Reduced from 500
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30; // X
      positions[i * 3 + 1] = Math.random() * 15; // Y (height)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30; // Z
      velocities[i] = 0.02 + Math.random() * 0.03; // Slower than rain
    }

    return { positions, velocities, count };
  }, [weather]);

  // Animate rain and snow
  useFrame((state, delta) => {
    const frameScale = Math.min(delta, 0.05) * 60;
    // Animate rain
    if (rainRef.current && weather === 'rain' && rainParticles) {
      const positions = rainRef.current.geometry.attributes.position.array;
      
      for (let i = 0; i < rainParticles.count; i++) {
        positions[i * 3 + 1] -= rainParticles.velocities[i] * frameScale;
        
        if (positions[i * 3 + 1] < 0) {
          positions[i * 3 + 1] = 15;
          positions[i * 3] = (Math.random() - 0.5) * 30;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }
      }
      
      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Animate snow
    if (snowRef.current && weather === 'snow' && snowParticles) {
      const positions = snowRef.current.geometry.attributes.position.array;
      
      for (let i = 0; i < snowParticles.count; i++) {
        // Move snow down slowly
        positions[i * 3 + 1] -= snowParticles.velocities[i] * frameScale;
        
        // Add gentle side-to-side drift
        positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.01 * frameScale;
        
        // Reset to top when hits ground
        if (positions[i * 3 + 1] < 0) {
          positions[i * 3 + 1] = 15;
          positions[i * 3] = (Math.random() - 0.5) * 30;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }
      }
      
      snowRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group name="Weather_System">
      {/* Dynamic Sky */}
      {dayMode && <Sky
        distance={450000}
        sunPosition={skyConfig.sunPosition}
        inclination={0}
        azimuth={0.25}
        {...skyConfig}
      />}
      {!dayMode && weather === 'clear' && <NightSky />}

      {/* Rain Particles */}
      {weather === 'rain' && rainParticles && (
        <points ref={rainRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={rainParticles.count}
              array={rainParticles.positions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.05}
            color={0xADD8E6}
            transparent
            opacity={0.6}
            sizeAttenuation={true}
          />
        </points>
      )}

      {/* Snow Particles */}
      {weather === 'snow' && snowParticles && (
        <points ref={snowRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={snowParticles.count}
              array={snowParticles.positions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.1}
            color={0xFFFFFF}
            transparent
            opacity={0.8}
            sizeAttenuation={true}
          />
        </points>
      )}
    </group>
  );
}

export default WeatherSystem;
