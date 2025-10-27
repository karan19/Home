/**
 * Upper Level Furniture Module
 * Creates furniture for the second floor (bedroom and office areas)
 */

import * as THREE from 'three';

/**
 * Create all upper level furniture
 * @param {THREE.Group} furnitureUpperGroup - Furniture_UpperLevel group
 */
export function createUpperLevelFurniture(furnitureUpperGroup) {
    console.log('Creating upper level furniture...');

    // Create Bedroom subgroup
    const bedroomGroup = new THREE.Group();
    bedroomGroup.name = 'Bedroom';
    furnitureUpperGroup.add(bedroomGroup);

    // Create Office subgroup
    const officeGroup = new THREE.Group();
    officeGroup.name = 'Office';
    furnitureUpperGroup.add(officeGroup);

    // Create bedroom furniture
    createBedroom(bedroomGroup);

    // Create office furniture
    createOffice(officeGroup);

    console.log('Upper level furniture created successfully!');
}

/**
 * Create bedroom furniture
 */
function createBedroom(bedroomGroup) {

    // Materials
    const lightWoodMaterial = new THREE.MeshStandardMaterial({
        color: 0xD2B48C,
        roughness: 0.4,
        metalness: 0.0
    });

    const whiteFabricMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.7,
        metalness: 0.0
    });

    const grayFabricMaterial = new THREE.MeshStandardMaterial({
        color: 0x808080,
        roughness: 0.6,
        metalness: 0.0
    });

    const creamFabricMaterial = new THREE.MeshStandardMaterial({
        color: 0xF5F5DC,
        roughness: 0.6,
        metalness: 0.0
    });

    const purpleMaterial = new THREE.MeshStandardMaterial({
        color: 0x9370DB,
        roughness: 0.5,
        metalness: 0.0
    });

    // Four-poster bed (positioned at X=-2, Y=3, Z=-2)
    const bedGroup = createFourPosterBed(lightWoodMaterial, whiteFabricMaterial, grayFabricMaterial);
    bedGroup.position.set(-2, 3, -2);
    bedroomGroup.add(bedGroup);

    // Reading chair (positioned at X=-1, Y=3, Z=0.5)
    const chair = createReadingChair(creamFabricMaterial, lightWoodMaterial);
    chair.position.set(-1, 3, 0.5);
    bedroomGroup.add(chair);

    // Wall shelf unit (on back wall at X=-3.5, Y=3.5, Z=-3.5)
    const shelf = createWallShelf(lightWoodMaterial);
    shelf.position.set(-3.5, 3.5, -3.7);
    bedroomGroup.add(shelf);

    // Purple wall art pieces
    const art1 = createWallArt(purpleMaterial);
    art1.position.set(-2, 4.5, -3.85);
    bedroomGroup.add(art1);

    const art2 = createWallArt(purpleMaterial);
    art2.position.set(3.85, 4.5, -2);
    art2.rotation.y = Math.PI / 2;
    bedroomGroup.add(art2);
}

/**
 * Create four-poster bed
 */
function createFourPosterBed(woodMaterial, whiteMaterial, grayMaterial) {
    const bedGroup = new THREE.Group();
    bedGroup.name = 'Furniture_Bed';

    // Bed base (2m x 2.2m x 0.5m)
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.5, 2.2),
        woodMaterial
    );
    base.position.y = 0.25;
    base.castShadow = true;
    base.receiveShadow = true;
    bedGroup.add(base);

    // Storage drawers underneath bed (3 drawers)
    const drawerMaterial = new THREE.MeshStandardMaterial({
        color: 0xD2B48C, // Light wood
        roughness: 0.4,
        metalness: 0.0
    });

    const handleMaterial = new THREE.MeshStandardMaterial({
        color: 0x654321, // Dark wood
        roughness: 0.3,
        metalness: 0.0
    });

    for (let i = 0; i < 3; i++) {
        // Drawer box (0.6m wide x 0.35m tall x 0.5m deep)
        const drawer = new THREE.Mesh(
            new THREE.BoxGeometry(0.6, 0.35, 0.5),
            drawerMaterial
        );
        drawer.position.set(-0.6 + i * 0.6, 0.175, 1);
        drawer.castShadow = true;
        drawer.receiveShadow = true;
        drawer.name = `Furniture_Bed_Drawer_${i + 1}`;
        bedGroup.add(drawer);

        // Drawer handle (small horizontal bar)
        const handle = new THREE.Mesh(
            new THREE.BoxGeometry(0.15, 0.02, 0.02),
            handleMaterial
        );
        handle.position.set(-0.6 + i * 0.6, 0.175, 1.26);
        handle.castShadow = true;
        bedGroup.add(handle);
    }

    // Four posts (0.08m x 0.08m x 2.2m)
    const postGeometry = new THREE.BoxGeometry(0.08, 2.2, 0.08);
    const postPositions = [
        [-0.96, 1.1, -1.06],  // Back left
        [0.96, 1.1, -1.06],   // Back right
        [-0.96, 1.1, 1.06],   // Front left
        [0.96, 1.1, 1.06]     // Front right
    ];

    postPositions.forEach((pos, index) => {
        const post = new THREE.Mesh(postGeometry, woodMaterial);
        post.position.set(pos[0], pos[1], pos[2]);
        post.castShadow = true;
        post.name = `Furniture_Bed_Post_${index + 1}`;
        bedGroup.add(post);
    });

    // Top frame beams connecting posts
    // Long beams (along length)
    const longBeam = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.08, 2.2),
        woodMaterial
    );
    longBeam.position.set(-0.96, 2.2, 0);
    longBeam.castShadow = true;
    bedGroup.add(longBeam);

    const longBeam2 = longBeam.clone();
    longBeam2.position.set(0.96, 2.2, 0);
    bedGroup.add(longBeam2);

    // Short beams (along width)
    const shortBeam = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.08, 0.08),
        woodMaterial
    );
    shortBeam.position.set(0, 2.2, -1.06);
    shortBeam.castShadow = true;
    bedGroup.add(shortBeam);

    const shortBeam2 = shortBeam.clone();
    shortBeam2.position.set(0, 2.2, 1.06);
    bedGroup.add(shortBeam2);

    // Mattress (1.9m x 2.1m x 0.3m)
    const mattress = new THREE.Mesh(
        new THREE.BoxGeometry(1.9, 0.3, 2.1),
        whiteMaterial
    );
    mattress.position.y = 0.65;
    mattress.castShadow = true;
    mattress.receiveShadow = true;
    bedGroup.add(mattress);

    // Blanket (simplified as a plane with slight elevation)
    const blanket = new THREE.Mesh(
        new THREE.BoxGeometry(1.9, 0.05, 2.1),
        grayMaterial
    );
    blanket.position.y = 0.85;
    blanket.castShadow = true;
    blanket.receiveShadow = true;
    bedGroup.add(blanket);

    // Pillows (2 simple boxes)
    const pillowGeometry = new THREE.BoxGeometry(0.6, 0.15, 0.4);
    const pillow1 = new THREE.Mesh(pillowGeometry, whiteMaterial);
    pillow1.position.set(-0.4, 0.95, -0.8);
    pillow1.castShadow = true;
    bedGroup.add(pillow1);

    const pillow2 = new THREE.Mesh(pillowGeometry, whiteMaterial);
    pillow2.position.set(0.4, 0.95, -0.8);
    pillow2.castShadow = true;
    bedGroup.add(pillow2);

    return bedGroup;
}

/**
 * Create reading chair
 */
function createReadingChair(fabricMaterial, woodMaterial) {
    const chairGroup = new THREE.Group();
    chairGroup.name = 'Furniture_Chair_Reading';

    // Seat (0.8m x 0.8m x 0.45m)
    const seat = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.45, 0.8),
        fabricMaterial
    );
    seat.position.y = 0.225;
    seat.castShadow = true;
    seat.receiveShadow = true;
    chairGroup.add(seat);

    // Back (0.8m wide x 0.5m tall x 0.1m thick)
    const back = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.5, 0.1),
        fabricMaterial
    );
    back.position.set(0, 0.7, -0.35);
    back.castShadow = true;
    back.receiveShadow = true;
    chairGroup.add(back);

    // Legs (4 legs, 0.05m diameter x 0.45m tall)
    const legGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.45, 8);
    const legPositions = [
        [-0.35, 0.225, -0.35],
        [0.35, 0.225, -0.35],
        [-0.35, 0.225, 0.35],
        [0.35, 0.225, 0.35]
    ];

    legPositions.forEach((pos, index) => {
        const leg = new THREE.Mesh(legGeometry, woodMaterial);
        leg.position.set(pos[0], pos[1], pos[2]);
        leg.castShadow = true;
        chairGroup.add(leg);
    });

    // Decorative pillow
    const pillow = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.15, 0.4),
        new THREE.MeshStandardMaterial({ color: 0x404040, roughness: 0.6 })
    );
    pillow.position.set(0, 0.525, 0);
    pillow.castShadow = true;
    chairGroup.add(pillow);

    return chairGroup;
}

/**
 * Create wall shelf unit
 */
function createWallShelf(woodMaterial) {
    const shelfGroup = new THREE.Group();
    shelfGroup.name = 'Furniture_Shelf_Wall';

    const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x2C2C2C,
        roughness: 0.4,
        metalness: 0.3
    });

    // Frame (1m wide x 1.5m tall, 0.03m thick)
    const frameThickness = 0.03;
    
    // Vertical frames
    const leftFrame = new THREE.Mesh(
        new THREE.BoxGeometry(frameThickness, 1.5, frameThickness),
        frameMaterial
    );
    leftFrame.position.set(-0.5, 0, 0);
    shelfGroup.add(leftFrame);

    const rightFrame = leftFrame.clone();
    rightFrame.position.set(0.5, 0, 0);
    shelfGroup.add(rightFrame);

    // Horizontal frames (top and bottom)
    const topFrame = new THREE.Mesh(
        new THREE.BoxGeometry(1, frameThickness, frameThickness),
        frameMaterial
    );
    topFrame.position.set(0, 0.75, 0);
    shelfGroup.add(topFrame);

    const bottomFrame = topFrame.clone();
    bottomFrame.position.set(0, -0.75, 0);
    shelfGroup.add(bottomFrame);

    // Shelves (3 shelves, 0.94m x 0.27m x 0.02m)
    const shelfGeometry = new THREE.BoxGeometry(0.94, 0.02, 0.27);
    const shelfYPositions = [-0.3, 0.15, 0.6];

    shelfYPositions.forEach((y, index) => {
        const shelf = new THREE.Mesh(shelfGeometry, woodMaterial);
        shelf.position.set(0, y, 0.12);
        shelf.castShadow = true;
        shelf.receiveShadow = true;
        shelfGroup.add(shelf);
    });

    // Decorative items on shelves (simple boxes representing books and objects)
    // Books on middle shelf
    for (let i = 0; i < 5; i++) {
        const book = new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 0.15, 0.12),
            new THREE.MeshStandardMaterial({ 
                color: Math.random() * 0xffffff,
                roughness: 0.7 
            })
        );
        book.position.set(-0.3 + i * 0.12, 0.23, 0.12);
        book.castShadow = true;
        shelfGroup.add(book);
    }

    // Small objects on top shelf
    const object1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.08, 0.08),
        new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.5 })
    );
    object1.position.set(-0.2, 0.68, 0.12);
    object1.castShadow = true;
    shelfGroup.add(object1);

    const object2 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.1, 8),
        new THREE.MeshStandardMaterial({ color: 0x4682B4, roughness: 0.4 })
    );
    object2.position.set(0.2, 0.68, 0.12);
    object2.castShadow = true;
    shelfGroup.add(object2);

    return shelfGroup;
}

/**
 * Create purple wall art (circular)
 */
function createWallArt(material) {
    const artGroup = new THREE.Group();
    artGroup.name = 'Decor_WallArt_Purple';

    // Circular art piece (0.4m diameter x 0.02m thick)
    const art = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 0.02, 32),
        material
    );
    art.rotation.x = Math.PI / 2;
    art.castShadow = true;
    artGroup.add(art);

    return artGroup;
}

/**
 * Create office furniture
 */
function createOffice(officeGroup) {

    const lightWoodMaterial = new THREE.MeshStandardMaterial({
        color: 0xD2B48C,
        roughness: 0.4,
        metalness: 0.0
    });

    const grayFabricMaterial = new THREE.MeshStandardMaterial({
        color: 0x808080,
        roughness: 0.6,
        metalness: 0.0
    });

    const blackPlasticMaterial = new THREE.MeshStandardMaterial({
        color: 0x1C1C1C,
        roughness: 0.4,
        metalness: 0.3
    });

    // L-shaped desk (positioned at X=2, Y=3, Z=-2)
    const desk = createDesk(lightWoodMaterial);
    desk.position.set(2, 3, -2);
    officeGroup.add(desk);

    // Office chair (in front of desk)
    const chair = createOfficeChair(grayFabricMaterial, blackPlasticMaterial);
    chair.position.set(1.5, 3, -1.5);
    officeGroup.add(chair);

    // Monitor on desk
    const monitor = createMonitor(blackPlasticMaterial);
    monitor.position.set(2, 3.75, -2.3);
    officeGroup.add(monitor);

    // Desk accessories
    const plant = createDeskPlant();
    plant.position.set(2.5, 3.75, -1.7);
    officeGroup.add(plant);

    // Floating shelf above desk
    const floatingShelf = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.05, 0.25),
        lightWoodMaterial
    );
    floatingShelf.position.set(2, 4.5, -3.7);
    floatingShelf.castShadow = true;
    floatingShelf.receiveShadow = true;
    floatingShelf.name = 'Furniture_Shelf_Floating';
    officeGroup.add(floatingShelf);

    // Small objects on floating shelf
    for (let i = 0; i < 3; i++) {
        const obj = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 0.1, 0.08),
            new THREE.MeshStandardMaterial({ 
                color: Math.random() * 0xffffff,
                roughness: 0.6 
            })
        );
        obj.position.set(1.5 + i * 0.4, 4.58, -3.7);
        obj.castShadow = true;
        officeGroup.add(obj);
    }
}

/**
 * Create L-shaped desk
 */
function createDesk(material) {
    const deskGroup = new THREE.Group();
    deskGroup.name = 'Furniture_Desk';

    // Desktop surface (1.8m x 1.2m x 0.05m)
    const desktop = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.05, 1.2),
        material
    );
    desktop.position.y = 0.75;
    desktop.castShadow = true;
    desktop.receiveShadow = true;
    deskGroup.add(desktop);

    // Legs (4 legs, 0.05m x 0.05m x 0.7m)
    const legGeometry = new THREE.BoxGeometry(0.05, 0.7, 0.05);
    const legPositions = [
        [-0.85, 0.35, -0.55],
        [0.85, 0.35, -0.55],
        [-0.85, 0.35, 0.55],
        [0.85, 0.35, 0.55]
    ];

    legPositions.forEach((pos, index) => {
        const leg = new THREE.Mesh(legGeometry, material);
        leg.position.set(pos[0], pos[1], pos[2]);
        leg.castShadow = true;
        deskGroup.add(leg);
    });

    return deskGroup;
}

/**
 * Create office chair
 */
function createOfficeChair(fabricMaterial, plasticMaterial) {
    const chairGroup = new THREE.Group();
    chairGroup.name = 'Furniture_Chair_Office';

    // Seat (0.5m x 0.5m x 0.1m)
    const seat = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.1, 0.5),
        fabricMaterial
    );
    seat.position.y = 0.5;
    seat.castShadow = true;
    seat.receiveShadow = true;
    chairGroup.add(seat);

    // Backrest (0.5m wide x 0.6m tall)
    const backrest = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.6, 0.05),
        fabricMaterial
    );
    backrest.position.set(0, 0.85, -0.225);
    backrest.castShadow = true;
    chairGroup.add(backrest);

    // Base (5-star base)
    const baseRadius = 0.25;
    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const arm = new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 0.02, baseRadius),
            plasticMaterial
        );
        arm.position.set(0, 0.1, 0);
        arm.rotation.y = angle;
        arm.castShadow = true;
        chairGroup.add(arm);
    }

    // Center post
    const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.4, 8),
        plasticMaterial
    );
    post.position.y = 0.3;
    post.castShadow = true;
    chairGroup.add(post);

    // Armrests
    const armrest1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.05, 0.4),
        plasticMaterial
    );
    armrest1.position.set(-0.29, 0.65, 0);
    armrest1.castShadow = true;
    chairGroup.add(armrest1);

    const armrest2 = armrest1.clone();
    armrest2.position.set(0.29, 0.65, 0);
    chairGroup.add(armrest2);

    return chairGroup;
}

/**
 * Create monitor/display
 */
function createMonitor(material) {
    const monitorGroup = new THREE.Group();
    monitorGroup.name = 'Furniture_Monitor';

    // Screen (0.6m x 0.35m x 0.05m)
    const screen = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.35, 0.05),
        material
    );
    screen.position.y = 0.175;
    screen.castShadow = true;
    monitorGroup.add(screen);

    // Display (slightly smaller, with emissive)
    const display = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.3, 0.01),
        new THREE.MeshStandardMaterial({
            color: 0x0A0A1A,
            emissive: 0x0A0A1A,
            emissiveIntensity: 0.2,
            roughness: 0.1
        })
    );
    display.position.set(0, 0.175, 0.03);
    monitorGroup.add(display);

    // Stand
    const stand = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.05, 0.15),
        material
    );
    stand.position.y = -0.025;
    stand.castShadow = true;
    monitorGroup.add(stand);

    return monitorGroup;
}

/**
 * Create desk plant
 */
function createDeskPlant() {
    const plantGroup = new THREE.Group();
    plantGroup.name = 'Decor_Plant_Desk';

    // Pot (0.1m diameter x 0.15m tall)
    const pot = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.06, 0.15, 8),
        new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.3 })
    );
    pot.position.y = 0.075;
    pot.castShadow = true;
    plantGroup.add(pot);

    // Simple plant (green sphere on top)
    const plant = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0x228B22, roughness: 0.7 })
    );
    plant.position.y = 0.2;
    plant.castShadow = true;
    plantGroup.add(plant);

    return plantGroup;
}
