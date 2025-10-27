/**
 * Outside Coordinates Configuration
 * 
 * All position, rotation, and scale values for outside/exterior components
 * Use named imports to only import what you need:
 * 
 * import { OUTSIDE } from './config/outsideCoordinates';
 */

export const OUTSIDE = {
  balcony: { 
    position: [0.9, 3, 4.5] 
  }
  // Note: Compound, FlyingPaper, and RolledNewspaper have internal animation logic
  // and don't use static coordinates from this config
};
