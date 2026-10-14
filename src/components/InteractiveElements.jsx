import React from 'react';
import Door from './interactive/Door';

/**
 * Interactive Elements Container
 * 
 * Manages all interactive elements in the scene:
 * - Doors (front entrance)
 */

function InteractiveElements() {

  return (
    <group name="Interactive_Elements">
      {/* DOORS */}
      
      {/* Front entrance door */}
      <Door
        position={[0, 0, 4]}
        rotation={[0, 0, 0]}
        width={0.9}
        height={2.1}
        swingDirection="right"
        doorColor={0x8B7355}
        id="front_door"
      />
    </group>
  );
}

export default InteractiveElements;
