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
    rotation: [0, 0, 0],
    materials: {
      frame: { color: "#D2B48C", roughness: 0.4, metalness: 0 },
      mattress: { color: "#FFFFFF", roughness: 0.7, metalness: 0 },
      blanket: { color: "#808080", roughness: 0.6, metalness: 0 },
      pillow: { color: "#FFFFFF", roughness: 0.7, metalness: 0 },
      legs: { color: "#654321", roughness: 0.3, metalness: 0 }
    },
    frame: {
      width: 1.8, height: 0.5, depth: 2, positionY: 0.25
    },
    mattress: {
      width: 1.7, height: 0.3, depth: 1.9, radius: 0.05, smoothness: 4, positionY: 0.55
    },
    blanket: {
      mainBody: { width: 1.5, height: 0.05, depth: 1.2, positionY: 0.72, positionZ: 0.3, rotationX: 0.1 },
      fold1: { width: 1.5, height: 0.05, depth: 0.4, positionY: 0.75, positionZ: -0.1, rotationX: -0.15 },
      fold2: { width: 1.5, height: 0.05, depth: 0.3, positionY: 0.78, positionZ: -0.4, rotationX: 0.1 },
      edge: { width: 0.15, height: 0.05, depth: 0.8, positionX: 0.7, positionY: 0.65, positionZ: 0.5, rotationZ: -0.3 },
      corner: { width: 0.3, height: 0.05, depth: 0.3, positionX: -0.6, positionY: 0.73, positionZ: 0.6, rotationX: 0.2, rotationY: 0.3, rotationZ: 0.1 }
    },
    pillows: [
      {
        body: { width: 0.5, height: 0.15, depth: 0.35, positionX: -0.4, positionY: 0.78, positionZ: -0.7, rotationX: -0.05, rotationZ: -0.05 },
        top: { width: 0.48, height: 0.08, depth: 0.33, positionX: -0.4, positionY: 0.85, positionZ: -0.7, rotationX: -0.05, rotationZ: -0.05 }
      },
      {
        body: { width: 0.5, height: 0.15, depth: 0.35, positionX: 0.4, positionY: 0.78, positionZ: -0.7, rotationX: -0.05, rotationZ: 0.05 },
        top: { width: 0.48, height: 0.08, depth: 0.33, positionX: 0.4, positionY: 0.85, positionZ: -0.7, rotationX: -0.05, rotationZ: 0.05 }
      }
    ],
    legs: {
      width: 0.08, height: 0.2, depth: 0.08, positionY: 0.1,
      positions: [
        [-0.85, 0.1, -0.95],
        [0.85, 0.1, -0.95],
        [-0.85, 0.1, 0.95],
        [0.85, 0.1, 0.95]
      ]
    }
  },
  pillow: { 
    position: [2.5, 3.9, -2.3],
    size: {
      width: 0.3,
      height: 0.1,
      depth: 0.3
    },
    radius: 0.05,
    smoothness: 4,
    material: {
      color: 0xF5F5DC,
      roughness: 0.8
    }
  }
};

export const OFFICE = {
  workDesk: { 
    position: [-3, 3, -2], 
    rotation: Math.PI / 2,
    materials: {
      desktop: { color: "#D2B48C", roughness: 0.4, metalness: 0 },
      macbookBody: { color: "#C0C0C0", roughness: 0.3, metalness: 0.7 },
      macbookScreen: { color: "#2C2C2C", roughness: 0.2, metalness: 0.5 },
      macbookDisplay: { color: "#4A90E2", emissive: "#4A90E2", emissiveIntensity: 0.3, roughness: 0.1, metalness: 0 },
      appleLogo: { color: "#FFFFFF", roughness: 0.2, metalness: 0.8 },
      monitorStand: { color: "#2C2C2C", roughness: 0.4, metalness: 0.3 },
      monitorFrame: { color: "#1C1C1C", roughness: 0.3, metalness: 0.2 },
      monitorScreen: { color: "#1A1A2E", emissive: "#4A90E2", emissiveIntensity: 0.2, roughness: 0.1, metalness: 0 },
      chairFabric: { color: "#808080", roughness: 0.6, metalness: 0 },
      chairBase: { color: "#2C2C2C", roughness: 0.4, metalness: 0.3 },
      wheels: { color: "#1C1C1C", roughness: 0.3, metalness: 0.2 }
    },
    desk: {
      desktop: { width: 1.5, height: 0.05, depth: 0.8, positionY: 0.75 },
      leg: {
        width: 0.05, height: 0.75, depth: 0.05, positionY: 0.375,
        positions: [
          [-0.7, 0.375, -0.35],
          [0.7, 0.375, -0.35],
          [-0.7, 0.375, 0.35],
          [0.7, 0.375, 0.35]
        ]
      }
    },
    macbook: {
      positionX: -0.2, positionY: 0.775,
      base: { width: 0.35, height: 0.02, depth: 0.25, radius: 0.01, smoothness: 4 },
      screen: { width: 0.35, height: 0.22, depth: 0.02, positionY: 0.15, positionZ: -0.1, rotationX: -0.3 },
      display: { width: 0.33, height: 0.2, depth: 0.01, positionY: 0.15, positionZ: -0.09, rotationX: -0.3 },
      logo: { radius: 0.02, segments: 16, positionY: 0.15, positionZ: -0.12, rotationX: -0.3 }
    },
    monitor: {
      positionX: 0.3, positionY: 0.775, positionZ: -0.3,
      standBase: { radius: 0.08, height: 0.1, segments: 16, positionY: 0.05 },
      standPole: { radius: 0.02, height: 0.4, segments: 12, positionY: 0.25 },
      frame: { width: 0.6, height: 0.35, depth: 0.05, positionY: 0.45 },
      screen: { width: 0.55, height: 0.3, depth: 0.01, positionY: 0.45, positionZ: 0.03 }
    },
    chair: {
      positionY: 0, positionZ: 0.5, rotationY: Math.PI,
      seat: { width: 0.5, height: 0.1, depth: 0.5, radius: 0.05, smoothness: 4, positionY: 0.5 },
      backrest: { width: 0.5, height: 0.6, depth: 0.1, radius: 0.05, smoothness: 4, positionY: 0.8, positionZ: -0.2 },
      base: { radius: 0.25, height: 0.05, segments: 5, positionY: 0.1 },
      pole: { radius: 0.03, height: 0.4, segments: 12, positionY: 0.3 },
      wheels: {
        radius: 0.03, segments: 8, radialDistance: 0.2, positionY: 0.05,
        angles: [0, 72, 144, 216, 288]
      }
    }
  }
};

export const SEATING_AREA = {
  accentChair1: { 
    position: [0, 3, 1], 
    rotation: Math.PI / 2,
    material: { color: "#808080", roughness: 0.7, metalness: 0 },
    mainCushion: { width: 0.6, height: 0.52, depth: 0.6, radius: 0.08, smoothness: 4, positionY: 0.26 },
    backrest: { width: 0.6, height: 0.5, depth: 0.12, radius: 0.05, smoothness: 4, positionY: 0.65, positionZ: -0.28, rotationX: -0.2 },
    armrest: {
      width: 0.12, height: 0.4, depth: 0.55, radius: 0.06, smoothness: 4,
      leftPositionX: -0.31, rightPositionX: 0.31, positionY: 0.45
    }
  },
  accentChair2: { 
    position: [2, 3, 1], 
    rotation: -Math.PI / 2,
    material: { color: "#808080", roughness: 0.7, metalness: 0 },
    mainCushion: { width: 0.6, height: 0.52, depth: 0.6, radius: 0.08, smoothness: 4, positionY: 0.26 },
    backrest: { width: 0.6, height: 0.5, depth: 0.12, radius: 0.05, smoothness: 4, positionY: 0.65, positionZ: -0.28, rotationX: -0.2 },
    armrest: {
      width: 0.12, height: 0.4, depth: 0.55, radius: 0.06, smoothness: 4,
      leftPositionX: -0.31, rightPositionX: 0.31, positionY: 0.45
    }
  },
  smallTable: { 
    position: [1, 3, 1],
    material: { color: "#D2B48C", roughness: 0.4, metalness: 0 },
    tabletop: { width: 0.5, height: 0.05, depth: 0.5, radius: 0.02, smoothness: 4, positionY: 0.5 },
    leg: {
      radius: 0.025, height: 0.5, segments: 8, positionY: 0.25,
      positions: [
        [-0.2, 0.25, -0.2],
        [0.2, 0.25, -0.2],
        [-0.2, 0.25, 0.2],
        [0.2, 0.25, 0.2]
      ]
    }
  },
  openBook: { 
    position: [0.95, 3.525, 1.05], 
    rotation: [0, 0.3, 0],
    materials: {
      page: { color: 0xFFFAF0, roughness: 0.9, metalness: 0.0 },
      binding: { color: 0xC0C0C0, roughness: 0.3, metalness: 0.8 },
      cover: { color: 0x8B7355, roughness: 0.8, metalness: 0.0 }
    },
    leftPage: { width: 0.16, height: 0.024, depth: 0.22, radius: 0.003, smoothness: 4, positionX: -0.08, rotationY: -0.12 },
    rightPage: { width: 0.16, height: 0.024, depth: 0.22, radius: 0.003, smoothness: 4, positionX: 0.08, rotationY: 0.12 },
    binding: {
      count: 15, radius: 0.006, tube: 0.001, radialSegments: 8, tubularSegments: 12,
      startZ: -0.1, spacing: 0.014, positionY: 0.012, rotationX: Math.PI / 2
    },
    cover: { width: 0.32, height: 0.005, depth: 0.24, radius: 0.004, smoothness: 4, positionY: -0.015 },
    pageStack: { width: 0.3, height: 0.02, depth: 0.22, positionY: -0.007 }
  },
  pen: { 
    position: [1.08, 3.525, 0.95], 
    rotation: [0, 0, Math.PI / 2.2],
    materials: {
      body: { color: 0x1E3A8A, roughness: 0.4, metalness: 0.2 },
      tip: { color: 0xC0C0C0, roughness: 0.3, metalness: 0.7 },
      clip: { color: 0xC0C0C0, roughness: 0.3, metalness: 0.8 }
    },
    body: { radius: 0.004, height: 0.12, segments: 12 },
    tip: { radius: 0.004, height: 0.01, segments: 12, positionY: -0.065 },
    cap: { radiusTop: 0.005, radiusBottom: 0.004, height: 0.02, segments: 12, positionY: 0.06 },
    clip: { width: 0.002, height: 0.025, depth: 0.003, positionX: 0.005, positionY: 0.055, rotationZ: 0.3 }
  }
};

export const FITNESS = {
  punchingBag: { 
    position: [2.75, 3, 3.25],
    materials: {
      mount: { color: 0x808080, metalness: 0.8, roughness: 0.3 },
      chain: { color: 0x606060, metalness: 0.9, roughness: 0.4 },
      bag: { color: 0xFF0000, roughness: 0.7, metalness: 0.1 }
    },
    mount: { radius: 0.05, height: 0.1, segments: 16, positionY: 3.0 },
    chain: { radius: 0.015, height: 1.1, segments: 8, positionY: 2.45 },
    bag: { radius: 0.175, length: 1.0, capSegments: 16, radialSegments: 32, positionY: 1.4 },
    animation: { swingAmplitude: 0.05, speed: 0.5, rotationFactor: 0.3 }
  }
};

export const DECORATIONS = {
  rug: { 
    position: [-0.5, 3, -2.5], 
    width: 2, 
    depth: 2,
    materials: {
      surface: { color: "#8B4513", roughness: 0.9, metalness: 0 },
      pattern: { color: "#654321", roughness: 0.9, metalness: 0 }
    },
    surface: { height: 0.01, positionY: 0.01 },
    pattern: {
      height: 0.005, widthFactor: 0.9, stripeWidth: 0.05, positionY: 0.015,
      offsets: [-0.3, 0, 0.3]
    }
  },
  wallClock: { 
    position: [-0.5, 5.25, -3.6], 
    scale: 1,
    materials: {
      frame: { color: "#1C1C1C", roughness: 0.3, metalness: 0.2 },
      textColor: "#00FF00",
      glow: { color: "#003300", emissive: "#00FF00", emissiveIntensity: 0.2, transparent: true, opacity: 0.3 }
    },
    frame: { widthScale: 0.6, heightScale: 0.25, depth: 0.05 },
    text: { fontSizeScale: 0.12, positionZ: 0.03 },
    glow: { widthScale: 0.55, heightScale: 0.18, depth: 0.001, positionZ: 0.026 }
  },
  drawerTable: { 
    position: [-3.75, 3, -3.25],
    dimensions: { tableWidth: 0.4, tableHeight: 0.5, tableDepth: 0.4 },
    materials: {
      wood: { color: 0x8B4513, roughness: 0.7, metalness: 0.1 },
      drawerFront: { color: 0xA0522D, roughness: 0.6, metalness: 0.1 },
      handle: { color: 0xC0C0C0, roughness: 0.3, metalness: 0.8 },
      trim: { color: 0x654321, roughness: 0.6, metalness: 0.1 }
    },
    cabinetBody: { radius: 0.01, smoothness: 4 },
    drawerFront: { widthOffset: 0.04, heightFactor: 0.3, depth: 0.02, radius: 0.005, smoothness: 4, yFactor: 0.35, zOffset: 0.01 },
    handle: { width: 0.08, height: 0.015, depth: 0.02, radius: 0.003, smoothness: 4, yFactor: 0.35, zOffset: 0.03 },
    tabletopTrim: { widthOffset: 0.02, height: 0.03, depthOffset: 0.02, radius: 0.005, smoothness: 4 }
  },
  bluetoothSpeaker: { 
    position: [-3.75, 3.6, -3.25],
    materials: {
      body: { color: 0x2C2C2C, roughness: 0.6, metalness: 0.3 },
      light: { color: 0x0080FF, emissive: 0x0080FF, emissiveIntensity: 2 }
    },
    body: { radius: 0.05, height: 0.15, segments: 32 },
    light: { radius: 0.008, segments: 16, positionY: 0.08 },
    animation: { speed: 3, intensityMultiplier: 2 }
  },
  pottedPlant1: { 
    position: [-1.7, 3, 3.5], 
    height: 1.2,
    heightFactors: { pot: 0.3, plant: 0.7 },
    materials: {
      pot: { color: "#E8E8E8", roughness: 0.3, metalness: 0 },
      soil: { color: "#654321", roughness: 0.8, metalness: 0 },
      stem: { color: "#2D5016", roughness: 0.6, metalness: 0 },
      leafEven: { color: "#228B22", roughness: 0.7, metalness: 0 },
      leafOdd: { color: "#2E8B57", roughness: 0.7, metalness: 0 }
    },
    pot: { radiusTop: 0.15, radiusBottom: 0.12, segments: 16 },
    soil: { radius: 0.14, height: 0.02, segments: 16 },
    stem: { radiusTop: 0.01, radiusBottom: 0.015, segments: 8, angles: [0, 0.4, -0.4], radialDistance: 0.05 },
    leaf: {
      radius: 0.08, segments: 8,
      positions: [
        { pos: [0, 0.9, 0], rot: [0.3, 0, 0], scale: [1, 0.3, 2.5] },
        { pos: [0.1, 0.85, 0.05], rot: [0.2, 0.5, 0.3], scale: [1, 0.3, 2.2] },
        { pos: [-0.1, 0.85, -0.05], rot: [-0.2, -0.5, -0.3], scale: [1, 0.3, 2.2] },
        { pos: [0.12, 0.7, 0.08], rot: [0.4, 0.8, 0.2], scale: [1, 0.3, 2] },
        { pos: [-0.12, 0.7, -0.08], rot: [-0.4, -0.8, -0.2], scale: [1, 0.3, 2] },
        { pos: [0.08, 0.65, -0.1], rot: [0.3, -0.6, 0.4], scale: [1, 0.3, 1.8] },
        { pos: [-0.08, 0.65, 0.1], rot: [-0.3, 0.6, -0.4], scale: [1, 0.3, 1.8] },
        { pos: [0.15, 0.5, 0], rot: [0.5, 1, 0.1], scale: [1, 0.3, 1.8] },
        { pos: [-0.15, 0.5, 0], rot: [-0.5, -1, -0.1], scale: [1, 0.3, 1.8] },
        { pos: [0, 0.45, 0.12], rot: [0.4, 0, 0.5], scale: [1, 0.3, 1.6] },
        { pos: [0, 0.45, -0.12], rot: [-0.4, 0, -0.5], scale: [1, 0.3, 1.6] }
      ]
    }
  },
  pottedPlant2: { 
    position: [-1.3, 3, 3.5], 
    height: 1,
    heightFactors: { pot: 0.3, plant: 0.7 },
    materials: {
      pot: { color: "#E8E8E8", roughness: 0.3, metalness: 0 },
      soil: { color: "#654321", roughness: 0.8, metalness: 0 },
      stem: { color: "#2D5016", roughness: 0.6, metalness: 0 },
      leafEven: { color: "#228B22", roughness: 0.7, metalness: 0 },
      leafOdd: { color: "#2E8B57", roughness: 0.7, metalness: 0 }
    },
    pot: { radiusTop: 0.15, radiusBottom: 0.12, segments: 16 },
    soil: { radius: 0.14, height: 0.02, segments: 16 },
    stem: { radiusTop: 0.01, radiusBottom: 0.015, segments: 8, angles: [0, 0.4, -0.4], radialDistance: 0.05 },
    leaf: {
      radius: 0.08, segments: 8,
      positions: [
        { pos: [0, 0.9, 0], rot: [0.3, 0, 0], scale: [1, 0.3, 2.5] },
        { pos: [0.1, 0.85, 0.05], rot: [0.2, 0.5, 0.3], scale: [1, 0.3, 2.2] },
        { pos: [-0.1, 0.85, -0.05], rot: [-0.2, -0.5, -0.3], scale: [1, 0.3, 2.2] },
        { pos: [0.12, 0.7, 0.08], rot: [0.4, 0.8, 0.2], scale: [1, 0.3, 2] },
        { pos: [-0.12, 0.7, -0.08], rot: [-0.4, -0.8, -0.2], scale: [1, 0.3, 2] },
        { pos: [0.08, 0.65, -0.1], rot: [0.3, -0.6, 0.4], scale: [1, 0.3, 1.8] },
        { pos: [-0.08, 0.65, 0.1], rot: [-0.3, 0.6, -0.4], scale: [1, 0.3, 1.8] },
        { pos: [0.15, 0.5, 0], rot: [0.5, 1, 0.1], scale: [1, 0.3, 1.8] },
        { pos: [-0.15, 0.5, 0], rot: [-0.5, -1, -0.1], scale: [1, 0.3, 1.8] },
        { pos: [0, 0.45, 0.12], rot: [0.4, 0, 0.5], scale: [1, 0.3, 1.6] },
        { pos: [0, 0.45, -0.12], rot: [-0.4, 0, -0.5], scale: [1, 0.3, 1.6] }
      ]
    }
  }
};
