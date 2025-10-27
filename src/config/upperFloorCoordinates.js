/**
 * Upper Floor Coordinates Configuration
 * 
 * All position, rotation, and scale values for upper floor components
 * Use named imports to only import what you need:
 * 
 * import { BEDROOM, OFFICE } from './config/upperFloorCoordinates';
 */

export const BEDROOM = {
  bed: { 
    position: [2.5, 3, -2.5], 
    rotation: [0, 0, 0] 
  },
  pillow: { 
    position: [2.5, 3.9, -2.3] 
  }
};

export const OFFICE = {
  workDesk: { 
    position: [-3, 3, -2], 
    rotation: Math.PI / 2 
  }
};

export const SEATING_AREA = {
  accentChair1: { 
    position: [0, 3, 1], 
    rotation: Math.PI / 2 
  },
  accentChair2: { 
    position: [2, 3, 1], 
    rotation: -Math.PI / 2 
  },
  smallTable: { 
    position: [1, 3, 1] 
  },
  openBook: { 
    position: [0.95, 3.525, 1.05], 
    rotation: [0, 0.3, 0] 
  },
  pen: { 
    position: [1.08, 3.525, 0.95], 
    rotation: [0, 0, Math.PI / 2.2] 
  }
};

export const FITNESS = {
  punchingBag: { 
    position: [2.75, 3, 3.25] 
  }
};

export const DECORATIONS = {
  rug: { 
    position: [-0.5, 3, -2.5], 
    width: 2, 
    depth: 2 
  },
  wallClock: { 
    position: [-0.5, 5.25, -3.6], 
    scale: 1 
  },
  drawerTable: { 
    position: [-3.75, 3, -3.25] 
  },
  bluetoothSpeaker: { 
    position: [-3.75, 3.6, -3.25] 
  },
  pottedPlant1: { 
    position: [-1.7, 3, 3.5], 
    height: 1.2 
  },
  pottedPlant2: { 
    position: [-1.3, 3, 3.5], 
    height: 1 
  }
};
