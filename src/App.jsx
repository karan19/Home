import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import House from './components/House';
import { HOUSE_PALETTES, HousePaletteContext } from './context/HousePalette';
import SceneMetrics from './components/SceneMetrics';
import AdaptiveQuality from './components/AdaptiveQuality';
import { QUALITY, lowerQuality } from './config/renderQuality';
import { usePageVisible } from './hooks/usePageVisible';
import PostProcessing from './components/PostProcessing';
import SceneController from './components/SceneController';
import WeatherSystem from './components/weather/WeatherSystem';
import SceneToolbar from './components/ui/SceneToolbar';
import SettingsPanel from './components/ui/SettingsPanel';
import CoordinateExplorer from './components/CoordinateExplorer';
import LoadingScreen from './components/LoadingScreen';
import { TIME_BASED_CONFIG, isDayTime } from './config/timeBasedSettings';

// Configure Draco decoder globally
useGLTF.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

const getRandomNightWeather = () => {
  const { options } = TIME_BASED_CONFIG.nightWeather;
  if (!options.length) return 'clear';
  return options[Math.floor(Math.random() * options.length)];
};

function RendererSettings({ toneMapExposure }) {
  const { gl } = useThree();

  useEffect(() => {
    gl.toneMappingExposure = toneMapExposure;
  }, [gl, toneMapExposure]);

  return null;
}

function App() {
  const isDevelopment = import.meta.env.MODE === 'development';
  const showDevTools = isDevelopment && new URLSearchParams(window.location.search).get('debug') === '1';
  const [paletteId, setPaletteId] = useState(() => {
    try {
      const saved = localStorage.getItem('home-palette');
      return Object.hasOwn(HOUSE_PALETTES, saved) ? saved : 'sage';
    } catch { return 'sage'; }
  });
  useEffect(() => {
    try { localStorage.setItem('home-palette', paletteId); } catch { /* Storage can be unavailable. */ }
  }, [paletteId]);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  
  const [settings, setSettings] = useState({
    showGrid: showDevTools, // Keep the normal house view free of development helpers
    dayMode: isDayTime(isDevelopment), // Auto-detect based on time
    weather: 'clear',
    enabled: true,
    masterVolume: 0.7,
    ambientVolume: 0.5,
    bloom: true,
    bloomIntensity: 0.2,
    ssao: true,
    ssaoIntensity: 1.5,
    performanceMode: 'Auto'
  });
  
  const visible = usePageVisible();
  const [autoQuality, setAutoQuality] = useState('High');
  const qualityName = settings.performanceMode === 'Auto' ? autoQuality : settings.performanceMode;
  const quality = QUALITY[qualityName] || QUALITY.High;
  const lowerAutoQuality = useCallback(() => setAutoQuality(lowerQuality), []);
  const [metrics, setMetrics] = useState(null);
  const [polyCount, setPolyCount] = useState(0);
  const [modelReady, setModelReady] = useState(false);
  const [sceneActions, setSceneActions] = useState(null);
  const [exportStatus, setExportStatus] = useState('idle');

  const handleSettingsChange = useCallback((nextSettings) => {
    setSettings(prev => ({ ...prev, ...nextSettings }));
  }, []);

  const handleSceneActionsReady = useCallback((actions) => {
    setSceneActions(actions);
  }, []);

  const handleModelReadyChange = useCallback((ready) => {
    setModelReady(ready);
  }, []);

  const handleToggleGrid = useCallback(() => {
    setSettings(prev => ({ ...prev, showGrid: !prev.showGrid }));
  }, []);

  const handleResetCamera = useCallback(() => {
    sceneActions?.resetCamera();
  }, [sceneActions]);

  const handleExportGlb = useCallback(async () => {
    if (!sceneActions || !modelReady || exportStatus === 'exporting') return;

    setExportStatus('exporting');

    try {
      await sceneActions.exportGlb();
      setExportStatus('success');
      window.setTimeout(() => setExportStatus('idle'), 2500);
    } catch (error) {
      console.error('GLB export failed:', error);
      setExportStatus('error');
    }
  }, [exportStatus, sceneActions, modelReady]);

  // Auto-update day/night mode based on time (real or simulated)
  useEffect(() => {
    const updateDayNight = () => {
      const isDay = isDayTime(isDevelopment);
      setSettings(prev => (
        prev.dayMode === isDay ? prev : { ...prev, dayMode: isDay }
      ));
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
    setSettings(prev => (
      prev.dayMode === isDay ? prev : { ...prev, dayMode: isDay }
    ));
  }, [settings._timeChanged, isDevelopment]);

  // Auto-update weather at night (random rain/snow)
  useEffect(() => {
    if (!settings.dayMode && TIME_BASED_CONFIG.nightWeather.enabled) {
      // It's night time - set random weather
      setSettings(prev => ({ ...prev, weather: getRandomNightWeather() }));
      
      // Change weather periodically at night
      const interval = setInterval(() => {
        setSettings(prev => ({ ...prev, weather: getRandomNightWeather() }));
      }, TIME_BASED_CONFIG.nightWeather.changeIntervalMinutes * 60 * 1000);
      
      return () => clearInterval(interval);
    } else if (settings.dayMode) {
      // It's day time - clear weather
      setSettings(prev => (
        prev.weather === 'clear' ? prev : { ...prev, weather: 'clear' }
      ));
    }
  }, [settings.dayMode]);

  // Dynamic lighting based on day/night mode from settings
  const dayMode = settings.dayMode ?? isDayTime(isDevelopment);
  const showGrid = settings.showGrid !== undefined ? settings.showGrid : showDevTools;
  
  const ambientIntensity = dayMode ? 0.45 : 0.18;
  const mainLightIntensity = dayMode ? 2.0 : 0.45;
  const secondaryLightIntensity = dayMode ? 0.65 : 0.15;
  const hemisphereIntensity = dayMode ? 0.75 : 0.25;
  const backgroundColor = dayMode ? '#C8B4D4' : '#1A1A2E';
  const toneMapExposure = dayMode ? 1.0 : 0.85;

  return (
    <HousePaletteContext.Provider value={HOUSE_PALETTES[paletteId]}>
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas
        shadows="soft"
        dpr={[1, quality.dpr]}
        frameloop={visible ? 'always' : 'never'}
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
        {showDevTools && <SceneMetrics onSample={setMetrics} />}
        {settings.performanceMode === 'Auto' && modelReady && visible && <AdaptiveQuality onDecline={lowerAutoQuality} />}

        <Suspense fallback={null}>
          <RendererSettings toneMapExposure={toneMapExposure} />
          <SceneController
            controlsRef={controlsRef}
            modelRef={modelRef}
            onActionsReady={handleSceneActionsReady}
          />

          {/* Controls */}
          <OrbitControls
            makeDefault
            ref={controlsRef}
            enableDamping
            dampingFactor={0.05}
            zoomToCursor
            minDistance={0.75}
            maxDistance={50}
            maxPolarAngle={Math.PI / 2}
            target={[0, 3, 0]}
          />

          {/* Scene Background */}
          <color attach="background" args={[backgroundColor]} />

          {/* Lighting */}
          <ambientLight intensity={ambientIntensity} />
          <directionalLight
            key={quality.shadowSize}
            position={[-3, 8, 12]}
            intensity={mainLightIntensity}
            color="#fff1dd"
            castShadow
            shadow-mapSize-width={quality.shadowSize}
            shadow-mapSize-height={quality.shadowSize}
            shadow-camera-left={-10} // Tightened frustum
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            shadow-camera-near={0.5}
            shadow-camera-far={40}
            shadow-bias={-0.0002}
            shadow-normalBias={0.02}
          />
          <directionalLight position={[8, 5, 8]} color="#e2eaff" intensity={secondaryLightIntensity} />
          <hemisphereLight args={['#f3f5ff', '#8d7960', hemisphereIntensity]} />

          {/* Grid Helper */}
          {showGrid && <gridHelper args={[20, 20, 0x888888, 0xcccccc]} />}

          {/* House Model */}
          <House
            dayMode={dayMode}
            interiorShadows={quality.interiorShadows}
            modelRef={modelRef}
            onModelReadyChange={handleModelReadyChange}
            onPolyCountUpdate={setPolyCount}
          />

          {/* Coordinate Explorer - Shows preview marker at slider position */}
          {showDevTools && (
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
            bloomEnabled={settings.bloom && quality.bloom}
            bloomIntensity={settings.bloomIntensity}
            ssaoEnabled={settings.ssao && quality.ssao}
            ssaoIntensity={settings.ssaoIntensity}
          />
        </Suspense>
      </Canvas>
      <LoadingScreen sceneReady={modelReady} />

      {showDevTools && metrics && <output data-testid="scene-metrics" data-metrics={JSON.stringify(metrics)} style={{position:'absolute',left:16,bottom:16,color:'#fff',background:'#222b',padding:'6px 10px',borderRadius:8,font:'11px monospace',pointerEvents:'none'}}>{qualityName} · {metrics.frameMs} ms · {metrics.calls} draws · DPR {metrics.dpr}</output>}
      {showDevTools && <SceneToolbar
        paletteId={paletteId}
        onPaletteChange={setPaletteId}
        canExport={Boolean(sceneActions && modelReady)}
        exportStatus={exportStatus}
        polyCount={polyCount}
        showGrid={showGrid}
        onExport={handleExportGlb}
        onResetCamera={handleResetCamera}
        onToggleGrid={handleToggleGrid}
      />}

      {/* Development tools are opt-in via ?debug=1 */}
      {showDevTools && (
        <SettingsPanel onSettingsChange={handleSettingsChange} />
      )}
    </div>
    </HousePaletteContext.Provider>
  );
}

export default App;
