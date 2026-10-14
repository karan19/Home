# Project Master Guide

This document consolidates all technical specifications, setup guides, and optimization manuals for the Modern House 3D project.

## Current Implementation Note

The active application is the Vite/React implementation in `src/`, launched from `src/main.jsx` and `src/App.jsx`. The older vanilla Three.js implementation in `js/` and `css/` is retained for migration reference only and is not loaded by the current `index.html`.

---

## Table of Contents
1. [3D Modeling Specifications](#1-3d-modeling-specifications)
2. [Configuration Mapping Guide](#2-configuration-mapping-guide)
3. [Audio Setup Guide](#3-audio-setup-guide)
4. [Roof Animation Implementation](#4-roof-animation-implementation)
5. [Video Optimization Guide](#5-video-optimization-guide)
6. [Model Compression Guide](#6-model-compression-guide)

---

## 1. 3D Modeling Specifications
### Modern Two-Story Residential Cutaway Model
**Deliverable**: Isometric cutaway 3D model of a two-story modern residential structure  
**Export Format**: .glb (GL Transmission Format Binary)  
**Target Use**: Web-based UI rendering  
**Viewing Angle**: Isometric perspective with front-left cutaway view  
**Polygon Budget**: Target 50,000-100,000 triangles  

#### Global Specifications
*   **Units**: Metric (1 unit = 1 meter)
*   **Dimensions**: ~8m x 8m x 6m
*   **Origin Point**: Center of ground floor base
*   **Optimization**: Individual objects under 5,000 triangles; Draco compression enabled.

#### Structural Elements
*   **Foundation**: 8m x 8m x 0.2m light gray slab.
*   **Exterior Walls**: 0.25m thick, 6m tall. Only back and right walls are modeled (cutaway view).
*   **Floor Separation**: Second floor at Y=3m with hardwood top and white ceiling bottom.
*   **Roof**: Flat roof (8.6m x 8.6m x 0.4m) with exposed beam details.
*   **Staircase**: 12-tread floating staircase with dark wood treads and minimal supports.
*   **Windows**: 8 windows total with wood frames and 90% transparent glass.

#### Furniture & Interior
*   **Bedroom**: Four-poster bed, reading chair, wall shelf unit, and circular wall art.
*   **Office**: L-shaped desk, ergonomic chair, monitor, and desk accessories.
*   **Kitchen**: Base cabinets with marble countertops, refrigerator, oven/range, and island with bar stools.
*   **Living Room**: L-shaped sectional sofa, coffee table, media console, and floor plants.

---

## 2. Configuration Mapping Guide
All hardcoded values are centralized in `src/config/` for easy modification.

#### File Map
*   `groundFloorCoordinates.js`: Positions for TV, Sofa, Kitchen, etc.
*   `upperFloorCoordinates.js`: Positions for Bed, Office Desk, Fitness gear, etc.
*   `outsideCoordinates.js`: Balcony, Car (GLTF), and Gym equipment.
*   `interactiveFeatures.js`: Links clickable objects to Audio/Poster assets.
*   `timeBasedSettings.js`: Controls newspaper/mail delivery, day/night cycles, and weather.
*   `roofVideos.js`: Manages the random video rotation on the roof.

#### Common Modifications
*   **Change Position**: Edit the `position: [x, y, z]` array in the respective config file.
*   **Change Material**: Adjust `roughness` (0-1) or `metalness` (0-1) properties.
*   **Time Windows**: Modify `startHour` and `endHour` in `timeBasedSettings.js` to adjust when events like newspaper delivery occur.

---

## 3. Audio Setup Guide
🔇 **Current Status: DISABLED** (Commented out in `src/App.jsx` to prevent errors until files are added).

#### Required Files (public/sounds/)
1.  `birds.mp3`: Outdoor ambient (Day only).
2.  `wind.mp3`: Outdoor ambient (Always active).
3.  `indoor-ambience.mp3`: Living room tone.
4.  `kitchen-ambience.mp3`: Refrigerator hum/kitchen tone.
5.  `bedroom-ambience.mp3`: Peaceful upper floor tone.

#### Enabling Audio
1.  Place MP3 files in `public/sounds/`.
2.  Uncomment the `<SpatialAudioSystem>` component in `src/App.jsx`.
3.  Refresh and test—volume will change based on your 3D distance from sources.

---

## 4. Roof Animation Implementation
The roof features a 8.6m x 8.6m surface designed for animated textures.

#### Implementation Options
*   **Three.js Video Texture (Current)**: Hardware accelerated, supports MP4/WebM.
*   **Lottie-React**: Good for vector/UI style animations.
*   **Canvas-Based**: Best for programmatic text or real-time data.

#### How to Switch Videos
1.  Add your MP4 to `public/Videos/`.
2.  Update the `ROOF_VIDEOS` array in `src/config/roofVideos.js`.
3.  The system will randomly pick one on each page load.

---

## 5. Video Optimization Guide
To ensure 60FPS performance, videos must be optimized for GPU decoding.

#### Recommended Specs
*   **Format**: MP4 (H.264)
*   **Resolution**: 1920x1920 (Square aspect ratio)
*   **Frame Rate**: 30fps
*   **Bitrate**: 5-10 Mbps
*   **Audio**: Remove the audio track from video files (ambient audio is handled separately).

#### FFmpeg Command
```bash
ffmpeg -i input.mov -c:v libx264 -preset slow -crf 23 -vf scale=1920:1920 -an output.mp4
```

---

## 6. Model Compression Guide
Heavy GLTF models (like the Car and Gym) should be compressed to reduce load times.

#### Compression Results
| Model | Original | Compressed | Savings |
|-------|----------|------------|---------|
| Car   | 27 MB    | ~9 MB      | 67%     |
| Gym   | 10 MB    | ~3 MB      | 70%     |

#### Recommended Workflow
1.  Use [gltf.report](https://gltf.report/) or `gltf-pipeline`.
2.  Enable **Draco Compression**.
3.  Reduce texture resolution (2048x2048 → 1024x1024).
4.  Update the `modelPath` in `src/config/outsideCoordinates.js` to point to the new compressed file.

---
**Last Updated**: May 2, 2026
