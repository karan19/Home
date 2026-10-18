import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function NightSky() {
  const meteor = useRef();
  const elapsed = useRef(0);
  const motionPreference = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)'), []);
  const stars = useMemo(() => {
    let seed = 731;
    const random = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
    const positions = new Float32Array(650 * 3);
    for (let i = 0; i < 650; i++) {
      const azimuth = random() * Math.PI * 2;
      const y = .12 + random() * .88;
      const radius = Math.sqrt(1 - y * y);
      positions.set([Math.cos(azimuth) * radius * 160, y * 160, Math.sin(azimuth) * radius * 160], i * 3);
    }
    return positions;
  }, []);
  const trail = useMemo(() => {
    const positions = new Float32Array(24 * 3), colors = new Float32Array(24 * 3);
    for (let i = 0; i < 24; i++) {
      const t = i / 23;
      positions.set([-t * 9, t * 3, 0], i * 3);
      colors.set([(1 - t) * .85, (1 - t) * .9, 1 - t], i * 3);
    }
    return { positions, colors };
  }, []);
  useFrame((_, delta) => {
    if (!meteor.current) return;
    elapsed.current += Math.min(delta, .1);
    const phase = elapsed.current % 32;
    const reducedMotion = motionPreference.matches;
    meteor.current.visible = !reducedMotion && phase > 12 && phase < 13.3;
    if (meteor.current.visible) {
      const t = (phase - 12) / 1.3;
      meteor.current.position.set(-45 + t * 45, 65 - t * 15, -95);
      meteor.current.material.opacity = Math.sin(t * Math.PI) * .75;
    }
  });
  return <group name="Clear_Evening_Stars">
    <points raycast={() => null}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[stars, 3]} /></bufferGeometry>
      <shaderMaterial transparent depthWrite={false} toneMapped={false}
        vertexShader={`void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);gl_PointSize=2.0;}`}
        fragmentShader={`void main(){float d=length(gl_PointCoord-0.5);float a=1.0-smoothstep(0.05,0.5,d);gl_FragColor=vec4(0.78,0.84,1.0,a*0.7);}`} />
    </points>
    <line ref={meteor} visible={false} raycast={() => null}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[trail.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[trail.colors, 3]} />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent depthWrite={false} toneMapped={false} />
    </line>
  </group>;
}
