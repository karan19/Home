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
    position: [2.5, 3, -2.5], rotation: [0, 0, 0],
    modelPath: '/models/bed/bed.glb', modelSize: [1.8, 1.05, 2.1], floorOffset: 0
  },
  pillow: {
    // Invisible interaction region over the imported model's two pillows.
    position: [2.5, 3.85, -3.15], size: { width: 1.55, height: 0.4, depth: 0.65 }
  }
};

export const OFFICE = {
  workDesk: { 
    position: [-3, 3, -2], 
    rotation: Math.PI / 2,
    materials: {
      desktop: { color: "#C7A77B", roughness: 0.78, metalness: 0 },
      macbookBody: { color: "#B9C0C5", roughness: 0.65, metalness: 0.25 },
      macbookScreen: { color: "#2C2C2C", roughness: 0.2, metalness: 0.5 },
      macbookDisplay: { color: "#213743", emissive: "#507684", emissiveIntensity: 0.16, roughness: 0.55, metalness: 0 },
      appleLogo: { color: "#FFFFFF", roughness: 0.2, metalness: 0.8 },
      monitorStand: { color: "#2C2C2C", roughness: 0.4, metalness: 0.3 },
      monitorFrame: { color: "#1C1C1C", roughness: 0.3, metalness: 0.2 },
      monitorScreen: { color: "#213743", emissive: "#507684", emissiveIntensity: 0.16, roughness: 0.55, metalness: 0 },
      chairFabric: { color: "#69716F", roughness: 0.9, metalness: 0 },
      chairBase: { color: "#2C2C2C", roughness: 0.4, metalness: 0.3 },
      wheels: { color: "#1C1C1C", roughness: 0.3, metalness: 0.2 }
    },
    desk: {
      modelPath: '/models/office-desk/office-desk.glb',
      modelSize: [1.5, 0.775, 0.8]
    },
    macbook: {
      positionX: -0.38, positionZ: 0.10,
      base: { width: 0.31, height: 0.012, depth: 0.215, radius: 0.005, smoothness: 3 },
      screen: { width: 0.31, height: 0.205, depth: 0.008, rotationX: -0.22 },
      display: { width: 0.286, height: 0.179 }
    },
    macMini: { positionX: 0.52, positionZ: 0.07 },
    monitor: {
      positionX: 0.17, positionZ: -0.18,
      standBase: { width: 0.18, height: 0.012, depth: 0.13 },
      standPole: { width: 0.026, height: 0.16, depth: 0.028 },
      frame: { width: 0.54, height: 0.316, depth: 0.024, positionY: 0.29 },
      screen: { width: 0.512, height: 0.288 }
    },
    chair: {
      modelPath: '/models/office-chair/office-chair.glb',
      modelSize: [0.58, 0.98, 0.6],
      positionY: 0, positionZ: 0.68, rotationY: Math.PI
    }
  }
};

export const SEATING_AREA = {
  chairModel: { modelPath: '/models/chair/chair.glb', modelSize: [0.74, 0.75, 0.72] },
  accentChair1: { position: [0, 3, 1], rotation: Math.PI / 2 },
  accentChair2: { position: [2, 3, 1], rotation: -Math.PI / 2 },
  smallTable: { 
    position: [1, 3, 1],
    material: { color: "#D2B48C", roughness: 0.4, metalness: 0 },
    tabletop: { width: 0.5, height: 0.05, depth: 0.5, radius: 0.02, smoothness: 4, positionY: 0.5 },
    leg: {
      radius: 0.025, height: 0.5, segments: 16, positionY: 0.25,
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
  plantModelPath: '/models/plant/plant.glb',
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
  pottedPlant1: { position: [-1.75, 3, 3.4], height: 1.2, rotation: 0 },
  pottedPlant2: { position: [-1.05, 3, 3.5], height: 0.9, rotation: 1.1 }
};
