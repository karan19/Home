import React, { useEffect, useMemo } from 'react';
import { BoxGeometry, CylinderGeometry, SphereGeometry } from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const constructors = { box: BoxGeometry, cylinder: CylinderGeometry, sphere: SphereGeometry };

// Small static repetitions share one material and draw call, and export as ordinary GLTF meshes.
export default function RepeatedMesh({ shape = 'box', args, positions, material, ...props }) {
  const geometryKey = JSON.stringify([shape, args, positions]);
  const geometry = useMemo(() => {
    const [kind, dimensions, offsets] = JSON.parse(geometryKey);
    const base = new constructors[kind](...dimensions);
    const pieces = offsets.map(position => base.clone().translate(...position));
    const merged = mergeGeometries(pieces);
    base.dispose();
    pieces.forEach(piece => piece.dispose());
    return merged;
  }, [geometryKey]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <mesh geometry={geometry} {...props}><meshStandardMaterial {...material} /></mesh>;
}
