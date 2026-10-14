import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

// Development-only whole-frame counters, including shadow and composer passes.
export default function SceneMetrics({ onSample }) {
  const gl = useThree((state) => state.gl);
  const samples = useRef([]);
  useEffect(() => {
    const previous = gl.info.autoReset;
    gl.info.autoReset = false;
    return () => { gl.info.autoReset = previous; };
  }, [gl]);
  useFrame((state, delta) => {
    if (!document.hidden && delta > 0 && delta < 0.25 && gl.info.render.calls) {
      samples.current.push({ ms: delta * 1000, calls: gl.info.render.calls });
      if (samples.current.length >= 120) {
        const frames = samples.current;
        const times = frames.map((frame) => frame.ms).sort((a, b) => a - b);
        onSample({
          frameMs: Number(times[Math.floor(times.length / 2)].toFixed(1)),
          calls: Math.round(frames.reduce((sum, frame) => sum + frame.calls, 0) / frames.length),
          dpr: gl.getPixelRatio(),
          geometries: gl.info.memory.geometries,
          textures: gl.info.memory.textures,
        });
        samples.current = [];
      }
    }
    gl.info.reset();
  }, -100);
  return null;
}
