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
    modelPath: '/models/sofa/sofa.glb',
    modelSize: [2.2, 0.72, 0.9], // Width, height, depth in meters
    rotation: [0, 0, 0],
    floorOffset: 0.1, // Ground floor's top surface
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
      heightScale: 0.45,
      depth: 0.02,
      color: 0xFFCC00,
      roughness: 0.3,
      metalness: 0.6
    },
    crest: {
      widthScale: 0.4,
      heightScale: 0.4056338,
      positionZ: 0.016,
      alphaTest: 0.01,
      roughness: 0.4,
      metalness: 0.1
    }
  },
  bookshelf: {
    position: [3.25, 0, -3.55],
    rotation: [0, 0, 0],
    modelPath: '/models/bookshelf/bookshelf.glb',
    modelSize: [1, 1.8, 0.3], // Width, height, depth in meters
    floorOffset: 0.1
  }
};

export const KITCHEN = {
  kitchenIsland: { 
    position: [-1.5, 0, -1.5],
    cabinetMaterial: {
      color: 0xFFFFFF,
      roughness: 0.3,
      metalness: 0.0
    },
    countertopMaterial: {
      color: 0xE0E0E0,
      roughness: 0.2,
      metalness: 0.0
    },
    base: {
      width: 1.5,
      height: 0.9,
      depth: 0.8,
      positionY: 0.45
    },
    countertop: {
      width: 1.6,
      height: 0.05,
      depth: 0.85,
      positionY: 0.925
    },
    barStools: {
      positions: [[-0.5, 0, 0.6], [0.5, 0, 0.6]]
    },
    bowl: {
      radius: 0.15,
      widthSegments: 16,
      heightSegments: 16,
      phiStart: 0,
      phiLength: Math.PI * 2,
      thetaStart: 0,
      thetaLength: Math.PI / 2,
      positionY: 0.95,
      color: 0xFFFFFF,
      roughness: 0.3
    },
    fruit: {
      colors: [0xFF6347, 0xFFD700, 0x32CD32],
      radius: 0.05,
      segments: 8,
      positionY: 0.98,
      baseX: -0.08,
      spacing: 0.08,
      roughness: 0.6
    }
  },
  kitchen: { 
    position: [-1.75, 0, -3.5],
    materials: {
      cabinetWhite: { color: "#FFFFFF", roughness: 0.3, metalness: 0 },
      cabinetDoor: { color: "#F8F8F8", roughness: 0.3, metalness: 0 },
      handle: { color: "#808080", roughness: 0.3, metalness: 0.6 },
      countertop: { color: "#E0E0E0", roughness: 0.2, metalness: 0 },
      stoveSurface: { color: "#1C1C1C", roughness: 0.3, metalness: 0.5 },
      burnerGrate: { color: "#2C2C2C", roughness: 0.4, metalness: 0.3 },
      burnerCenter: { color: "#1C1C1C", roughness: 0.5, metalness: 0.2 },
      controlKnob: { color: "#3C3C3C", roughness: 0.4, metalness: 0.3 },
      sinkBasin: { color: "#C0C0C0", roughness: 0.3, metalness: 0.7 },
      sinkInterior: { color: "#A0A0A0", roughness: 0.4, metalness: 0.6 },
      drain: { color: "#808080", roughness: 0.3, metalness: 0.5 },
      faucet: { color: "#C0C0C0", roughness: 0.2, metalness: 0.8 },
      toasterBody: { color: "#C0C0C0", roughness: 0.3, metalness: 0.7 },
      toasterSlot: { color: "#1C1C1C", roughness: 0.8, metalness: 0 },
      backsplash: { color: "#F5F5F5", roughness: 0.4, metalness: 0 },
      rangeHood: { color: "#C0C0C0", roughness: 0.3, metalness: 0.7 },
      hoodVent: { color: "#3C3C3C", roughness: 0.5, metalness: 0.4 },
      hoodLight: { color: "#FFFFCC", emissive: "#FFFFCC", emissiveIntensity: 0.3, roughness: 0.1, metalness: 0 }
    },
    baseCabinets: {
      body: { width: 2.5, height: 0.9, depth: 0.6, positionY: 0.45 },
      door: { width: 0.75, height: 0.7, depth: 0.02, positionY: 0.45, positionZ: 0.31, xPositions: [-0.8, 0, 0.8] },
      handle: { radius: 0.01, height: 0.12, segments: 8, yPositions: [0.6, 0.3], xPositions: [-0.8, 0, 0.8], positionZ: 0.33 }
    },
    countertop: {
      width: 2.6, height: 0.05, depth: 0.65, positionY: 0.95
    },
    stove: {
      positionX: -0.8, positionY: 0.975,
      surface: { width: 0.6, height: 0.02, depth: 0.6 },
      burner: {
        positions: [[-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]],
        grate: { radius: 0.08, height: 0.01, segments: 8, positionY: 0.02 },
        center: { radius: 0.04, height: 0.005, segments: 8, positionY: 0.01 }
      },
      knobs: { radius: 0.02, height: 0.03, segments: 8, xPositions: [-0.2, -0.07, 0.07, 0.2], positionZ: 0.35 }
    },
    sink: {
      positionX: 0.3, positionY: 0.975,
      basin: { width: 0.55, height: 0.15, depth: 0.4, positionY: -0.075 },
      interior: { width: 0.52, height: 0.14, depth: 0.37, positionY: -0.07 },
      drain: { radius: 0.04, height: 0.01, segments: 16, positionY: -0.14 }
    },
    faucet: {
      positionX: 0.3, positionY: 0.975, positionZ: -0.25,
      base: { radiusTop: 0.04, radiusBottom: 0.05, height: 0.04, segments: 16, positionY: 0.02 },
      neck: { radius: 0.02, height: 0.25, segments: 12, positionY: 0.15 },
      spout: { radiusTop: 0.015, radiusBottom: 0.02, height: 0.15, segments: 12, positionY: 0.25, positionZ: 0.1, rotationX: Math.PI / 4 },
      handle: { radius: 0.015, height: 0.08, segments: 12, positionX: 0.08, positionY: 0.2, rotationZ: Math.PI / 2 }
    },
    toaster: {
      positionX: 1, positionY: 0.975,
      body: { width: 0.25, height: 0.18, depth: 0.15, radius: 0.02, smoothness: 4 },
      slot: { width: 0.04, height: 0.02, depth: 0.12, positionY: 0.08, xPositions: [-0.05, 0.05] },
      dial: { radius: 0.02, height: 0.01, segments: 16, positionX: 0.13, rotationZ: Math.PI / 2 },
      crumbTray: { width: 0.24, height: 0.01, depth: 0.14, positionY: -0.09 }
    },
    backsplash: {
      width: 2.5, height: 0.5, depth: 0.02, positionY: 1.475, positionZ: -0.295
    },
    upperCabinets: {
      positionY: 1.85, positionZ: -0.125,
      body: { width: 2.5, height: 0.7, depth: 0.35 },
      door: { width: 0.75, height: 0.6, depth: 0.02, positionZ: 0.185, xPositions: [-0.8, 0, 0.8] },
      handle: { radius: 0.01, height: 0.12, segments: 8, positionY: -0.2, positionZ: 0.2, xPositions: [-0.8, 0, 0.8] }
    },
    rangeHood: {
      positionX: -0.8, positionY: 1.85, positionZ: -0.125,
      body: { width: 0.7, height: 0.3, depth: 0.5, positionY: 0.15 },
      vent: { width: 0.65, height: 0.25, depth: 0.02, positionZ: 0.1 },
      light: { width: 0.3, height: 0.01, depth: 0.1, positionY: 0.02, positionZ: 0.15 }
    }
  },
  refrigerator: { 
    position: [-3.5, 0, -3.5],
    materials: {
      body: { color: "#C0C0C0", roughness: 0.3, metalness: 0.7 },
      door: { color: "#B8B8B8", roughness: 0.3, metalness: 0.7 },
      handle: { color: "#808080", roughness: 0.2, metalness: 0.8 },
      dispenserPanel: { color: "#2C2C2C", roughness: 0.4, metalness: 0.3 },
      dispenserOpening: { color: "#1C1C1C", roughness: 0.6, metalness: 0.2 },
      controlButton: { color: "#3C3C3C", roughness: 0.4, metalness: 0.3 },
      doorSeam: { color: "#909090", roughness: 0.4, metalness: 0.6 },
      brandLogo: { color: "#A0A0A0", roughness: 0.3, metalness: 0.5 }
    },
    mainBody: {
      width: 0.9,
      height: 1.8,
      depth: 0.7,
      radius: 0.02,
      smoothness: 4,
      positionY: 0.9
    },
    frenchDoors: {
      positionY: 1.15,
      leftDoor: { width: 0.43, height: 1.2, depth: 0.02, positionX: -0.225, positionZ: 0.36 },
      rightDoor: { width: 0.43, height: 1.2, depth: 0.02, positionX: 0.225, positionZ: 0.36 },
      leftHandle: { width: 0.02, height: 0.4, depth: 0.03, positionX: -0.02, positionZ: 0.37 },
      rightHandle: { width: 0.02, height: 0.4, depth: 0.03, positionX: 0.02, positionZ: 0.37 }
    },
    dispenser: {
      positionX: -0.225, positionY: 0.3, positionZ: 0.37,
      panel: { width: 0.2, height: 0.3, depth: 0.01 },
      opening: { width: 0.08, height: 0.06, depth: 0.01, positionY: -0.08, positionZ: 0.01 },
      buttons: {
        width: 0.03, height: 0.03, depth: 0.005,
        leftPositionX: -0.05, rightPositionX: 0.05,
        positionY: 0.08, positionZ: 0.01
      }
    },
    freezerDrawer: {
      positionY: 0.25,
      front: { width: 0.86, height: 0.48, depth: 0.02, positionZ: 0.36 },
      handle: { width: 0.5, height: 0.02, depth: 0.03, positionY: 0.15, positionZ: 0.37 }
    },
    doorSeam: {
      width: 0.01, height: 1.2, depth: 0.01, positionY: 1.15, positionZ: 0.365
    },
    brandLogo: {
      width: 0.15, height: 0.05, depth: 0.005, positionY: 1.65, positionZ: 0.365
    }
  },
  barStool: {
    woodMaterial: {
      color: 0xD2B48C,
      roughness: 0.4,
      metalness: 0.0
    },
    legMaterial: {
      color: 0x2C2C2C,
      metalness: 0.5,
      roughness: 0.4
    },
    seat: {
      radius: 0.2,
      height: 0.05,
      segments: 16,
      positionY: 0.75
    },
    leg: {
      radiusTop: 0.02,
      radiusBottom: 0.025,
      height: 0.75,
      segments: 8,
      positionY: 0.375,
      radialDistance: 0.15,
      count: 4
    },
    footrest: {
      radius: 0.15,
      tube: 0.015,
      radialSegments: 8,
      tubularSegments: 16,
      positionY: 0.3,
      rotationX: Math.PI / 2
    }
  },
  coffeeMachine: { 
    position: [0.25, 0.825, -3.4],
    materials: {
      base: { color: 0x1C1C1C, roughness: 0.4, metalness: 0.3 },
      mainBody: { color: 0xC0C0C0, roughness: 0.2, metalness: 0.8 },
      waterTank: { color: 0x87CEEB, transparent: true, opacity: 0.3, roughness: 0.1, metalness: 0.1 },
      groupHead: { color: 0x8B8B8B, roughness: 0.3, metalness: 0.7 },
      portafilterHandle: { color: 0x2C2C2C, roughness: 0.5, metalness: 0.2 },
      filterBasket: { color: 0x8B8B8B, roughness: 0.3, metalness: 0.7 },
      steamWand: { color: 0xC0C0C0, roughness: 0.2, metalness: 0.9 },
      dripSpout: { color: 0x8B8B8B, roughness: 0.2, metalness: 0.8 },
      controlPanel: { color: 0x1C1C1C, roughness: 0.3, metalness: 0.5 },
      buttonRed: { color: 0xFF4444, emissive: 0xFF0000, emissiveIntensity: 0.3, roughness: 0.4, metalness: 0.6 },
      buttonBlue: { color: 0x4444FF, emissive: 0x0000FF, emissiveIntensity: 0.3, roughness: 0.4, metalness: 0.6 },
      gauge: { color: 0xF5F5F5, roughness: 0.2, metalness: 0.5 },
      gaugeNeedle: { color: 0xFF0000 },
      cupWarmer: { color: 0x8B8B8B, roughness: 0.3, metalness: 0.7 },
      coffeeCup: { color: 0xFFFFFF, roughness: 0.3, metalness: 0.1 }
    },
    base: { width: 0.35, height: 0.05, depth: 0.4, radius: 0.005, smoothness: 4, positionY: 0.025 },
    mainBody: { width: 0.32, height: 0.3, depth: 0.35, radius: 0.01, smoothness: 4, positionY: 0.2 },
    waterTank: { width: 0.15, height: 0.25, depth: 0.08, radius: 0.005, smoothness: 4, positionY: 0.225, positionZ: -0.16 },
    groupHead: { radiusTop: 0.06, radiusBottom: 0.08, height: 0.08, segments: 16, positionY: 0.25, positionZ: 0.18 },
    portafilter: {
      positionX: -0.1, positionY: 0.22, positionZ: 0.2,
      handle: { radius: 0.015, height: 0.12, segments: 12, rotationZ: -Math.PI / 6 },
      basket: { radius: 0.03, height: 0.02, segments: 16, positionY: -0.04 }
    },
    steamWand: {
      positionX: 0.12, positionY: 0.25, positionZ: 0.1,
      arm: { radius: 0.008, height: 0.15, segments: 12, rotationZ: Math.PI / 4 },
      tip: { radius: 0.01, height: 0.02, segments: 12, positionX: 0.08, positionY: -0.08 }
    },
    dripSpouts: {
      radiusTop: 0.008, radiusBottom: 0.006, height: 0.04, segments: 12,
      positionY: 0.18, positionZ: 0.2,
      xPositions: [-0.02, 0.02]
    },
    controlPanel: { width: 0.2, height: 0.08, depth: 0.02, radius: 0.003, smoothness: 4, positionY: 0.32, positionZ: 0.18 },
    buttons: {
      radius: 0.008, height: 0.01, segments: 12,
      xPositions: [-0.06, -0.02, 0.02, 0.06],
      positionY: 0.32, positionZ: 0.19,
      redIndex: 1
    },
    gauge: {
      radius: 0.025, height: 0.01, segments: 24,
      positionY: 0.38, positionZ: 0.17,
      rotationX: Math.PI / 6
    },
    gaugeNeedle: {
      width: 0.001, height: 0.02, depth: 0.001,
      positionY: 0.38, positionZ: 0.175,
      rotationX: Math.PI / 6, rotationZ: -Math.PI / 4
    },
    cupWarmer: { width: 0.3, height: 0.02, depth: 0.32, radius: 0.005, smoothness: 4, positionY: 0.44 },
    coffeeCup: {
      positionX: 0.08, positionY: 0.47, positionZ: 0.05,
      radiusTop: 0.03, radiusBottom: 0.025, height: 0.04, segments: 16,
      handle: {
        radius: 0.015, tube: 0.003, radialSegments: 8, tubularSegments: 12,
        angle: Math.PI, positionX: 0.035, rotationZ: Math.PI / 2
      }
    }
  },
  coffeeStationTable: { 
    position: [0.25, 0, -3.4],
    woodMaterial: {
      color: 0x8B4513,
      roughness: 0.6,
      metalness: 0.1
    },
    dimensions: {
      tableWidth: 0.6,
      tableHeight: 0.8,
      tableDepth: 0.5,
      legWidth: 0.05
    },
    tabletop: {
      height: 0.05,
      radius: 0.01,
      smoothness: 4
    },
    leg: {
      radius: 0.005,
      smoothness: 4
    }
  },
  waterCooler: { 
    position: [1.25, 0, -3.55],
    materials: {
      baseCabinet: { color: 0x404040, roughness: 0.6, metalness: 0.2 },
      mainBody: { color: 0xF0F0F0, roughness: 0.4, metalness: 0.1 },
      waterBottle: { color: 0x4A90E2, transparent: true, opacity: 0.6, roughness: 0.1, metalness: 0.1 },
      bottleCap: { color: 0xFFFFFF, roughness: 0.3, metalness: 0.1 },
      hotTap: { color: 0xCC0000, roughness: 0.3, metalness: 0.4 },
      coldTap: { color: 0x0066CC, roughness: 0.3, metalness: 0.4 },
      dripTray: { color: 0x303030, roughness: 0.5, metalness: 0.3 }
    },
    baseCabinet: { width: 0.3, height: 0.3, depth: 0.3, radius: 0.01, smoothness: 4, positionY: 0.15 },
    mainBody: { width: 0.28, height: 0.5, depth: 0.28, radius: 0.01, smoothness: 4, positionY: 0.55 },
    waterBottle: { radius: 0.12, height: 0.3, segments: 16, positionY: 0.9 },
    bottleCap: { radius: 0.08, height: 0.05, segments: 16, positionY: 1.05 },
    hotTap: { radius: 0.015, height: 0.06, segments: 8, positionX: -0.08, positionY: 0.45, positionZ: 0.15 },
    coldTap: { radius: 0.015, height: 0.06, segments: 8, positionX: 0.08, positionY: 0.45, positionZ: 0.15 },
    dripTray: { width: 0.25, height: 0.02, depth: 0.15, radius: 0.005, smoothness: 4, positionY: 0.35, positionZ: 0.15 }
  }
};
