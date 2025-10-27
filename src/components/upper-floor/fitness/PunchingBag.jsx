import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { getFeatureConfig } from '../../../config/interactiveFeatures';
import { FITNESS } from '../../../config/upperFloorCoordinates';
import { mediaManager } from '../../../utils/mediaManager';

function PunchingBag({ position = [0, 3, 0] }) {
  const config = getFeatureConfig('ali');
  const { materials: mat, mount, chain, bag, animation } = FITNESS.punchingBag;
  const bagRef = useRef();
  const audioRef = useRef(null);
  const baseX = position[0];

  // Initialize audio
  if (!audioRef.current) {
    audioRef.current = new Audio(config.audio.file);
    audioRef.current.loop = false;
    audioRef.current.addEventListener('ended', () => {
      window.dispatchEvent(new CustomEvent(config.audio.endEvent, { detail: false }));
    });
  }

  const handleClick = async (e) => {
    e.stopPropagation();
    await mediaManager.toggle(audioRef.current, config.audio.playEvent, config.audio.endEvent);
  };

  useFrame((state) => {
    if (bagRef.current) {
      const swing = Math.sin(state.clock.elapsedTime * animation.speed) * animation.swingAmplitude;
      bagRef.current.position.x = baseX + swing;
      bagRef.current.rotation.z = swing * animation.rotationFactor;
    }
  });

  return (
    <group 
      ref={bagRef} 
      position={position}
      onClick={handleClick}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
    >
      {/* Ceiling mount (touches ceiling at Y=6) */}
      <mesh position={[0, mount.positionY, 0]} castShadow>
        <cylinderGeometry args={[mount.radius, mount.radius, mount.height, mount.segments]} />
        <meshStandardMaterial {...mat.mount} />
      </mesh>

      {/* Chain */}
      <mesh position={[0, chain.positionY, 0]} castShadow>
        <cylinderGeometry args={[chain.radius, chain.radius, chain.height, chain.segments]} />
        <meshStandardMaterial {...mat.chain} />
      </mesh>

      {/* Main bag body with curved edges - smooth cylinder */}
      <mesh position={[0, bag.positionY, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[bag.radius, bag.length, bag.capSegments, bag.radialSegments]} />
        <meshStandardMaterial {...mat.bag} />
      </mesh>
    </group>
  );
}

export default PunchingBag;
