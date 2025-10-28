import React from 'react';
import Door from './interactive/Door';
import InteractivePunchingBag from './interactive/InteractivePunchingBag';
import InteractiveBook from './interactive/InteractiveBook';

/**
 * Interactive Elements Container
 * 
 * Manages all interactive elements in the scene:
 * - Doors (front entrance, bedroom)
 * - Punching bag (gym area)
 * - Books (on tables/shelves)
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
      
      {/* Replace static punching bag with interactive version */}
      <InteractivePunchingBag
        position={[2.75, 3, 3.25]}
      />

      {/* Interactive books on coffee table */}
      <InteractiveBook
        position={[1.3, 0.45, 2.3]}
        rotation={[0, 0.2, 0]}
        bookColor={0x8B4513}
        size={{ width: 0.08, height: 0.015, depth: 0.12 }}
        id="coffee_table_book_1"
      />

      <InteractiveBook
        position={[1.5, 0.45, 2.2]}
        rotation={[0, -0.1, 0]}
        bookColor={0x654321}
        size={{ width: 0.09, height: 0.02, depth: 0.13 }}
        id="coffee_table_book_2"
      />

      {/* Interactive book on small table (upper floor) */}
      <InteractiveBook
        position={[1, 3.55, 1]}
        rotation={[0, 0.3, 0]}
        bookColor={0xA0522D}
        size={{ width: 0.1, height: 0.018, depth: 0.14 }}
        id="small_table_book"
      />
    </group>
  );
}

export default InteractiveElements;
