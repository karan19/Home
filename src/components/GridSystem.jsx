import React from 'react';
import FloorGrid from './FloorGrid';
import WallGrid from './WallGrid';

/**
 * GridSystem - Master component for managing all grid overlays
 * Provides visual grid references for precise positioning
 */
function GridSystem({ showFloorGrids = false, showWallGrids = false }) {
  return (
    <group name="GridSystem">
      {/* Floor Grids */}
      {showFloorGrids && (
        <>
          <FloorGrid floor="ground" visible={true} />
          <FloorGrid floor="upper" visible={true} />
        </>
      )}

      {/* Wall Grids */}
      {showWallGrids && (
        <>
          <WallGrid wall="back" visible={true} />
          <WallGrid wall="right" visible={true} />
        </>
      )}
    </group>
  );
}

export default GridSystem;
