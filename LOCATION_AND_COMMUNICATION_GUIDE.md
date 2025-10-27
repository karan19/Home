# 3D House Model - Location & Communication Guide
## Complete Reference for Object Placement and Modifications

**Version**: 1.0  
**Last Updated**: October 25, 2025  
**Project**: Modern Two-Story Residential Cutaway Model

---

# Table of Contents

1. [Coordinate System & Orientation](#coordinate-system--orientation)
2. [Wall Nomenclature](#wall-nomenclature)
3. [Location Reference by Floor](#location-reference-by-floor)
4. [Directional Terms](#directional-terms)
5. [Size & Dimension Terms](#size--dimension-terms)
6. [Position Terms](#position-terms)
7. [Communication Templates](#communication-templates)
8. [Quick Reference Examples](#quick-reference-examples)
9. [Best Practices](#best-practices)

---

## 🧭 COORDINATE SYSTEM & ORIENTATION

```
        BACK WALL (Z = -4m)
            ↑ North
            |
LEFT ←------+------→ RIGHT
(CUTAWAY)   |   (X = +4m)
            |
            ↓ South
        FRONT (CUTAWAY)
            (Z = +4m)
```

### Key Points
- **Origin (0,0,0)**: Center of ground floor
- **Viewing Angle**: Isometric from front-left (cutaway side)
- **Front & Left walls**: NOT PRESENT (cutaway view)
- **Back & Right walls**: FULLY MODELED
- **House Dimensions**: 8m x 8m x 6m (W x D x H)

### Axis Orientation
- **X-axis**: Left (-) to Right (+)
- **Y-axis**: Down (0) to Up (+)
- **Z-axis**: Front (+) to Back (-)

---

## 🏗️ WALL NOMENCLATURE

### The 4 Walls

| Wall Name | Position | Status | Coordinates | Visibility |
|-----------|----------|--------|-------------|------------|
| **FRONT WALL** | South | ❌ CUTAWAY | Z = +4m | Not modeled |
| **BACK WALL** | North | ✅ EXISTS | Z = -4m | Fully visible |
| **LEFT WALL** | West | ❌ CUTAWAY | X = -4m | Not modeled |
| **RIGHT WALL** | East | ✅ EXISTS | X = +4m | Fully visible |

### Wall Sections by Room

#### BACK WALL (Z = -4m)
- **Back-Left**: Kitchen area (X = -4m to -1m)
- **Back-Center**: Transition/stairwell (X = -1m to +1m)
- **Back-Right**: Office/bedroom area (X = +1m to +4m)

#### RIGHT WALL (X = +4m)
- **Right-Front**: Living room area (Z = +4m to +1m)
- **Right-Center**: Transition (Z = +1m to -1m)
- **Right-Back**: Bedroom/office area (Z = -1m to -4m)

#### INTERIOR WALLS
- **Stairwell Divider**: Partial wall separating stairs from living area
- **Upper Railings**: Low walls around stairwell opening on second floor

---

## 📍 LOCATION REFERENCE BY FLOOR

### GROUND LEVEL (Y = 0 to 3m)

#### Kitchen Area (Back-Left Corner)
**Location**: X = -3m to -1m, Z = -3m to -1m

**Current Items:**
- Base cabinets with marble countertop (back wall)
- Refrigerator (left side)
- Oven/range (integrated in cabinets)
- Kitchen island with 2 bar stools (center)
- Decorative bowl with fruit (on island)

**Available Spaces:**
- Upper cabinets - Above base cabinets on back wall
- Backsplash area - Between countertop and upper cabinets
- Sink area - On countertop (not yet added)
- Microwave - Above oven or on counter
- Small appliances - Coffee maker, toaster, etc.
- Wall decorations - On back wall above cabinets
- Floor space - Near refrigerator or island

---

#### Living Room Area (Front-Right)
**Location**: X = 1m to 3.5m, Z = 0m to 3m

**Current Items:**
- L-shaped sectional sofa (center-front)
- Coffee table (in front of sofa)
- TV stand/media console (back wall)
- Wall-mounted TV (above console)
- Ladder shelf (right side)
- Large floor plant (near sofa)
- PlayStation console (below TV)
- PS Controller (on sofa)
- Barcelona Crest (right wall, Y = 1.5m)

**Available Spaces:**
- Side tables - Next to sofa ends
- Floor lamps - Behind or beside sofa
- Rug - Under coffee table
- Wall art - On back wall beside TV
- Bookshelf - Along right wall
- Additional plants - Corners or near windows
- Gaming accessories - Controllers, headset stand
- Decorative items - On coffee table, TV stand, ladder shelf

---

#### Staircase Area (Center)
**Location**: X = 1m, Z = 0m (ascending to back-right)

**Current Items:**
- 12 stair treads with landing
- Stairwell divider wall
- Side supports/railings

**Available Spaces:**
- Under-stair storage - Closet or shelving
- Wall decorations - On divider wall
- Lighting - Stair lights or pendant

---

#### Entry/Transition Area (Front-Center)
**Location**: X = -1m to 1m, Z = 2m to 3.5m

**Available Spaces:**
- Console table - Against back wall
- Coat rack - Near entry
- Mirror - On back wall
- Bench - For seating
- Shoe storage - Near entry
- Welcome mat - On floor

---

### UPPER LEVEL (Y = 3m to 6m)

#### Bedroom Area (Back-Left)
**Location**: X = -3m to -1m, Z = -3m to -1m

**Current Items:**
- Four-poster bed with mattress, blanket, pillows
- Reading chair with pillow
- Wall shelf unit with books and decorative items (back wall)
- 2 purple circular wall art pieces (back and right walls)

**Available Spaces:**
- Nightstands - Both sides of bed
- Table lamps - On nightstands
- Dresser/chest - Along right wall
- Full-length mirror - Leaning or wall-mounted
- Rug - Under bed or beside bed
- Closet - Built-in or wardrobe
- Ceiling fan - Above bed
- Additional wall art - Above bed headboard
- Window treatments - Curtains or blinds
- Bedside accessories - Books, alarm clock, phone charger

---

#### Office Area (Back-Right)
**Location**: X = 1m to 3m, Z = -3m to -1m

**Current Items:**
- L-shaped desk
- Ergonomic office chair
- Monitor/display on desk
- Desk plant (small potted plant)
- Floating shelf above desk
- Small desk accessories

**Available Spaces:**
- Desk lamp - On desk surface
- Keyboard & mouse - On desk
- Desk organizer - Pen holder, paper tray
- Filing cabinet - Under or beside desk
- Bookshelf - Along wall
- Printer - On shelf or cabinet
- Whiteboard/corkboard - On wall
- Additional monitor - Dual monitor setup
- Desk chair mat - Under chair
- Cable management - Under desk
- Motivational posters - On walls
- Additional plants - Larger floor plant

---

#### Upper Landing/Hallway (Center-Front)
**Location**: X = 0m to 2m, Z = 0m to 2m

**Current Items:**
- Stairwell opening with railings
- Partial privacy walls

**Available Spaces:**
- Hallway table - Against railing
- Artwork - On walls
- Runner rug - Along hallway
- Lighting - Ceiling fixture or wall sconces
- Decorative items - On railing or table

---

#### Bathroom Area (Not Yet Implemented)
**Potential Location**: Front-Right corner or along right wall

**Could Include:**
- Sink with vanity
- Toilet
- Shower/bathtub
- Mirror
- Towel rack
- Storage cabinet
- Bath mat
- Accessories

---

### WINDOWS (8 Total)

#### Back Wall Windows (4 windows)
- **Ground Floor**: 2 windows at Y = 1m
- **Upper Floor**: 2 windows at Y = 4m
- **Location**: Evenly spaced along back wall (Z = -4m)

#### Right Wall Windows (4 windows)
- **Ground Floor**: 2 windows at Y = 1m
- **Upper Floor**: 2 windows at Y = 4m
- **Location**: Evenly spaced along right wall (X = 4m)

**Available Additions:**
- Window sills (for plants, decorations)
- Curtains or blinds
- Window seat (ground floor)

---

### WALLS (Available for Decoration)

#### Back Wall (Z = -4m)
- Kitchen area: Above cabinets
- Living room: Beside TV
- Bedroom: Above bed, beside shelf
- Office: Above desk

#### Right Wall (X = 4m)
- Living room: Currently has Barcelona Crest
- Bedroom: Has one purple art piece
- Office: Available space

#### Interior Divider Wall
- Stairwell divider (ground floor)
- Available for artwork or shelving

---

### CEILING SPACES

#### Ground Floor Ceiling (Y = 3m)
- Lighting fixtures
- Ceiling fans
- Exposed beams (decorative)

#### Upper Floor Ceiling (Y = 6m / Roof)
- Lighting fixtures
- Ceiling fans
- Skylights (if adding)

---

## 📐 DIRECTIONAL TERMS

### Horizontal Directions (X & Z axes)

| Term | Meaning | Coordinate Change | Example |
|------|---------|-------------------|---------|
| **Left** | Toward left wall | X decreases (-) | "Move 0.5m to the left" |
| **Right** | Toward right wall | X increases (+) | "Move 1m to the right" |
| **Forward/Front** | Toward front (cutaway) | Z increases (+) | "Move forward 0.3m" |
| **Back/Backward** | Toward back wall | Z decreases (-) | "Move back 0.5m" |
| **North** | Toward back wall | Z decreases (-) | Same as "back" |
| **South** | Toward front | Z increases (+) | Same as "forward" |
| **East** | Toward right wall | X increases (+) | Same as "right" |
| **West** | Toward left | X decreases (-) | Same as "left" |

### Vertical Directions (Y axis)

| Term | Meaning | Coordinate Change | Example |
|------|---------|-------------------|---------|
| **Up/Higher** | Increase height | Y increases (+) | "Raise 0.2m higher" |
| **Down/Lower** | Decrease height | Y decreases (-) | "Lower by 0.1m" |
| **Taller** | Increase object height | Scale Y or dimension | "Make it 0.5m taller" |
| **Shorter** | Decrease object height | Scale Y or dimension | "Make it 0.3m shorter" |

---

## 📏 SIZE & DIMENSION TERMS

### How to Specify Size Changes

#### Overall Size (All Dimensions)
```
"Make it bigger" → Scale up proportionally
"Make it smaller" → Scale down proportionally
"Make it 2x larger" → Double all dimensions
"Make it half the size" → Halve all dimensions
```

#### Specific Dimensions
```
"Make it wider" → Increase X dimension
"Make it deeper" → Increase Z dimension
"Make it taller" → Increase Y dimension

"Make it 0.5m wider" → Add 0.5m to X dimension
"Increase height by 0.3m" → Add 0.3m to Y dimension
"Reduce depth to 0.4m" → Set Z dimension to 0.4m
```

#### Scale Factor
```
"Scale it to 1.5x" → Multiply all dimensions by 1.5
"Scale it to 80%" → Multiply all dimensions by 0.8
"Double the size" → Scale by 2x
```

---

## 📍 POSITION TERMS

### Relative Positioning

#### Relative to Objects
```
"Next to the sofa" → Adjacent to sofa
"Behind the TV" → On opposite side from viewer
"In front of the bed" → Between bed and viewer
"Above the desk" → Higher Y position, same X/Z
"Below the shelf" → Lower Y position, same X/Z
"Beside the chair" → To the left or right of chair
"Between the bed and wall" → In the space between
```

#### Relative to Walls
```
"Against the back wall" → Z = -3.9m (near back wall)
"Against the right wall" → X = +3.9m (near right wall)
"On the back wall" → Mounted/attached to back wall
"Centered on the wall" → Middle of wall section
"In the corner" → Where two walls meet
```

#### Relative to Room
```
"In the center of the room" → Middle of room area
"In the corner" → Near wall intersection
"Near the window" → Close to window position
"By the door" → Near entry/exit area
```

---

## 💬 COMMUNICATION TEMPLATES

### Template 1: Adding New Object
```
"Add a [OBJECT] in the [ROOM/AREA], 
[POSITION DESCRIPTION], 
[SIZE/STYLE PREFERENCES]"
```

**Examples:**
- "Add a nightstand in the bedroom, to the right of the bed, about 0.5m wide"
- "Add a desk lamp in the office, on the desk near the monitor, modern style"
- "Add a rug in the living room, under the coffee table, 2m x 1.5m"

---

### Template 2: Moving Existing Object
```
"Move the [OBJECT] [DISTANCE] to the [DIRECTION]"
"Move the [OBJECT] to [NEW LOCATION]"
```

**Examples:**
- "Move the Barcelona crest 0.3m to the left"
- "Move the sofa 0.5m back toward the wall"
- "Move the chair to the corner near the window"

---

### Template 3: Resizing Object
```
"Make the [OBJECT] [SIZE CHANGE]"
"Resize the [OBJECT] to [DIMENSIONS]"
```

**Examples:**
- "Make the bed 0.2m wider"
- "Make the TV 1.5x larger"
- "Resize the coffee table to 1.5m x 0.8m"
- "Make the shelf 0.3m taller"

---

### Template 4: Adjusting Height
```
"Raise the [OBJECT] by [DISTANCE]"
"Lower the [OBJECT] by [DISTANCE]"
"Place the [OBJECT] at [HEIGHT] from the floor"
```

**Examples:**
- "Raise the Barcelona crest by 0.2m"
- "Lower the TV by 0.1m"
- "Place the shelf at 2m from the floor"

---

### Template 5: Wall-Mounted Items
```
"Mount a [OBJECT] on the [WALL SECTION], 
at [HEIGHT], 
[POSITION ON WALL]"
```

**Examples:**
- "Mount a mirror on the back wall in the bedroom, at 1.5m height, centered"
- "Mount a clock on the right wall in the living room, at 2m height, near the front"
- "Add wall art on the back wall above the sofa, at 2.2m height"

---

### Template 6: Complex Instructions
```
"Add a [OBJECT] in the [ROOM], 
positioned [RELATIVE POSITION], 
make it [SIZE], 
and place it [HEIGHT/DISTANCE] from [REFERENCE]"
```

**Examples:**
- "Add a bookshelf in the office, against the right wall, make it 2m tall and 1m wide, and place it 0.5m from the back corner"
- "Add a side table in the living room, next to the left end of the sofa, make it 0.5m x 0.5m, and place it at the same height as the sofa arm"

---

## 🎯 QUICK REFERENCE EXAMPLES

### Position Examples

| What You Say | What I Understand |
|--------------|-------------------|
| "On the back wall" | Attached to Z = -4m wall |
| "Against the right wall" | Near X = +4m wall |
| "In the back-left corner" | X = -3.5m, Z = -3.5m |
| "Center of the room" | X = 0m, Z = 0m (approximately) |
| "To the left of the bed" | X position less than bed's X |
| "Behind the sofa" | Z position less than sofa's Z |
| "Above the desk" | Same X/Z as desk, higher Y |

### Size Examples

| What You Say | What I Understand |
|--------------|-------------------|
| "Make it bigger" | Scale up by ~1.2-1.5x |
| "Make it 2x larger" | Double all dimensions |
| "Make it 0.5m wider" | Add 0.5m to width (X dimension) |
| "Make it taller by 0.3m" | Add 0.3m to height (Y dimension) |
| "Resize to 1m x 0.5m" | Set width to 1m, depth to 0.5m |
| "Scale to 80%" | Multiply all dimensions by 0.8 |

### Direction Examples

| What You Say | What I Understand |
|--------------|-------------------|
| "Move it left" | Decrease X coordinate |
| "Move it right" | Increase X coordinate |
| "Move it back" | Decrease Z coordinate (toward back wall) |
| "Move it forward" | Increase Z coordinate (toward front) |
| "Raise it up" | Increase Y coordinate |
| "Lower it down" | Decrease Y coordinate |

---

## 📋 BEST PRACTICES

### ✅ DO:
- Use room names: "bedroom", "kitchen", "living room", "office"
- Use wall names: "back wall", "right wall"
- Specify measurements: "0.5m", "1.2m", "2x"
- Use relative positions: "next to", "above", "between"
- Be specific: "right side of the bed" vs just "near bed"

### ❌ DON'T:
- Use "front wall" or "left wall" (they don't exist - cutaway)
- Use vague terms: "over there", "that side"
- Mix up left/right from your viewing perspective vs the model's coordinate system

---

## 🎨 ROOM SUMMARY TABLE

| Room | Floor | Coordinates | Current Fullness | Easy Additions |
|------|-------|-------------|------------------|----------------|
| **Kitchen** | Ground | X:-3 to -1, Z:-3 to -1 | 70% | Sink, upper cabinets, backsplash |
| **Living Room** | Ground | X:1 to 3.5, Z:0 to 3 | 80% | Side tables, rug, more wall art |
| **Bedroom** | Upper | X:-3 to -1, Z:-3 to -1 | 60% | Nightstands, lamps, dresser |
| **Office** | Upper | X:1 to 3, Z:-3 to -1 | 65% | Desk lamp, keyboard, bookshelf |
| **Staircase** | Both | X:1, Z:0 | 90% | Under-stair storage |
| **Landing** | Upper | X:0 to 2, Z:0 to 2 | 20% | Hallway table, artwork |

---

## 📝 EXAMPLE CONVERSATION

**You:** "Add a nightstand in the bedroom, on the right side of the bed"

**Me:** I'll add a nightstand at approximately X = -1.5m, Y = 3m, Z = -2m (right side of bed in bedroom area)

**You:** "Make it 0.2m wider and move it 0.1m closer to the bed"

**Me:** I'll increase the width from 0.5m to 0.7m and move it 0.1m to the left (toward the bed)

**You:** "Perfect! Now add a lamp on top of it, about 0.4m tall"

**Me:** I'll add a 0.4m tall lamp on the nightstand surface

---

## 🔗 RELATED DOCUMENTS

- `3DModelingSpecificationModernHouse.md` - Complete technical specifications
- `README.md` - Project overview and quick start guide
- `UPDATE_PLAN.md` - Planned improvements and refinements
- `MATERIALS_AND_LIGHTING.md` - Material library reference

---

**Document Version**: 1.0  
**Created**: October 25, 2025  
**Status**: Active Reference Guide

---

This guide makes it easy to communicate exactly what you want! Just use natural language with these terms and I'll understand precisely where and how to place or modify objects in your 3D house.
