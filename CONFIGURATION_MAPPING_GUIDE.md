# Configuration Mapping Guide

## Overview

This document provides a complete map of all configuration files in the 3D House project. All hardcoded values have been centralized into configuration files for easy modification.

---

## 📁 Configuration Files Structure

```
src/config/
├── groundFloorCoordinates.js    # Ground floor furniture positions & properties
├── upperFloorCoordinates.js     # Upper floor furniture positions & properties
├── outsideCoordinates.js        # Outside elements (balcony, car, gym)
├── interactiveFeatures.js       # Audio/poster interactive mappings
├── timeBasedSettings.js         # Time-dependent feature settings
└── roofVideos.js                # Roof video rotation system
```

---

## 1. Ground Floor Coordinates

**File:** `src/config/groundFloorCoordinates.js`

### Exports:
- `ENTERTAINMENT` - TV, TVTable, PlayStation, PSController
- `LIVING_ROOM` - Sofa, CoffeeTable, BarcelonaCrest, Bookshelf
- `KITCHEN` - Kitchen, KitchenIsland, Refrigerator, BarStool, CoffeeMachine, CoffeeStationTable, WaterCooler

### Example Structure:
```javascript
export const ENTERTAINMENT = {
  tv: {
    position: [1.5, 0.875, 3.7],
    rotation: [0, Math.PI, 0],
    frame: { width: 1.2, height: 0.7, color: 0x1C1C1C, ... },
    screen: { width: 1.15, height: 0.65, ... }
  }
}
```

### How to Modify:
1. Open `src/config/groundFloorCoordinates.js`
2. Find the object you want to modify (e.g., `ENTERTAINMENT.tv`)
3. Change position, size, color, or material properties
4. Changes apply automatically to all components

---

## 2. Upper Floor Coordinates

**File:** `src/config/upperFloorCoordinates.js`

### Exports:
- `BEDROOM` - Bed, Pillow
- `OFFICE` - WorkDesk (with MacBook, monitor, chair)
- `SEATING_AREA` - AccentChair, SmallTable, OpenBook, Pen
- `FITNESS` - PunchingBag
- `DECORATIONS` - Rug, WallClock, DrawerTable, BluetoothSpeaker, PottedPlant

### Example Structure:
```javascript
export const BEDROOM = {
  bed: {
    position: [2.5, 3, -2.5],
    materials: { frame: {...}, mattress: {...} },
    frame: { width: 1.8, height: 0.5, ... }
  }
}
```

---

## 3. Outside Coordinates

**File:** `src/config/outsideCoordinates.js`

### Exports:
- `OUTSIDE.balcony` - Balcony structure with railings
- `OUTSIDE.car` - Car model (GLTF) position and scale
- `OUTSIDE.gym` - Gym equipment (GLTF) position and scale

### Example Structure:
```javascript
export const OUTSIDE = {
  car: {
    position: [6.35, 0.85, 0],
    rotation: 0,
    targetSize: 6,
    modelPath: '/Car/scene.gltf'
  }
}
```

### GLTF Models:
- **Car:** Auto-scales to `targetSize` (6 meters)
- **Gym:** Auto-scales to `targetSize` (1.8 meters)
- Position locked with `useFrame` to prevent drift

---

## 4. Interactive Features

**File:** `src/config/interactiveFeatures.js`

### Purpose:
Maps clickable objects to their audio files and poster displays.

### Structure:
```javascript
export const INTERACTIVE_FEATURES = {
  messi: {
    trigger: { component: 'TV', position: [...] },
    audio: { file: '/Messi.mp3', playEvent: 'tvPlaying' },
    poster: { svg: '/messi.svg', position: [...], size: [0.8, 1.0] }
  },
  ali: { ... },      // Punching bag
  jobs: { ... },     // Pillow
  musk: { ... },     // MacBook
  bezos: { ... }     // Open book
}
```

### Interactive Objects:
| Object | Audio | Poster | Location |
|--------|-------|--------|----------|
| TV | Messi.mp3 | messi.svg | Ground floor |
| Punching Bag | MAli.mp3 | MAli.svg | Upper floor gym |
| Pillow | SteveJobs.mp3 | SteveJobs.svg | Bedroom |
| MacBook | ElonMusk.mp3 | ElonMusk.svg | Office desk |
| Open Book | JeffBezos.mp3 | JeffBezos.svg | Seating area |

### How to Add New Interactive Object:
1. Add audio file to `public/`
2. Add SVG file to `public/`
3. Add entry to `INTERACTIVE_FEATURES`
4. Create component using `mediaManager`

---

## 5. Time-Based Settings

**File:** `src/config/timeBasedSettings.js`

### Purpose:
Controls all time-dependent features with centralized configuration.

### Configuration:
```javascript
export const TIME_BASED_CONFIG = {
  newspaper: {
    startHour: 6,     // 6 AM
    endHour: 11,      // 11 AM
    playOnce: true
  },
  mail: {
    startHour: 8,     // 8 AM
    endHour: 17,      // 5 PM
    intervalMinutes: 10
  },
  dayNight: {
    dayStartHour: 6,  // 6 AM
    dayEndHour: 18    // 6 PM
  },
  nightWeather: {
    enabled: true,
    options: ['rain', 'snow'],
    changeIntervalMinutes: 20
  }
}
```

### Time Windows:
| Feature | Time Window | Behavior |
|---------|-------------|----------|
| Newspaper | 6 AM - 11 AM | Flies in once per page load |
| Mail | 8 AM - 5 PM | Flies in every 10 minutes |
| Day Mode | 6 AM - 6 PM | Bright sky, clear weather |
| Night Mode | 6 PM - 6 AM | Dark sky, random rain/snow |

### Helper Functions:
- `isDayTime(isDevelopment)` - Check if day time
- `isNewspaperTime(isDevelopment)` - Check newspaper delivery hours
- `isMailTime(isDevelopment)` - Check mail delivery hours
- `setSimulatedTime(timeString)` - Set simulated time for dev mode

### Dev Mode Time Simulator:
In development mode, you can simulate different times:
- Select time from dropdown in settings panel
- Instantly see how scene behaves at that time
- Test newspaper/mail delivery without waiting

---

## 6. Roof Videos

**File:** `src/config/roofVideos.js`

### Purpose:
Manages video rotation on the roof. Random video selected on each page load.

### Configuration:
```javascript
export const ROOF_VIDEOS = [
  '/Videos/Animation1.mp4',
  '/Videos/Animation2.mp4',
  '/Videos/Animation3.mp4',
  '/Videos/Animation4.mp4',
  '/Videos/Animation5.mp4',
  '/Videos/Animation6.mp4',
  '/Videos/Animation7.mp4'
];
```

### Functions:
- `getRandomVideo()` - Returns random video path
- `getVideoByIndex(index)` - Get specific video
- `getVideoCount()` - Get total number of videos

### How to Add More Videos:
1. Place video file in `public/Videos/`
2. Add path to `ROOF_VIDEOS` array
3. Video will be included in random rotation

### Supported Formats:
- .mov (QuickTime)
- .mp4 (MPEG-4)
- .MP4 (case-insensitive)

---

## 🎯 Quick Reference: Common Modifications

### Change Furniture Position:
```javascript
// src/config/groundFloorCoordinates.js
export const LIVING_ROOM = {
  sofa: {
    position: [1.5, 0, 1]  // Change X, Y, Z here
  }
}
```

### Change Object Size:
```javascript
// src/config/groundFloorCoordinates.js
export const ENTERTAINMENT = {
  tv: {
    frame: {
      width: 1.2,   // Change width
      height: 0.7   // Change height
    }
  }
}
```

### Change Object Color:
```javascript
// src/config/groundFloorCoordinates.js
export const ENTERTAINMENT = {
  tv: {
    frame: {
      color: 0x1C1C1C  // Hex color (0x prefix)
    }
  }
}
```

### Change Material Properties:
```javascript
// Any config file
material: {
  color: 0xFFFFFF,
  roughness: 0.4,  // 0 = smooth, 1 = rough
  metalness: 0.3   // 0 = non-metal, 1 = metal
}
```

### Change Newspaper Delivery Time:
```javascript
// src/config/timeBasedSettings.js
newspaper: {
  startHour: 7,   // Change to 7 AM
  endHour: 10     // Change to 10 AM
}
```

### Change Mail Frequency:
```javascript
// src/config/timeBasedSettings.js
mail: {
  intervalMinutes: 15  // Change to every 15 minutes
}
```

### Change Day/Night Hours:
```javascript
// src/config/timeBasedSettings.js
dayNight: {
  dayStartHour: 7,   // Day starts at 7 AM
  dayEndHour: 19     // Day ends at 7 PM
}
```

### Add New Roof Video:
```javascript
// src/config/roofVideos.js
export const ROOF_VIDEOS = [
  '/Videos/Animation1.mp4',
  '/Videos/Animation2.mp4',
  '/Videos/Animation3.mp4',
  '/Videos/Animation4.mp4',
  '/Videos/Animation5.mp4',
  '/Videos/Animation6.mp4',
  '/Videos/Animation7.mp4',
  '/Videos/YourNewVideo.mp4'  // Add here
];
```

---

## 📂 File Locations Map

### Configuration Files:
```
src/config/
├── groundFloorCoordinates.js  → Ground floor objects
├── upperFloorCoordinates.js   → Upper floor objects
├── outsideCoordinates.js      → Outside objects
├── interactiveFeatures.js     → Audio/poster mappings
├── timeBasedSettings.js       → Time-dependent features
└── roofVideos.js              → Roof video rotation
```

### Component Files Using Config:
```
src/components/
├── ground-floor/
│   ├── entertainment/         → Uses ENTERTAINMENT
│   ├── living-room/          → Uses LIVING_ROOM
│   └── kitchen/              → Uses KITCHEN
├── upper-floor/
│   ├── bedroom/              → Uses BEDROOM
│   ├── office/               → Uses OFFICE
│   ├── seating-area/         → Uses SEATING_AREA
│   ├── fitness/              → Uses FITNESS
│   └── decorations/          → Uses DECORATIONS
├── outside/
│   ├── Balcony.jsx           → Uses OUTSIDE.balcony
│   ├── Car.jsx               → Uses OUTSIDE.car
│   ├── Gym.jsx               → Uses OUTSIDE.gym
│   ├── FlyingPaper.jsx       → Uses TIME_BASED_CONFIG.mail
│   └── RolledNewspaper.jsx   → Uses TIME_BASED_CONFIG.newspaper
└── House.jsx                 → Uses roofVideos
```

---

## 🔧 Development Tools

### Dev Mode Settings Panel:
**Location:** Top-right corner (only in dev mode)

**Folders:**
1. **Scene Controls**
   - Show Grid toggle
   - Time Simulator (13 time options)

2. **Coordinate Explorer**
   - X, Y, Z position sliders
   - Live preview marker

3. **Weather**
   - Weather type selector

4. **Audio**
   - Volume controls

5. **Post-Processing**
   - Bloom and SSAO controls

### NPM Commands:
```bash
npm run dev   # Development mode (panel visible, grid on)
npm run prod  # Production mode (panel hidden, grid off)
npm run build # Build for production
```

---

## 📝 Best Practices

### When Modifying Configurations:

1. **Always use the config files** - Never hardcode values in components
2. **Follow the 1:1 mapping pattern** - Direct value references, no calculations
3. **Use descriptive property names** - Make it clear what each value represents
4. **Test after changes** - Verify the component still renders correctly
5. **Keep units consistent** - All positions in meters, colors in hex

### Adding New Objects:

1. **Add to appropriate config file** (ground/upper/outside)
2. **Include all properties:**
   - Position [x, y, z]
   - Rotation (if needed)
   - Dimensions (width, height, depth)
   - Materials (color, roughness, metalness)
3. **Create component** that imports and uses the config
4. **Add to parent component** (House.jsx or Furniture.jsx)

---

## 🎨 Color Reference

Colors use hexadecimal format with `0x` prefix:

| Color | Hex Code | Usage |
|-------|----------|-------|
| White | 0xFFFFFF | Walls, furniture |
| Black | 0x000000 | Accents, details |
| Gray | 0x808080 | Metal, concrete |
| Wood | 0x8B4513 | Furniture, floors |
| Red | 0xFF0000 | Accents, lights |
| Blue | 0x0000FF | Screens, lights |

---

## 📊 Position Coordinate System

### Axes:
- **X-axis:** Left (-) to Right (+)
- **Y-axis:** Down (-) to Up (+)
- **Z-axis:** Back (-) to Front (+)

### Reference Points:
- **Origin [0, 0, 0]:** Center of ground floor
- **Ground Level:** Y = 0
- **Upper Floor:** Y = 3
- **House Bounds:** -4 to 4 (X), 0 to 6 (Y), -4 to 4 (Z)

### Common Positions:
| Location | Approximate Position |
|----------|---------------------|
| Living Room Center | [1.5, 0, 1] |
| Kitchen Center | [-1.5, 0, -2.5] |
| Bedroom Center | [2.5, 3, -2.5] |
| Office Center | [-3, 3, -2] |
| Front Yard | [0, 0, 8] |

---

## ⏰ Time-Based Features

### Newspaper Delivery:
- **Time Window:** 6 AM - 11 AM
- **Behavior:** Flies in once per page refresh
- **Config:** `TIME_BASED_CONFIG.newspaper`
- **To Change:** Modify `startHour` and `endHour`

### Mail Delivery:
- **Time Window:** 8 AM - 5 PM
- **Behavior:** Flies in every 10 minutes
- **Config:** `TIME_BASED_CONFIG.mail`
- **To Change:** Modify `intervalMinutes`

### Day/Night Cycle:
- **Day:** 6 AM - 6 PM (bright sky, clear weather)
- **Night:** 6 PM - 6 AM (dark sky, random rain/snow)
- **Config:** `TIME_BASED_CONFIG.dayNight`
- **To Change:** Modify `dayStartHour` and `dayEndHour`

### Night Weather:
- **When:** Night mode only
- **Options:** Rain or Snow (random)
- **Frequency:** Changes every 20 minutes
- **Config:** `TIME_BASED_CONFIG.nightWeather`
- **To Change:** Modify `changeIntervalMinutes` or `options` array

---

## 🎬 Roof Video System

### Current Videos:
1. Animation1.mp4
2. Animation2.mp4
3. Animation3.mp4
4. Animation4.mp4
5. Animation5.mp4
6. Animation6.mp4
7. Animation7.mp4

### Random Selection:
- One video randomly selected on page load
- Video stays same during session
- Refresh page to see different video

### Adding Videos:
1. Place video in `public/Videos/`
2. Add path to `ROOF_VIDEOS` array in `src/config/roofVideos.js`
3. Video automatically included in rotation

---

## 🎮 Interactive Features Map

### Audio/Poster System:
Each interactive object has:
- **Trigger:** The clickable 3D object
- **Audio:** MP3 file that plays
- **Poster:** SVG that appears on wall

### Current Mappings:
```javascript
TV → Messi.mp3 + messi.svg
Punching Bag → MAli.mp3 + MAli.svg
Pillow → SteveJobs.mp3 + SteveJobs.svg
MacBook → ElonMusk.mp3 + ElonMusk.svg
Open Book → JeffBezos.mp3 + JeffBezos.svg
```

### Media Manager:
- Only one audio/poster plays at a time
- Clicking another object stops current playback
- Singleton pattern ensures no conflicts

---

## 🛠️ Troubleshooting

### Object Not Appearing:
1. Check position is within house bounds
2. Verify Y position is above ground (Y > 0)
3. Check if object is hidden by walls

### Object Wrong Size:
1. Check dimensions in config file
2. Verify scale/radius values
3. For GLTF models, adjust `targetSize`

### Colors Not Right:
1. Verify hex format uses `0x` prefix
2. Check material properties (roughness, metalness)
3. Ensure lighting is adequate

### Time Features Not Working:
1. Check time windows in `timeBasedSettings.js`
2. Verify current time is within window
3. Use dev mode time simulator to test

---

## 📚 Related Documentation

- **AUDIO_SETUP_GUIDE.md** - How to add spatial audio
- **ROOF_ANIMATION_GUIDE.md** - Video texture implementation
- **VIDEO_OPTIMIZATION_GUIDE.md** - Video performance tips
- **3DModelingSpecificationModernHouse.md** - Original specifications

---

## 🎯 Summary

**All configurations are centralized in `src/config/` directory:**
- ✅ Easy to find and modify
- ✅ No hardcoded values in components
- ✅ Consistent structure across all files
- ✅ Well-documented with comments
- ✅ Type-safe with JSDoc annotations

**To modify anything in the 3D house, start by looking in the appropriate config file!**
