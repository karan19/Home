import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { FITNESS } from '../../../config/upperFloorCoordinates';
import { useInteractiveAudio } from '../../../hooks/useInteractiveAudio';

function PunchingBag({ position = [0, 3, 0] }) {
  const { toggle } = useInteractiveAudio('ali');
  const { materials: mat, mount, chain, bag, animation } = FITNESS.punchingBag;
  const bagRef = useRef();
  const baseX = position[0];

  const handleClick = async (e) => {
    e.stopPropagation();
    await toggle();
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
