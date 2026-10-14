import React, { useEffect } from 'react';
import { BEDROOM } from '../../../config/upperFloorCoordinates';
import { useInteractiveAudio } from '../../../hooks/useInteractiveAudio';

export default function Pillow({ position = BEDROOM.pillow.position }) {
  const { toggle } = useInteractiveAudio('jobs');
  const { size } = BEDROOM.pillow;
  useEffect(() => () => { document.body.style.cursor = 'default'; }, []);
  // The imported bed contains the visible pillows. Raycasting still reaches this
  // transparent mesh, without drawing duplicate pillows or exporting a hit box.
  return <mesh name="Pillow_Audio_Hotspot" position={position} visible={true}
    userData={{skipExport:true}}
    onClick={async e => { e.stopPropagation(); await toggle(); }}
    onPointerOver={e => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
    onPointerOut={e => { e.stopPropagation(); document.body.style.cursor = 'default'; }}>
    <boxGeometry args={[size.width, size.height, size.depth]} />
    <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
  </mesh>;
}
