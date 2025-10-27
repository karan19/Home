import React from 'react';
import * as THREE from 'three';

function Bookshelf({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation} name="Bookshelf">
      {/* Back panel */}
      <mesh position={[0, 0.9, -0.15]} castShadow receiveShadow>
        <boxGeometry args={[1, 1.8, 0.02]} />
        <meshStandardMaterial color="#D2B48C" roughness={0.4} metalness={0} />
      </mesh>

      {/* Side panels */}
      <mesh position={[-0.49, 0.9, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[0.02, 1.8, 0.3]} />
        <meshStandardMaterial color="#D2B48C" roughness={0.4} metalness={0} />
      </mesh>
      <mesh position={[0.49, 0.9, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[0.02, 1.8, 0.3]} />
        <meshStandardMaterial color="#D2B48C" roughness={0.4} metalness={0} />
      </mesh>

      {/* Top */}
      <mesh position={[0, 1.79, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.02, 0.3]} />
        <meshStandardMaterial color="#D2B48C" roughness={0.4} metalness={0} />
      </mesh>

      {/* Bottom */}
      <mesh position={[0, 0.01, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.02, 0.3]} />
        <meshStandardMaterial color="#D2B48C" roughness={0.4} metalness={0} />
      </mesh>

      {/* Shelves (5 shelves) */}
      {[0.36, 0.72, 1.08, 1.44].map((y, i) => (
        <mesh key={i} position={[0, y, -0.05]} castShadow receiveShadow>
          <boxGeometry args={[0.96, 0.02, 0.28]} />
          <meshStandardMaterial color="#D2B48C" roughness={0.4} metalness={0} />
        </mesh>
      ))}

      {/* Books on shelves - all standing vertically */}
      {/* Shelf 1 books (bottom shelf) */}
      <mesh position={[-0.3, 0.18, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.15]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.25, 0.18, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.12]} />
        <meshStandardMaterial color="#654321" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.2, 0.18, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.18]} />
        <meshStandardMaterial color="#A0522D" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.15, 0.18, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.14]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.1, 0.18, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.16]} />
        <meshStandardMaterial color="#654321" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.05, 0.18, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.13]} />
        <meshStandardMaterial color="#A0522D" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[0, 0.18, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.17]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[0.05, 0.18, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.15]} />
        <meshStandardMaterial color="#654321" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[0.1, 0.18, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.14]} />
        <meshStandardMaterial color="#A0522D" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[0.15, 0.18, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} metalness={0} />
      </mesh>

      {/* Shelf 2 books */}
      <mesh position={[-0.3, 0.54, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.16]} />
        <meshStandardMaterial color="#654321" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.25, 0.54, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.14]} />
        <meshStandardMaterial color="#A0522D" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.2, 0.54, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.15]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.15, 0.54, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.17]} />
        <meshStandardMaterial color="#654321" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.1, 0.54, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.13]} />
        <meshStandardMaterial color="#A0522D" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.05, 0.54, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[0, 0.54, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.14]} />
        <meshStandardMaterial color="#654321" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[0.05, 0.54, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.15]} />
        <meshStandardMaterial color="#A0522D" roughness={0.6} metalness={0} />
      </mesh>

      {/* Shelf 3 books */}
      <mesh position={[-0.3, 0.9, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.15]} />
        <meshStandardMaterial color="#A0522D" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.25, 0.9, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.17]} />
        <meshStandardMaterial color="#654321" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.2, 0.9, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.14]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.15, 0.9, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.16]} />
        <meshStandardMaterial color="#A0522D" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.1, 0.9, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.13]} />
        <meshStandardMaterial color="#654321" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.05, 0.9, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.15]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[0, 0.9, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.14]} />
        <meshStandardMaterial color="#A0522D" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[0.05, 0.9, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.16]} />
        <meshStandardMaterial color="#654321" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[0.1, 0.9, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.17]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} metalness={0} />
      </mesh>

      {/* Shelf 4 books */}
      <mesh position={[-0.3, 1.26, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.14]} />
        <meshStandardMaterial color="#654321" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.25, 1.26, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.2, 1.26, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.15]} />
        <meshStandardMaterial color="#A0522D" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.15, 1.26, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.17]} />
        <meshStandardMaterial color="#654321" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.1, 1.26, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.13]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.05, 1.26, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.16]} />
        <meshStandardMaterial color="#A0522D" roughness={0.6} metalness={0} />
      </mesh>

      {/* Shelf 5 books (top shelf) */}
      <mesh position={[-0.25, 1.62, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.15]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.2, 1.62, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.14]} />
        <meshStandardMaterial color="#654321" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.15, 1.62, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.16]} />
        <meshStandardMaterial color="#A0522D" roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.1, 1.62, -0.05]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.13]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} metalness={0} />
      </mesh>
    </group>
  );
}

export default Bookshelf;
