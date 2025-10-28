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
    position: [0.9, 3, 4.5],
    materials: {
      floor: { color: "#C19A6B", roughness: 0.4, metalness: 0 },
      glass: { color: "#F0F8FF", transparent: true, opacity: 0.3, roughness: 0.1, metalness: 0.1 },
      metal: { color: "#808080", roughness: 0.3, metalness: 0.7 },
      support: { color: "#808080", roughness: 0.4, metalness: 0.6 }
    },
    floor: { width: 3, height: 0.1, depth: 1.5, positionY: -0.05 },
    glassRailing: {
      front: { width: 3, height: 1, depth: 0.02, positionY: 0.5, positionZ: 0.75 },
      left: { width: 0.02, height: 1, depth: 1.5, positionX: -1.5, positionY: 0.5 },
      right: { width: 0.02, height: 1, depth: 1.5, positionX: 1.5, positionY: 0.5 }
    },
    posts: {
      radius: 0.03, height: 1, segments: 8, positionY: 0.5,
      positions: [
        [-1.5, 0.5, -0.75],
        [1.5, 0.5, -0.75],
        [-1.5, 0.5, 0.75],
        [1.5, 0.5, 0.75]
      ]
    },
    topRail: {
      front: { width: 3, height: 0.05, depth: 0.05, positionY: 1, positionZ: 0.75 },
      left: { width: 0.05, height: 0.05, depth: 1.5, positionX: -1.5, positionY: 1 },
      right: { width: 0.05, height: 0.05, depth: 1.5, positionX: 1.5, positionY: 1 }
    },
    supportBrackets: {
      width: 0.1, height: 0.2, depth: 1.5, positionY: -0.15,
      xPositions: [-1, 0, 1]
    }
  },
  car: {
    position: [6.35, -0.15, 0],
    rotation: 0,
    targetSize: 5,
    modelPath: '/Car/scene.gltf'
  },
  gym: {
    position: [-6.8, -0.05, 0],
    rotation: Math.PI / 2,
    targetSize: 1.8,
    modelPath: '/Gym/scene.gltf'
  }
  // Note: Compound, FlyingPaper, and RolledNewspaper have internal animation logic
  // and don't use static coordinates from this config
};
