# **3D MODELING SPECIFICATION DOCUMENT**
## **Modern Two-Story Residential Cutaway Model**
### **Project Requirements: GLB Export for Web UI Rendering**

---

## **1. PROJECT OVERVIEW**

**Deliverable**: Isometric cutaway 3D model of a two-story modern residential structure
**Export Format**: .glb (GL Transmission Format Binary)
**Target Use**: Web-based UI rendering (Three.js, Babylon.js, or similar WebGL frameworks)
**Viewing Angle**: Isometric perspective with front-left cutaway view
**Polygon Budget**: Target 50,000-100,000 triangles (optimized for web performance)
**Texture Resolution**: 2048x2048px maximum per texture set

---

## **2. GLOBAL MODEL SPECIFICATIONS**

### **2.1 Units & Scale**
- **Unit System**: Metric (meters)
- **Scale Reference**: 1 unit = 1 meter in real-world scale
- **Overall Dimensions**: 
  - Width: ~8 meters
  - Depth: ~8 meters  
  - Height: ~6 meters (3 meters per floor)

### **2.2 Coordinate System**
- **Origin Point**: Center of ground floor base
- **Axis Orientation**: 
  - X-axis: Left to Right
  - Y-axis: Up (vertical)
  - Z-axis: Front to Back
- **Rotation**: Model should face camera at 45° angle (isometric view)

### **2.3 Optimization Requirements**
- **Polygon Count**: Keep individual objects under 5,000 triangles
- **Texture Atlasing**: Combine similar materials into texture atlases where possible
- **LOD Levels**: Not required for this static model
- **Compression**: Enable Draco compression for GLB export

---

## **3. STRUCTURAL ELEMENTS - DETAILED SPECIFICATIONS**

### **3.1 FOUNDATION & BASE PLATFORM**

**Component**: Ground Floor Base Slab
- **Dimensions**: 8m x 8m x 0.2m
- **Position**: Y = 0 (ground level)
- **Geometry**: Simple box primitive
- **Material Specifications**:
  - Base Color: Light gray (#E8E8E8)
  - Roughness: 0.7
  - Metallic: 0.0
  - Normal Map: Subtle concrete texture
- **UV Mapping**: Planar projection, 1:1 scale
- **Polygon Budget**: ~100 triangles

**Component**: Floor Edge Trim
- **Dimensions**: 0.1m height border around perimeter
- **Material**: Darker gray (#CCCCCC) to define edge
- **Polygon Budget**: ~200 triangles

---

### **3.2 EXTERIOR WALLS**

**Component**: Main Exterior Walls (4 walls total)
- **Wall Thickness**: 0.25m
- **Height**: 6m (full building height)
- **Material Specifications**:
  - Base Color: Cream/Off-white (#F5F5DC)
  - Roughness: 0.8
  - Metallic: 0.0
  - Normal Map: Subtle stucco/plaster texture
- **Special Requirements**: 
  - Front and left walls are CUTAWAY (not modeled)
  - Only model back wall and right wall
  - Walls should have clean, sharp edges

**Back Wall Specifications**:
- **Dimensions**: 8m wide x 6m tall x 0.25m thick
- **Position**: Z = -4m (back of structure)
- **Windows**: 4 windows total (2 per floor)
  - Window dimensions: 1.2m wide x 1.5m tall
  - Window spacing: Evenly distributed
  - Window depth: Recessed 0.05m into wall
- **Polygon Budget**: ~800 triangles

**Right Wall Specifications**:
- **Dimensions**: 8m deep x 6m tall x 0.25m thick
- **Position**: X = 4m (right side)
- **Windows**: 4 windows total (2 per floor)
  - Same specifications as back wall
- **Polygon Budget**: ~800 triangles

---

### **3.3 INTERIOR FLOOR SEPARATION**

**Component**: Second Floor Platform
- **Dimensions**: 8m x 8m x 0.3m
- **Position**: Y = 3m (second floor level)
- **Material Specifications**:
  - Top Surface: Hardwood flooring
  - Bottom Surface: White ceiling material
  - Edge: Exposed wood beam appearance

**Top Surface (Hardwood Floor)**:
- **Base Color**: Medium wood tone (#C19A6B)
- **Roughness**: 0.4
- **Metallic**: 0.0
- **Normal Map**: Wood plank texture with visible grain
- **Texture Details**: 
  - Plank width: 0.15m
  - Plank length: Variable (1-2m)
  - Plank direction: Parallel to front edge
- **UV Mapping**: Planar projection with 0.15m repeat

**Bottom Surface (Ceiling)**:
- **Base Color**: Pure white (#FFFFFF)
- **Roughness**: 0.6
- **Metallic**: 0.0
- **Subtle texture**: Very fine plaster finish

**Polygon Budget**: ~400 triangles

---

### **3.4 GROUND FLOOR FLOORING**

**Component**: Ground Floor Surface
- **Dimensions**: 8m x 8m (covers entire base)
- **Position**: Y = 0.01m (slightly above base to prevent z-fighting)
- **Material**: Identical to second floor hardwood specifications
- **Polygon Budget**: ~200 triangles

---

### **3.5 ROOF STRUCTURE**

**Component**: Flat Roof Assembly
- **Dimensions**: 8m x 8m x 0.4m
- **Position**: Y = 6m (top of structure)
- **Material Specifications**:
  - Base Color: Cork/tan color (#D2B48C)
  - Roughness: 0.7
  - Metallic: 0.0
  - Texture: Cork board or compressed wood appearance

**Roof Overhang**:
- **Overhang Distance**: 0.3m beyond wall edges
- **Total Roof Dimensions**: 8.6m x 8.6m
- **Thickness**: 0.4m
- **Edge Detail**: Clean, sharp 90° edges

**Exposed Beam Detail**:
- **Beam Count**: 2 visible beams on cutaway side
- **Beam Dimensions**: 0.2m x 0.3m x 8m
- **Beam Spacing**: Evenly distributed
- **Material**: Same as roof surface
- **Position**: Bottom of roof structure, visible from cutaway view

**Polygon Budget**: ~600 triangles

---

## **4. INTERIOR PARTITION WALLS**

### **4.1 Stairwell Divider Wall (Ground Floor)**

**Component**: Partial height wall separating stairs from living area
- **Dimensions**: 
  - Length: ~3m
  - Height: 2.5m (doesn't reach ceiling)
  - Thickness: 0.15m
- **Position**: 
  - X: ~2m from center
  - Y: 0 to 2.5m
  - Z: Center of floor plan
- **Material**: Same as exterior walls (cream/off-white)
- **Polygon Budget**: ~200 triangles

### **4.2 Upper Level Partial Walls**

**Component**: Low privacy walls/railings around stairwell opening
- **Height**: 1.0m (waist height)
- **Thickness**: 0.1m
- **Material**: Same as exterior walls
- **Position**: Surrounding stairwell opening on second floor
- **Polygon Budget**: ~300 triangles

---

## **5. STAIRCASE - DETAILED SPECIFICATIONS**

### **5.1 Stair Structure**

**Component**: Floating Staircase
- **Total Rise**: 3m (ground to second floor)
- **Tread Count**: 12 treads
- **Riser Height**: 0.25m per step
- **Tread Depth**: 0.28m
- **Tread Width**: 1.2m

**Individual Tread Specifications**:
- **Dimensions**: 1.2m wide x 0.28m deep x 0.05m thick
- **Material**:
  - Base Color: Dark wood (#654321)
  - Roughness: 0.3
  - Metallic: 0.0
  - Normal Map: Wood grain texture
- **Geometry**: Simple box with slightly rounded front edge (0.01m radius)
- **Polygon Budget per Tread**: ~50 triangles
- **Total Stair Polygon Budget**: ~600 triangles

**Stair Positioning**:
- **Start Position**: X = 1m, Y = 0, Z = 0
- **Direction**: Ascending from front-left to back-right
- **Rotation**: 90° turn at midpoint (landing)

**Landing Platform** (if visible):
- **Dimensions**: 1.2m x 1.2m x 0.05m
- **Position**: Y = 1.5m (midpoint)
- **Material**: Same as treads

### **5.2 Stair Railing/Support**

**Component**: Minimalist side supports
- **Type**: Vertical posts or side panels
- **Material**: 
  - Base Color: Medium wood tone matching floor
  - Roughness: 0.4
  - Metallic: 0.0
- **Dimensions**: 0.05m thick vertical supports
- **Polygon Budget**: ~200 triangles

---

## **6. WINDOWS - DETAILED SPECIFICATIONS**

### **6.1 Window Frame Assembly**

**Component**: Window Frame (per window)
- **Frame Width**: 0.08m
- **Frame Depth**: 0.25m (wall thickness)
- **Frame Material**:
  - Base Color: Light wood tone (#D2B48C)
  - Roughness: 0.4
  - Metallic: 0.0
  - Normal Map: Wood grain

**Window Opening Dimensions**:
- **Width**: 1.2m
- **Height**: 1.5m
- **Recess Depth**: 0.05m into wall

**Polygon Budget per Window Frame**: ~150 triangles

### **6.2 Window Glass**

**Component**: Glass Pane (per window)
- **Dimensions**: 1.04m x 1.34m x 0.01m (slightly smaller than frame)
- **Position**: Centered in frame, flush with interior wall surface
- **Material Specifications**:
  - Base Color: Very light blue tint (#F0F8FF)
  - Transmission: 0.9 (90% transparent)
  - Roughness: 0.1
  - Metallic: 0.0
  - IOR: 1.52 (glass index of refraction)
  - Thin Glass: Enabled (for performance)
- **Rendering**: Use alpha blending, not alpha testing
- **Polygon Budget per Glass**: ~20 triangles

**Total Windows**: 8 windows
**Total Window Polygon Budget**: ~1,360 triangles

---

## **7. FURNITURE & INTERIOR OBJECTS**

### **7.1 UPPER LEVEL - BEDROOM AREA**

#### **7.1.1 Four-Poster Bed Frame**

**Component**: Bed Frame Structure
- **Overall Dimensions**: 2m wide x 2.2m long x 2.2m tall
- **Position**: X = -2m, Y = 3m, Z = -2m

**Bed Base**:
- **Dimensions**: 2m x 2.2m x 0.5m
- **Material**: 
  - Base Color: Light wood (#D2B48C)
  - Roughness: 0.4
  - Metallic: 0.0
- **Polygon Budget**: ~200 triangles

**Four Posts**:
- **Dimensions per Post**: 0.08m x 0.08m x 2.2m
- **Position**: One at each corner of bed base
- **Material**: Same as bed base
- **Polygon Budget per Post**: ~50 triangles
- **Total Posts Budget**: ~200 triangles

**Top Frame Beams**:
- **Dimensions**: 0.08m x 0.08m x 2m (width) and 2.2m (length)
- **Quantity**: 4 beams connecting posts at top
- **Material**: Same as posts
- **Polygon Budget**: ~200 triangles

**Mattress**:
- **Dimensions**: 1.9m x 2.1m x 0.3m
- **Position**: On top of bed base
- **Material**:
  - Base Color: White (#FFFFFF)
  - Roughness: 0.7
  - Metallic: 0.0
  - Normal Map: Fabric texture
- **Polygon Budget**: ~100 triangles

**Bedding (Simplified)**:
- **Blanket**: Single plane with slight drape
  - Dimensions: 2m x 2.2m
  - Material: Gray fabric (#808080)
  - Polygon Budget: ~200 triangles
- **Pillows**: 2 simple box shapes
  - Dimensions per Pillow: 0.6m x 0.4m x 0.15m
  - Material: White fabric
  - Polygon Budget: ~100 triangles total

**Total Bed Assembly Budget**: ~1,000 triangles

#### **7.1.2 Reading Chair**

**Component**: Modern Accent Chair
- **Overall Dimensions**: 0.8m wide x 0.8m deep x 0.9m tall
- **Position**: X = -1m, Y = 3m, Z = 0.5m

**Chair Base/Seat**:
- **Dimensions**: 0.8m x 0.8m x 0.45m
- **Material**:
  - Base Color: Cream (#F5F5DC)
  - Roughness: 0.6
  - Metallic: 0.0
  - Normal Map: Fabric texture
- **Polygon Budget**: ~300 triangles

**Chair Back**:
- **Dimensions**: 0.8m wide x 0.5m tall x 0.1m thick
- **Material**: Same as seat
- **Polygon Budget**: ~200 triangles

**Chair Legs** (4 legs):
- **Dimensions per Leg**: 0.05m diameter x 0.45m tall
- **Material**: Light wood
- **Polygon Budget**: ~200 triangles total

**Decorative Pillow**:
- **Dimensions**: 0.4m x 0.4m x 0.15m
- **Material**: Dark gray (#404040)
- **Polygon Budget**: ~50 triangles

**Total Chair Assembly Budget**: ~750 triangles

#### **7.1.3 Wall Shelf Unit**

**Component**: Modern Wall-Mounted Shelving
- **Overall Dimensions**: 1m wide x 0.3m deep x 1.5m tall
- **Position**: X = -3.5m, Y = 3.5m, Z = -3.5m (back wall)

**Shelf Frame**:
- **Material**: Dark metal/black (#2C2C2C)
- **Frame Thickness**: 0.03m
- **Polygon Budget**: ~200 triangles

**Shelves** (3 shelves):
- **Dimensions per Shelf**: 0.94m x 0.27m x 0.02m
- **Material**: Light wood
- **Spacing**: 0.45m vertical spacing
- **Polygon Budget**: ~150 triangles total

**Decorative Items on Shelves** (simplified):
- **Books**: 5-6 simple box shapes
  - Various colors
  - Polygon Budget: ~100 triangles
- **Small Objects**: 2-3 simple geometric shapes
  - Polygon Budget: ~50 triangles

**Total Shelf Unit Budget**: ~500 triangles

#### **7.1.4 Purple Wall Art** (2 pieces)

**Component**: Circular Wall Decorations
- **Dimensions per Piece**: 0.4m diameter x 0.02m thick
- **Position**: One on back wall, one on right wall
- **Material**:
  - Base Color: Purple (#9370DB)
  - Roughness: 0.5
  - Metallic: 0.0
  - Texture: Leaf/organic pattern
- **Polygon Budget per Piece**: ~100 triangles
- **Total Art Budget**: ~200 triangles

---

### **7.2 UPPER LEVEL - OFFICE AREA**

#### **7.2.1 Desk**

**Component**: Modern L-Shaped Desk
- **Overall Dimensions**: 1.8m x 1.2m x 0.75m tall
- **Position**: X = 2m, Y = 3m, Z = -2m

**Desktop Surface**:
- **Dimensions**: 1.8m x 1.2m x 0.05m
- **Material**: Light wood (#D2B48C)
- **Polygon Budget**: ~100 triangles

**Desk Legs/Support** (4 legs):
- **Dimensions per Leg**: 0.05m x 0.05m x 0.7m
- **Material**: Light wood
- **Polygon Budget**: ~200 triangles

**Desk Drawer Unit** (optional detail):
- **Dimensions**: 0.4m x 0.5m x 0.6m
- **Position**: Under desk
- **Material**: Same as desktop
- **Polygon Budget**: ~150 triangles

**Total Desk Budget**: ~450 triangles

#### **7.2.2 Office Chair**

**Component**: Modern Ergonomic Office Chair
- **Overall Dimensions**: 0.6m wide x 0.6m deep x 1.1m tall
- **Position**: In front of desk

**Seat**:
- **Dimensions**: 0.5m x 0.5m x 0.1m
- **Material**: Gray fabric (#808080)
- **Polygon Budget**: ~150 triangles

**Backrest**:
- **Dimensions**: 0.5m wide x 0.6m tall
- **Material**: Gray mesh/fabric
- **Polygon Budget**: ~200 triangles

**Base/Wheels**:
- **Type**: 5-star base with casters
- **Material**: Black plastic/metal
- **Polygon Budget**: ~250 triangles

**Armrests** (2):
- **Dimensions per Arm**: 0.4m x 0.08m x 0.05m
- **Material**: Black plastic
- **Polygon Budget**: ~100 triangles

**Total Chair Budget**: ~700 triangles

#### **7.2.3 Monitor/TV on Desk**

**Component**: Flat Screen Display
- **Dimensions**: 0.6m wide x 0.35m tall x 0.05m deep
- **Position**: On desk surface

**Screen Frame**:
- **Material**: Black plastic (#1C1C1C)
- **Polygon Budget**: ~100 triangles

**Screen Display**:
- **Material**: 
  - Base Color: Dark blue/black (#0A0A1A)
  - Emissive: Slight glow (0.2 intensity)
  - Roughness: 0.1
- **Polygon Budget**: ~20 triangles

**Stand**:
- **Dimensions**: 0.2m x 0.15m x 0.05m
- **Material**: Black plastic
- **Polygon Budget**: ~80 triangles

**Total Monitor Budget**: ~200 triangles

#### **7.2.4 Desk Accessories**

**Component**: Small Decorative Items
- **Plant Pot**: Small cylindrical pot with simple plant
  - Dimensions: 0.1m diameter x 0.15m tall
  - Material: White ceramic pot, green plant
  - Polygon Budget: ~150 triangles
- **Desk Lamp** (optional):
  - Simple modern design
  - Polygon Budget: ~200 triangles
- **Small Objects**: 2-3 simple shapes (books, cup, etc.)
  - Polygon Budget: ~100 triangles

**Total Accessories Budget**: ~450 triangles

#### **7.2.5 Wall-Mounted Shelf Above Desk**

**Component**: Floating Shelf
- **Dimensions**: 1.5m wide x 0.25m deep x 0.05m thick
- **Position**: Above desk, Y = 4.5m
- **Material**: Light wood
- **Polygon Budget**: ~100 triangles

**Items on Shelf**:
- **Small Objects**: 3-4 simple geometric shapes
- **Polygon Budget**: ~100 triangles

**Total Shelf Budget**: ~200 triangles

---

### **7.3 GROUND LEVEL - KITCHEN AREA**

#### **7.3.1 Kitchen Cabinets - Base Units**

**Component**: Lower Cabinet Assembly
- **Overall Dimensions**: 3m wide x 0.6m deep x 0.9m tall
- **Position**: X = -3m, Y = 0, Z = -3m (back wall)

**Cabinet Boxes** (3 sections):
- **Dimensions per Section**: 1m x 0.6m x 0.9m
- **Material**:
  - Base Color: White (#FFFFFF)
  - Roughness: 0.3
  - Metallic: 0.0
- **Polygon Budget per Section**: ~200 triangles
- **Total Cabinet Boxes**: ~600 triangles

**Cabinet Doors** (6 doors):
- **Dimensions per Door**: 0.45m x 0.7m x 0.02m
- **Material**: Same as cabinet boxes
- **Hardware**: Simple cylindrical handles
- **Polygon Budget per Door**: ~80 triangles
- **Total Doors Budget**: ~480 triangles

**Countertop**:
- **Dimensions**: 3.2m x 0.65m x 0.05m
- **Position**: On top of base cabinets
- **Material**:
  - Base Color: Light gray marble (#E0E0E0)
  - Roughness: 0.2
  - Metallic: 0.0
  - Normal Map: Subtle marble veining
- **Polygon Budget**: ~150 triangles

**Total Base Cabinet Budget**: ~1,230 triangles

#### **7.3.2 Kitchen Appliances**

**Refrigerator**:
- **Dimensions**: 0.8m wide x 0.7m deep x 1.8m tall
- **Position**: X = -3.5m, Y = 0, Z = -2m
- **Material**:
  - Base Color: Dark gray/black (#3C3C3C)
  - Roughness: 0.2
  - Metallic: 0.3
- **Details**: Simple box with door seam lines
- **Polygon Budget**: ~300 triangles

**Oven/Range**:
- **Dimensions**: 0.6m wide x 0.6m deep x 0.9m tall
- **Position**: Integrated into base cabinets
- **Material**: Stainless steel appearance
  - Base Color: Light gray (#C0C0C0)
  - Roughness: 0.3
  - Metallic: 0.7
- **Details**: Control panel, oven door
- **Polygon Budget**: ~400 triangles

**Total Appliance Budget**: ~700 triangles

#### **7.3.3 Kitchen Island/Peninsula**

**Component**: Central Island with Seating
- **Overall Dimensions**: 1.5m wide x 0.8m deep x 0.9m tall
- **Position**: X = -1.5m, Y = 0, Z = -1.5m

**Island Base**:
- **Material**: White cabinets (same as base units)
- **Polygon Budget**: ~300 triangles

**Island Countertop**:
- **Dimensions**: 1.6m x 0.85m x 0.05m
- **Material**: Same marble as main countertop
- **Polygon Budget**: ~100 triangles

**Bar Stools** (2 stools):
- **Dimensions per Stool**: 0.4m diameter x 0.75m tall
- **Material**: 
  - Seat: Light wood
  - Legs: Black metal
- **Polygon Budget per Stool**: ~250 triangles
- **Total Stools Budget**: ~500 triangles

**Decorative Bowl on Island**:
- **Dimensions**: 0.3m diameter x 0.1m tall
- **Material**: White ceramic
- **Contents**: 3 simple sphere shapes (fruit)
- **Polygon Budget**: ~150 triangles

**Total Island Budget**: ~1,050 triangles

---

### **7.4 GROUND LEVEL - LIVING AREA**

#### **7.4.1 Sofa/Couch**

**Component**: Modern L-Shaped Sectional
- **Overall Dimensions**: 2.5m wide x 1.8m deep x 0.8m tall
- **Position**: X = 1.5m, Y = 0, Z = 1m

**Sofa Base/Seats**:
- **Dimensions**: 2.5m x 1.8m x 0.45m
- **Material**:
  - Base Color: Light beige (#F5F5DC)
  - Roughness: 0.6
  - Metallic: 0.0
  - Normal Map: Fabric texture
- **Polygon Budget**: ~600 triangles

**Sofa Back Cushions**:
- **Dimensions**: 2.5m wide x 0.4m tall x 0.2m thick
- **Material**: Same as seat
- **Polygon Budget**: ~300 triangles

**Sofa Legs** (4 legs):
- **Dimensions per Leg**: 0.05m x 0.05m x 0.15m
- **Material**: Dark wood
- **Polygon Budget**: ~100 triangles

**Throw Pillows** (3 pillows):
- **Dimensions per Pillow**: 0.4m x 0.4m x 0.15m
- **Materials**: Various colors (white, gray, beige)
- **Polygon Budget**: ~150 triangles total

**Total Sofa Budget**: ~1,150 triangles

#### **7.4.2 Coffee Table**

**Component**: Modern Low Coffee Table
- **Overall Dimensions**: 1.2m wide x 0.6m deep x 0.4m tall
- **Position**: In front of sofa

**Table Top**:
- **Dimensions**: 1.2m x 0.6m x 0.05m
- **Material**: Light wood
- **Polygon Budget**: ~100 triangles

**Table Legs** (4 legs):
- **Dimensions per Leg**: 0.05m x 0.05m x 0.35m
- **Material**: Light wood
- **Polygon Budget**: ~150 triangles

**Total Coffee Table Budget**: ~250 triangles

#### **7.4.3 TV Stand/Media Console**

**Component**: Low Media Cabinet
- **Overall Dimensions**: 1.8m wide x 0.45m deep x 0.5m tall
- **Position**: X = 2.5m, Y = 0, Z = -3.5m (against back wall)

**Cabinet Body**:
- **Material**: Light wood
- **Polygon Budget**: ~300 triangles

**Cabinet Doors/Drawers**:
- **Quantity**: 2 doors, 2 drawers
- **Material**: Same as body
- **Polygon Budget**: ~200 triangles

**Total Media Console Budget**: ~500 triangles

#### **7.4.4 Television**

**Component**: Wall-Mounted Flat Screen TV
- **Dimensions**: 1.2m wide x 0.7m tall x 0.05m deep
- **Position**: Above media console, Y = 1.2m

**TV Frame**:
- **Material**: Black plastic
- **Polygon Budget**: ~150 triangles

**TV Screen**:
- **Material**: 
  - Base Color: Very dark blue (#0A0A1A)
  - Emissive: Slight glow
  - Roughness: 0.1
- **Polygon Budget**: ~20 triangles

**Total TV Budget**: ~170 triangles

#### **7.4.5 Ladder Shelf**

**Component**: Decorative Leaning Shelf
- **Overall Dimensions**: 0.6m wide x 0.4m deep x 1.8m tall
- **Position**: X = 3m, Y = 0, Z = 0

**Shelf Frame**:
- **Material**: Light wood
- **Polygon Budget**: ~200 triangles

**Shelves** (4 shelves):
- **Dimensions**: Varying widths (0.4m to 0.6m)
- **Material**: Light wood
- **Polygon Budget**: ~150 triangles

**Decorative Items**:
- **Plant**: Simple potted plant
- **Books**: 3-4 simple boxes
- **Small Objects**: 2-3 geometric shapes
- **Polygon Budget**: ~200 triangles

**Total Ladder Shelf Budget**: ~550 triangles

#### **7.4.6 Floor Plant**

**Component**: Large Potted Plant
- **Overall Dimensions**: 0.3m diameter x 1m tall
- **Position**: X = 2m, Y = 0, Z = 2m

**Pot**:
- **Dimensions**: 0.3m diameter x 0.4m tall
- **Material**: White ceramic
- **Polygon Budget**: ~100 triangles

**Plant**:
- **Type**: Simple leafy plant (monstera or similar)
- **Material**: Green (#228B22)
- **Polygon Budget**: ~300 triangles (use planes with alpha for leaves)

**Total Plant Budget**: ~400 triangles

---

## **8. LIGHTING SPECIFICATIONS**

### **8.1 Global Lighting**

**Environment Lighting**:
- **Type**: HDRI environment map or three-point lighting setup
- **Intensity**: Medium-bright (simulating daylight)
- **Color Temperature**: 5500K (neutral daylight)
- **Background**: Light purple/lavender (#C8B4D4) as shown in reference

### **8.2 Window Light**

**Per Window Light Source**:
- **Type**: Area light
- **Dimensions**: Match window size (1.2m x 1.5m)
- **Position**: Slightly outside each window
- **Intensity**: Medium (0.5-0.7)
- **Color**: Warm white (#FFF8DC)
- **Cast Shadows**: Yes

### **8.3 Interior Ambient Light**

**General Fill Light**:
- **Type**: Ambient or hemisphere light
- **Intensity**: Low (0.3)
- **Color**: Neutral white
- **Purpose**: Prevent completely black shadows

### **8.4 Accent Lighting** (Optional)

**Ceiling Lights** (if adding detail):
- **Type**: Point lights
- **Quantity**: 2-3 per floor
- **Intensity**: Low (0.2-0.3)
- **Color**: Warm white
- **Cast Shadows**: No (for performance)

---

## **9. MATERIAL LIBRARY SUMMARY**

### **9.1 Wood Materials**

**Light Wood** (floors, furniture):
- Base Color: #C19A6B
- Roughness: 0.4
- Metallic: 0.0
- Normal Map: Wood grain texture

**Dark Wood** (stairs, accents):
- Base Color: #654321
- Roughness: 0.3
- Metallic: 0.0
- Normal Map: Wood grain texture

**Cork/Tan Wood** (roof):
- Base Color: #D2B48C
- Roughness: 0.7
- Metallic: 0.0
- Texture: Cork or compressed wood

### **9.2 Fabric Materials**

**White Fabric** (bedding, chair):
- Base Color: #FFFFFF
- Roughness: 0.7
- Metallic: 0.0
- Normal Map: Fabric weave texture

**Gray Fabric** (blanket, chair):
- Base Color: #808080
- Roughness: 0.6
- Metallic: 0.0
- Normal Map: Fabric texture

**Beige Fabric** (sofa):
- Base Color: #F5F5DC
- Roughness: 0.6
- Metallic: 0.0
- Normal Map: Fabric texture

### **9.3 Wall/Surface Materials**

**Cream/Off-White Walls**:
- Base Color: #F5F5DC
- Roughness: 0.8
- Metallic: 0.0
- Normal Map: Subtle stucco/plaster texture

**White Surfaces** (cabinets, ceiling):
- Base Color: #FFFFFF
- Roughness: 0.6
- Metallic: 0.0
- Minimal texture

**Gray Concrete** (base):
- Base Color: #E8E8E8
- Roughness: 0.7
- Metallic: 0.0
- Normal Map: Concrete texture

### **9.4 Metal/Glass Materials**

**Stainless Steel** (appliances):
- Base Color: #C0C0C0
- Roughness: 0.3
- Metallic: 0.7
- Anisotropic: 0.5 (brushed metal effect)

**Black Metal/Plastic**:
- Base Color: #2C2C2C
- Roughness: 0.4
- Metallic: 0.3

**Glass** (windows):
- Base Color: #F0F8FF (light blue tint)
- Transmission: 0.9
- Roughness: 0.1
- Metallic: 0.0
- IOR: 1.52

### **9.5 Stone Materials**

**Marble Countertop**:
- Base Color: #E0E0E0
- Roughness: 0.2
- Metallic: 0.0
- Normal Map: Marble veining pattern
- Specular: 0.5 (slight shine)

---

## **10. EXPORT SPECIFICATIONS**

### **10.1 GLB Export Settings**

**File Format**: GLB (Binary glTF 2.0)

**Compression**:
- Enable Draco mesh compression
- Compression level: 7 (balance between size and quality)
- Quantization bits: Position 14, Normal 10, TexCoord 12, Color 8

**Texture Settings**:
- Format: JPEG for color maps (quality 85%)
- Format: PNG for normal maps and alpha channels
- Maximum resolution: 2048x2048px
- Embed textures in GLB file

**Mesh Settings**:
- Merge meshes by material where possible
- Remove duplicate vertices
- Optimize vertex order for GPU cache
- Generate normals if missing
- Generate tangents for normal mapping

**Material Settings**:
- Use PBR Metallic-Roughness workflow
- Embed all material properties
- Ensure all materials are GLB-compatible

**Scene Settings**:
- Include lights in export (if supported by target renderer)
- Bake lighting to textures if real-time lighting not supported
- Include camera for reference viewing angle

### **10.2 Optimization Checklist**

**Before Export**:
- [ ] Total polygon count under 100,000 triangles
- [ ] All textures power-of-two dimensions (1024, 2048, etc.)
- [ ] All materials use PBR workflow
- [ ] No overlapping UVs (except for mirrored objects)
- [ ] All objects properly named and organized
- [ ] Pivot points centered on objects
- [ ] Scale applied to all objects (1.0, 1.0, 1.0)
- [ ] Rotation applied to all objects (0, 0, 0)
- [ ] No hidden or unused objects in scene
- [ ] All normals facing correct direction

**After Export**:
- [ ] Test GLB file in online viewer (e.g., gltf-viewer.donmccurdy.com)
- [ ] Verify file size (target: under 10MB)
- [ ] Check material appearance
- [ ] Verify transparency/alpha rendering
- [ ] Test on target web framework (Three.js, Babylon.js, etc.)

---

## **11. NAMING CONVENTIONS**

### **11.1 Object Naming**

**Structure**: `Category_Object_Detail_Number`

**Examples**:
- `Structure_Wall_Back_01`
- `Structure_Floor_Ground_01`
- `Structure_Roof_Main_01`
- `Furniture_Bed_Frame_01`
- `Furniture_Bed_Mattress_01`
- `Furniture_Chair_Reading_01`
- `Kitchen_Cabinet_Base_01`
- `Kitchen_Appliance_Fridge_01`
- `Decor_Plant_Floor_01`
- `Window_Frame_Back_01`
- `Window_Glass_Back_01`

### **11.2 Material Naming**

**Structure**: `MAT_Category_Type_Color`

**Examples**:
- `MAT_Wood_Light_Natural`
- `MAT_Wood_Dark_Walnut`
- `MAT_Fabric_White_Cotton`
- `MAT_Wall_Cream_Plaster`
- `MAT_Metal_Steel_Brushed`
- `MAT_Glass_Clear_Window`
- `MAT_Stone_Marble_LightGray`

### **11.3 Texture Naming**

**Structure**: `TEX_MaterialName_MapType`

**Map Types**:
- `_BaseColor` or `_Diffuse`
- `_Normal`
- `_Roughness`
- `_Metallic`
- `_AO` (Ambient Occlusion)
- `_Emissive`

**Examples**:
- `TEX_Wood_Light_BaseColor.jpg`
- `TEX_Wood_Light_Normal.png`
- `TEX_Wood_Light_Roughness.jpg`
- `TEX_Fabric_White_BaseColor.jpg`
- `TEX_Marble_Normal.png`

---

## **12. LAYER/COLLECTION ORGANIZATION**

### **12.1 Hierarchy Structure**

```
Scene Root
├── Structure
│   ├── Foundation
│   ├── Walls
│   ├── Floors
│   └── Roof
├── Windows
│   ├── Frames
│   └── Glass
├── Stairs
│   ├── Treads
│   └── Supports
├── Furniture_UpperLevel
│   ├── Bedroom
│   └── Office
├── Furniture_GroundLevel
│   ├── Kitchen
│   └── Living
├── Lighting
│   ├── Window_Lights
│   └── Interior_Lights
└── Camera
```

---

## **13. QUALITY ASSURANCE CHECKLIST**

### **13.1 Visual Quality**

- [ ] All materials render correctly with PBR
- [ ] Normal maps display proper surface detail
- [ ] Roughness values create realistic reflections
- [ ] Glass transparency works correctly
- [ ] Wood grain direction is consistent
- [ ] Fabric textures appear soft and realistic
- [ ] Metal surfaces show appropriate reflectivity
- [ ] Colors match reference image

### **13.2 Technical Quality**

- [ ] No z-fighting (overlapping surfaces)
- [ ] No gaps between connected surfaces
- [ ] All faces have correct normal direction
- [ ] No non-manifold geometry
- [ ] No isolated vertices or edges
- [ ] UV maps are properly laid out
- [ ] Texture seams are minimized
- [ ] Polygon count within budget

### **13.3 Performance**

- [ ] Total file size under 10MB
- [ ] Loads in under 3 seconds on average connection
- [ ] Renders at 60fps on mid-range hardware
- [ ] No excessive overdraw
- [ ] Textures appropriately sized for detail level
- [ ] Draco compression applied successfully

---

## **14. REFERENCE MEASUREMENTS SUMMARY**

### **14.1 Building Dimensions**
- Overall footprint: 8m x 8m
- Total height: 6m
- Floor-to-ceiling height: 3m per floor
- Wall thickness: 0.25m
- Floor thickness: 0.3m
- Roof thickness: 0.4m

### **14.2 Key Furniture Dimensions**
- Bed: 2m x 2.2m x 2.2m (with posts)
- Sofa: 2.5m x 1.8m x 0.8m
- Desk: 1.8m x 1.2m x 0.75m
- Kitchen island: 1.5m x 0.8m x 0.9m
- Stair tread: 1.2m x 0.28m x 0.05m

### **14.3 Window Dimensions**
- Window opening: 1.2m x 1.5m
- Frame width: 0.08m
- Total windows: 8

---

## **15. SPECIAL NOTES FOR 3D ARTIST**

### **15.1 Cutaway View Requirements**
- The model represents a **cutaway view** showing interior
- Front wall and left wall are **completely absent** (not modeled)
- This creates the "dollhouse" effect seen in reference
- Back wall and right wall are fully modeled with windows
- Interior is fully visible from isometric front-left angle

### **15.2 Isometric Camera Setup**
- Camera angle: 45° horizontal, 30° vertical (approximate)
- Camera should capture entire building in frame
- Position camera to show both floors clearly
- Ensure all interior details are visible
- No perspective distortion (orthographic or minimal perspective)

### **15.3 Lighting Considerations**
- Primary light source: Simulated daylight through windows
- Soft shadows to maintain visibility of all details
- Avoid harsh contrast that obscures interior
- Ambient light to fill shadow areas
- Consider baked lighting for performance

### **15.4 Style Guidelines**
- Clean, modern aesthetic
- Minimal ornamentation
- Focus on form and function
- Neutral color palette with wood accents
- Purple decorative elements as accent color
- Realistic but slightly stylized (not photorealistic)

### **15.5 Performance Priorities**
1. **File size**: Must be web-friendly (under 10MB)
2. **Polygon count**: Optimize for real-time rendering
3. **Texture efficiency**: Use atlasing where possible
4. **Material simplicity**: Avoid complex shader networks
5. **Loading speed**: Fast initial load is critical

---

## **16. DELIVERABLES**

### **16.1 Primary Deliverable**
- **File**: `modern_house_cutaway.glb`
- **Format**: GLB (Binary glTF 2.0)
- **Size**: Target under 10MB
- **Polygon Count**: 50,000-100,000 triangles

### **16.2 Optional Deliverables**
- **Preview Renders**: 3-5 high-quality renders from key angles
- **Wireframe View**: Screenshot showing polygon distribution
- **UV Layout**: Screenshot of UV maps
- **Material Breakdown**: Document listing all materials used
- **Source Files**: Native 3D software files (Blender, Maya, etc.)

### **16.3 Documentation**
- **Technical Specs**: Polygon count, texture sizes, file size
- **Material List**: All materials with property values
- **Known Limitations**: Any compromises made for performance
- **Usage Notes**: How to import and use in web frameworks

---

## **17. TESTING REQUIREMENTS**

### **17.1 Viewer Testing**
Test the GLB file in these viewers:
1. **glTF Viewer** (https://gltf-viewer.donmccurdy.com/)
2. **Babylon.js Sandbox** (https://sandbox.babylonjs.com/)
3. **Three.js Editor** (https://threejs.org/editor/)

### **17.2 Framework Testing**
If possible, test in target web framework:
- Three.js
- Babylon.js
- A-Frame
- React Three Fiber

### **17.3 Performance Testing**
- Load time on 3G connection
- Frame rate on mid-range GPU
- Memory usage in browser
- Mobile device compatibility

---

## **18. REVISION PROCESS**

### **18.1 Review Criteria**
- Visual accuracy compared to reference image
- Technical specifications met
- Performance targets achieved
- File size within limits
- All required elements present

### **18.2 Feedback Loop**
1. Initial model review
2. Feedback on accuracy and quality
3. Revisions as needed
4. Final approval
5. Delivery of final GLB file

---

## **SUMMARY**

This specification provides comprehensive instructions for creating a web-optimized 3D model of a modern two-story residential cutaway. The model should:

- Be delivered as a GLB file under 10MB
- Contain 50,000-100,000 triangles
- Use PBR materials with appropriate textures
- Display correctly in isometric cutaway view
- Perform well in web browsers
- Match the reference image in style and content

All measurements, materials, and technical specifications are provided to ensure the 3D artist can create an accurate, high-quality model suitable for web UI rendering.

---

**END OF SPECIFICATION DOCUMENT**

---

**Document Version**: 1.0  
**Date**: October 25, 2025  
**Reference Image**: ShutterStock ID 2514839171

