import React, { useEffect, useMemo } from 'react';
import { CylinderGeometry, SphereGeometry } from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// Static merged planting keeps the garden inexpensive and the activity areas open.
export default function GardenBorders() {
  const geometry = useMemo(() => {
    const grass = [], flowers = [], stones = [];
    const beds = [[0, -7.35, 11], [-5.2, 7.4, 2.1], [4.6, 7.4, 2.8]];
    beds.forEach(([cx, z, width]) => {
      const count = Math.floor(width / .38);
      for (let i = 0; i <= count; i++) {
        const x = cx - width / 2 + i * width / count;
        const depth = z + Math.sin(i * 2.4) * .12;
        for (let blade = 0; blade < 7; blade++) {
          const angle = blade * 2.4 + i;
          const height = .22 + .12 * (1 + Math.sin(i + blade)) / 2;
          grass.push(new CylinderGeometry(.002, .018, height, 4)
            .rotateZ(Math.sin(angle) * .35).rotateY(angle)
            .translate(x + Math.cos(angle) * .07, -.24 + height / 2, depth + Math.sin(angle) * .07));
          if (i % 3 === 0 && blade < 4) {
            flowers.push(new SphereGeometry(1, 6, 5).scale(.027, .065, .027)
              .translate(x + Math.cos(angle) * .08, -.24 + height, depth + Math.sin(angle) * .08));
          }
        }
        if (i % 2 === 0) stones.push(new SphereGeometry(1, 8, 6).scale(.09 + .02 * (i % 3), .055, .075)
          .translate(x, -.225, z + (z > 0 ? -.32 : .32)));
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
    {geometry.map((item, i) => <mesh key={i} geometry={item} receiveShadow>
      <meshStandardMaterial color={['#637653', '#9384aa', '#b6b0a0'][i]} roughness={.95} />
    </mesh>)}
  </group>;
}
