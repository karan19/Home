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
  barca: {
    trigger: { component: 'BarcelonaCrest' },
    audio: {
      files: ['/audio/barca-anthem.mp3'],
      playEvent: 'barcaPlaying',
      endEvent: 'barcaPlaying'
    },
    poster: { image: '/FCBCrest.svg', preserveColors: true, size: [5.6, 6.6], roofSize: [6.8, 6.9] }
  },
  huberman: {
    trigger: { component: 'SupplementBox', position: [-3.63, 3.515, -3.18] },
    audio: { files: ['/celebrities/huberman/Huberman.mp3'], playEvent: 'hubermanPlaying', endEvent: 'hubermanPlaying' },
    poster: { image: '/celebrities/gallery/huberman.svg', position: [-1.65, 4.85, -3.72], rotation: [0, 0, 0], size: [0.8, 1.0], wall: 'back' }
  },
  jordan: {
    trigger: { component: 'SportsMemorabilia', position: [3.43, 3, 1.9] },
    audio: { files: ['/celebrities/jordan/Jordan.mp3'], playEvent: 'jordanPlaying', endEvent: 'jordanPlaying' },
    poster: { image: '/celebrities/gallery/jordan.svg', position: [3.72, 4.85, 1.9], rotation: [0, -Math.PI / 2, 0], size: [0.8, 1.0], wall: 'right' }
  },
  sachin: {
    trigger: { component: 'SportsMemorabilia', position: [3.48, 0.1, -0.25] },
    audio: { files: ['/celebrities/sachin/Sachin.mp3'], playEvent: 'sachinPlaying', endEvent: 'sachinPlaying' },
    poster: { image: '/celebrities/gallery/sachin.svg?v=upper-body', position: [3.72, 1.95, -0.25], rotation: [0, -Math.PI / 2, 0], size: [1.0, 1.5], wall: 'right' }
  },
  federer: {
    trigger: { component: 'SportsMemorabilia', position: [3.48, 3, -1.05] },
    audio: { files: ['/celebrities/federer/Federer.mp3'], playEvent: 'federerPlaying', endEvent: 'federerPlaying' },
    poster: { image: '/celebrities/gallery/federer.svg', position: [3.72, 4.65, -1.05], rotation: [0, -Math.PI / 2, 0], size: [0.75, 1.0], wall: 'right' }
  },
  carlsen: {
    // Chess set on the small table between the chairs, upper floor
    trigger: { component: 'ChessBoard', position: [0.95, 3.65, 1.05] },
    audio: {
      // Four Magnus Carlsen clips; useInteractiveAudio picks one at random on each click.
      // Files are named by the opening words of each clip.
      files: [
        '/celebrities/carlsen/if-you-want-to-be-great.mp3',
        '/celebrities/carlsen/i-think-about-chess-all-the-time.mp3',
        '/celebrities/carlsen/best-player-in-the-world.mp3',
        '/celebrities/carlsen/what-separates-the-great-players.mp3'
      ],
      playEvent: 'carlsenPlaying', endEvent: 'carlsenPlaying'
    },
    poster: {
      image: '/celebrities/gallery/carlsen.svg',
      position: [2.3, 4.85, -3.72], rotation: [0, 0, 0],
      size: [0.8, 1.0], wall: 'back'
    }
  },
  einstein: {
    trigger: { component: 'WallClock', position: [-0.5, 5.25, -3.6] },
    audio: {
      files: ['/celebrities/einstein/speech.mp3'],
      playEvent: 'einsteinPlaying', endEvent: 'einsteinPlaying'
    },
    poster: {
      image: '/celebrities/gallery/einstein.svg',
      position: [0.65, 4.85, -3.72], rotation: [0, 0, 0],
      size: [0.8, 1.0], wall: 'back'
    }
  },
  messi: {
    // TV on ground floor
    trigger: {
      component: 'TV',
      position: [1.5, 0.875, 3.7],
      rotation: [0, Math.PI, 0]
    },
    audio: {
      files: ['/celebrities/messi/Messi.mp3'],
      playEvent: 'tvPlaying',
      endEvent: 'tvPlaying'
    },
    poster: {
      image: '/celebrities/gallery/messi.svg',
      position: [3.72, 1.85, 2.6],
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
      files: ['/celebrities/ali/MAli.mp3'],
      playEvent: 'punchingBagPlaying',
      endEvent: 'punchingBagPlaying'
    },
    poster: {
      image: '/celebrities/gallery/ali.svg',
      position: [3.72, 4.85, 3.25],
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
      // Six Jobs clips; useInteractiveAudio picks one at random on each click.
      // Files are named by the opening words of each clip.
      files: [
        '/celebrities/jobs/your-time-is-limited.mp3',
        '/celebrities/jobs/im-convinced-that-about-half.mp3',
        '/celebrities/jobs/youve-got-to-start-with-the-customer-experience.mp3',
        '/celebrities/jobs/i-dont-really-care-about-being-right.mp3',
        '/celebrities/jobs/in-my-career-i-found-that-the-best-people.mp3',
        '/celebrities/jobs/life-can-be-much-broader.mp3'
      ],
      playEvent: 'pillowPlaying',
      endEvent: 'pillowPlaying'
    },
    poster: {
      image: '/celebrities/gallery/jobs.svg',
      position: [3.72, 4.85, -2.6],
      rotation: [0, -Math.PI / 2, 0],
      size: [0.8, 1.0],
      wall: 'right'
    }
  },

  dwight: {
    // Backyard lamp post on the kitchen side (back-left corner of the yard)
    trigger: {
      component: 'LampPost',
      position: [-7, 1.25, -7]
    },
    audio: {
      // Five Dwight Schrute clips; useInteractiveAudio picks one at random on each click.
      // Files are named by the signature line of each clip.
      files: [
        '/celebrities/dwight/dont-be-an-idiot.mp3',
        '/celebrities/dwight/volunteer-sheriffs-deputy.mp3',
        '/celebrities/dwight/i-keep-various-weaponry.mp3',
        '/celebrities/dwight/im-all-about-loyalty.mp3',
        '/celebrities/dwight/no-limit-to-what-i-think-i-deserve.mp3'
      ],
      playEvent: 'dwightPlaying',
      endEvent: 'dwightPlaying'
    },
    poster: {
      image: '/celebrities/gallery/dwight.svg',
      // Back wall above the kitchen cabinets: the kitchen run spans
      // x -3.0..-0.5, upper cabinets top out at y 2.2, floor slab at y 3.0.
      position: [-1.75, 2.59, -3.72],
      rotation: [0, 0, 0],
      size: [1.0, 0.75],
      wall: 'back'
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
      files: ['/celebrities/musk/ElonMusk.mp3'],
      playEvent: 'laptopPlaying',
      endEvent: 'laptopPlaying'
    },
    poster: {
      image: '/celebrities/gallery/musk.svg',
      position: [-3, 4.85, -3.72],
      rotation: [0, 0, 0],
      size: [0.8, 1.0],
      wall: 'back'
    }
  },

  bezos: {
    // Bookshelf downstairs (the open book upstairs also plays Bezos)
    trigger: {
      component: 'Bookshelf',
      position: [3.25, 0, -3.55]
    },
    audio: {
      files: ['/celebrities/bezos/Bezos.mp3'],
      playEvent: 'bezosAudioPlay',
      endEvent: 'bezosAudioEnd'
    },
    poster: {
      image: '/celebrities/gallery/bezos.svg',
      position: [3.72, 1.9, -2.0],
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

const getRandomItem = (items = []) => {
  if (!items.length) return null;
  const index = Math.floor(Math.random() * items.length);
  return items[index];
};

/**
 * Get a random audio file path for a feature
 * @param {string} featureName
 * @returns {string|null}
 */
export const getRandomAudioFile = (featureName) => {
  const feature = INTERACTIVE_FEATURES[featureName];
  if (!feature || !feature.audio) return null;
  return getRandomItem(feature.audio.files);
};

/**
 * Get all feature names
 * @returns {string[]} Array of feature names
 */
export const getFeatureNames = () => {
  return Object.keys(INTERACTIVE_FEATURES);
};
