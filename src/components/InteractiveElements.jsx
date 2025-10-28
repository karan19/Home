import React from 'react';
import Door from './interactive/Door';
import InteractivePunchingBag from './interactive/InteractivePunchingBag';

/**
 * Interactive Elements Container
 * 
 * Manages all interactive elements in the scene:
 * - Doors (front entrance)
 * - Punching bag (gym area - swings continuously, click for audio/SVG)
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

      {/* INTERACTIVE OBJECTS */}
      
      {/* Punching bag - swings continuously, click for audio/SVG */}
      <InteractivePunchingBag
        position={[2.75, 3, 3.25]}
      />
    </group>
  );
}

export default InteractiveElements;
