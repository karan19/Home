/**
 * Grid Mapping Utility
 * Converts between grid notation (e.g., "A3") and 3D coordinates
 * Supports floor grids, wall grids, and compound grid
 */

// Grid type constants
export const GRID_TYPES = {
  FLOOR_GROUND: 'floor-ground',
  FLOOR_UPPER: 'floor-upper',
  WALL_BACK: 'wall-back',
  WALL_RIGHT: 'wall-right',
  COMPOUND: 'compound'
};

// Grid configuration for all surfaces
export const GRID_CONFIG = {
  'floor-ground': {
    columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
    rows: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    squareSize: 0.5,
    yPosition: 0,
    origin: { x: -4, z: 4 }, // Top-left corner
    bounds: { xMin: -4, xMax: 4, zMin: -4, zMax: 4 }
  },
  'floor-upper': {
    columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
    rows: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    squareSize: 0.5,
    yPosition: 3,
    origin: { x: -4, z: 4 },
    bounds: { xMin: -4, xMax: 4, zMin: -4, zMax: 4 }
  },
  'wall-back': {
    columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
    rows: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    squareSize: { horizontal: 0.5, vertical: 0.25 },
    zPosition: -3.875,
    origin: { x: -4, y: 0 },
    bounds: { xMin: -4, xMax: 4, yMin: 0, yMax: 6 }
  },
  'wall-right': {
    columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
    rows: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    squareSize: { horizontal: 0.5, vertical: 0.25 },
    xPosition: 3.875,
    origin: { z: -4, y: 0 },
    bounds: { zMin: -4, zMax: 4, yMin: 0, yMax: 6 }
  },
  'compound': {
    columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
              'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF'],
    rows: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
    squareSize: 0.5,
    yPosition: -0.25,
    origin: { x: -8, z: 8 },
    bounds: { xMin: -8, xMax: 8, zMin: -8, zMax: 8 }
  }
};

/**
 * Parse grid notation into column and row
 * @param {string} gridLabel - Grid notation (e.g., "A3", "AA15")
 * @returns {Object} { column: string, row: number }
 */
export function parseGridLabel(gridLabel) {
  const match = gridLabel.match(/^([A-Z]+)(\d+)$/);
  if (!match) {
    throw new Error(`Invalid grid label: ${gridLabel}`);
  }
  return {
    column: match[1],
    row: parseInt(match[2], 10)
  };
}

/**
 * Convert grid notation to 3D coordinates
 * @param {string} gridLabel - Grid notation (e.g., "A3")
 * @param {string} gridType - Type of grid (from GRID_TYPES)
 * @returns {Object} { x, y, z } coordinates of grid square center
 */
export function gridToCoordinates(gridLabel, gridType) {
  const config = GRID_CONFIG[gridType];
  if (!config) {
    throw new Error(`Invalid grid type: ${gridType}`);
  }

  const { column, row } = parseGridLabel(gridLabel);
  const columnIndex = config.columns.indexOf(column);
  const rowIndex = row - 1;

  if (columnIndex === -1) {
    throw new Error(`Invalid column: ${column} for grid type ${gridType}`);
  }
  if (rowIndex < 0 || rowIndex >= config.rows.length) {
    throw new Error(`Invalid row: ${row} for grid type ${gridType}`);
  }

  let coordinates = {};

  if (gridType === GRID_TYPES.FLOOR_GROUND || gridType === GRID_TYPES.FLOOR_UPPER) {
    // Floor grids: X and Z coordinates
    coordinates.x = config.origin.x + columnIndex * config.squareSize + config.squareSize / 2;
    coordinates.y = config.yPosition;
    coordinates.z = config.origin.z - rowIndex * config.squareSize - config.squareSize / 2;
  } else if (gridType === GRID_TYPES.WALL_BACK) {
    // Back wall: X and Y coordinates, fixed Z
    coordinates.x = config.origin.x + columnIndex * config.squareSize.horizontal + config.squareSize.horizontal / 2;
    coordinates.y = config.origin.y + rowIndex * config.squareSize.vertical + config.squareSize.vertical / 2;
    coordinates.z = config.zPosition;
  } else if (gridType === GRID_TYPES.WALL_RIGHT) {
    // Right wall: Z and Y coordinates, fixed X
    coordinates.x = config.xPosition;
    coordinates.y = config.origin.y + rowIndex * config.squareSize.vertical + config.squareSize.vertical / 2;
    coordinates.z = config.origin.z + columnIndex * config.squareSize.horizontal + config.squareSize.horizontal / 2;
  } else if (gridType === GRID_TYPES.COMPOUND) {
    // Compound grid: X and Z coordinates
    coordinates.x = config.origin.x + columnIndex * config.squareSize + config.squareSize / 2;
    coordinates.y = config.yPosition;
    coordinates.z = config.origin.z - rowIndex * config.squareSize - config.squareSize / 2;
  }

  return coordinates;
}

/**
 * Convert 3D coordinates to grid notation
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} z - Z coordinate
 * @param {string} gridType - Type of grid
 * @returns {string} Grid notation (e.g., "A3") or null if outside grid
 */
export function coordinatesToGrid(x, y, z, gridType) {
  const config = GRID_CONFIG[gridType];
  if (!config) {
    throw new Error(`Invalid grid type: ${gridType}`);
  }

  let columnIndex, rowIndex;

  if (gridType === GRID_TYPES.FLOOR_GROUND || gridType === GRID_TYPES.FLOOR_UPPER) {
    // Check if within bounds
    if (x < config.bounds.xMin || x > config.bounds.xMax ||
        z < config.bounds.zMin || z > config.bounds.zMax) {
      return null;
    }
    columnIndex = Math.floor((x - config.origin.x) / config.squareSize);
    rowIndex = Math.floor((config.origin.z - z) / config.squareSize);
  } else if (gridType === GRID_TYPES.WALL_BACK) {
    if (x < config.bounds.xMin || x > config.bounds.xMax ||
        y < config.bounds.yMin || y > config.bounds.yMax) {
      return null;
    }
    columnIndex = Math.floor((x - config.origin.x) / config.squareSize.horizontal);
    rowIndex = Math.floor((y - config.origin.y) / config.squareSize.vertical);
  } else if (gridType === GRID_TYPES.WALL_RIGHT) {
    if (z < config.bounds.zMin || z > config.bounds.zMax ||
        y < config.bounds.yMin || y > config.bounds.yMax) {
      return null;
    }
    columnIndex = Math.floor((z - config.origin.z) / config.squareSize.horizontal);
    rowIndex = Math.floor((y - config.origin.y) / config.squareSize.vertical);
  } else if (gridType === GRID_TYPES.COMPOUND) {
    if (x < config.bounds.xMin || x > config.bounds.xMax ||
        z < config.bounds.zMin || z > config.bounds.zMax) {
      return null;
    }
    columnIndex = Math.floor((x - config.origin.x) / config.squareSize);
    rowIndex = Math.floor((config.origin.z - z) / config.squareSize);
  }

  // Validate indices
  if (columnIndex < 0 || columnIndex >= config.columns.length ||
      rowIndex < 0 || rowIndex >= config.rows.length) {
    return null;
  }

  const column = config.columns[columnIndex];
  const row = config.rows[rowIndex];
  return `${column}${row}`;
}

/**
 * Get complete information about a grid square
 * @param {string} gridLabel - Grid notation
 * @param {string} gridType - Type of grid
 * @returns {Object} Complete grid square information
 */
export function getGridInfo(gridLabel, gridType) {
  const config = GRID_CONFIG[gridType];
  if (!config) {
    throw new Error(`Invalid grid type: ${gridType}`);
  }

  const { column, row } = parseGridLabel(gridLabel);
  const columnIndex = config.columns.indexOf(column);
  const rowIndex = row - 1;

  if (columnIndex === -1 || rowIndex < 0 || rowIndex >= config.rows.length) {
    throw new Error(`Invalid grid label: ${gridLabel} for grid type ${gridType}`);
  }

  const center = gridToCoordinates(gridLabel, gridType);
  let bounds = {};

  if (gridType === GRID_TYPES.FLOOR_GROUND || gridType === GRID_TYPES.FLOOR_UPPER || gridType === GRID_TYPES.COMPOUND) {
    const halfSize = config.squareSize / 2;
    bounds = {
      xMin: center.x - halfSize,
      xMax: center.x + halfSize,
      zMin: center.z - halfSize,
      zMax: center.z + halfSize
    };
  } else if (gridType === GRID_TYPES.WALL_BACK) {
    bounds = {
      xMin: center.x - config.squareSize.horizontal / 2,
      xMax: center.x + config.squareSize.horizontal / 2,
      yMin: center.y - config.squareSize.vertical / 2,
      yMax: center.y + config.squareSize.vertical / 2
    };
  } else if (gridType === GRID_TYPES.WALL_RIGHT) {
    bounds = {
      zMin: center.z - config.squareSize.horizontal / 2,
      zMax: center.z + config.squareSize.horizontal / 2,
      yMin: center.y - config.squareSize.vertical / 2,
      yMax: center.y + config.squareSize.vertical / 2
    };
  }

  return {
    label: gridLabel,
    center,
    bounds,
    column,
    row,
    columnIndex,
    rowIndex,
    gridType
  };
}

/**
 * Check if coordinates are within a specific grid square
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} z - Z coordinate
 * @param {string} gridLabel - Grid notation
 * @param {string} gridType - Type of grid
 * @returns {boolean} True if coordinates are within the grid square
 */
export function isInGrid(x, y, z, gridLabel, gridType) {
  const info = getGridInfo(gridLabel, gridType);
  const { bounds } = info;

  if (gridType === GRID_TYPES.FLOOR_GROUND || gridType === GRID_TYPES.FLOOR_UPPER || gridType === GRID_TYPES.COMPOUND) {
    return x >= bounds.xMin && x <= bounds.xMax &&
           z >= bounds.zMin && z <= bounds.zMax;
  } else if (gridType === GRID_TYPES.WALL_BACK) {
    return x >= bounds.xMin && x <= bounds.xMax &&
           y >= bounds.yMin && y <= bounds.yMax;
  } else if (gridType === GRID_TYPES.WALL_RIGHT) {
    return z >= bounds.zMin && z <= bounds.zMax &&
           y >= bounds.yMin && y <= bounds.yMax;
  }

  return false;
}

// Export for browser console debugging
if (typeof window !== 'undefined') {
  window.gridMapping = {
    gridToCoordinates,
    coordinatesToGrid,
    getGridInfo,
    isInGrid,
    GRID_TYPES,
    GRID_CONFIG
  };
}
