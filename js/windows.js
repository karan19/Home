/**
 * Windows Module
 * Creates window frames and glass panes for the house
 */

import * as THREE from 'three';

/**
 * Create all windows for the house
 * @param {THREE.Group} framesGroup - Group for window frames
 * @param {THREE.Group} glassGroup - Group for window glass
 */
export function createWindows(framesGroup, glassGroup) {
    console.log('Creating windows...');

    // Window specifications (updated for better depth)
    const windowWidth = 1.2;
    const windowHeight = 1.5;
    const frameWidth = 0.1; // Increased from 0.08m
    const recessDepth = 0.15; // Increased from 0.05m for more shadow
    const wallThickness = 0.25;

    // Materials
    const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0xD2B48C, // Light wood tone
        roughness: 0.4,
        metalness: 0.0
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xF0F8FF, // Very light blue tint
        transmission: 0.9, // 90% transparent
        roughness: 0.1,
        metalness: 0.0,
        thickness: 0.01,
        ior: 1.52, // Glass index of refraction
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
    });

    // Back wall windows (4 windows: 2 on ground floor, 2 on second floor)
    createBackWallWindows(framesGroup, glassGroup, windowWidth, windowHeight, frameWidth, recessDepth, wallThickness, frameMaterial, glassMaterial);

    // Right wall windows (4 windows: 2 on ground floor, 2 on second floor)
    createRightWallWindows(framesGroup, glassGroup, windowWidth, windowHeight, frameWidth, recessDepth, wallThickness, frameMaterial, glassMaterial);

    console.log('Windows created successfully!');
}

/**
 * Create windows on the back wall
 */
function createBackWallWindows(framesGroup, glassGroup, windowWidth, windowHeight, frameWidth, recessDepth, wallThickness, frameMaterial, glassMaterial) {
    const wallZPosition = -4 + wallThickness / 2;
    const wallWidth = 8;

    // Calculate window positions (evenly distributed)
    // Two windows per floor, spaced evenly
    const spacing = wallWidth / 3; // Divide wall into 3 sections, windows in middle of outer sections
    const xPositions = [-spacing, spacing];

    // Ground floor windows (Y center at 1.5m)
    const groundFloorY = 1.5;
    xPositions.forEach((x, index) => {
        createWindow(
            framesGroup, glassGroup,
            x, groundFloorY, wallZPosition,
            windowWidth, windowHeight, frameWidth, recessDepth, wallThickness,
            frameMaterial, glassMaterial,
            'back', 'ground', index + 1
        );
    });

    // Second floor windows (Y center at 4.5m)
    const secondFloorY = 4.5;
    xPositions.forEach((x, index) => {
        createWindow(
            framesGroup, glassGroup,
            x, secondFloorY, wallZPosition,
            windowWidth, windowHeight, frameWidth, recessDepth, wallThickness,
            frameMaterial, glassMaterial,
            'back', 'second', index + 1
        );
    });
}

/**
 * Create windows on the right wall
 */
function createRightWallWindows(framesGroup, glassGroup, windowWidth, windowHeight, frameWidth, recessDepth, wallThickness, frameMaterial, glassMaterial) {
    const wallXPosition = 4 - wallThickness / 2;
    const wallDepth = 8;

    // Calculate window positions (evenly distributed along Z axis)
    const spacing = wallDepth / 3;
    const zPositions = [-spacing, spacing];

    // Ground floor windows (Y center at 1.5m)
    const groundFloorY = 1.5;
    zPositions.forEach((z, index) => {
        createWindow(
            framesGroup, glassGroup,
            wallXPosition, groundFloorY, z,
            windowWidth, windowHeight, frameWidth, recessDepth, wallThickness,
            frameMaterial, glassMaterial,
            'right', 'ground', index + 1
        );
    });

    // Second floor windows (Y center at 4.5m)
    const secondFloorY = 4.5;
    zPositions.forEach((z, index) => {
        createWindow(
            framesGroup, glassGroup,
            wallXPosition, secondFloorY, z,
            windowWidth, windowHeight, frameWidth, recessDepth, wallThickness,
            frameMaterial, glassMaterial,
            'right', 'second', index + 1
        );
    });
}

/**
 * Create a single window with frame and glass
 */
function createWindow(framesGroup, glassGroup, x, y, z, windowWidth, windowHeight, frameWidth, recessDepth, wallThickness, frameMaterial, glassMaterial, wall, floor, number) {
    const windowGroup = new THREE.Group();
    windowGroup.name = `Window_${wall}_${floor}_${number}`;

    // Determine if this is a back wall or right wall window
    const isBackWall = wall === 'back';

    // Create window frame (outer rectangle)
    const frameThickness = 0.05;
    const frameDepth = wallThickness;

    // Frame pieces
    // Top frame
    const topFrame = new THREE.Mesh(
        new THREE.BoxGeometry(windowWidth + frameWidth * 2, frameWidth, frameDepth),
        frameMaterial
    );
    topFrame.position.set(0, windowHeight / 2 + frameWidth / 2, 0);
    windowGroup.add(topFrame);

    // Bottom frame
    const bottomFrame = new THREE.Mesh(
        new THREE.BoxGeometry(windowWidth + frameWidth * 2, frameWidth, frameDepth),
        frameMaterial
    );
    bottomFrame.position.set(0, -windowHeight / 2 - frameWidth / 2, 0);
    windowGroup.add(bottomFrame);

    // Left frame
    const leftFrame = new THREE.Mesh(
        new THREE.BoxGeometry(frameWidth, windowHeight, frameDepth),
        frameMaterial
    );
    leftFrame.position.set(-windowWidth / 2 - frameWidth / 2, 0, 0);
    windowGroup.add(leftFrame);

    // Right frame
    const rightFrame = new THREE.Mesh(
        new THREE.BoxGeometry(frameWidth, windowHeight, frameDepth),
        frameMaterial
    );
    rightFrame.position.set(windowWidth / 2 + frameWidth / 2, 0, 0);
    windowGroup.add(rightFrame);

    // Create glass pane (slightly smaller than frame opening)
    const glassWidth = windowWidth - 0.08;
    const glassHeight = windowHeight - 0.08;
    const glassThickness = 0.01;

    const glass = new THREE.Mesh(
        new THREE.BoxGeometry(glassWidth, glassHeight, glassThickness),
        glassMaterial
    );
    glass.position.set(0, 0, recessDepth); // Recessed into wall
    glass.name = `Window_Glass_${wall}_${floor}_${number}`;
    windowGroup.add(glass);

    // Add window sill (0.1m projection, 0.05m thick)
    const sillMaterial = new THREE.MeshStandardMaterial({
        color: 0xD2B48C, // Light wood matching frames
        roughness: 0.4,
        metalness: 0.0
    });

    const sill = new THREE.Mesh(
        new THREE.BoxGeometry(windowWidth + frameWidth * 2 + 0.1, 0.05, 0.1),
        sillMaterial
    );
    sill.position.set(0, -windowHeight / 2 - frameWidth / 2 - 0.025, frameDepth / 2);
    sill.castShadow = true;
    sill.receiveShadow = true;
    windowGroup.add(sill);

    // Position the entire window group
    windowGroup.position.set(x, y, z);

    // Rotate if it's a right wall window
    if (!isBackWall) {
        windowGroup.rotation.y = Math.PI / 2; // 90 degrees
    }

    windowGroup.castShadow = true;
    windowGroup.receiveShadow = true;

    // Add frame to frames group
    framesGroup.add(windowGroup);
    
    // Move glass to glass group (need to adjust position since it's in a different parent)
    const glassWorldPos = new THREE.Vector3();
    glass.getWorldPosition(glassWorldPos);
    windowGroup.remove(glass);
    glass.position.copy(windowGroup.position);
    glass.position.y = y;
    if (wall !== 'back') {
        glass.rotation.y = Math.PI / 2;
    }
    glassGroup.add(glass);
}

/**
 * Create window lights (area lights positioned at each window)
 * @param {THREE.Group} windowLightsGroup - Group for window lights
 */
export function createWindowLights(windowLightsGroup) {
    console.log('Creating window lights...');

    const lightIntensity = 0.5;
    const lightColor = 0xFFF8DC; // Warm white

    // Back wall window light positions
    const backWallZ = -4.5;
    const spacing = 8 / 3;
    const xPositions = [-spacing, spacing];

    // Ground floor back wall lights
    xPositions.forEach((x, index) => {
        const light = new THREE.RectAreaLight(lightColor, lightIntensity, 1.2, 1.5);
        light.position.set(x, 1.5, backWallZ);
        light.lookAt(x, 1.5, 0);
        light.name = `WindowLight_Back_Ground_${index + 1}`;
        windowLightsGroup.add(light);
    });

    // Second floor back wall lights
    xPositions.forEach((x, index) => {
        const light = new THREE.RectAreaLight(lightColor, lightIntensity, 1.2, 1.5);
        light.position.set(x, 4.5, backWallZ);
        light.lookAt(x, 4.5, 0);
        light.name = `WindowLight_Back_Second_${index + 1}`;
        windowLightsGroup.add(light);
    });

    // Right wall window light positions
    const rightWallX = 4.5;
    const zPositions = [-spacing, spacing];

    // Ground floor right wall lights
    zPositions.forEach((z, index) => {
        const light = new THREE.RectAreaLight(lightColor, lightIntensity, 1.2, 1.5);
        light.position.set(rightWallX, 1.5, z);
        light.lookAt(0, 1.5, z);
        light.name = `WindowLight_Right_Ground_${index + 1}`;
        windowLightsGroup.add(light);
    });

    // Second floor right wall lights
    zPositions.forEach((z, index) => {
        const light = new THREE.RectAreaLight(lightColor, lightIntensity, 1.2, 1.5);
        light.position.set(rightWallX, 4.5, z);
        light.lookAt(0, 4.5, z);
        light.name = `WindowLight_Right_Second_${index + 1}`;
        windowLightsGroup.add(light);
    });

    console.log('Window lights created successfully!');
}
