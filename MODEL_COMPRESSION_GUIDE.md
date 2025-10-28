# Model Compression Guide

## Overview

This guide explains how to compress your GLTF models (Car and Gym) to reduce file size while maintaining visual quality.

---

## 📊 Current Model Sizes

| Model | Current Size | Compressed Size | Savings |
|-------|--------------|-----------------|---------|
| Car | 27 MB | ~8-10 MB | 60-70% |
| Gym | ~10 MB | ~3-5 MB | 50-70% |

**Total Savings:** ~25-30 MB (30% reduction in deployed size)

---

## 🛠️ Compression Methods

### Method 1: Draco Compression (Recommended)

**What is Draco?**
- Google's 3D compression library
- Reduces geometry size by 90%
- Maintains visual quality
- Supported by Three.js

**How to Compress:**

#### Option A: Online Tool (Easiest)
1. Go to https://gltf.report/
2. Upload your GLTF file
3. Enable "Draco Compression"
4. Download compressed file
5. Replace original in `public/Car/` or `public/Gym/`

#### Option B: Command Line (Best Quality)
```bash
# Install gltf-pipeline
npm install -g gltf-pipeline

# Compress Car model
gltf-pipeline -i public/Car/scene.gltf -o public/Car/scene-compressed.gltf -d

# Compress Gym model
gltf-pipeline -i public/Gym/scene.gltf -o public/Gym/scene-compressed.gltf -d
```

#### Option C: Blender (Most Control)
1. Open model in Blender
2. File → Export → glTF 2.0
3. Enable "Draco mesh compression"
4. Set compression level (6-10)
5. Export

---

### Method 2: Texture Optimization

**Reduce Texture Sizes:**

#### Current Textures:
```
Car/textures/
├── Material_baseColor.png      (likely 2048×2048)
├── Material_metallicRoughness  (likely 2048×2048)
└── ... (10 texture files)
```

#### Optimization Steps:

1. **Reduce Resolution:**
   - 2048×2048 → 1024×1024 (75% size reduction)
   - 1024×1024 → 512×512 (additional 75% reduction)
   - Use image editing tool or command line

2. **Convert to WebP:**
   ```bash
   # Install sharp
   npm install -g sharp-cli
   
   # Convert PNG to WebP
   sharp -i texture.png -o texture.webp --webp
   ```

3. **Use Texture Atlases:**
   - Combine multiple textures into one
   - Reduces draw calls
   - Better performance

---

### Method 3: Geometry Simplification

**Reduce Polygon Count:**

#### Using Blender:
1. Open model in Blender
2. Select object
3. Add Modifier → Decimate
4. Set Ratio to 0.5 (50% reduction)
5. Apply modifier
6. Export as GLTF

#### Using Online Tool:
1. Go to https://products.aspose.app/3d/simplify
2. Upload GLTF file
3. Set reduction percentage
4. Download simplified model

---

## 🔧 Implementation After Compression

### If You Compress the Models:

#### Update Config Files:

**Car (depending on whether you compress):**
```javascript
// src/config/outsideCoordinates.js
car: {
  modelPath: '/Car/scene.gltf'               // Default lightweight model
  // modelPath: '/Car/scene-compressed.gltf' // Use this path only if you run the Draco step above
}
```

**Gym (ships as the lighter default GLTF unless you recompress):**
```javascript
// src/config/outsideCoordinates.js
gym: {
  modelPath: '/Gym/scene.gltf'               // Default lightweight model
  // modelPath: '/Gym/scene-compressed.gltf' // Swap to this after running Draco
}
```

#### No Code Changes Needed:
- Components automatically use new models
- Auto-scaling still works
- Position locking still works

---

## 📈 Expected Results

### Before Compression:
- Car: 27 MB
- Gym: 10 MB
- **Total:** 37 MB

### After Draco Compression:
- Car: ~9 MB (67% reduction)
- Gym: ~3 MB (70% reduction)
- **Total:** ~12 MB

### After Draco + Texture Optimization:
- Car: ~5 MB (81% reduction)
- Gym: ~2 MB (80% reduction)
- **Total:** ~7 MB

**Deployment Size:** 100 MB → 70 MB (30% reduction)

---

## ⚡ Performance Impact

### Loading Time:
- **Before:** 10-30 seconds on slow connection
- **After:** 5-15 seconds (50% faster)

### Memory Usage:
- **Before:** ~200 MB GPU memory
- **After:** ~150 MB GPU memory (25% reduction)

### Rendering Performance:
- **FPS:** Same or slightly better
- **Quality:** Minimal visual difference
- **User Experience:** Noticeably faster loading

---

## 🎯 Recommended Approach

### Quick Win (5 minutes):
1. Use https://gltf.report/
2. Upload Car/scene.gltf
3. Enable Draco compression
4. Download and replace
5. Update config path

### Best Quality (30 minutes):
1. Install gltf-pipeline
2. Compress with Draco
3. Optimize textures (reduce resolution)
4. Test visual quality
5. Deploy

### Maximum Optimization (1-2 hours):
1. Open in Blender
2. Decimate geometry (reduce polygons)
3. Optimize UV maps
4. Compress textures
5. Export with Draco
6. Test thoroughly

---

## 🐛 Troubleshooting

### Model Looks Different After Compression:
- Check compression level (lower = better quality)
- Verify textures are included
- Ensure normals are preserved

### Model Won't Load:
- Check file path in config
- Verify .gltf and .bin files are both present
- Check browser console for errors

### Model Too Small/Large:
- Adjust `targetSize` in config
- Auto-scaling should handle it
- Check bounding box calculation

---

## 📝 Compression Checklist

- [ ] Backup original models
- [ ] Compress Car model with Draco
- [ ] Compress Gym model with Draco
- [ ] Optimize textures (optional)
- [ ] Update config file paths
- [ ] Test models load correctly
- [ ] Verify visual quality
- [ ] Check file sizes
- [ ] Deploy and test

---

## 🎉 Benefits

**After compression:**
- ✅ 30% smaller deployment
- ✅ 50% faster loading
- ✅ Better user experience
- ✅ Lower bandwidth costs
- ✅ Same visual quality

**Recommended:** Compress at least the Car model (biggest file) for immediate 20 MB savings!
