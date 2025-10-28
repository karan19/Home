import React, { useState } from 'react';
import { Html } from '@react-three/drei';

/**
 * Room Labels Component
 * 
 * Features:
 * - Hover-activated room labels
 * - Positioned at room centers
 * - Styled with CSS
 * - Non-intrusive design
 */

function RoomLabel({ position, label, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <group position={position}>
      {/* Invisible hover trigger */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setIsHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setIsHovered(false);
        }}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* HTML Label */}
      {isHovered && (
        <Html
          center
          distanceFactor={10}
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            pointerEvents: 'none',
            userSelect: 'none',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', marginBottom: '4px' }}>{label}</div>
            {description && (
              <div style={{ 
                fontSize: '12px', 
                opacity: 0.8,
                fontWeight: 'normal'
              }}>
                {description}
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

function RoomLabels({ enabled = true }) {
  if (!enabled) return null;

  const rooms = [
    // Ground Floor
    { position: [1.5, 1, 1], label: 'Living Room', description: 'Entertainment & Relaxation' },
    { position: [-1.5, 1, -2.5], label: 'Kitchen', description: 'Cooking & Dining' },
    { position: [1.5, 1, 3], label: 'Entertainment Area', description: 'TV & Gaming' },
    
    // Upper Floor
    { position: [2.5, 4, -2.5], label: 'Bedroom', description: 'Rest & Sleep' },
    { position: [-3, 4, -2], label: 'Office', description: 'Work & Study' },
    { position: [1, 4, 1], label: 'Seating Area', description: 'Reading & Relaxation' },
    { position: [2.75, 4, 3.25], label: 'Gym', description: 'Fitness & Exercise' },
    
    // Outside
    { position: [0, 1, 8], label: 'Front Yard', description: 'Entrance & Mailbox' },
    { position: [6.35, 1, 0], label: 'Parking', description: 'Car' },
    { position: [-6.25, 1, 0], label: 'Outdoor Gym', description: 'Exercise Equipment' }
  ];

  return (
    <group name="Room_Labels">
      {rooms.map((room, i) => (
        <RoomLabel
          key={i}
          position={room.position}
          label={room.label}
          description={room.description}
        />
      ))}
    </group>
  );
}

export default RoomLabels;
