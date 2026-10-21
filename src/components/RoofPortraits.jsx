import React, { Suspense, useEffect, useState } from 'react';
import { INTERACTIVE_FEATURES } from '../config/interactiveFeatures';
import AnimatedPoster from './interactive/AnimatedPoster';
import RoofQuotes from './RoofQuotes';

const placement = { position: [0, 6.42, 0], rotation: [-Math.PI / 2, 0, 0], size: [5.6, 6.6] };

// Mirror the latest activated portrait above the roof without starting extra audio.
export default function RoofPortraits() {
  const [portrait, setPortrait] = useState(null);
  useEffect(() => {
    const removers = [];
    for (const [name, config] of Object.entries(INTERACTIVE_FEATURES)) {
      if (!config.poster?.image) continue;
      const play = event => setPortrait(current => event.detail
        ? { name, active: true, visit: (current?.visit ?? 0) + 1 }
        : current?.name === name ? { ...current, active: false } : current);
      const end = () => setPortrait(current => current?.name === name ? { ...current, active: false } : current);
      window.addEventListener(config.audio.playEvent, play);
      removers.push(() => window.removeEventListener(config.audio.playEvent, play));
      if (config.audio.endEvent !== config.audio.playEvent) {
        window.addEventListener(config.audio.endEvent, end);
        removers.push(() => window.removeEventListener(config.audio.endEvent, end));
      }
    }
    return () => removers.forEach(remove => remove());
  }, []);
  return <group name="Roof_Portraits" userData={{ skipExport: true }}>
    <mesh position={[0, 6.41, 0]} rotation-x={-Math.PI / 2} raycast={() => null}>
      <planeGeometry args={[8.6, 8.6]} />
      <meshBasicMaterial color="#e8e5da" toneMapped={false} />
    </mesh>
    <RoofQuotes portraitActive={Boolean(portrait?.active)} />
    <Suspense fallback={null}>
      {portrait && <AnimatedPoster key={`${portrait.name}-${portrait.visit}`} featureName={portrait.name} placement={placement} active={portrait.active} />}
    </Suspense>
  </group>;
}
