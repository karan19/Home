import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

export default function VideoRoofAnimation({ videoSrc = null }) {
  const [texture, setTexture] = useState(null);
  useEffect(() => {
    if (!videoSrc) { setTexture(null); return; }
    const video = document.createElement('video');
    video.playsInline = true;
    video.muted = true;
    video.loop = true;
    video.preload = 'metadata';
    video.src = videoSrc;
    const nextTexture = new THREE.VideoTexture(video);
    nextTexture.colorSpace = THREE.SRGBColorSpace;
    nextTexture.minFilter = THREE.LinearFilter;
    nextTexture.magFilter = THREE.LinearFilter;
    setTexture(nextTexture);
    let disposed = false;
    const syncPlayback = () => {
      if (document.hidden || disposed) video.pause();
      else video.play().then(() => {
        if (document.hidden || disposed) video.pause();
      }).catch(() => { /* The static roof remains usable if autoplay is unavailable. */ });
    };
    document.addEventListener('visibilitychange', syncPlayback);
    syncPlayback();
    return () => {
      disposed = true;
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
      video.removeAttribute('src');
      video.load();
      nextTexture.dispose();
    };
  }, [videoSrc]);

  if (!videoSrc || !texture) return null;
  return (
    <mesh name="Video_Roof_Animation" position={[0, 6.41, 0]}
      rotation-x={-Math.PI / 2} userData={{ skipExport: true }}>
      <planeGeometry args={[8.6, 8.6]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}
