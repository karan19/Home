# Materials and Lighting Reference
## 3D House Model - Complete Material & Lighting Documentation

This document provides a complete reference of all materials and lighting used in the 3D house model, ensuring compliance with the specification document (Section 9).

---

## Materials Library

### Wood Materials

#### Light Wood (Floors, Furniture, Frames)
- **Base Color**: `#C19A6B` (0xC19A6B)
- **Roughness**: 0.4
- **Metalness**: 0.0
- **Usage**: Floors, bed frame, desk, shelves, window frames, furniture legs

#### Dark Wood (Stairs, Accents)
- **Base Color**: `#654321` (0x654321)
- **Roughness**: 0.3
- **Metalness**: 0.0
- **Usage**: Stair treads, sofa legs, dark furniture accents

#### Cork/Tan Wood (Roof)
- **Base Color**: `#D2B48C` (0xD2B48C)
- **Roughness**: 0.7
- **Metalness**: 0.0
- **Usage**: Roof structure and exposed beams

---

### Fabric Materials

#### White Fabric (Bedding, Upholstery)
- **Base Color**: `#FFFFFF` (0xFFFFFF)
- **Roughness**: 0.7
- **Metalness**: 0.0
- **Usage**: Mattress, pillows, ceramic items

#### Gray Fabric (Blankets, Chairs)
- **Base Color**: `#808080` (0x808080)
- **Roughness**: 0.6
- **Metalness**: 0.0
- **Usage**: Blanket, office chair, throw pillows

#### Beige Fabric (Sofa)
- **Base Color**: `#F5F5DC` (0xF5F5DC)
- **Roughness**: 0.6
- **Metalness**: 0.0
- **Usage**: Sofa upholstery, reading chair

#### Cream Fabric (Chairs, Walls)
- **Base Color**: `#F5F5DC` (0xF5F5DC)
- **Roughness**: 0.6-0.8
- **Metalness**: 0.0
- **Usage**: Reading chair, wall surfaces

---

### Wall & Surface Materials

#### Cream/Off-White Walls
- **Base Color**: `#F5F5DC` (0xF5F5DC)
- **Roughness**: 0.8
- **Metalness**: 0.0
- **Usage**: Exterior walls, interior partition walls, railings

#### White Surfaces (Cabinets, Ceiling)
- **Base Color**: `#FFFFFF` (0xFFFFFF)
- **Roughness**: 0.3-0.6
- **Metalness**: 0.0
- **Usage**: Kitchen cabinets, ceiling, ceramic pots

#### Gray Concrete (Base)
- **Base Color**: `#E8E8E8` (0xE8E8E8)
- **Roughness**: 0.7
- **Metalness**: 0.0
- **Usage**: Foundation base slab

#### Darker Gray (Edge Trim)
- **Base Color**: `#CCCCCC` (0xCCCCCC)
- **Roughness**: 0.7
- **Metalness**: 0.0
- **Usage**: Floor edge trim

---

### Metal & Plastic Materials

#### Stainless Steel (Appliances)
- **Base Color**: `#C0C0C0` (0xC0C0C0)
- **Roughness**: 0.3
- **Metalness**: 0.7
- **Usage**: Oven/range body

#### Dark Gray Metal (Appliances)
- **Base Color**: `#3C3C3C` (0x3C3C3C)
- **Roughness**: 0.2
- **Metalness**: 0.3
- **Usage**: Refrigerator

#### Black Metal/Plastic
- **Base Color**: `#2C2C2C` (0x2C2C2C)
- **Roughness**: 0.4
- **Metalness**: 0.3-0.5
- **Usage**: Shelf frames, chair bases, stool legs

#### Black Plastic (Electronics)
- **Base Color**: `#1C1C1C` (0x1C1C1C)
- **Roughness**: 0.4
- **Metalness**: 0.3
- **Usage**: Monitor frames, TV frames, oven doors

---

### Glass Material

#### Window Glass
- **Base Color**: `#F0F8FF` (0xF0F8FF) - Light blue tint
- **Transmission**: 0.9 (90% transparent)
- **Roughness**: 0.1
- **Metalness**: 0.0
- **IOR**: 1.52 (Glass index of refraction)
- **Thickness**: 0.01
- **Transparent**: true
- **Opacity**: 0.3
- **Side**: DoubleSide
- **Usage**: All window glass panes (8 windows)

---

### Stone Materials

#### Marble Countertop
- **Base Color**: `#E0E0E0` (0xE0E0E0) - Light gray
- **Roughness**: 0.2
- **Metalness**: 0.0
- **Usage**: Kitchen countertops (base cabinets and island)

---

### Accent Materials

#### Purple (Decorative)
- **Base Color**: `#9370DB` (0x9370DB)
- **Roughness**: 0.5
- **Metalness**: 0.0
- **Usage**: Wall art pieces (2 circular pieces)

#### Green (Plants)
- **Base Color**: `#228B22` (0x228B22) - Forest green
- **Roughness**: 0.7
- **Metalness**: 0.0
- **Usage**: Plant leaves and foliage

#### Dark Green (Plant Stems)
- **Base Color**: `#2F4F2F` (0x2F4F2F)
- **Roughness**: 0.6
- **Metalness**: 0.0
- **Usage**: Plant stems

#### Emissive Screens
- **Base Color**: `#0A0A1A` (0x0A0A1A) - Very dark blue
- **Emissive**: `#0A0A1A`
- **Emissive Intensity**: 0.2
- **Roughness**: 0.1
- **Usage**: Monitor displays, TV screens

---

## Lighting Setup

### Global Lighting

#### Ambient Light
- **Type**: AmbientLight
- **Color**: White (0xFFFFFF)
- **Intensity**: 0.4
- **Purpose**: General scene illumination
- **Group**: Interior_Lights

#### Main Directional Light
- **Type**: DirectionalLight
- **Color**: Warm white (0xFFF8DC)
- **Intensity**: 0.8
- **Position**: (10, 15, 10)
- **Cast Shadows**: Yes
- **Shadow Map Size**: 2048x2048
- **Shadow Bias**: -0.0001
- **Purpose**: Primary light source (simulating sun)
- **Group**: Interior_Lights

#### Fill Light
- **Type**: DirectionalLight
- **Color**: White (0xFFFFFF)
- **Intensity**: 0.3
- **Position**: (-10, 10, -10)
- **Purpose**: Fill shadows from opposite side
- **Group**: Interior_Lights

#### Hemisphere Light
- **Type**: HemisphereLight
- **Sky Color**: White (0xFFFFFF)
- **Ground Color**: Gray (0x888888)
- **Intensity**: 0.3
- **Purpose**: Sky/ground color variation
- **Group**: Interior_Lights
- **Note**: Not exported to GLB (unsupported format)

---

### Window Lighting

#### Window Area Lights (8 total)
- **Type**: RectAreaLight
- **Color**: Warm white (0xFFF8DC)
- **Intensity**: 0.5
- **Dimensions**: 1.2m x 1.5m (matching window size)
- **Positions**: 
  - Back wall: 4 lights (2 ground floor, 2 second floor)
  - Right wall: 4 lights (2 ground floor, 2 second floor)
- **Purpose**: Simulate natural light through windows
- **Group**: Window_Lights
- **Note**: Not exported to GLB (unsupported format)

---

## Rendering Settings

### Renderer Configuration
- **Antialias**: Enabled
- **Shadow Map**: Enabled (PCFSoftShadowMap)
- **Output Color Space**: SRGB
- **Tone Mapping**: ACESFilmicToneMapping
- **Tone Mapping Exposure**: 1.0
- **Pixel Ratio**: Up to 2x (device dependent)

### Shadow Configuration
- **Shadow Map Size**: 2048x2048 pixels
- **Shadow Camera Bounds**: ±15 units
- **Shadow Camera Near/Far**: 0.1 to 50 units
- **Shadow Bias**: -0.0001

---

## Material Compliance Checklist

✅ All materials use PBR (Physically Based Rendering) workflow
✅ All colors match specification (Section 9)
✅ Roughness values appropriate for material types
✅ Metalness values correct (0.0 for non-metals, 0.3-0.8 for metals)
✅ Glass material uses proper transmission and IOR
✅ All materials properly named
✅ No texture files required (solid colors with PBR properties)

---

## Lighting Compliance Checklist

✅ Global lighting provides even illumination
✅ Directional lights simulate natural daylight
✅ Window lights positioned at each window
✅ Shadows enabled and properly configured
✅ No harsh contrast (ambient + fill lights prevent black shadows)
✅ Lighting intensity balanced for visibility

---

## GLB Export Notes

### What Exports Successfully:
- ✅ All geometry (5,576 triangles)
- ✅ All PBR materials with colors and properties
- ✅ Directional lights (main and fill)
- ✅ Proper hierarchy structure
- ✅ Object names and organization

### What Doesn't Export (Expected):
- ⚠️ RectAreaLight (window lights) - Not supported in GLB format
- ⚠️ HemisphereLight - Not supported in GLB format
- ⚠️ AmbientLight - May not export depending on viewer

### Recommendation:
The exported GLB file contains all geometry and materials. Lighting can be re-added in the target 3D application or web framework as needed.

---

## Performance Metrics

- **Total Polygon Count**: 5,576 triangles
- **Target Budget**: 50,000-100,000 triangles
- **Budget Usage**: 5.6% - 11.2% (excellent!)
- **File Size**: Estimated <2MB (uncompressed GLB)
- **Texture Resolution**: N/A (using solid colors)
- **Material Count**: ~15 unique materials

---

**Document Version**: 1.0  
**Last Updated**: October 25, 2025  
**Specification Compliance**: Section 9 (Materials), Section 8 (Lighting)
