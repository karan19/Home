import React, { useEffect, useMemo } from 'react';
import { CylinderGeometry, SphereGeometry, Vector3 } from 'three';
import { RoundedBox } from '@react-three/drei';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const BEDS = [[0, -7.35, 11], [-5.2, 7.4, 2.1], [4.6, 7.4, 2.8]];
// Lawn is -0.25 m; its decorative strips reach -0.2375 m.
const SOIL_TOP = -0.21;

// Static merged planting keeps the garden inexpensive and the activity areas open.
export default function GardenBorders() {
  const geometry = useMemo(() => {
    const grass = [], flowers = [], stones = [];
    BEDS.forEach(([cx, z, width]) => {
      const count = Math.floor(width / .38);
      for (let i = 0; i <= count; i++) {
        const x = cx - width / 2 + i * width / count;
        const depth = z + Math.sin(i * 2.4) * .12;
        for (let blade = 0; blade < 7; blade++) {
          const angle = blade * 2.4 + i;
          const height = .28 + .12 * (1 + Math.sin(i + blade)) / 2;
          const tilt = Math.sin(angle) * .35;
          const stem = new CylinderGeometry(.002, .018, height, 4)
            .translate(0, height / 2, 0).rotateZ(tilt).rotateY(angle);
          stem.computeBoundingBox();
          // Ground the lowest rotated vertex, not the unrotated center.
          const rootY = SOIL_TOP - stem.boundingBox.min.y;
          const rootX = x + Math.cos(angle) * .07;
          const rootZ = depth + Math.sin(angle) * .07;
          stem.translate(rootX, rootY, rootZ);
          grass.push(stem);
          if (i % 3 === 0 && blade < 4) {
            const tip = new Vector3(-Math.sin(tilt) * height, Math.cos(tilt) * height, 0)
              .applyAxisAngle(new Vector3(0, 1, 0), angle).add(new Vector3(rootX, rootY, rootZ));
            flowers.push(new SphereGeometry(1, 6, 5).scale(.027, .065, .027)
              .translate(tip.x, tip.y, tip.z));
          }
        }
        if (i % 2 === 0) stones.push(new SphereGeometry(1, 8, 6).scale(.09 + .02 * (i % 3), .055, .075)
          .translate(x, SOIL_TOP + .055, z + (z > 0 ? -.32 : .32)));
      }
    });
    return [grass, flowers, stones].map(parts => {
      const merged = mergeGeometries(parts);
      parts.forEach(part => part.dispose());
      return merged;
    });
  }, []);
  useEffect(() => () => geometry.forEach(item => item.dispose()), [geometry]);
  return <group name="Low_Garden_Borders">
    {BEDS.map(([x, z, width]) => <RoundedBox key={`${x}-${z}`}
      args={[width + .35, .04, .8]} radius={.018} smoothness={3}
      position={[x, SOIL_TOP - .02, z]} receiveShadow>
      <meshStandardMaterial color="#70664f" roughness={1} />
    </RoundedBox>)}
    {geometry.map((item, i) => <mesh key={i} geometry={item} receiveShadow>
      <meshStandardMaterial color={['#637653', '#9384aa', '#b6b0a0'][i]} roughness={.95} />
    </mesh>)}
  </group>;
}
