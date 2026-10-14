import React from 'react';

export default function InteriorLights({ active = false, shadows = true }) {
  if (!active) return null;
  return (
    <group name="Interior_Lights">
      {/* Only the living-room key casts a cube shadow; fills need no shadow maps. */}
      <pointLight position={[1.5, 2.35, 1]} intensity={5} distance={5} decay={2}
        color="#ffe5bf" castShadow={shadows} shadow-mapSize={[512, 512]}
        shadow-camera-near={0.15} shadow-camera-far={5}
        shadow-bias={-0.0003} shadow-normalBias={0.02} />
      <pointLight position={[-1.8, 2.4, -2]} intensity={4} distance={4.5} decay={2} color="#ffe5bf" />
      <pointLight position={[2.5, 5.6, -2.5]} intensity={4} distance={4.5} decay={2} color="#ffe5bf" />
      <pointLight position={[-3, 4.2, -2]} intensity={1.5} distance={2.5} decay={2} color="#ffdfad" />
    </group>
  );
}
