/**
 * Ground Floor Coordinates Configuration
 * 
 * All position, rotation, and scale values for ground floor components
 * Use named imports to only import what you need:
 * 
 * import { ENTERTAINMENT, LIVING_ROOM } from './config/groundFloorCoordinates';
 */

export const ENTERTAINMENT = {
  tv: { 
    position: [1.5, 0.875, 3.7], 
    rotation: [0, Math.PI, 0] 
  },
  tvTable: { 
    position: [1.5, 0, 3.7] 
  },
  playstation: { 
    position: [1.5, 0.525, 3.6] 
  },
  psController: { 
    position: [1.3, 0.5, 1.2], 
    rotation: [0, 0.3, 0] 
  }
};

export const LIVING_ROOM = {
  sofa: { 
    position: [1.5, 0, 1] 
  },
  coffeeTable: { 
    position: [1.5, 0, 2.3] 
  },
  barcelonaCrest: { 
    position: [3.7, 1.5, 1], 
    rotation: [0, -Math.PI / 2, 0] 
  },
  bookshelf: { 
    position: [3.25, 0, -3.55], 
    rotation: [0, 0, 0] 
  }
};

export const KITCHEN = {
  kitchenIsland: { 
    position: [-1.5, 0, -1.5] 
  },
  kitchen: { 
    position: [-1.75, 0, -3.5] 
  },
  refrigerator: { 
    position: [-3.5, 0, -3.5] 
  },
  coffeeMachine: { 
    position: [0.25, 0.825, -3.4] 
  },
  coffeeStationTable: { 
    position: [0.25, 0, -3.4] 
  },
  waterCooler: { 
    position: [1.25, 0, -3.55] 
  }
};
