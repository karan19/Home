import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { createQualityMonitor } from '../utils/qualityMonitor';

export default function AdaptiveQuality({ onDecline }) {
  const monitor = useRef(null);
  if (!monitor.current) monitor.current = createQualityMonitor();
  useFrame((_, delta) => {
    if (monitor.current(delta, !document.hidden)) onDecline();
  });
  return null;
}
