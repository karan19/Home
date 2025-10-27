/**
 * Modern House 3D Model - Main Application
 * Procedurally generates a two-story residential cutaway model
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { createWindows, createWindowLights } from './structure/windows.js';
import { createStaircase } from './structure/stairs.js';
import { createUpperLevelFurniture } from './first-floor/index.js';
import { createGroundLevelFurniture } from './ground-floor/index.js';
// import { createHumanCharacter } from './characters-reference/human-controller.js'; // Moved to reference

// Global variables
let scene, camera, renderer, controls;
let houseGroup; // Main group containing all house elements
let structureGroup, windowsGroup, stairsGroup, furnitureUpperGroup, furnitureGroundGroup, lightingGroup;
let foundationGroup, wallsGroup, floorsGroup, roofGroup;
let windowFramesGroup, windowGlassGroup;
let stairTreadsGroup, stairSupportsGroup;
let windowLightsGroup, interiorLightsGroup;
let gridHelper;
let animationId;
let fanBlades; // Reference to animated fan blades
let humanCharacter; // Reference to animated human character
let clock; // Clock for delta time

// Configuration
const CONFIG = {
    camera: {
        fov: 45,
        near: 0.1,
        far: 1000,
        position: { x: 15, y: 12, z: 15 } // Isometric-ish view
    },
    renderer: {
        antialias: true,
        alpha: true
    },
    background: 0xC8B4D4 // Light purple from spec
};

/**
 * Initialize the application
 */
function init() {
    console.log('Initializing 3D House Model...');

    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(CONFIG.background);

    // Create camera (perspective for better depth perception)
    camera = new THREE.PerspectiveCamera(
        CONFIG.camera.fov,
        window.innerWidth / window.innerHeight,
        CONFIG.camera.near,
        CONFIG.camera.far
    );
    camera.position.set(
        CONFIG.camera.position.x,
        CONFIG.camera.position.y,
        CONFIG.camera.position.z
    );
    camera.lookAt(0, 3, 0); // Look at center of house (middle height)

    // Create renderer
    const canvas = document.getElementById('canvas3d');
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: CONFIG.renderer.antialias,
        alpha: CONFIG.renderer.alpha
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // Create orbit controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2; // Prevent going below ground
    controls.target.set(0, 3, 0); // Focus on center of house

    // Add grid helper
    gridHelper = new THREE.GridHelper(20, 20, 0x888888, 0xcccccc);
    scene.add(gridHelper);

    // Create clock for delta time
    clock = new THREE.Clock();

    // Create main house group and hierarchy (Section 12.1 from spec)
    houseGroup = new THREE.Group();
    houseGroup.name = 'House';
    scene.add(houseGroup);

    // Create Structure group and subgroups
    structureGroup = new THREE.Group();
    structureGroup.name = 'Structure';
    foundationGroup = new THREE.Group();
    foundationGroup.name = 'Foundation';
    wallsGroup = new THREE.Group();
    wallsGroup.name = 'Walls';
    floorsGroup = new THREE.Group();
    floorsGroup.name = 'Floors';
    roofGroup = new THREE.Group();
    roofGroup.name = 'Roof';
    structureGroup.add(foundationGroup, wallsGroup, floorsGroup, roofGroup);
    houseGroup.add(structureGroup);

    // Create Windows group and subgroups
    windowsGroup = new THREE.Group();
    windowsGroup.name = 'Windows';
    windowFramesGroup = new THREE.Group();
    windowFramesGroup.name = 'Frames';
    windowGlassGroup = new THREE.Group();
    windowGlassGroup.name = 'Glass';
    windowsGroup.add(windowFramesGroup, windowGlassGroup);
    houseGroup.add(windowsGroup);

    // Create Stairs group and subgroups
    stairsGroup = new THREE.Group();
    stairsGroup.name = 'Stairs';
    stairTreadsGroup = new THREE.Group();
    stairTreadsGroup.name = 'Treads';
    stairSupportsGroup = new THREE.Group();
    stairSupportsGroup.name = 'Supports';
    stairsGroup.add(stairTreadsGroup, stairSupportsGroup);
    houseGroup.add(stairsGroup);

    // Create Furniture groups
    furnitureUpperGroup = new THREE.Group();
    furnitureUpperGroup.name = 'Furniture_UpperLevel';
    houseGroup.add(furnitureUpperGroup);

    furnitureGroundGroup = new THREE.Group();
    furnitureGroundGroup.name = 'Furniture_GroundLevel';
    houseGroup.add(furnitureGroundGroup);

    // Create Lighting group and subgroups
    lightingGroup = new THREE.Group();
    lightingGroup.name = 'Lighting';
    windowLightsGroup = new THREE.Group();
    windowLightsGroup.name = 'Window_Lights';
    interiorLightsGroup = new THREE.Group();
    interiorLightsGroup.name = 'Interior_Lights';
    lightingGroup.add(windowLightsGroup, interiorLightsGroup);
    houseGroup.add(lightingGroup);

    // Set up lighting
    setupLighting();

    // Build the house structure
    buildHouse();

    // Set up UI controls
    setupUIControls();

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Hide loading indicator
    document.getElementById('loading').classList.add('hidden');

    // Start animation loop
    animate();

    console.log('Initialization complete!');
}

/**
 * Set up scene lighting (Updated for warmer atmosphere and better contrast)
 */
function setupLighting() {
    // Ambient light for general illumination (reduced for more contrast)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    ambientLight.name = 'AmbientLight';
    interiorLightsGroup.add(ambientLight);

    // Main directional light (simulating sun - warmer and stronger)
    const mainLight = new THREE.DirectionalLight(0xFFE4B5, 1.0); // Warmer tone, increased intensity
    mainLight.position.set(10, 15, 10);
    mainLight.castShadow = true;
    mainLight.shadow.camera.left = -15;
    mainLight.shadow.camera.right = 15;
    mainLight.shadow.camera.top = 15;
    mainLight.shadow.camera.bottom = -15;
    mainLight.shadow.camera.near = 0.1;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.bias = -0.0001;
    mainLight.name = 'MainLight';
    interiorLightsGroup.add(mainLight);

    // Fill light from opposite side (reduced for more drama)
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.2);
    fillLight.position.set(-10, 10, -10);
    fillLight.name = 'FillLight';
    interiorLightsGroup.add(fillLight);

    // Hemisphere light for sky/ground color variation
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x888888, 0.3);
    hemiLight.name = 'HemisphereLight';
    interiorLightsGroup.add(hemiLight);
}

/**
 * Build the complete house structure
 */
function buildHouse() {
    console.log('Building house structure...');

    // Phase 1: Core Structure
    buildFoundation();
    buildWalls();
    buildFloors();
    buildRoof();

    // Phase 2: Windows & Stairs
    // createWindows(windowFramesGroup, windowGlassGroup);
    // createWindowLights(windowLightsGroup);
    createStaircase(stairTreadsGroup, stairSupportsGroup);

    // Phase 3: Upper Level Furniture (with animated objects)
    const animatedObjects = createUpperLevelFurniture(furnitureUpperGroup);
    if (animatedObjects && animatedObjects.fanBlades) {
        fanBlades = animatedObjects.fanBlades;
        console.log('Fan blades reference stored for animation');
    }

    // Phase 4: Ground Level Furniture
    createGroundLevelFurniture(furnitureGroundGroup);

    // Phase 5: Human character (moved to js/characters-reference/ for future reference)
    // humanCharacter = createHumanCharacter();
    // scene.add(humanCharacter.group);
    // console.log('Human character created and added to scene');

    // Update polygon count
    updatePolygonCount();

    console.log('House structure complete!');
}

/**
 * Build foundation and base platform
 */
function buildFoundation() {
    // Ground floor base slab (8m x 8m x 0.2m)
    const baseGeometry = new THREE.BoxGeometry(8, 0.2, 8);
    const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0xE8E8E8, // Light gray
        roughness: 0.7,
        metalness: 0.0
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, -0.1, 0); // Position at Y=0 (center of box at -0.1)
    base.receiveShadow = true;
    base.name = 'Structure_Base_Foundation';
    foundationGroup.add(base);

    // Floor edge trim (0.3m height border - prominent dark wood)
    const edgeMaterial = new THREE.MeshStandardMaterial({
        color: 0x654321, // Dark wood (matching stairs)
        roughness: 0.4,
        metalness: 0.0
    });

    // Create edge trim as four separate pieces
    const edgeHeight = 0.3;
    const edgeThickness = 0.15;

    // Front edge
    const frontEdge = new THREE.Mesh(
        new THREE.BoxGeometry(8, edgeHeight, edgeThickness),
        edgeMaterial
    );
    frontEdge.position.set(0, edgeHeight / 2, 4 - edgeThickness / 2);
    frontEdge.castShadow = true;
    frontEdge.receiveShadow = true;
    frontEdge.name = 'Structure_Base_EdgeFront';
    foundationGroup.add(frontEdge);

    // Back edge
    const backEdge = new THREE.Mesh(
        new THREE.BoxGeometry(8, edgeHeight, edgeThickness),
        edgeMaterial
    );
    backEdge.position.set(0, edgeHeight / 2, -4 + edgeThickness / 2);
    backEdge.castShadow = true;
    backEdge.receiveShadow = true;
    backEdge.name = 'Structure_Base_EdgeBack';
    foundationGroup.add(backEdge);

    // Left edge
    const leftEdge = new THREE.Mesh(
        new THREE.BoxGeometry(edgeThickness, edgeHeight, 8),
        edgeMaterial
    );
    leftEdge.position.set(-4 + edgeThickness / 2, edgeHeight / 2, 0);
    leftEdge.castShadow = true;
    leftEdge.receiveShadow = true;
    leftEdge.name = 'Structure_Base_EdgeLeft';
    foundationGroup.add(leftEdge);

    // Right edge
    const rightEdge = new THREE.Mesh(
        new THREE.BoxGeometry(edgeThickness, edgeHeight, 8),
        edgeMaterial
    );
    rightEdge.position.set(4 - edgeThickness / 2, edgeHeight / 2, 0);
    rightEdge.castShadow = true;
    rightEdge.receiveShadow = true;
    rightEdge.name = 'Structure_Base_EdgeRight';
    foundationGroup.add(rightEdge);
}

/**
 * Build exterior walls (back and right only - cutaway view)
 */
function buildWalls() {
    const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0xF5F5DC, // Cream/off-white
        roughness: 0.8,
        metalness: 0.0
    });

    const wallThickness = 0.25;
    const wallHeight = 6;

    // Back wall (8m wide x 6m tall x 0.25m thick)
    const backWallGeometry = new THREE.BoxGeometry(8, wallHeight, wallThickness);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.set(0, wallHeight / 2, -4 + wallThickness / 2);
    backWall.castShadow = true;
    backWall.receiveShadow = true;
    backWall.name = 'Structure_Wall_Back';
    wallsGroup.add(backWall);

    // Right wall (8m deep x 6m tall x 0.25m thick)
    const rightWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, 8);
    const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
    rightWall.position.set(4 - wallThickness / 2, wallHeight / 2, 0);
    rightWall.castShadow = true;
    rightWall.receiveShadow = true;
    rightWall.name = 'Structure_Wall_Right';
    wallsGroup.add(rightWall);
}

/**
 * Build floor platforms
 */
function buildFloors() {
    // Ground floor surface (hardwood)
    const groundFloorGeometry = new THREE.BoxGeometry(8, 0.02, 8);
    const hardwoodMaterial = new THREE.MeshStandardMaterial({
        color: 0xC19A6B, // Medium wood tone
        roughness: 0.4,
        metalness: 0.0
    });
    const groundFloor = new THREE.Mesh(groundFloorGeometry, hardwoodMaterial);
    groundFloor.position.set(0, 0.01, 0); // Slightly above base to prevent z-fighting
    groundFloor.receiveShadow = true;
    groundFloor.name = 'Structure_Floor_Ground';
    floorsGroup.add(groundFloor);

    // Second floor with cutout (L-shaped floor)
    // Cutout dimensions: Enlarged to accommodate full staircase
    // Staircase needs: width 1.2m + supports + clearance = ~1.5m wide
    // Staircase length: 12 treads * 0.28m = 3.36m + clearance = ~3.6m deep
    const cutoutWidth = 1.8;  // Width for staircase
    const cutoutDepth = 3.8;  // Depth for full staircase length
    
    // Create second floor as two separate sections to form L-shape
    const ceilingMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF, // Pure white
        roughness: 0.6,
        metalness: 0.0
    });

    const floorEdgeMaterial = new THREE.MeshStandardMaterial({
        color: 0xC19A6B, // Wood beam appearance
        roughness: 0.4,
        metalness: 0.0
    });

    // Main section (back portion - full width)
    const mainSectionDepth = 8 - cutoutDepth; // 4.2m
    const mainSectionTop = new THREE.Mesh(
        new THREE.BoxGeometry(8, 0.02, mainSectionDepth),
        hardwoodMaterial
    );
    mainSectionTop.position.set(0, 3.15, -(cutoutDepth / 2));
    mainSectionTop.receiveShadow = true;
    mainSectionTop.name = 'Structure_Floor_Second_Top_Main';
    floorsGroup.add(mainSectionTop);

    // Front-right section (beside cutout)
    const sideSectionWidth = 8 - cutoutWidth; // 6.2m
    const sideSectionTop = new THREE.Mesh(
        new THREE.BoxGeometry(sideSectionWidth, 0.02, cutoutDepth),
        hardwoodMaterial
    );
    sideSectionTop.position.set((cutoutWidth / 2), 3.15, (8 - cutoutDepth) / 2);
    sideSectionTop.receiveShadow = true;
    sideSectionTop.name = 'Structure_Floor_Second_Top_Side';
    floorsGroup.add(sideSectionTop);

    // Second floor edge trim (prominent dark wood border for L-shaped floor)
    const secondFloorTrimMaterial = new THREE.MeshStandardMaterial({
        color: 0x654321, // Dark wood (matching stairs and ground trim)
        roughness: 0.4,
        metalness: 0.0
    });

    const trimHeight = 0.3;
    const trimThickness = 0.15;

    // Back trim (full width)
    const backTrim = new THREE.Mesh(
        new THREE.BoxGeometry(8, trimHeight, trimThickness),
        secondFloorTrimMaterial
    );
    backTrim.position.set(0, 3 - trimHeight / 2, -4 + trimThickness / 2);
    backTrim.castShadow = true;
    backTrim.receiveShadow = true;
    backTrim.name = 'Structure_Floor_Second_EdgeBack';
    floorsGroup.add(backTrim);

    // Left trim (full depth)
    const leftTrim = new THREE.Mesh(
        new THREE.BoxGeometry(trimThickness, trimHeight, 8),
        secondFloorTrimMaterial
    );
    leftTrim.position.set(-4 + trimThickness / 2, 3 - trimHeight / 2, 0);
    leftTrim.castShadow = true;
    leftTrim.receiveShadow = true;
    leftTrim.name = 'Structure_Floor_Second_EdgeLeft';
    floorsGroup.add(leftTrim);

    // Right trim (full depth)
    const rightTrim = new THREE.Mesh(
        new THREE.BoxGeometry(trimThickness, trimHeight, 8),
        secondFloorTrimMaterial
    );
    rightTrim.position.set(4 - trimThickness / 2, 3 - trimHeight / 2, 0);
    rightTrim.castShadow = true;
    rightTrim.receiveShadow = true;
    rightTrim.name = 'Structure_Floor_Second_EdgeRight';
    floorsGroup.add(rightTrim);

    // Front trim (only on right side where floor exists)
    const frontTrim = new THREE.Mesh(
        new THREE.BoxGeometry(sideSectionWidth, trimHeight, trimThickness),
        secondFloorTrimMaterial
    );
    frontTrim.position.set((cutoutWidth / 2), 3 - trimHeight / 2, 4 - trimThickness / 2);
    frontTrim.castShadow = true;
    frontTrim.receiveShadow = true;
    frontTrim.name = 'Structure_Floor_Second_EdgeFront';
    floorsGroup.add(frontTrim);

    // Inner edge trim around cutout (2 sides - back and right)
    // Inner back edge of cutout
    const cutoutBackTrim = new THREE.Mesh(
        new THREE.BoxGeometry(cutoutWidth, trimHeight, trimThickness),
        secondFloorTrimMaterial
    );
    cutoutBackTrim.position.set(-(cutoutWidth / 2), 3 - trimHeight / 2, (8 - cutoutDepth) / 2 - trimThickness / 2);
    cutoutBackTrim.castShadow = true;
    cutoutBackTrim.receiveShadow = true;
    cutoutBackTrim.name = 'Structure_Floor_Second_EdgeCutoutBack';
    floorsGroup.add(cutoutBackTrim);

    // Inner right edge of cutout
    const cutoutRightTrim = new THREE.Mesh(
        new THREE.BoxGeometry(trimThickness, trimHeight, cutoutDepth),
        secondFloorTrimMaterial
    );
    cutoutRightTrim.position.set(-trimThickness / 2, 3 - trimHeight / 2, (8 - cutoutDepth) / 2);
    cutoutRightTrim.castShadow = true;
    cutoutRightTrim.receiveShadow = true;
    cutoutRightTrim.name = 'Structure_Floor_Second_EdgeCutoutRight';
    floorsGroup.add(cutoutRightTrim);
}

/**
 * Build roof structure
 */
function buildRoof() {
    const roofMaterial = new THREE.MeshStandardMaterial({
        color: 0xD2B48C, // Cork/tan color
        roughness: 0.7,
        metalness: 0.0
    });

    // Main roof (8.6m x 8.6m x 0.4m with 0.3m overhang)
    const roofGeometry = new THREE.BoxGeometry(8.6, 0.4, 8.6);
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(0, 6.2, 0); // Y = 6m + 0.2m (half thickness)
    roof.castShadow = true;
    roof.receiveShadow = true;
    roof.name = 'Structure_Roof_Main';
    roofGroup.add(roof);

    // Exposed beams (visible from cutaway side)
    const beamGeometry = new THREE.BoxGeometry(0.2, 0.3, 8);
    
    // Beam 1
    const beam1 = new THREE.Mesh(beamGeometry, roofMaterial);
    beam1.position.set(-2, 5.85, 0); // Bottom of roof structure
    beam1.castShadow = true;
    beam1.name = 'Structure_Roof_Beam_01';
    roofGroup.add(beam1);

    // Beam 2
    const beam2 = new THREE.Mesh(beamGeometry, roofMaterial);
    beam2.position.set(2, 5.85, 0);
    beam2.castShadow = true;
    beam2.name = 'Structure_Roof_Beam_02';
    roofGroup.add(beam2);
}

/**
 * Set up UI control event listeners
 */
function setupUIControls() {
    // Export GLB button
    document.getElementById('exportBtn').addEventListener('click', exportGLB);

    // Reset camera button
    document.getElementById('resetCameraBtn').addEventListener('click', resetCamera);

    // Grid toggle
    document.getElementById('showGridBtn').addEventListener('change', (e) => {
        gridHelper.visible = e.target.checked;
    });
}

/**
 * Export scene to GLB format
 */
function exportGLB() {
    console.log('Exporting to GLB...');
    
    const exporter = new GLTFExporter();
    
    exporter.parse(
        houseGroup,
        (gltf) => {
            const blob = new Blob([gltf], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'modern_house_cutaway.glb';
            link.click();
            URL.revokeObjectURL(url);
            console.log('GLB export complete!');
        },
        (error) => {
            console.error('Export error:', error);
        },
        {
            binary: true,
            maxTextureSize: 2048
        }
    );
}

/**
 * Reset camera to initial position
 */
function resetCamera() {
    camera.position.set(
        CONFIG.camera.position.x,
        CONFIG.camera.position.y,
        CONFIG.camera.position.z
    );
    controls.target.set(0, 3, 0);
    controls.update();
}

/**
 * Update polygon count display
 */
function updatePolygonCount() {
    let totalTriangles = 0;
    
    houseGroup.traverse((object) => {
        if (object.isMesh && object.geometry) {
            const geometry = object.geometry;
            if (geometry.index) {
                totalTriangles += geometry.index.count / 3;
            } else {
                totalTriangles += geometry.attributes.position.count / 3;
            }
        }
    });

    document.getElementById('polyCount').textContent = Math.floor(totalTriangles).toLocaleString();
}

/**
 * Handle window resize
 */
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Animation loop
 */
function animate() {
    animationId = requestAnimationFrame(animate);
    
    // Get delta time for smooth animation
    const deltaTime = clock.getDelta();
    
    // Update controls
    controls.update();
    
    // Animate fan blades (rotate continuously)
    if (fanBlades) {
        fanBlades.rotation.x += 0.15; // Rotation speed (radians per frame)
    }
    
    // Update human character animation
    if (humanCharacter && !humanCharacter.finished()) {
        humanCharacter.update(deltaTime);
    }
    
    // Render scene
    renderer.render(scene, camera);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
