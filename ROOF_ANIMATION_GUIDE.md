# Roof Animation Implementation Guide

## Overview

This document covers the implementation of animated content on the 3D house roof, including library options, implementations tried, and how to use the current system.

---

## Roof Specifications

**Dimensions:**
- Size: 8.6m × 8.6m (Three.js units)
- Position: Y = 6.4 (top surface)
- Thickness: 0.4m
- Center position: [0, 6.2, 0]

**Requirements:**
- Animation must cover entire roof surface
- Must lay flat (horizontal, not vertical)
- Should only be visible from above (not from inside house)
- Must not extend beyond roof boundaries

---

## Library Options Explored

### 1. Lottie-React ⭐ (For Vector Animations)

**What it is:** Plays After Effects animations as JSON files

**Installation:**
```bash
npm install lottie-react
```

**Pros:**
- Thousands of free animations at lottiefiles.com
- Very easy to implement
- Smooth vector animations
- Good for UI-style animations

**Cons:**
- Not ideal for pixel art
- Requires external animation creation
- Sizing can be tricky in 3D space

**Use Case:** Best for pre-made vector animations, logos, icons

---

### 2. React-Pixi (For Pixel Art)

**What it is:** React renderer for PixiJS (2D WebGL rendering)

**Installation:**
```bash
npm install @pixi/react pixi.js
```

**Pros:**
- Excellent for pixel art and sprites
- High performance 2D rendering
- Good for game-like animations

**Cons:**
- Requires integration with Three.js
- More complex setup
- Need to create pixel art assets

**Use Case:** Best for pixel art games, sprite animations

---

### 3. Three.js Video Texture ⭐ RECOMMENDED (For Cinematic Content)

**What it is:** Play video files as textures on 3D surfaces

**Installation:**
```bash
# No installation needed - built into Three.js!
```

**Pros:**
- ✅ Hardware accelerated (excellent performance)
- ✅ No additional libraries needed
- ✅ Supports any video format (MP4, WebM, OGG)
- ✅ Can create animation in any tool (After Effects, Blender, Premiere)
- ✅ Simple implementation (~50 lines of code)
- ✅ Precise sizing control

**Cons:**
- Need to create video file externally
- Video file size considerations

**Use Case:** Best for cinematic animations, complex visuals, "history to future" narratives

---

## Current Implementation

### Branch: `feature/video-roof-texture`

**Component:** `src/components/VideoRoofAnimation.jsx`

**Features:**
- Uses Three.js VideoTexture
- Exact roof dimensions: 8.6m × 8.6m
- Position: Y = 6.41 (sits on top of roof)
- Rotation: -90° (lays flat)
- Material side: FrontSide only (not visible from below)
- Auto-plays and loops video

---

## How to Use Video Texture

### Step 1: Create Your Video

**Recommended Specs:**
- Resolution: 1920×1920 pixels (square format)
- Format: MP4 (H.264 codec) for best compatibility
- Frame rate: 30fps or 60fps
- Duration: Any length (will loop automatically)

**Tools for Creating Video:**
- Adobe After Effects (motion graphics)
- Blender (3D animation)
- Adobe Premiere (video editing)
- DaVinci Resolve (free alternative)
- Online tools: Canva, Kapwing

### Step 2: Add Video to Project

Place video file in `public/` folder:
```
public/
  └── roof-animation.mp4
```

### Step 3: Update Component

In `src/components/House.jsx`:
```jsx
<VideoRoofAnimation videoSrc="/roof-animation.mp4" />
```

### Step 4: Test

- Video will auto-play and loop
- Muted by default (for autoplay compatibility)
- Hardware accelerated playback

---

## Alternative: Canvas-Based Animation

### Branch: `feature/canvas-roof-animation` (if created)

**Component:** `src/components/RoofAnimation.jsx`

**Approach:**
- Draws directly to HTML5 canvas
- Applies canvas as texture to roof plane
- Good for programmatic animations (text, shapes, etc.)

**Performance Note:**
- Must use `useEffect` triggered by state changes
- Do NOT use `useFrame` (causes 60fps redraw = performance issues)
- Only redraw when content actually changes

**Example Use Case:**
- Scrolling text credits
- Simple geometric animations
- Real-time data visualization

---

## Troubleshooting

### Animation Not Visible

**Check:**
1. Position: Should be Y = 6.41 (above roof at 6.4)
2. Rotation: Should be `rotation-x={-Math.PI / 2}` (laying flat)
3. Camera angle: View from above to see roof

### Animation Too Large/Small

**Adjust plane geometry:**
```jsx
<planeGeometry args={[8.6, 8.6]} /> // Roof dimensions
```

### Visible from Inside

**Set material side:**
```jsx
<meshStandardMaterial side={THREE.FrontSide} />
```

### Performance Issues

**For Canvas Approach:**
- Use `useEffect` instead of `useFrame`
- Only redraw when data changes
- Reduce canvas resolution
- Simplify drawing operations

**For Video Approach:**
- Reduce video resolution
- Use compressed format
- Optimize video file size

---

## File Locations

**Current Implementation:**
- Component: `src/components/VideoRoofAnimation.jsx`
- Integration: `src/components/House.jsx`
- Video files: `public/` folder

**Alternative Implementation:**
- Component: `src/components/RoofAnimation.jsx` (canvas-based)

---

## Quick Reference

### Video Texture (Current)
```jsx
// In House.jsx
<VideoRoofAnimation videoSrc="/your-video.mp4" />

// Without video (placeholder)
<VideoRoofAnimation />
```

### Supported Video Formats
- MP4 (H.264) - Best compatibility
- WebM (VP8/VP9) - Good compression
- OGG (Theora) - Open source

### Roof Dimensions
- Width: 8.6 meters
- Depth: 8.6 meters
- Top Surface: Y = 6.4
- Animation Position: Y = 6.41

---

## Future Enhancements

**Possible Additions:**
- Interactive controls (play/pause)
- Multiple video options (switchable)
- Sync with audio system
- Day/night mode variations
- Click to trigger video playback

---

## Notes

- Video texture is the most performant option for complex animations
- Canvas approach works well for simple programmatic content
- Lottie is great for pre-made vector animations
- Always test performance after adding animations
- Keep video files optimized for web (compressed, reasonable resolution)

---

**Last Updated:** October 27, 2025
**Branch:** feature/video-roof-texture
**Status:** Ready for video content
