import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Structure from './Structure';
import Stairs from './Stairs';
import Furniture from './Furniture';
import InteriorLights from './InteriorLights';
import VideoRoofAnimation from './VideoRoofAnimation';
// Outside components
import Balcony from './outside/Balcony';
import Compound from './outside/Compound';
import FlyingPaper from './outside/FlyingPaper';
import RolledNewspaper from './outside/RolledNewspaper';
import Car from './outside/Car';
import Gym from './outside/Gym';
import InteractiveElements from './InteractiveElements';
// Outside coordinates
import { OUTSIDE } from '../config/outsideCoordinates';
import { getRandomVideo } from '../config/roofVideos';

function House({ onPolyCountUpdate, dayMode = false }) {
  const groupRef = useRef();
  const { scene } = useThree();
  
  // Select random video once on mount
  const [roofVideo] = useState(() => getRandomVideo());

  // Calculate and update polygon count
  useEffect(() => {
    if (groupRef.current) {
      let totalTriangles = 0;
      groupRef.current.traverse((object) => {
        if (object.isMesh && object.geometry) {
          const geometry = object.geometry;
          if (geometry.index) {
            totalTriangles += geometry.index.count / 3;
          } else if (geometry.attributes.position) {
            totalTriangles += geometry.attributes.position.count / 3;
          }
        }
      });
      onPolyCountUpdate(Math.floor(totalTriangles));
    }
  }, [onPolyCountUpdate]);

  return (
    <group ref={groupRef} name="House">
      {/* Compound: Fence, Ground, Trees, Lights */}
      <Compound dayMode={dayMode} />

      {/* Structure: Foundation, Walls, Floors, Roof */}
      <Structure />

      {/* Stairs */}
      <Stairs />

      {/* Furniture */}
      <Furniture />

      {/* Balcony on upper floor (hanging from front edge) */}
      <Balcony position={OUTSIDE.balcony.position} />

      {/* Interior Lights - Only active in night mode */}
      <InteriorLights active={!dayMode} />

      {/* Interactive Elements - Doors, Punching Bag, Books */}
      <InteractiveElements />

      {/* Flying Paper Animation */}
      <FlyingPaper />

      {/* Rolled Newspaper with Physics */}
      <RolledNewspaper />

      {/* Video Texture on Roof - Random video selected on page load */}
      <VideoRoofAnimation videoSrc={roofVideo} />

      {/* Car Model - GLTF from Sketchfab - Uses centralized config */}
      <Car />

      {/* Gym Equipment - GLTF from Sketchfab - Uses centralized config */}
      <Gym />
    </group>
  );
}

export default House;
