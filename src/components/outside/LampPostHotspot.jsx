import React, { useEffect } from 'react';
import { useInteractiveAudio } from '../../hooks/useInteractiveAudio';

// The visible lamp posts are instanced in Compound (Lamp_Posts). This
// transparent hit box wraps the backyard post on the kitchen side
// (back-left corner) so clicking it plays a random Dwight Schrute clip,
// following the same pattern as the Pillow hotspot for Steve Jobs.
export default function LampPostHotspot({ position = [-7, 1.4, -7] }) {
  const { toggle } = useInteractiveAudio('dwight');
  useEffect(() => () => { document.body.style.cursor = 'default'; }, []);
  return <mesh name="LampPost_Dwight_Hotspot" position={position} visible={true}
    userData={{ skipExport: true }}
    onClick={async e => { e.stopPropagation(); await toggle(); }}
    onPointerOver={e => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
    onPointerOut={e => { e.stopPropagation(); document.body.style.cursor = 'default'; }}>
    <boxGeometry args={[0.6, 3.1, 0.6]} />
    <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
  </mesh>;
}
