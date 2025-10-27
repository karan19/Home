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
    rotation: [0, Math.PI, 0],
    frame: {
      width: 1.2,
      height: 0.7,
      depth: 0.05,
      radius: 0.02,
      smoothness: 4,
      color: 0x1C1C1C,
      roughness: 0.4,
      metalness: 0.3
    },
    screen: {
      width: 1.15,
      height: 0.65,
      depth: 0.01,
      radius: 0.015,
      smoothness: 4,
      positionZ: 0.03,
      colorOff: 0x0A0A1A,
      colorOn: 0x1A1A3A,
      emissiveOff: 0x0A0A1A,
      emissiveOn: 0x2A2A5A,
      emissiveIntensityOff: 0.2,
      emissiveIntensityOn: 0.4,
      roughness: 0.1
    }
  },
  tvTable: { 
    position: [1.5, 0, 3.7],
    tabletop: {
      width: 1.4,
      thickness: 0.05,
      depth: 0.4,
      radius: 0.01,
      smoothness: 4,
      positionY: 0.5
    },
    leg: {
      width: 0.05,
      height: 0.5,
      depth: 0.05,
      radius: 0.005,
      smoothness: 4
    },
    material: {
      color: 0x5D4037,
      roughness: 0.8,
      metalness: 0.1
    }
  },
  playstation: { 
    position: [1.5, 0.525, 3.6],
    mainBody: {
      width: 0.35,
      height: 0.08,
      depth: 0.25,
      radius: 0.015,
      smoothness: 4,
      positionY: 0.04,
      color: 0xFFFFFF,
      roughness: 0.4,
      metalness: 0.1
    },
    accentPanel: {
      width: 0.15,
      height: 0.08,
      depth: 0.25,
      radius: 0.01,
      smoothness: 4,
      positionX: -0.1,
      positionY: 0.04,
      color: 0x1C1C1C,
      roughness: 0.6,
      metalness: 0.1,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1
    },
    powerLight: {
      positionX: 0.12,
      positionY: 0.08,
      positionZ: 0.08,
      radius: 0.005,
      widthSegments: 8,
      heightSegments: 8,
      color: 0x0066FF,
      emissive: 0x0066FF,
      emissiveIntensity: 0.5,
      roughness: 0.3
    },
    discSlot: {
      positionY: 0.06,
      positionZ: 0.126,
      width: 0.12,
      height: 0.002,
      depth: 0.001,
      color: 0x000000,
      roughness: 0.2,
      metalness: 0.3
    },
    usbPort: {
      basePositionX: 0.05,
      spacing: 0.02,
      positionY: 0.02,
      positionZ: 0.126,
      width: 0.015,
      height: 0.008,
      depth: 0.001,
      color: 0x000000,
      roughness: 0.2,
      metalness: 0.3
    },
    stand: {
      width: 0.3,
      height: 0.01,
      depth: 0.2,
      radius: 0.005,
      smoothness: 4,
      positionY: 0.005,
      color: 0x2C2C2C,
      roughness: 0.5
    }
  },
  psController: { 
    position: [1.3, 0.5, 1.2], 
    rotation: [0, 0.3, 0],
    mainBody: {
      width: 0.15,
      height: 0.04,
      depth: 0.1,
      radius: 0.01,
      smoothness: 4,
      positionY: 0.02,
      color: 0xFFFFFF,
      roughness: 0.5,
      metalness: 0.1
    },
    grip: {
      width: 0.03,
      height: 0.06,
      depth: 0.04,
      radius: 0.008,
      smoothness: 4,
      leftPositionX: -0.06,
      rightPositionX: 0.06,
      positionY: 0,
      positionZ: -0.03,
      rotationX: 0.3
    },
    touchpad: {
      width: 0.06,
      height: 0.001,
      depth: 0.03,
      radius: 0.003,
      smoothness: 4,
      positionY: 0.041,
      positionZ: 0.01,
      color: 0x2C2C2C,
      roughness: 0.2,
      metalness: 0.4
    },
    psButton: {
      radius: 0.006,
      height: 0.002,
      segments: 16,
      positionY: 0.041,
      positionZ: -0.02,
      color: 0x0066FF,
      emissive: 0x0033AA,
      emissiveIntensity: 0.3,
      roughness: 0.3
    },
    analogStick: {
      baseRadius: 0.012,
      baseHeight: 0.008,
      topRadius: 0.008,
      topHeight: 0.004,
      topPositionY: 0.006,
      segments: 16,
      leftPositionX: -0.03,
      rightPositionX: 0.03,
      positionY: 0.041,
      positionZ: -0.01,
      color: 0x1C1C1C,
      roughness: 0.4,
      metalness: 0.2
    },
    dpad: {
      verticalWidth: 0.006,
      verticalHeight: 0.002,
      verticalDepth: 0.012,
      horizontalWidth: 0.012,
      horizontalHeight: 0.002,
      horizontalDepth: 0.006,
      radius: 0.001,
      smoothness: 2,
      basePositionX: -0.05,
      positionY: 0.042,
      basePositionZ: 0.02,
      upOffsetZ: 0.008,
      downOffsetZ: -0.008,
      leftOffsetX: -0.008,
      rightOffsetX: 0.008,
      color: 0x2C2C2C,
      roughness: 0.4
    },
    actionButtons: {
      radius: 0.006,
      height: 0.002,
      segments: 16,
      basePositionX: 0.05,
      positionY: 0.042,
      basePositionZ: 0.02,
      roughness: 0.3,
      triangle: {
        offsetX: 0,
        offsetZ: 0.008,
        color: 0x0066FF
      },
      x: {
        offsetX: 0,
        offsetZ: -0.008,
        color: 0xFF1493
      },
      square: {
        offsetX: -0.008,
        offsetZ: 0,
        color: 0xFF69B4
      },
      circle: {
        offsetX: 0.008,
        offsetZ: 0,
        color: 0xFF0000
      }
    }
  }
};

export const LIVING_ROOM = {
  sofa: { 
    position: [1.5, 0, 1],
    fabricMaterial: {
      color: 0xF5F5DC,
      roughness: 0.6,
      metalness: 0.0
    },
    woodMaterial: {
      color: 0x654321,
      roughness: 0.4,
      metalness: 0.0
    },
    seatBase: {
      width: 1.8,
      height: 0.45,
      depth: 1.2,
      radius: 0.08,
      smoothness: 4,
      positionY: 0.225
    },
    backCushion: {
      width: 1.8,
      height: 0.5,
      depth: 0.25,
      radius: 0.06,
      smoothness: 4,
      positionY: 0.7,
      positionZ: -0.475
    },
    armrest: {
      width: 0.2,
      height: 0.5,
      depth: 1.2,
      radius: 0.05,
      smoothness: 4,
      leftPositionX: -1.0,
      rightPositionX: 1.0,
      positionY: 0.5
    },
    leg: {
      radius: 0.04,
      height: 0.15,
      segments: 16,
      positions: [
        [-0.8, 0.075, -0.55],
        [0.8, 0.075, -0.55],
        [-0.8, 0.075, 0.55],
        [0.8, 0.075, 0.55]
      ]
    }
  },
  coffeeTable: { 
    position: [1.5, 0, 2.3],
    material: {
      color: "#D2B48C",
      roughness: 0.4,
      metalness: 0
    },
    tabletop: {
      width: 1.2,
      height: 0.05,
      depth: 0.6,
      positionY: 0.4
    },
    leg: {
      width: 0.05,
      height: 0.35,
      depth: 0.05,
      positionY: 0.175,
      positions: [
        [-0.55, 0.175, -0.25],
        [0.55, 0.175, -0.25],
        [-0.55, 0.175, 0.25],
        [0.55, 0.175, 0.25]
      ]
    }
  },
  barcelonaCrest: { 
    position: [3.7, 1.5, 1], 
    rotation: [0, -Math.PI / 2, 0],
    texturePath: '/FCBCrest.svg',
    frame: {
      widthScale: 0.44,
      heightScale: 0.54,
      depth: 0.02,
      color: 0xFFCC00,
      roughness: 0.3,
      metalness: 0.6
    },
    crest: {
      widthScale: 0.4,
      heightScale: 0.5,
      positionZ: 0.011,
      alphaTest: 0.1,
      roughness: 0.4,
      metalness: 0.1
    }
  },
  bookshelf: { 
    position: [3.25, 0, -3.55], 
    rotation: [0, 0, 0],
    shelfMaterial: {
      color: "#D2B48C",
      roughness: 0.4,
      metalness: 0
    },
    bookMaterial: {
      roughness: 0.6,
      metalness: 0,
      colors: [0x8B4513, 0x654321, 0xA0522D]
    },
    structure: {
      backPanel: {
        width: 1,
        height: 1.8,
        depth: 0.02,
        positionY: 0.9,
        positionZ: -0.15
      },
      sidePanel: {
        width: 0.02,
        height: 1.8,
        depth: 0.3,
        leftPositionX: -0.49,
        rightPositionX: 0.49,
        positionY: 0.9,
        positionZ: -0.05
      },
      top: {
        width: 1,
        height: 0.02,
        depth: 0.3,
        positionY: 1.79,
        positionZ: -0.05
      },
      bottom: {
        width: 1,
        height: 0.02,
        depth: 0.3,
        positionY: 0.01,
        positionZ: -0.05
      },
      shelf: {
        width: 0.96,
        height: 0.02,
        depth: 0.28,
        positionZ: -0.05,
        yPositions: [0.36, 0.72, 1.08, 1.44]
      }
    },
    books: {
      width: 0.03,
      height: 0.25,
      positionZ: -0.05,
      shelves: [
        {
          y: 0.18,
          books: [
            { x: -0.3, depth: 0.15, colorIndex: 0 },
            { x: -0.25, depth: 0.12, colorIndex: 1 },
            { x: -0.2, depth: 0.18, colorIndex: 2 },
            { x: -0.15, depth: 0.14, colorIndex: 0 },
            { x: -0.1, depth: 0.16, colorIndex: 1 },
            { x: -0.05, depth: 0.13, colorIndex: 2 },
            { x: 0, depth: 0.17, colorIndex: 0 },
            { x: 0.05, depth: 0.15, colorIndex: 1 },
            { x: 0.1, depth: 0.14, colorIndex: 2 },
            { x: 0.15, depth: 0.16, colorIndex: 0 }
          ]
        },
        {
          y: 0.54,
          books: [
            { x: -0.3, depth: 0.16, colorIndex: 1 },
            { x: -0.25, depth: 0.14, colorIndex: 2 },
            { x: -0.2, depth: 0.15, colorIndex: 0 },
            { x: -0.15, depth: 0.17, colorIndex: 1 },
            { x: -0.1, depth: 0.13, colorIndex: 2 },
            { x: -0.05, depth: 0.16, colorIndex: 0 },
            { x: 0, depth: 0.14, colorIndex: 1 },
            { x: 0.05, depth: 0.15, colorIndex: 2 }
          ]
        },
        {
          y: 0.9,
          books: [
            { x: -0.3, depth: 0.15, colorIndex: 2 },
            { x: -0.25, depth: 0.17, colorIndex: 1 },
            { x: -0.2, depth: 0.14, colorIndex: 0 },
            { x: -0.15, depth: 0.16, colorIndex: 2 },
            { x: -0.1, depth: 0.13, colorIndex: 1 },
            { x: -0.05, depth: 0.15, colorIndex: 0 },
            { x: 0, depth: 0.14, colorIndex: 2 },
            { x: 0.05, depth: 0.16, colorIndex: 1 },
            { x: 0.1, depth: 0.17, colorIndex: 0 }
          ]
        },
        {
          y: 1.26,
          books: [
            { x: -0.3, depth: 0.14, colorIndex: 1 },
            { x: -0.25, depth: 0.16, colorIndex: 0 },
            { x: -0.2, depth: 0.15, colorIndex: 2 },
            { x: -0.15, depth: 0.17, colorIndex: 1 },
            { x: -0.1, depth: 0.13, colorIndex: 0 },
            { x: -0.05, depth: 0.16, colorIndex: 2 }
          ]
        },
        {
          y: 1.62,
          books: [
            { x: -0.25, depth: 0.15, colorIndex: 0 },
            { x: -0.2, depth: 0.14, colorIndex: 1 },
            { x: -0.15, depth: 0.16, colorIndex: 2 },
            { x: -0.1, depth: 0.13, colorIndex: 0 }
          ]
        }
      ]
    }
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
