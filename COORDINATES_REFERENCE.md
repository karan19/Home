# 3D House - Complete Coordinates Reference
## Spatial Positioning Guide for All Components

**Version**: 1.0  
**Last Updated**: October 25, 2025  
**Project**: Modern Two-Story Residential Cutaway Model

---

# Table of Contents

1. [Coordinate System](#coordinate-system)
2. [Structure](#structure)
3. [Stairs](#stairs)
4. [Ground Floor Furniture](#ground-floor-furniture)
5. [Upper Floor Furniture](#upper-floor-furniture)
6. [Characters](#characters)
7. [Compound](#compound)
8. [Balcony](#balcony)

---

## Coordinate System

**Origin**: Center of ground floor (0, 0, 0)

**Axes:**
- **X-axis**: Left (-) to Right (+)
- **Y-axis**: Down (0) to Up (+)
- **Z-axis**: Front (+) to Back (-)

**Walls:**
- Front wall: Z = +4m (CUTAWAY - not modeled)
- Back wall: Z = -4m (EXISTS)
- Left wall: X = -4m (CUTAWAY - not modeled)
- Right wall: X = +4m (EXISTS)

---

# Structure

## Foundation

### Base Slab
- **Component**: Structure.jsx
- **Position**: [0, -0.1, 0]
- **Dimensions**: 8m × 0.2m × 8m (W × H × D)
- **Material**: Gray concrete (#E8E8E8)

---

## Walls

### Back Wall
- **Component**: Structure.jsx
- **Position**: [0, 3, -3.875]
- **Dimensions**: 8m × 6m × 0.25m (W × H × Thickness)
- **Material**: Cream (#F5F5DC)
- **Description**: Full height wall at back

### Right Wall
- **Component**: Structure.jsx
- **Position**: [3.875, 3, 0]
- **Dimensions**: 0.25m × 6m × 8m (Thickness × H × D)
- **Material**: Cream (#F5F5DC)
- **Description**: Full height wall on right side

---

## Floors

### Ground Floor
- **Component**: Structure.jsx
- **Position**: [0, -0.05, 0]
- **Dimensions**: 8m × 0.3m × 8m (W × Thickness × D)
- **Material**: Hardwood (#C19A6B)
- **Top Surface**: Y = 0.1m
- **Bottom Surface**: Y = -0.2m

### Upper Floor (L-Shaped)

**Section 1 (Back Area):**
- **Position**: [0, 2.85, -1.9]
- **Dimensions**: 8m × 0.3m × 4.2m
- **Top Surface**: Y = 3m
- **Bottom Surface**: Y = 2.7m

**Section 2 (Front-Right Area):**
- **Position**: [0.9, 2.85, 1.9]
- **Dimensions**: 6.2m × 0.3m × 3.8m
- **Top Surface**: Y = 3m
- **Bottom Surface**: Y = 2.7m

---

## Roof

### Main Roof Slab
- **Component**: Structure.jsx
- **Position**: [0, 6.2, 0]
- **Dimensions**: 8.6m × 0.4m × 8.6m (W × H × D)
- **Material**: Cork/tan (#D2B48C)

---

# Stairs

## Staircase
- **Component**: Stairs.jsx
- **Start Position**: X = -2.75m, Z = 3.36m
- **End Position**: X = -2.75m, Z = 0.28m
- **Total Rise**: 3m (ground to upper floor)
- **Number of Treads**: 12
- **Tread Dimensions**: 1.2m × 0.05m × 0.28m (W × H × D)
- **Riser Height**: 0.25m per step
- **Material**: Dark wood (#654321)

**Individual Treads:**
- Tread 1: [-2.75, 0.025, 3.36]
- Tread 2: [-2.75, 0.275, 3.08]
- Tread 3: [-2.75, 0.525, 2.80]
- ... (continues)
- Tread 12: [-2.75, 2.775, 0.28]

---

# Ground Floor Furniture

## Kitchen

### Kitchen Island
- **Component**: KitchenIsland.jsx
- **Position**: [-1.5, 0, -1.5]
- **Rotation**: [0, 0, 0]
- **Location**: Kitchen area, center
- **Description**: Island with 2 bar stools

### Kitchen Counter
- **Component**: Kitchen.jsx
- **Position**: [-1.75, 0, -3.5]
- **Rotation**: [0, 0, 0]
- **Location**: Against back wall
- **Includes**: Base cabinets, countertop, stove, sink, toaster, upper cabinets, range hood

**Stove (relative to Kitchen):**
- **Relative Position**: [-0.8, 0.975, 0]
- **Absolute Position**: [-2.55, 0.975, -3.5]
- **Interactive**: Clickable (opens Gordon Ramsay link)

### Refrigerator
- **Component**: Refrigerator.jsx
- **Position**: [-3.5, 0, -3.5]
- **Rotation**: [0, 0, 0]
- **Dimensions**: 0.9m × 1.8m × 0.7m (W × H × D)
- **Style**: French door
- **Location**: Left of kitchen cabinets

---

## Living Room

### Sofa
- **Component**: Sofa.jsx
- **Position**: [1.5, 0, 1]
- **Rotation**: [0, 0, 0]
- **Dimensions**: 1.8m × 1.2m × 0.45m (W × D × H)
- **Seat Height**: 0.45m
- **Material**: Beige fabric (#F5F5DC)

### Coffee Table
- **Component**: CoffeeTable.jsx
- **Position**: [1.5, 0, 2.3]
- **Rotation**: [0, 0, 0]
- **Dimensions**: 1.2m × 0.6m × 0.4m (W × D × H)
- **Material**: Light wood (#D2B48C)
- **Location**: Between sofa and TV

### TV
- **Component**: TV.jsx
- **Position**: [1.5, 0.8, 3.7]
- **Rotation**: [0, Math.PI, 0] (180°, facing sofa)
- **Dimensions**: 1.2m × 0.7m × 0.05m (W × H × D)
- **Location**: Near front wall, above PlayStation

### PlayStation Console
- **Component**: PlayStation.jsx
- **Position**: [1.5, 0.1, 3.6]
- **Rotation**: [0, 0, 0]
- **Dimensions**: 0.35m × 0.08m × 0.25m (W × H × D)
- **Location**: Below TV

### PS Controller
- **Component**: PSController.jsx
- **Position**: [1.3, 0.5, 1.2]
- **Rotation**: [0, 0.3, 0]
- **Location**: On sofa

### Barcelona Crest
- **Component**: BarcelonaCrest.jsx
- **Position**: [3.7, 1.5, 1]
- **Rotation**: [0, -Math.PI / 2, 0] (-90°, facing inward)
- **Dimensions**: 0.4m × 0.5m (W × H)
- **Location**: Right wall, living room
- **Material**: SVG texture (FCBCrest.svg)

### Bookshelf
- **Component**: Bookshelf.jsx
- **Position**: [3.25, 0, -3.55]
- **Rotation**: [0, 0, 0]
- **Dimensions**: 1m × 1.8m × 0.3m (W × H × D)
- **Location**: Back-right corner, against back wall
- **Contents**: ~37 books (vertical orientation)

---

# Upper Floor Furniture

## Bedroom

### Bed
- **Component**: Bed.jsx
- **Position**: [2.5, 3, -2.5]
- **Rotation**: [0, 0, 0]
- **Dimensions**: 1.8m × 2m × 0.8m (W × D × H)
- **Location**: Back-right corner
- **Features**: Frame, mattress (rounded corners), blanket (folded), 2 pillows

---

## Office

### Work Desk
- **Component**: WorkDesk.jsx
- **Position**: [-3, 3, -2]
- **Rotation**: [0, Math.PI / 2, 0] (90°, against left wall)
- **Dimensions**: 1.5m × 0.8m × 0.75m (W × D × H)
- **Location**: Upper floor, against left wall
- **Includes**: Desk, MacBook, external monitor, office chair

**MacBook (relative to desk):**
- **Relative Position**: [-0.2, 0.775, 0]
- **Dimensions**: 0.35m × 0.25m
- **Screen**: Glowing blue

**External Monitor (relative to desk):**
- **Relative Position**: [0.3, 0.775, -0.3]
- **Dimensions**: 0.6m × 0.35m
- **Screen**: Glowing blue

**Office Chair (relative to desk):**
- **Relative Position**: [0, 0, 0.5]
- **Rotation**: [0, Math.PI, 0] (180°, facing away from desk)

---

## Landing Seating Area

### Accent Chair 1
- **Component**: AccentChair.jsx
- **Position**: [0, 3, 1]
- **Rotation**: [0, Math.PI / 2, 0] (90°, facing right)
- **Dimensions**: 0.6m × 0.6m × 0.9m (W × D × H)
- **Location**: Upper floor, landing
- **Features**: Fully cushioned, slanted backrest, cushioned armrests

### Small Table
- **Component**: SmallTable.jsx
- **Position**: [1, 3, 1]
- **Rotation**: [0, 0, 0]
- **Dimensions**: 0.5m × 0.5m × 0.5m (W × D × H)
- **Location**: Upper floor, landing, between chairs
- **Material**: Light wood

### Accent Chair 2
- **Component**: AccentChair.jsx
- **Position**: [2, 3, 1]
- **Rotation**: [0, -Math.PI / 2, 0] (-90°, facing left)
- **Dimensions**: 0.6m × 0.6m × 0.9m (W × D × H)
- **Location**: Upper floor, landing
- **Features**: Fully cushioned, slanted backrest, cushioned armrests

---

# Characters

## Character 1: Sitting Person (Couch)
- **Component**: SittingPerson.jsx
- **Position**: [1.5, 0.1, 1.5]
- **Rotation**: 0° (facing TV)
- **Scale**: 0.0045 (~1.8m tall)
- **Animation**: Sitting Idle.fbx
- **Effect**: Fade-in (2 seconds)
- **Location**: Living room, on couch

## Character 2: Standing Person (Kitchen)
- **Component**: StandingPerson.jsx
- **Position**: [-2.55, 0.1, -2.5]
- **Rotation**: Math.PI (180°, facing stove)
- **Scale**: 0.0045 (~1.8m tall)
- **Animation**: Standing Idle.fbx
- **Effect**: Fade-in (2 seconds)
- **Location**: Kitchen, in front of stove

## Character 3: Sitting Person (Staircase)
- **Component**: SittingPerson.jsx
- **Position**: [-2.75, 1.5, 1.5]
- **Rotation**: 0° (facing down stairs)
- **Scale**: 0.0045 (~1.8m tall)
- **Animation**: Sitting Idle.fbx
- **Effect**: Fade-in (2 seconds)
- **Location**: Middle step of staircase (step 6)

## Character 4: Standing Person (Bookshelf)
- **Component**: StandingPerson.jsx
- **Position**: [3.25, 0.1, -3.05]
- **Rotation**: Math.PI (180°, facing bookshelf)
- **Scale**: 0.0045 (~1.8m tall)
- **Animation**: Standing Idle.fbx
- **Effect**: Fade-in (2 seconds)
- **Location**: In front of bookshelf, looking at books

---

# Compound

## Ground

### Grass
- **Component**: Compound.jsx
- **Position**: [0, -0.3, 0]
- **Dimensions**: 16m × 0.1m × 16m (W × H × D)
- **Material**: Very light green (#B0FFB0)
- **Top Surface**: Y = -0.25m

### Grass Texture Stripes
- **Positions**: X = -6, -4, -2, 0, 2, 4, 6
- **Dimensions**: 0.5m × 0.005m × 16m each
- **Material**: Darker green (#A0F0A0)
- **Purpose**: Mowed grass pattern

### Concrete Pathway
- **Position**: [0, -0.18, 2]
- **Dimensions**: 1.5m × 0.02m × 6m (W × H × D)
- **Material**: Gray concrete (#CCCCCC)

### Slanted Ramp
- **Position**: [0, -0.05, -1]
- **Dimensions**: 1.5m × 0.02m × 2m
- **Rotation**: [Math.atan(0.3/2), 0, 0] (~8.5° slope)
- **Material**: Gray concrete
- **Purpose**: Connects ground to platform

### Concrete Patio
- **Position**: [0, -0.18, -1]
- **Dimensions**: 10m × 0.02m × 4m
- **Material**: Gray concrete

---

## Lighting

### Lamp Posts (4 at corners)

**Lamp 1 (Back-Left):**
- **Position**: [-7, -0.25, -7]
- **Height**: 3m
- **Light Color**: Yellow (#FFFFCC)

**Lamp 2 (Back-Right):**
- **Position**: [7, -0.25, -7]
- **Height**: 3m

**Lamp 3 (Front-Left):**
- **Position**: [-7, -0.25, 7]
- **Height**: 3m

**Lamp 4 (Front-Right):**
- **Position**: [7, -0.25, 7]
- **Height**: 3m

---

## Mailbox

### Red Mailbox
- **Component**: Compound.jsx
- **Position**: [-0.05, -0.25, 8]
- **Rotation**: [0, Math.PI, 0] (180°, facing outward)
- **Dimensions**: 0.3m × 0.2m × 0.15m (W × H × D)
- **Post Height**: 1.2m
- **Material**: Red (#CC0000)
- **Location**: Front edge of property, 2 inches left of center

---

# Balcony

## Modern Glass Balcony
- **Component**: Balcony.jsx
- **Position**: [0.9, 3, 4.5]
- **Rotation**: [0, 0, 0]
- **Dimensions**: 3m × 1.5m (W × D)
- **Floor Height**: Y = 2.95m (lowered to prevent z-fighting)
- **Railing Height**: 1m
- **Material**: Hardwood floor, glass railings, metal posts
- **Location**: Upper floor, extends from front edge

---

# Quick Reference Table

| Component | Position [X, Y, Z] | Rotation | Floor | Area |
|-----------|-------------------|----------|-------|------|
| **Sofa** | [1.5, 0, 1] | 0° | Ground | Living |
| **Coffee Table** | [1.5, 0, 2.3] | 0° | Ground | Living |
| **TV** | [1.5, 0.8, 3.7] | 180° | Ground | Living |
| **PlayStation** | [1.5, 0.1, 3.6] | 0° | Ground | Living |
| **Barcelona Crest** | [3.7, 1.5, 1] | -90° | Ground | Living |
| **Bookshelf** | [3.25, 0, -3.55] | 0° | Ground | Living |
| **Kitchen Island** | [-1.5, 0, -1.5] | 0° | Ground | Kitchen |
| **Kitchen Counter** | [-1.75, 0, -3.5] | 0° | Ground | Kitchen |
| **Refrigerator** | [-3.5, 0, -3.5] | 0° | Ground | Kitchen |
| **Bed** | [2.5, 3, -2.5] | 0° | Upper | Bedroom |
| **Work Desk** | [-3, 3, -2] | 90° | Upper | Office |
| **Stairs Start** | [-2.75, 0, 3.36] | - | Both | Center |
| **Balcony** | [0.9, 3, 4.5] | 0° | Upper | Front |
| **Mailbox** | [-0.05, -0.25, 8] | 180° | Ground | Compound |

---

# Character Positions

| Character | Position [X, Y, Z] | Rotation | Location | Animation |
|-----------|-------------------|----------|----------|-----------|
| **Sitting (Couch)** | [1.5, 0.1, 1.5] | 0° | Living room | Sitting Idle |
| **Standing (Kitchen)** | [-2.55, 0.1, -2.5] | 180° | Kitchen | Standing Idle |
| **Sitting (Stairs)** | [-2.75, 1.5, 1.5] | 0° | Staircase | Sitting Idle |
| **Standing (Bookshelf)** | [3.25, 0.1, -3.05] | 180° | Living room | Standing Idle |

---

# Notes

## Z-Fighting Prevention

**Polygon offset applied to:**
- Hardwood floors (Structure.jsx)
- PlayStation black panel

**Y-position offsets:**
- Grass: Y = -0.3m
- Concrete: Y = -0.18m
- Balcony floor: Y = 2.95m (below upper floor at Y = 3m)

## Interactive Elements

**Clickable objects:**
- Kitchen stove → https://www.gordonramsayrestaurants.com/

---

**Document Version**: 1.0  
**Created**: October 25, 2025  
**Status**: Complete Reference

---

This document provides complete spatial coordinates for all components in the 3D house model.
