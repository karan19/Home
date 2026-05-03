import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import * as THREE from 'three';
import House from './components/House';
import PostProcessing from './components/PostProcessing';
import WeatherSystem from './components/weather/WeatherSystem';
import SettingsPanel from './components/ui/SettingsPanel';
import CoordinateExplorer from './components/CoordinateExplorer';
import LoadingScreen from './components/LoadingScreen';
import { TIME_BASED_CONFIG, isDayTime } from './config/timeBasedSettings';

// Configure Draco decoder globally
useGLTF.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

function App() {
  // Check if running in development mode
  const isDevelopment = import.meta.env.MODE === 'development';
  
  // Initialize with time-based day/night
  const [autoDayMode, setAutoDayMode] = useState(isDayTime());
  const [autoWeather, setAutoWeather] = useState('clear');
  
  const [settings, setSettings] = useState({
    showGrid: isDevelopment, // Grid only visible in dev mode
    dayMode: isDayTime(), // Auto-detect based on time
    weather: 'clear',
    enabled: true,
    masterVolume: 0.7,
    ambientVolume: 0.5,
    bloom: true,
    bloomIntensity: 0.5,
    ssao: true,
    ssaoIntensity: 30
  });
  
  const [polyCount, setPolyCount] = useState(0);

  // Auto-update day/night mode based on time (real or simulated)
  useEffect(() => {
    const updateDayNight = () => {
      const isDay = isDayTime(isDevelopment);
      setAutoDayMode(isDay);
      setSettings(prev => ({ ...prev, dayMode: isDay }));
    };
    
    // Initial update
    updateDayNight();
    
    // Check every minute (for real time updates)
    const interval = setInterval(updateDayNight, 60000);
    return () => clearInterval(interval);
  }, [isDevelopment]);

  // Force re-render when settings change (for time simulation)
  useEffect(() => {
    const isDay = isDayTime(isDevelopment);
    setAutoDayMode(isDay);
    
    // Update weather based on day/night
    if (!isDay && TIME_BASED_CONFIG.nightWeather.enabled) {
      const randomWeather = TIME_BASED_CONFIG.nightWeather.options[
        Math.floor(Math.random() * TIME_BASED_CONFIG.nightWeather.options.length)
      ];
      setAutoWeather(randomWeather);
      setSettings(prev => ({ ...prev, weather: randomWeather }));
    } else {
      setAutoWeather('clear');
      setSettings(prev => ({ ...prev, weather: 'clear' }));
    }
  }, [settings._timeChanged, isDevelopment]);

  // Auto-update weather at night (random rain/snow)
  useEffect(() => {
    if (!autoDayMode && TIME_BASED_CONFIG.nightWeather.enabled) {
      // It's night time - set random weather
      const randomWeather = TIME_BASED_CONFIG.nightWeather.options[
        Math.floor(Math.random() * TIME_BASED_CONFIG.nightWeather.options.length)
      ];
      setAutoWeather(randomWeather);
      setSettings(prev => ({ ...prev, weather: randomWeather }));
      
      // Change weather periodically at night
      const interval = setInterval(() => {
        const newWeather = TIME_BASED_CONFIG.nightWeather.options[
          Math.floor(Math.random() * TIME_BASED_CONFIG.nightWeather.options.length)
        ];
        setAutoWeather(newWeather);
        setSettings(prev => ({ ...prev, weather: newWeather }));
      }, TIME_BASED_CONFIG.nightWeather.changeIntervalMinutes * 60 * 1000);
      
      return () => clearInterval(interval);
    } else if (autoDayMode) {
      // It's day time - clear weather
      setAutoWeather('clear');
      setSettings(prev => ({ ...prev, weather: 'clear' }));
    }
  }, [autoDayMode]);

  // Dynamic lighting based on day/night mode from settings
  const dayMode = settings.dayMode !== undefined ? settings.dayMode : true;
  const showGrid = settings.showGrid !== undefined ? settings.showGrid : isDevelopment;
  
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
        camera={{
          position: [-10, 10, 22],
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: toneMapExposure,
          outputColorSpace: THREE.SRGBColorSpace
        }}
      >
        <Suspense fallback={null}>
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
            shadow-mapSize-width={1024} // Optimized resolution
            shadow-mapSize-height={1024}
            shadow-camera-left={-10} // Tightened frustum
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            shadow-camera-near={0.5}
            shadow-camera-far={40}
            shadow-bias={-0.0005} // Adjusted for better contact shadows
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

          {/* Coordinate Explorer - Shows preview marker at slider position */}
          {isDevelopment && (
            <CoordinateExplorer 
              previewPosition={{ 
                x: settings.x || 0, 
                y: settings.y || 0, 
                z: settings.z || 0 
              }}
              placedMarkers={[]}
            />
          )}

          {/* Weather System - Sky, Rain, Snow */}
          <WeatherSystem 
            dayMode={dayMode}
            weather={settings.weather}
          />

          {/* Spatial Audio System - Ambient sounds (DISABLED - See AUDIO_SETUP_GUIDE.md) */}
          {/* <SpatialAudioSystem 
            dayMode={dayMode}
            enabled={settings.enabled}
          /> */}

          {/* Post-Processing Effects - Bloom & SSAO */}
          <PostProcessing 
            bloomEnabled={settings.bloom}
            bloomIntensity={settings.bloomIntensity}
            ssaoEnabled={settings.ssao}
            ssaoIntensity={settings.ssaoIntensity}
          />
        </Suspense>
      </Canvas>

      {/* Unified Settings Panel - Only visible in development mode */}
      {isDevelopment && <SettingsPanel onSettingsChange={setSettings} />}
    </div>
  );
}

export default App;
