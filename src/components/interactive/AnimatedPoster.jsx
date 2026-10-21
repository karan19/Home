import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { portraitSvgLoader } from './portraitSvgLoader';
import { getFeatureConfig } from '../../config/interactiveFeatures';

function AnimatedPoster({ featureName, placement, active }) {
  const config = getFeatureConfig(featureName);
  const svg = useLoader(portraitSvgLoader, config.poster.image);
  const groupRef = useRef();
  const fillRef = useRef();
  const strokeRef = useRef();
  const animation = useRef({ playing: false, elapsed: 0, opacity: 0 });
  const [width, height] = placement?.size ?? config.poster.size;

  const preserveColors = Boolean(config.poster.preserveColors);
  const artwork = useMemo(() => {
    let fill;
    if (preserveColors) {
      // Retain SVG paint order and colors: flattening a crest into one dark fill
      // loses the cross, stripes, lettering, and ball inside the shield.
      const layers = svg.paths.filter(path => path.userData?.style?.fill !== 'none').map((path, index) => {
        const geometry = new THREE.ShapeGeometry(SVGLoader.createShapes(path), 8).toNonIndexed();
        geometry.translate(0, 0, index * 0.0001);
        const colors = new Float32Array(geometry.attributes.position.count * 3);
        for (let i = 0; i < colors.length; i += 3) path.color.toArray(colors, i);
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        return geometry;
      });
      fill = mergeGeometries(layers);
      layers.forEach(geometry => geometry.dispose());
    } else {
      const shapes = svg.paths.flatMap(path => SVGLoader.createShapes(path));
      fill = new THREE.ShapeGeometry(shapes, 8);
    }
    fill.computeBoundingBox();
    const center = fill.boundingBox.getCenter(new THREE.Vector3());
    const size = fill.boundingBox.getSize(new THREE.Vector3());
    const scale = Math.min(width / size.x, height / size.y);
    fill.translate(-center.x, -center.y, 0);
    fill.scale(scale, -scale, 1);

    // Independent segments avoid joining unrelated contours as the drawing grows.
    const vertices = [];
    for (const path of svg.paths) {
      for (const contour of path.subPaths) {
        const points = contour.getPoints(8);
        if (points.length > 1 && !points[0].equals(points.at(-1))) points.push(points[0]);
        for (let i = 1; i < points.length; i++) {
          for (const point of [points[i - 1], points[i]]) {
            vertices.push((point.x - center.x) * scale, -(point.y - center.y) * scale, 0.001);
          }
        }
      }
    }
    const outline = new THREE.BufferGeometry();
    outline.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    outline.setDrawRange(0, 0);
    return { fill, outline, segments: vertices.length / 6 };
  }, [svg, width, height, preserveColors]);

  useEffect(() => () => {
    artwork.fill.dispose();
    artwork.outline.dispose();
  }, [artwork]);

  useEffect(() => {
    const onPlay = event => {
      const state = animation.current;
      state.playing = Boolean(event.detail);
      if (state.playing) {
        state.elapsed = 0;
        state.opacity = 0;
      }
    };
    const onEnd = () => { animation.current.playing = false; };
    window.addEventListener(config.audio.playEvent, onPlay);
    if (config.audio.endEvent !== config.audio.playEvent) window.addEventListener(config.audio.endEvent, onEnd);
    return () => {
      window.removeEventListener(config.audio.playEvent, onPlay);
      if (config.audio.endEvent !== config.audio.playEvent) window.removeEventListener(config.audio.endEvent, onEnd);
    };
  }, [config.audio.playEvent, config.audio.endEvent]);

  // Roof copies receive activation from their parent; wall copies keep their events.
  useEffect(() => {
    if (active === undefined) return;
    animation.current.playing = active;
    if (active) { animation.current.elapsed = 0; animation.current.opacity = 0; }
  }, [active]);

  useFrame((_, delta) => {
    const state = animation.current;
    if (!state.playing && state.opacity < 0.001) {
      groupRef.current.visible = false;
      return;
    }
    const dt = Math.min(delta, 0.1);
    if (state.playing) state.elapsed += dt;
    state.opacity = THREE.MathUtils.damp(state.opacity, state.playing ? 1 : 0, 8, dt);
    const progress = THREE.MathUtils.clamp(state.elapsed / 2.4, 0, 1);
    const fillProgress = THREE.MathUtils.smoothstep(state.elapsed, 1.9, 3.1);
    artwork.outline.setDrawRange(0, Math.floor(artwork.segments * progress) * 2);
    strokeRef.current.opacity = state.opacity * (1 - fillProgress);
    fillRef.current.opacity = state.opacity * fillProgress;
    groupRef.current.visible = true;
  });

  return <group ref={groupRef} name={`Portrait_${featureName}`} position={placement?.position ?? config.poster.position}
    rotation={placement?.rotation ?? config.poster.rotation} visible={false} userData={{ skipExport: true }}>
    <lineSegments geometry={artwork.outline} raycast={() => null}>
      <lineBasicMaterial ref={strokeRef} color="#252923" transparent opacity={0} depthWrite={false} toneMapped={false} />
    </lineSegments>
    <mesh geometry={artwork.fill} raycast={() => null}>
      <meshBasicMaterial ref={fillRef} color={preserveColors ? "#ffffff" : "#252923"} vertexColors={preserveColors} side={THREE.DoubleSide} transparent opacity={0}
        depthWrite={false} toneMapped={false} />
    </mesh>
  </group>;
}
export default AnimatedPoster;
