/**
 * Centralized configuration for all interactive audio/poster features
 * 
 * Each feature has:
 * - trigger: The clickable object that starts the interaction
 * - audio: Audio file and event names
 * - poster: SVG image, position, rotation, and size settings
 * 
 * To adjust any feature:
 * 1. Modify the values in this file
 * 2. Changes will apply to all components automatically
 */

export const INTERACTIVE_FEATURES = {
  messi: {
    // TV on ground floor
    trigger: {
      component: 'TV',
      position: [1.5, 0.875, 3.7],
      rotation: [0, Math.PI, 0]
    },
    audio: {
      file: '/Messi.mp3',
      playEvent: 'tvPlaying',
      endEvent: 'tvPlaying'
    },
    poster: {
      svg: '/messi.svg',
      position: [3.7, 1.75, 3],
      rotation: [0, -Math.PI / 2, 0],
      size: [0.8, 1.0], // [width, height] in meters
      wall: 'right'
    }
  },

  ali: {
    // Punching bag on upper floor
    trigger: {
      component: 'PunchingBag',
      position: [2.75, 3, 3.25]
    },
    audio: {
      file: '/MAli.mp3',
      playEvent: 'punchingBagPlaying',
      endEvent: 'punchingBagPlaying'
    },
    poster: {
      svg: '/MAli.svg',
      position: [3.7, 4.75, 3],
      rotation: [0, -Math.PI / 2, 0],
      size: [0.8, 1.0],
      wall: 'right'
    }
  },

  jobs: {
    // Pillow on bed, upper floor
    trigger: {
      component: 'Pillow',
      position: [2.5, 3.9, -2.3]
    },
    audio: {
      file: '/SteveJobs.mp3',
      playEvent: 'pillowPlaying',
      endEvent: 'pillowPlaying'
    },
    poster: {
      svg: '/SteveJobs.svg',
      position: [3.7, 5.0, -2.5],
      rotation: [0, -Math.PI / 2, 0],
      size: [0.8, 1.0],
      wall: 'right'
    }
  },

  musk: {
    // MacBook on work desk, upper floor
    trigger: {
      component: 'MacBook',
      position: 'WorkDesk', // Part of WorkDesk component
      rotation: [Math.PI / 2, 0, 0]
    },
    audio: {
      file: '/ElonMusk.mp3',
      playEvent: 'laptopPlaying',
      endEvent: 'laptopPlaying'
    },
    poster: {
      svg: '/ElonMusk.svg',
      position: [-3, 5.25, -3.6],
      rotation: [0, 0, 0],
      size: [0.8, 1.0],
      wall: 'back'
    }
  },

  bezos: {
    // Open book on small table between chairs, upper floor
    trigger: {
      component: 'OpenBook',
      position: [0.95, 3.525, 1.05],
      rotation: [0, 0.3, 0]
    },
    audio: {
      file: '/JeffBezos.mp3',
      playEvent: 'bezosAudioPlay',
      endEvent: 'bezosAudioEnd'
    },
    poster: {
      svg: '/JeffBezos.svg',
      position: [3.7, 4.5, 0.5],
      rotation: [0, -Math.PI / 2, 0],
      size: [0.8, 1.0],
      wall: 'right'
    }
  }
};

/**
 * Helper function to get feature config by name
 * @param {string} featureName - Name of the feature (messi, ali, jobs, musk, bezos)
 * @returns {object} Feature configuration
 */
export const getFeatureConfig = (featureName) => {
  return INTERACTIVE_FEATURES[featureName];
};

/**
 * Get all feature names
 * @returns {string[]} Array of feature names
 */
export const getFeatureNames = () => {
  return Object.keys(INTERACTIVE_FEATURES);
};
