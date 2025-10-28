# Audio Setup Guide

## Current Status
🔇 **Audio System: DISABLED**

The spatial audio system is currently disabled to prevent errors. This guide will help you add audio files and enable the system when ready.

## Why Audio is Disabled
The `SpatialAudioSystem` component is commented out in `src/App.jsx` because the required audio files don't exist yet. Once you add the audio files, you can easily re-enable it.

---

## 📁 Required Audio Files

Create a `public/sounds/` directory and add these files:

### 1. **birds.mp3**
- **Type:** Outdoor ambient sound
- **When:** Day time only
- **Position:** [0, 5, 10] (above front yard)
- **Suggested:** Birds chirping, nature sounds
- **Duration:** 30-60 seconds (will loop)

### 2. **wind.mp3**
- **Type:** Outdoor ambient sound
- **When:** Always active
- **Position:** [0, 8, 0] (high above house)
- **Suggested:** Gentle wind, breeze sounds
- **Duration:** 30-60 seconds (will loop)

### 3. **indoor-ambience.mp3**
- **Type:** Indoor ambient sound
- **Where:** Living room
- **Position:** [1.5, 1, 1]
- **Suggested:** Subtle room tone, quiet ambience
- **Duration:** 30-60 seconds (will loop)

### 4. **kitchen-ambience.mp3**
- **Type:** Indoor ambient sound
- **Where:** Kitchen
- **Position:** [-1.5, 1, -2.5]
- **Suggested:** Refrigerator hum, subtle kitchen sounds
- **Duration:** 30-60 seconds (will loop)

### 5. **bedroom-ambience.mp3**
- **Type:** Indoor ambient sound
- **Where:** Bedroom (upper floor)
- **Position:** [2.5, 4, -2.5]
- **Suggested:** Quiet room tone, peaceful ambience
- **Duration:** 30-60 seconds (will loop)

---

## 🎵 Where to Find Free Audio

### Recommended Sources (Royalty-Free):

1. **Freesound.org** (https://freesound.org)
   - Huge library of free sounds
   - Creative Commons licensed
   - High quality recordings
   - Search for: "birds chirping", "wind ambience", "room tone"

2. **Zapsplat.com** (https://www.zapsplat.com)
   - Professional sound effects
   - Free with attribution
   - Well organized categories
   - Search for: "nature ambience", "indoor room tone"

3. **Mixkit.co** (https://mixkit.co/free-sound-effects/)
   - Free sound effects
   - No attribution required
   - Good quality
   - Limited selection but easy to use

4. **BBC Sound Effects** (https://sound-effects.bbcrewind.co.uk/)
   - Professional BBC recordings
   - Free for personal use
   - Excellent quality

### Search Terms:
- Birds: "birds chirping", "morning birds", "nature ambience"
- Wind: "wind ambience", "gentle breeze", "outdoor wind"
- Indoor: "room tone", "indoor ambience", "quiet room"
- Kitchen: "refrigerator hum", "kitchen ambience"
- Bedroom: "bedroom ambience", "quiet room", "peaceful ambience"

---

## 🔧 File Format Requirements

- **Format:** MP3 (recommended) or OGG
- **Bitrate:** 128-192 kbps (good quality, reasonable file size)
- **Sample Rate:** 44.1 kHz
- **Channels:** Stereo or Mono (both work)
- **Duration:** 30-60 seconds (will loop seamlessly)

### Tips for Looping:
- Choose sounds that loop naturally
- Fade in/out at start/end for seamless loops
- Avoid sounds with distinct beginning/ending

---

## 📂 Directory Structure

Create this structure:
```
public/
  sounds/
    birds.mp3
    wind.mp3
    indoor-ambience.mp3
    kitchen-ambience.mp3
    bedroom-ambience.mp3
```

---

## ✅ How to Enable Audio

Once you've added the audio files:

### Step 1: Verify Files Exist
Check that all 5 audio files are in `public/sounds/`

### Step 2: Uncomment in App.jsx
In `src/App.jsx`, find this section (around line 145):
```javascript
{/* Spatial Audio System - Ambient sounds (DISABLED - See AUDIO_SETUP_GUIDE.md) */}
{/* <SpatialAudioSystem 
  dayMode={dayMode}
  enabled={settings.enabled}
/> */}
```

Change to:
```javascript
{/* Spatial Audio System - Ambient sounds */}
<SpatialAudioSystem 
  dayMode={dayMode}
  enabled={settings.enabled}
/>
```

### Step 3: Test
1. Refresh the browser
2. Move camera around the scene
3. Audio volume should change based on distance from sound sources
4. Birds should only play during day mode
5. Use settings panel to adjust audio volume

---

## 🎚️ Audio Controls

Once enabled, you can control audio through the **Settings Panel** (top-right):

- **Enable Audio:** Toggle all audio on/off
- **Master Volume:** Overall volume (0-1)
- **Ambient Volume:** Background sounds volume (0-1)

---

## 🔊 How Spatial Audio Works

The audio system uses **3D positional audio**:
- Volume decreases with distance from sound source
- Sounds are positioned at specific locations in the 3D scene
- Camera position affects what you hear
- More realistic and immersive experience

### Sound Positions:
- **Birds:** Above front yard (outdoor)
- **Wind:** High above house (outdoor)
- **Living Room:** Center of living room
- **Kitchen:** Center of kitchen
- **Bedroom:** Center of bedroom (upper floor)

---

## 🐛 Troubleshooting

### Audio Not Playing:
1. Check browser console for errors
2. Verify files are in correct location (`public/sounds/`)
3. Check file names match exactly (case-sensitive)
4. Ensure files are valid MP3 format
5. Check audio is enabled in settings panel

### Audio Too Loud/Quiet:
- Adjust Master Volume in settings panel
- Adjust Ambient Volume in settings panel
- Edit `distance` parameter in `SpatialAudioSystem.jsx`

### Audio Not Spatial:
- Ensure you're using PositionalAudio (not regular Audio)
- Check sound positions are correct
- Move camera closer/farther to test

---

## 📝 Optional: Add More Sounds

You can add more sounds by editing `src/components/audio/SpatialAudioSystem.jsx`:

```javascript
<PositionalAudio
  url="/sounds/your-sound.mp3"
  distance={10}
  loop
  autoplay
  position={[x, y, z]}
/>
```

### Ideas for Additional Sounds:
- Door creak when opening doors
- Footsteps when character moves
- Clock ticking in bedroom
- TV static/audio when on
- Gym equipment sounds
- Rain sounds (when weather is rain)

---

## 🎯 Quick Start Checklist

- [ ] Create `public/sounds/` directory
- [ ] Download 5 audio files from freesound.org or zapsplat.com
- [ ] Rename files to match required names
- [ ] Place files in `public/sounds/`
- [ ] Uncomment `<SpatialAudioSystem>` in `src/App.jsx`
- [ ] Refresh browser and test
- [ ] Adjust volumes in settings panel

---

**Ready to add audio?** Follow this guide and your 3D house will have immersive spatial audio!
