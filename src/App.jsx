import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import * as THREE from 'three';
import House from './components/House';
import UI from './components/UI';
import CoordinateExplorer from './components/CoordinateExplorer';
import PostProcessing from './components/PostProcessing';

function App() {
  const [showGrid, setShowGrid] = useState(true);
  
  // Initialize dayMode based on current time
  const [dayMode, setDayMode] = useState(() => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18; // Day if 6 AM - 6 PM
  });
  
  const [polyCount, setPolyCount] = useState(0);
  
  // Coordinate Explorer state
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0, z: 0 });
  const [placedMarkers, setPlacedMarkers] = useState([]);

  // Auto-update theme based on time of day
  useEffect(() => {
    const updateTheme = () => {
      const hour = new Date().getHours();
      setDayMode(hour >= 6 && hour < 18);
    };
    
    // Check every minute
    const interval = setInterval(updateTheme, 60000);
    return () => clearInterval(interval);
  }, []);

  // Dynamic lighting based on day/night mode
  const ambientIntensity = dayMode ? 0.25 : 0.1;
  const mainLightIntensity = dayMode ? 1.0 : 0.3;
  const secondaryLightIntensity = dayMode ? 0.2 : 0.05;
  const hemisphereIntensity = dayMode ? 0.3 : 0.1;
  const backgroundColor = dayMode ? '#C8B4D4' : '#1A1A2E';
  const toneMapExposure = dayMode ? 1.0 : 0.7;

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas
        shadows
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: toneMapExposure,
          outputColorSpace: THREE.SRGBColorSpace
        }}
      >
        {/* Camera - Front-Left Wide Angle View */}
        <PerspectiveCamera
          makeDefault
          position={[-10, 10, 22]}
          fov={50}
          near={0.1}
          far={1000}
        />

        {/* Controls */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={50}
          maxPolarAngle={Math.PI / 2}
          target={[0, 3, 0]}
        />

        {/* Scene Background */}
        <color attach="background" args={[backgroundColor]} />

        {/* Lighting */}
        <ambientLight intensity={ambientIntensity} />
        <directionalLight
          position={[10, 15, 10]}
          intensity={mainLightIntensity}
          color="#FFE4B5"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
          shadow-camera-near={0.1}
          shadow-camera-far={50}
          shadow-bias={-0.0001}
        />
        <directionalLight position={[-10, 10, -10]} intensity={secondaryLightIntensity} />
        <hemisphereLight args={['#ffffff', '#888888', hemisphereIntensity]} />

        {/* Grid Helper */}
        {showGrid && <gridHelper args={[20, 20, 0x888888, 0xcccccc]} />}

        {/* Physics World */}
        <Physics gravity={[0, -9.81, 0]}>
          {/* House Model */}
          <House 
            onPolyCountUpdate={setPolyCount}
            dayMode={dayMode}
          />
        </Physics>

        {/* Coordinate Explorer with Markers */}
        <CoordinateExplorer 
          previewPosition={previewPosition}
          placedMarkers={placedMarkers}
        />

        {/* Post-Processing Effects - Bloom & SSAO */}
        <PostProcessing />
      </Canvas>

      {/* UI Overlay */}
      <UI
        polyCount={polyCount}
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid(!showGrid)}
        dayMode={dayMode}
        onToggleDayMode={() => setDayMode(!dayMode)}
        previewPosition={previewPosition}
        onPreviewPositionChange={setPreviewPosition}
        placedMarkers={placedMarkers}
        onPlaceMarker={() => {
          setPlacedMarkers([...placedMarkers, { 
            id: Date.now(), 
            ...previewPosition 
          }]);
        }}
        onDeleteMarker={(id) => {
          setPlacedMarkers(placedMarkers.filter(m => m.id !== id));
        }}
        onClearMarkers={() => setPlacedMarkers([])}
      />
    </div>
  );
}

export default App;
