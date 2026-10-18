import { TVPlaybackProvider } from '../context/TVPlaybackContext';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import Structure from './Structure';
import AssetBoundary from './AssetBoundary';
import * as THREE from 'three';
import Stairs from './Stairs';
import StairReader from './character/StairReader';
import DeskTyper from './character/DeskTyper';
import DipsResident from './character/DipsResident';
import BookshelfResident from './character/BookshelfResident';
import TVResident from './character/TVResident';
import BoxingResident from './character/BoxingResident';
import CookingResident from './character/CookingResident';
import IslandResident from './character/IslandResident';
import MeditationResident from './character/MeditationResident';
import Stargazer from './character/Stargazer';
import CoffeeResident from './character/CoffeeResident';
import Furniture from './Furniture';
import { ResidentProvider } from '../context/ResidentContext';
import LofiResident from './character/LofiResident';
import InteriorLights from './InteriorLights';
import RoofPortraits from './RoofPortraits';
// Outside components
import Balcony from './outside/Balcony';
import Compound from './outside/Compound';
import RoofEdgeLighting from './outside/RoofEdgeLighting';
import FlyingPaper from './outside/FlyingPaper';
import RolledNewspaper from './outside/RolledNewspaper';
import Car from './outside/Car';
import Gym from './outside/Gym';
import InteractiveElements from './InteractiveElements';
// Outside coordinates
import { OUTSIDE } from '../config/outsideCoordinates';

const EXTERIOR_DELAY_MS = 900;

function House({
  dayMode = false,
  interiorShadows = true,
  modelRef,
  onModelReadyChange = () => {},
  onPolyCountUpdate = () => {}
}) {
  const groupRef = useRef();
  const [loaded, setLoaded] = useState({});
  const handleAssetReady = useCallback((id, ready) => {
    setLoaded(previous => previous[id] === ready ? previous : { ...previous, [id]: ready });
  }, []);
  const allReady = Boolean(loaded.furniture && loaded.car && loaded.gym && loaded.resident && loaded.stairReader && loaded.deskTyper && loaded.dipsResident && loaded.bookshelfResident && loaded.tvResident && loaded.boxingResident && loaded.coffeeResident && loaded.cookingResident && loaded.islandResident && loaded.meditationResident && loaded.stargazer);
  useEffect(() => {
    onModelReadyChange(allReady);
    return () => onModelReadyChange(false);
  }, [allReady, onModelReadyChange]);
  const [exteriorReady, setExteriorReady] = useState(false);
  

  // Preload exterior GLTF assets during the introductory animation
  useEffect(() => {
    useGLTF.preload(OUTSIDE.car.modelPath);
    useGLTF.preload(OUTSIDE.gym.modelPath);
  }, []);

  const setGroupRef = useCallback((node) => {
    groupRef.current = node;

    if (modelRef) {
      modelRef.current = node;
    }


  }, [modelRef]);

  // Calculate and update polygon count
  useEffect(() => {
    if (groupRef.current) {
      let totalTriangles = 0;
      groupRef.current.updateWorldMatrix(true, true);
      const size = new THREE.Vector3();
      groupRef.current.traverse((object) => {
        if (object.isMesh && object.geometry) {
          const geometry = object.geometry;
          if (object.userData.skipExport) return;
          // Give untextured opaque props a consistent satin finish. Preserve media,
          // glass, emissive displays, and authored imported texture materials.
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          for (const material of materials) {
            if (material?.isMeshStandardMaterial && !material.map && !material.transparent
                && (!material.emissive || material.emissive.getHex() === 0)) {
              material.roughness = Math.max(material.roughness, 0.65);
            }
          }
          geometry.computeBoundingBox();
          geometry.boundingBox.clone().applyMatrix4(object.matrixWorld).getSize(size);
          if (allReady && Math.max(size.x, size.y, size.z) < 0.15) object.castShadow = false;
          if (geometry.index) {
            totalTriangles += geometry.index.count / 3;
          } else if (geometry.attributes.position) {
            totalTriangles += geometry.attributes.position.count / 3;
          }
        }
      });
      onPolyCountUpdate(Math.floor(totalTriangles));
    }
  }, [loaded, allReady, exteriorReady, onPolyCountUpdate]);

  // Defer exterior spawn for performance and staging animation
  useEffect(() => {
    const timeout = setTimeout(() => setExteriorReady(true), EXTERIOR_DELAY_MS);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <ResidentProvider><TVPlaybackProvider><group ref={setGroupRef} name="House">
      {/* Compound: Fence, Ground, Trees, Lights */}
      <Compound dayMode={dayMode} />

      {/* Structure: Foundation, Walls, Floors, Roof */}
      <Structure />
      <RoofEdgeLighting active={!dayMode} />

      {/* Stairs */}
      <Stairs />
      <AssetBoundary id="stairReader" onReady={handleAssetReady}><StairReader /><StairReader placement="reading" /></AssetBoundary>
      <AssetBoundary id="deskTyper" onReady={handleAssetReady}><DeskTyper /></AssetBoundary>
      <AssetBoundary id="dipsResident" onReady={handleAssetReady}><DipsResident /></AssetBoundary>
      <AssetBoundary id="bookshelfResident" onReady={handleAssetReady}><BookshelfResident /></AssetBoundary>
      <AssetBoundary id="tvResident" onReady={handleAssetReady}><TVResident /></AssetBoundary>
      <AssetBoundary id="cookingResident" onReady={handleAssetReady}><CookingResident /></AssetBoundary>
      <AssetBoundary id="islandResident" onReady={handleAssetReady}><IslandResident /></AssetBoundary>
      <AssetBoundary id="meditationResident" onReady={handleAssetReady}><MeditationResident /></AssetBoundary>
      <AssetBoundary id="stargazer" onReady={handleAssetReady}><Stargazer /></AssetBoundary>
      <AssetBoundary id="coffeeResident" onReady={handleAssetReady}><CoffeeResident /></AssetBoundary>
      <AssetBoundary id="boxingResident" onReady={handleAssetReady}><BoxingResident /></AssetBoundary>

      {/* Furniture */}
      <AssetBoundary id="furniture" onReady={handleAssetReady}><Furniture /></AssetBoundary>

      <AssetBoundary id="resident" onReady={handleAssetReady}><LofiResident /></AssetBoundary>

      {/* Balcony on upper floor (hanging from front edge) */}
      <Balcony position={OUTSIDE.balcony.position} />

      {/* Interior Lights - Only active in night mode */}
      <InteriorLights active={!dayMode} shadows={interiorShadows} />

      {/* Interactive Elements - Doors and shared scene controls */}
      <InteractiveElements />

      {/* Flying Paper Animation */}
      <FlyingPaper />

      {/* Rolled Newspaper */}
      <RolledNewspaper />

      {/* Video Texture on Roof - Random video selected on page load */}
      <RoofPortraits />

      {/* Exterior assets */}
      {exteriorReady && (
        <>
          <AssetBoundary id="car"><Car onReady={handleAssetReady} /></AssetBoundary>
          <AssetBoundary id="gym" onReady={handleAssetReady}><Gym /></AssetBoundary>
        </>
      )}
    </group></TVPlaybackProvider></ResidentProvider>
  );
}

export default House;
