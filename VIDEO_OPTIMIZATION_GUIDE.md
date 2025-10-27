# Video Optimization Guide for Roof Animation

## Overview

This guide covers best practices for optimizing video files for use as roof animations in the 3D house project.

---

## Performance Impact

### Video Texture Performance

**Why Video is Efficient:**
- ✅ **Hardware Accelerated** - GPU handles video decoding
- ✅ **Native Browser Support** - Uses HTML5 video element
- ✅ **Minimal CPU Usage** - ~1-2% GPU usage
- ✅ **No JavaScript Overhead** - No canvas drawing or calculations

**Comparison with Other Approaches:**
- Video Texture: ~1-2% GPU usage ⭐ BEST
- Canvas Drawing: ~10-15% CPU usage
- PixiJS/WebGL: ~5-10% GPU usage

---

## Video Specifications

### Required Dimensions

**Aspect Ratio:** 1:1 (square)
**Recommended Resolutions:**
- **High Quality:** 1920×1920 pixels
- **Standard:** 1024×1024 pixels
- **Maximum:** 2048×2048 pixels

**Roof Dimensions:**
- 8.6m × 8.6m (Three.js units)
- Video will be stretched to fit

### Format Recommendations

**Best Format: MP4 (H.264)**
- ✅ Universal browser support
- ✅ Good compression
- ✅ Hardware accelerated
- ✅ Reliable playback

**Alternative Formats:**
- WebM (VP9): Excellent compression, good browser support
- OGG (Theora): Open source, limited support
- MOV: Works but larger file sizes

---

## Optimization Steps

### 1. Convert to MP4 (H.264)

**Using FFmpeg (Command Line):**
```bash
ffmpeg -i input.mov -c:v libx264 -preset slow -crf 23 -vf scale=1920:1920 -an output.mp4
```

**Using HandBrake (GUI):**
1. Open your video file
2. Set dimensions: 1920×1920
3. Video codec: H.264
4. Quality: RF 23 (good balance)
5. Frame rate: 30fps
6. Audio: Remove (not needed)

### 2. Optimize File Size

**Target File Size:** Under 10MB for smooth loading

**Compression Settings:**
- **Bitrate:** 5-10 Mbps (good quality)
- **Frame Rate:** 30fps (60fps unnecessary)
- **Resolution:** 1920×1920 (or 1024×1024 for smaller size)
- **Audio:** Remove (muted anyway)

**Tools:**
- HandBrake (free, GUI)
- FFmpeg (free, command line)
- Adobe Media Encoder (professional)
- Online converters (CloudConvert, etc.)

### 3. Reduce Resolution if Needed

**If performance issues occur:**

**1920×1920 → 1024×1024:**
```bash
ffmpeg -i input.mp4 -vf scale=1024:1024 -c:v libx264 -crf 23 output.mp4
```

**Quality vs Performance:**
- 1920×1920: Best quality, ~5-15MB
- 1024×1024: Good quality, ~2-5MB
- 512×512: Lower quality, ~1-2MB (not recommended)

---

## Color Optimization

### Recommended Color Schemes

**Option 1: High Contrast (Best Visibility)**
- Bright, saturated colors
- High contrast against tan roof (#D2B48C)
- Examples: Cyan (#00FFFF), Magenta (#FF00FF), Yellow (#FFFF00)
- Background: Dark (#1a1a2e) or black

**Option 2: Monochrome with Accent**
- Black and white base
- One accent color (blue, purple, gold)
- Clean, modern aesthetic

**Option 3: Complementary Colors**
- Cool tones (blues, purples, teals)
- Complement warm tan roof
- Harmonious integration

**Option 4: Full Color/RGB**
- Full spectrum
- Vibrant and dynamic
- Maximum visual impact

### Color Technical Requirements

**Color Space:** sRGB (standard)
**Bit Depth:** 8-bit per channel (24-bit RGB)
**Avoid:** Very dark colors (won't show well on tan roof)

---

## Performance Troubleshooting

### If Video Causes Lag

**1. Reduce File Size**
- Lower bitrate
- Reduce resolution
- Shorten duration

**2. Optimize Codec**
- Use H.264 (best compatibility)
- Avoid H.265/HEVC (not all browsers support)

**3. Check File Size**
- Under 10MB: Excellent
- 10-20MB: Good
- Over 20MB: May cause loading delays

### If Video Doesn't Play

**Browser Compatibility:**
- Chrome/Edge: MP4 (H.264), WebM
- Firefox: MP4 (H.264), WebM, OGG
- Safari: MP4 (H.264), MOV

**Solutions:**
- Convert to MP4 (H.264) for best compatibility
- Check browser console for errors
- Verify file path is correct

---

## Quick Reference

### Optimal Settings

```
Format: MP4 (H.264)
Resolution: 1920×1920 pixels
Frame Rate: 30fps
Bitrate: 5-10 Mbps
File Size: Under 10MB
Audio: None (remove)
Color Space: sRGB
```

### FFmpeg One-Liner

```bash
ffmpeg -i input.mov \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -vf scale=1920:1920 \
  -r 30 \
  -an \
  output.mp4
```

### File Location

```
public/
  └── your-video.mp4
```

### Component Usage

```javascript
<VideoRoofAnimation videoSrc="/your-video.mp4" />
```

---

## Performance Monitoring

### Check Performance

**Browser DevTools:**
1. Open DevTools (F12)
2. Performance tab
3. Record while viewing house
4. Check GPU/CPU usage

**Expected Results:**
- FPS: 60fps (smooth)
- GPU: 1-5% usage
- CPU: Minimal

**If Issues:**
- Reduce video resolution
- Lower bitrate
- Check file size

---

## Summary

**Video rendering is NOT heavy when optimized:**
- Hardware accelerated playback
- Minimal performance impact
- Best approach for roof animations

**Key Optimizations:**
1. Use MP4 (H.264) format
2. Keep resolution at 1920×1920 or lower
3. Target file size under 10MB
4. Use 30fps frame rate
5. Remove audio track

**Your Movie.mov:**
- Will work but may be large
- Consider converting to MP4 for better performance
- Should play smoothly with hardware acceleration

---

**Last Updated:** October 27, 2025
**Branch:** feature/video-roof-texture
**Status:** Video configured and ready to play
