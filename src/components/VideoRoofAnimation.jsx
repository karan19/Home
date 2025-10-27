import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

/**
 * Video Texture Roof Animation
 * 
 * Displays a video on the roof surface using Three.js VideoTexture
 * 
 * To use your own video:
 * 1. Place video file in public/ folder (e.g., public/roof-animation.mp4)
 * 2. Update videoSrc prop or default value below
 * 3. Supported formats: MP4, WebM, OGG
 * 
 * Video will:
 * - Cover entire roof (8.6m × 8.6m)
 * - Only visible from above (not from inside)
 * - Auto-play and loop
 * - Hardware accelerated (excellent performance)
 */

function VideoRoofAnimation({ videoSrc = null }) {
  const videoRef = useRef(null);
  const textureRef = useRef(null);

  // Create video element and texture
  const { video, texture } = useMemo(() => {
    const video = document.createElement('video');
    video.playsInline = true;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    
    // If video source provided, set it
    if (videoSrc) {
      video.src = videoSrc;
      video.load();
    }
    
    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;
    
    return { video, texture };
  }, [videoSrc]);

  videoRef.current = video;
  textureRef.current = texture;

  // Start video playback
  useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay prevented:', err);
      });
    }
  }, [videoSrc]);

  // Roof dimensions: 8.6m × 8.6m, top surface at Y=6.4
  return (
    <mesh 
      position={[0, 6.41, 0]} 
      rotation-x={-Math.PI / 2}
      receiveShadow
    >
      <planeGeometry args={[8.6, 8.6]} />
      <meshStandardMaterial 
        map={videoSrc ? texture : null}
        color={videoSrc ? "#ffffff" : "#00ff00"}
        side={THREE.FrontSide}
        emissive={videoSrc ? "#000000" : "#001100"}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

export default VideoRoofAnimation;

/* 
 * USAGE EXAMPLES:
 * 
 * 1. With video file:
 *    <VideoRoofAnimation videoSrc="/roof-animation.mp4" />
 * 
 * 2. Without video (shows green placeholder):
 *    <VideoRoofAnimation />
 * 
 * 3. Creating your video:
 *    - Recommended resolution: 1920×1920 (square, high quality)
 *    - Format: MP4 (H.264) for best compatibility
 *    - Duration: Any length (will loop)
 *    - Can create in: After Effects, Blender, Premiere, etc.
 */
