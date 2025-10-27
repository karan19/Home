import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Structure from './Structure';
import Stairs from './Stairs';
import Furniture from './Furniture';
import Balcony from './Balcony';
import Compound from './Compound';
import GridSystem from './GridSystem';
import InteriorLights from './InteriorLights';
import FlyingPaper from './FlyingPaper';
import RolledNewspaper from './RolledNewspaper';

function House({ onPolyCountUpdate, showFloorGrids = false, showWallGrids = false, dayMode = false }) {
  const groupRef = useRef();
  const { scene } = useThree();

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
      <Balcony position={[0.9, 3, 4.5]} />

      {/* Grid System - Floor and Wall Grids */}
      <GridSystem showFloorGrids={showFloorGrids} showWallGrids={showWallGrids} />

      {/* Interior Lights - Only active in night mode */}
      <InteriorLights active={!dayMode} />

      {/* Flying Paper Animation */}
      <FlyingPaper />

      {/* Rolled Newspaper with Physics */}
      <RolledNewspaper />
    </group>
  );
}

export default House;
