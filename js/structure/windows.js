/**
 * Windows Module
 * Creates windows with frames, glass, and lighting
 */

import * as THREE from 'three';

/**
 * Create all windows with frames and glass
 * @param {THREE.Group} windowFramesGroup - Frames group
 * @param {THREE.Group} windowGlassGroup - Glass group
 */
export function createWindows(windowFramesGroup, windowGlassGroup) {
    console.log('Creating windows...');

    const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.3,
        metalness: 0.0
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xFFFFFF,
        metalness: 0.0,
        roughness: 0.0,
        transmission: 0.9,
        thickness: 0.5,
        transparent: true,
        opacity: 0.3
    });

    // Window dimensions
    const windowWidth = 1.2;
    const windowHeight = 1.5;
    const frameWidth = 0.1;  // Increased from 0.08m
    const recessDepth = 0.15; // Increased from 0.05m

    // Back wall windows (4 windows, Y=1.5 to 3.0, evenly spaced)
    const backWallZ = -4 + 0.25 / 2 + recessDepth;
    const backWallPositions = [
        { x: -2.5, y: 4.5, z: backWallZ },
        { x: -0.8, y: 4.5, z: backWallZ },
        { x: 0.8, y: 4.5, z: backWallZ },
        { x: 2.5, y: 4.5, z: backWallZ }
    ];

    backWallPositions.forEach((pos, index) => {
        createWindow(
            windowFramesGroup,
            windowGlassGroup,
            pos,
            windowWidth,
            windowHeight,
            frameWidth,
            frameMaterial,
            glassMaterial,
            `Window_Back_${index + 1}`
        );
    });

    // Right wall windows (4 windows, Y=1.5 to 3.0, evenly spaced)
    const rightWallX = 4 - 0.25 / 2 - recessDepth;
    const rightWallPositions = [
        { x: rightWallX, y: 4.5, z: -2.5 },
        { x: rightWallX, y: 4.5, z: -0.8 },
        { x: rightWallX, y: 4.5, z: 0.8 },
        { x: rightWallX, y: 4.5, z: 2.5 }
    ];

    rightWallPositions.forEach((pos, index) => {
        createWindow(
            windowFramesGroup,
            windowGlassGroup,
            pos,
            windowWidth,
            windowHeight,
            frameWidth,
            frameMaterial,
            glassMaterial,
            `Window_Right_${index + 1}`,
            true // isRightWall
        );
    });

    console.log('Windows created successfully!');
}

/**
 * Create a single window with frame and glass
 */
function createWindow(
    framesGroup,
    glassGroup,
    position,
    width,
    height,
    frameWidth,
    frameMaterial,
    glassMaterial,
    name,
    isRightWall = false
) {
    // Outer frame
    const frameThickness = 0.05;
    const frameDepth = 0.15; // Increased depth for recess

    // Create frame pieces
    const topFrame = new THREE.Mesh(
        new THREE.BoxGeometry(width + frameWidth * 2, frameWidth, frameDepth),
        frameMaterial
    );
    topFrame.position.set(position.x, position.y + height / 2 + frameWidth / 2, position.z);
    topFrame.castShadow = true;
    topFrame.receiveShadow = true;
    framesGroup.add(topFrame);

    const bottomFrame = new THREE.Mesh(
        new THREE.BoxGeometry(width + frameWidth * 2, frameWidth, frameDepth),
        frameMaterial
    );
    bottomFrame.position.set(position.x, position.y - height / 2 - frameWidth / 2, position.z);
    bottomFrame.castShadow = true;
    bottomFrame.receiveShadow = true;
    framesGroup.add(bottomFrame);

    const leftFrame = new THREE.Mesh(
        new THREE.BoxGeometry(frameWidth, height, frameDepth),
        frameMaterial
    );
    leftFrame.position.set(position.x - width / 2 - frameWidth / 2, position.y, position.z);
    leftFrame.castShadow = true;
    leftFrame.receiveShadow = true;
    framesGroup.add(leftFrame);

    const rightFrame = new THREE.Mesh(
        new THREE.BoxGeometry(frameWidth, height, frameDepth),
        frameMaterial
    );
    rightFrame.position.set(position.x + width / 2 + frameWidth / 2, position.y, position.z);
    rightFrame.castShadow = true;
    rightFrame.receiveShadow = true;
    framesGroup.add(rightFrame);

    // Window sill (horizontal ledge at bottom)
    const sillWidth = width + frameWidth * 2 + 0.1; // Slightly wider than frame
    const sillDepth = frameDepth + 0.1; // Projects out from wall
    const sillThickness = 0.05;
    
    const sill = new THREE.Mesh(
        new THREE.BoxGeometry(sillWidth, sillThickness, sillDepth),
        frameMaterial
    );
    sill.position.set(
        position.x,
        position.y - height / 2 - frameWidth - sillThickness / 2,
        position.z + sillDepth / 2 - frameDepth / 2
    );
    sill.castShadow = true;
    sill.receiveShadow = true;
    framesGroup.add(sill);

    // Glass pane
    const glassGeometry = isRightWall
        ? new THREE.BoxGeometry(frameThickness, height - frameWidth, width - frameWidth)
        : new THREE.BoxGeometry(width - frameWidth, height - frameWidth, frameThickness);
    
    const glass = new THREE.Mesh(glassGeometry, glassMaterial);
    glass.position.set(position.x, position.y, position.z);
    glass.castShadow = true;
    glass.receiveShadow = true;
    glass.name = name;
    glassGroup.add(glass);
}

/**
 * Create window lights (area lights positioned at each window)
 * @param {THREE.Group} windowLightsGroup - Window lights group
 */
export function createWindowLights(windowLightsGroup) {
    console.log('Creating window lights...');

    const lightColor = 0xFFE4B5; // Warm light
    const lightIntensity = 0.3;

    // Back wall window lights (4 lights)
    const backWallZ = -4 + 0.5;
    const backWallLightPositions = [
        { x: -2.5, y: 4.5, z: backWallZ },
        { x: -0.8, y: 4.5, z: backWallZ },
        { x: 0.8, y: 4.5, z: backWallZ },
        { x: 2.5, y: 4.5, z: backWallZ }
    ];

    backWallLightPositions.forEach((pos, index) => {
        const light = new THREE.RectAreaLight(lightColor, lightIntensity, 1.2, 1.5);
        light.position.set(pos.x, pos.y, pos.z);
        light.lookAt(pos.x, pos.y, pos.z + 1);
        light.name = `Window_Light_Back_${index + 1}`;
        windowLightsGroup.add(light);
    });

    // Right wall window lights (4 lights)
    const rightWallX = 4 - 0.5;
    const rightWallLightPositions = [
        { x: rightWallX, y: 4.5, z: -2.5 },
        { x: rightWallX, y: 4.5, z: -0.8 },
        { x: rightWallX, y: 4.5, z: 0.8 },
        { x: rightWallX, y: 4.5, z: 2.5 }
    ];

    rightWallLightPositions.forEach((pos, index) => {
        const light = new THREE.RectAreaLight(lightColor, lightIntensity, 1.5, 1.2);
        light.position.set(pos.x, pos.y, pos.z);
        light.lookAt(pos.x - 1, pos.y, pos.z);
        light.name = `Window_Light_Right_${index + 1}`;
        windowLightsGroup.add(light);
    });

    console.log('Window lights created successfully!');
}
