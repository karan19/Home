import React from 'react';

function InteriorLights({ active = false }) {
  if (!active) return null;

  return (
    <group name="Interior_Lights">
      {/* Ground Floor - Living Room Ceiling Light */}
      <pointLight
        position={[1.5, 2.0, 1.5]}
        intensity={1.1}
        distance={1.8}
        decay={3.0}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={0.1}
        shadow-camera-far={3}
      />

      {/* Ground Floor - Kitchen Ceiling Light */}
      <pointLight
        position={[-1.5, 2.0, -2.5]}
        intensity={1.1}
        distance={1.8}
        decay={3.0}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={0.1}
        shadow-camera-far={3}
      />

      {/* Ground Floor - Above Sofa (enhanced intensity) */}
      <pointLight
        position={[1.5, 2.0, 1.0]}
        intensity={1.3}
        distance={1.8}
        decay={3.0}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={0.1}
        shadow-camera-far={3}
      />

      {/* Upper Floor - Bedroom Ceiling Light */}
      <pointLight
        position={[2.5, 5.8, -2.5]}
        intensity={0.7}
        distance={4}
        decay={2}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={0.1}
        shadow-camera-far={8}
      />

      {/* Desk Lamp on Work Desk (converted to PointLight) */}
      <pointLight
        position={[-3, 4.2, -2]}
        intensity={1.0}
        distance={2.5}
        decay={2}
        color="#FFFFEE"
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={0.1}
        shadow-camera-far={5}
      />
    </group>
  );
}

export default InteriorLights;
