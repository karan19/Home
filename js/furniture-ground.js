/**
 * Ground Level Furniture Module
 * Creates furniture for the first floor (kitchen and living areas)
 */

import * as THREE from 'three';

/**
 * Create all ground level furniture
 * @param {THREE.Group} furnitureGroundGroup - Furniture_GroundLevel group
 */
export function createGroundLevelFurniture(furnitureGroundGroup) {
    console.log('Creating ground level furniture...');

    // Create Kitchen subgroup
    const kitchenGroup = new THREE.Group();
    kitchenGroup.name = 'Kitchen';
    furnitureGroundGroup.add(kitchenGroup);

    // Create Living subgroup
    const livingGroup = new THREE.Group();
    livingGroup.name = 'Living';
    furnitureGroundGroup.add(livingGroup);

    // Create kitchen furniture
    createKitchen(kitchenGroup);

    // Create living room furniture
    createLivingRoom(livingGroup);

    console.log('Ground level furniture created successfully!');
}

/**
 * Create kitchen furniture
 */
function createKitchen(kitchenGroup) {

    // Materials
    const whiteCabinetMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.3,
        metalness: 0.0
    });

    const marbleMaterial = new THREE.MeshStandardMaterial({
        color: 0xE0E0E0,
        roughness: 0.2,
        metalness: 0.0
    });

    const stainlessSteelMaterial = new THREE.MeshStandardMaterial({
        color: 0xC0C0C0,
        roughness: 0.3,
        metalness: 0.7
    });

    const darkGrayMaterial = new THREE.MeshStandardMaterial({
        color: 0x3C3C3C,
        roughness: 0.2,
        metalness: 0.3
    });

    const lightWoodMaterial = new THREE.MeshStandardMaterial({
        color: 0xD2B48C,
        roughness: 0.4,
        metalness: 0.0
    });

    // Base cabinets (positioned at X=-3, Y=0, Z=-3 along back wall)
    const cabinets = createBaseCabinets(whiteCabinetMaterial, marbleMaterial);
    cabinets.position.set(-3, 0, -3);
    kitchenGroup.add(cabinets);

    // Refrigerator (X=-3.5, Y=0, Z=-2)
    const fridge = createRefrigerator(darkGrayMaterial);
    fridge.position.set(-3.5, 0, -2);
    kitchenGroup.add(fridge);

    // Oven/Range (integrated into cabinets at X=-2, Y=0, Z=-3)
    const oven = createOven(stainlessSteelMaterial);
    oven.position.set(-2, 0, -3.3);
    kitchenGroup.add(oven);

    // Kitchen island (X=-1.5, Y=0, Z=-1.5)
    const island = createKitchenIsland(whiteCabinetMaterial, marbleMaterial, lightWoodMaterial);
    island.position.set(-1.5, 0, -1.5);
    kitchenGroup.add(island);
}

/**
 * Create base cabinets with countertop
 */
function createBaseCabinets(cabinetMaterial, countertopMaterial) {
    const cabinetsGroup = new THREE.Group();
    cabinetsGroup.name = 'Kitchen_Cabinets_Base';

    // Cabinet boxes (3 sections, each 1m wide)
    for (let i = 0; i < 3; i++) {
        const cabinet = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.9, 0.6),
            cabinetMaterial
        );
        cabinet.position.set(-1 + i, 0.45, 0);
        cabinet.castShadow = true;
        cabinet.receiveShadow = true;
        cabinetsGroup.add(cabinet);

        // Cabinet doors (2 doors per section)
        for (let j = 0; j < 2; j++) {
            const door = new THREE.Mesh(
                new THREE.BoxGeometry(0.45, 0.7, 0.02),
                cabinetMaterial
            );
            door.position.set(-1 + i + (j === 0 ? -0.225 : 0.225), 0.45, 0.31);
            door.castShadow = true;
            cabinetsGroup.add(door);

            // Handle
            const handle = new THREE.Mesh(
                new THREE.CylinderGeometry(0.01, 0.01, 0.15, 8),
                new THREE.MeshStandardMaterial({ color: 0x808080, metalness: 0.8 })
            );
            handle.rotation.z = Math.PI / 2;
            handle.position.set(-1 + i + (j === 0 ? -0.1 : 0.1), 0.6, 0.33);
            cabinetsGroup.add(handle);
        }
    }

    // Countertop (3.2m x 0.65m x 0.05m)
    const countertop = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 0.05, 0.65),
        countertopMaterial
    );
    countertop.position.set(0, 0.925, 0);
    countertop.castShadow = true;
    countertop.receiveShadow = true;
    cabinetsGroup.add(countertop);

    return cabinetsGroup;
}

/**
 * Create refrigerator
 */
function createRefrigerator(material) {
    const fridgeGroup = new THREE.Group();
    fridgeGroup.name = 'Kitchen_Appliance_Fridge';

    // Main body (0.8m x 0.7m x 1.8m)
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 1.8, 0.7),
        material
    );
    body.position.y = 0.9;
    body.castShadow = true;
    body.receiveShadow = true;
    fridgeGroup.add(body);

    // Door seam lines (visual detail)
    const seamMaterial = new THREE.MeshStandardMaterial({ color: 0x2C2C2C });
    const seam = new THREE.Mesh(
        new THREE.BoxGeometry(0.78, 0.02, 0.01),
        seamMaterial
    );
    seam.position.set(0, 1.2, 0.36);
    fridgeGroup.add(seam);

    // Handles
    const handleMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x808080, 
        metalness: 0.8,
        roughness: 0.2 
    });
    
    const handle1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.3, 0.03),
        handleMaterial
    );
    handle1.position.set(0.3, 1.5, 0.37);
    fridgeGroup.add(handle1);

    const handle2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.3, 0.03),
        handleMaterial
    );
    handle2.position.set(0.3, 0.6, 0.37);
    fridgeGroup.add(handle2);

    return fridgeGroup;
}

/**
 * Create oven/range
 */
function createOven(material) {
    const ovenGroup = new THREE.Group();
    ovenGroup.name = 'Kitchen_Appliance_Oven';

    // Main body (0.6m x 0.6m x 0.9m)
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.9, 0.6),
        material
    );
    body.position.y = 0.45;
    body.castShadow = true;
    body.receiveShadow = true;
    ovenGroup.add(body);

    // Oven door (darker)
    const door = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.02),
        new THREE.MeshStandardMaterial({ color: 0x1C1C1C, roughness: 0.3 })
    );
    door.position.set(0, 0.4, 0.31);
    door.castShadow = true;
    ovenGroup.add(door);

    // Control panel
    const controls = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.1, 0.02),
        new THREE.MeshStandardMaterial({ color: 0x2C2C2C })
    );
    controls.position.set(0, 0.8, 0.31);
    ovenGroup.add(controls);

    // Burners on top (4 circles)
    const burnerMaterial = new THREE.MeshStandardMaterial({ color: 0x1C1C1C });
    const burnerPositions = [
        [-0.15, 0.91, -0.15],
        [0.15, 0.91, -0.15],
        [-0.15, 0.91, 0.15],
        [0.15, 0.91, 0.15]
    ];

    burnerPositions.forEach(pos => {
        const burner = new THREE.Mesh(
            new THREE.CylinderGeometry(0.08, 0.08, 0.02, 16),
            burnerMaterial
        );
        burner.position.set(pos[0], pos[1], pos[2]);
        ovenGroup.add(burner);
    });

    return ovenGroup;
}

/**
 * Create kitchen island with bar stools
 */
function createKitchenIsland(cabinetMaterial, countertopMaterial, woodMaterial) {
    const islandGroup = new THREE.Group();
    islandGroup.name = 'Kitchen_Island';

    // Island base (1.5m x 0.8m x 0.9m)
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.9, 0.8),
        cabinetMaterial
    );
    base.position.y = 0.45;
    base.castShadow = true;
    base.receiveShadow = true;
    islandGroup.add(base);

    // Countertop (1.6m x 0.85m x 0.05m)
    const countertop = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.05, 0.85),
        countertopMaterial
    );
    countertop.position.y = 0.925;
    countertop.castShadow = true;
    countertop.receiveShadow = true;
    islandGroup.add(countertop);

    // Bar stools (2 stools)
    const stool1 = createBarStool(woodMaterial);
    stool1.position.set(-0.5, 0, 0.6);
    islandGroup.add(stool1);

    const stool2 = createBarStool(woodMaterial);
    stool2.position.set(0.5, 0, 0.6);
    islandGroup.add(stool2);

    // Decorative bowl on island
    const bowl = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.3 })
    );
    bowl.position.set(0, 0.95, 0);
    bowl.castShadow = true;
    islandGroup.add(bowl);

    // Fruit in bowl (3 spheres)
    const fruitColors = [0xFF6347, 0xFFD700, 0x32CD32]; // Red, yellow, green
    fruitColors.forEach((color, i) => {
        const fruit = new THREE.Mesh(
            new THREE.SphereGeometry(0.05, 8, 8),
            new THREE.MeshStandardMaterial({ color, roughness: 0.6 })
        );
        fruit.position.set(-0.08 + i * 0.08, 0.98, 0);
        fruit.castShadow = true;
        islandGroup.add(fruit);
    });

    return islandGroup;
}

/**
 * Create bar stool
 */
function createBarStool(woodMaterial) {
    const stoolGroup = new THREE.Group();
    stoolGroup.name = 'Kitchen_Stool';

    // Seat (0.4m diameter x 0.05m thick)
    const seat = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 0.05, 16),
        woodMaterial
    );
    seat.position.y = 0.75;
    seat.castShadow = true;
    seat.receiveShadow = true;
    stoolGroup.add(seat);

    // Legs (4 legs angled outward)
    const legMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2C2C2C, 
        metalness: 0.5,
        roughness: 0.4 
    });

    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const leg = new THREE.Mesh(
            new THREE.CylinderGeometry(0.02, 0.025, 0.75, 8),
            legMaterial
        );
        leg.position.set(
            Math.cos(angle) * 0.15,
            0.375,
            Math.sin(angle) * 0.15
        );
        leg.castShadow = true;
        stoolGroup.add(leg);
    }

    // Footrest ring
    const footrest = new THREE.Mesh(
        new THREE.TorusGeometry(0.15, 0.015, 8, 16),
        legMaterial
    );
    footrest.rotation.x = Math.PI / 2;
    footrest.position.y = 0.3;
    stoolGroup.add(footrest);

    return stoolGroup;
}

/**
 * Create living room furniture
 */
function createLivingRoom(livingGroup) {

    // Materials
    const beigeFabricMaterial = new THREE.MeshStandardMaterial({
        color: 0xF5F5DC,
        roughness: 0.6,
        metalness: 0.0
    });

    const darkWoodMaterial = new THREE.MeshStandardMaterial({
        color: 0x654321,
        roughness: 0.4,
        metalness: 0.0
    });

    const lightWoodMaterial = new THREE.MeshStandardMaterial({
        color: 0xD2B48C,
        roughness: 0.4,
        metalness: 0.0
    });

    const blackPlasticMaterial = new THREE.MeshStandardMaterial({
        color: 0x1C1C1C,
        roughness: 0.4,
        metalness: 0.3
    });

    // L-shaped sofa (X=1.5, Y=0, Z=1)
    const sofa = createSofa(beigeFabricMaterial, darkWoodMaterial);
    sofa.position.set(1.5, 0, 1);
    livingGroup.add(sofa);

    // Coffee table (in front of sofa)
    const coffeeTable = createCoffeeTable(lightWoodMaterial);
    coffeeTable.position.set(1.5, 0, 0.2);
    livingGroup.add(coffeeTable);

    // TV stand (X=2.5, Y=0, Z=-3.5 against back wall)
    const tvStand = createTVStand(lightWoodMaterial);
    tvStand.position.set(2.5, 0, -3.5);
    livingGroup.add(tvStand);

    // Wall-mounted TV (above TV stand)
    const tv = createTV(blackPlasticMaterial);
    tv.position.set(2.5, 1.2, -3.75);
    livingGroup.add(tv);

    // Ladder shelf (X=3, Y=0, Z=0)
    const ladderShelf = createLadderShelf(lightWoodMaterial);
    ladderShelf.position.set(3, 0, 0);
    livingGroup.add(ladderShelf);

    // Floor plant (X=2, Y=0, Z=2)
    const plant = createFloorPlant();
    plant.position.set(2, 0, 2);
    livingGroup.add(plant);
}

/**
 * Create L-shaped sectional sofa
 */
function createSofa(fabricMaterial, woodMaterial) {
    const sofaGroup = new THREE.Group();
    sofaGroup.name = 'Furniture_Sofa';

    // Seat cushions (3 separate cushions with gaps)
    const cushionWidth = 0.8;
    const cushionGap = 0.02;
    const totalCushionWidth = cushionWidth * 3 + cushionGap * 2;
    const cushionStartX = -totalCushionWidth / 2 + cushionWidth / 2;

    for (let i = 0; i < 3; i++) {
        const cushion = new THREE.Mesh(
            new THREE.BoxGeometry(cushionWidth, 0.45, 1.8),
            fabricMaterial
        );
        cushion.position.set(
            cushionStartX + i * (cushionWidth + cushionGap),
            0.225,
            0
        );
        cushion.castShadow = true;
        cushion.receiveShadow = true;
        cushion.name = `Furniture_Sofa_Cushion_${i + 1}`;
        sofaGroup.add(cushion);
    }

    // Back cushions (3 separate cushions matching seat)
    for (let i = 0; i < 3; i++) {
        const backCushion = new THREE.Mesh(
            new THREE.BoxGeometry(cushionWidth, 0.4, 0.2),
            fabricMaterial
        );
        backCushion.position.set(
            cushionStartX + i * (cushionWidth + cushionGap),
            0.65,
            -0.8
        );
        backCushion.castShadow = true;
        backCushion.receiveShadow = true;
        backCushion.name = `Furniture_Sofa_BackCushion_${i + 1}`;
        sofaGroup.add(backCushion);
    }

    // Legs (4 legs)
    const legGeometry = new THREE.BoxGeometry(0.05, 0.15, 0.05);
    const legPositions = [
        [-1.2, 0.075, -0.85],
        [1.2, 0.075, -0.85],
        [-1.2, 0.075, 0.85],
        [1.2, 0.075, 0.85]
    ];

    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, woodMaterial);
        leg.position.set(pos[0], pos[1], pos[2]);
        leg.castShadow = true;
        sofaGroup.add(leg);
    });

    // Throw pillows (3 pillows)
    const pillowColors = [0xFFFFFF, 0x808080, 0xF5F5DC];
    pillowColors.forEach((color, i) => {
        const pillow = new THREE.Mesh(
            new THREE.BoxGeometry(0.4, 0.15, 0.4),
            new THREE.MeshStandardMaterial({ color, roughness: 0.6 })
        );
        pillow.position.set(-0.8 + i * 0.8, 0.525, -0.6);
        pillow.castShadow = true;
        sofaGroup.add(pillow);
    });

    return sofaGroup;
}

/**
 * Create coffee table
 */
function createCoffeeTable(material) {
    const tableGroup = new THREE.Group();
    tableGroup.name = 'Furniture_CoffeeTable';

    // Tabletop (1.2m x 0.6m x 0.05m)
    const top = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.05, 0.6),
        material
    );
    top.position.y = 0.4;
    top.castShadow = true;
    top.receiveShadow = true;
    tableGroup.add(top);

    // Legs (4 legs)
    const legGeometry = new THREE.BoxGeometry(0.05, 0.35, 0.05);
    const legPositions = [
        [-0.55, 0.175, -0.25],
        [0.55, 0.175, -0.25],
        [-0.55, 0.175, 0.25],
        [0.55, 0.175, 0.25]
    ];

    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, material);
        leg.position.set(pos[0], pos[1], pos[2]);
        leg.castShadow = true;
        tableGroup.add(leg);
    });

    return tableGroup;
}

/**
 * Create TV stand/media console
 */
function createTVStand(material) {
    const standGroup = new THREE.Group();
    standGroup.name = 'Furniture_TVStand';

    // Main body (1.8m x 0.45m x 0.5m)
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.5, 0.45),
        material
    );
    body.position.y = 0.25;
    body.castShadow = true;
    body.receiveShadow = true;
    standGroup.add(body);

    // Doors/drawers (visual detail)
    const doorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xC19A6B, 
        roughness: 0.4 
    });

    // 2 doors
    for (let i = 0; i < 2; i++) {
        const door = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 0.4, 0.02),
            doorMaterial
        );
        door.position.set(-0.45 + i * 0.9, 0.25, 0.24);
        door.castShadow = true;
        standGroup.add(door);
    }

    return standGroup;
}

/**
 * Create wall-mounted TV
 */
function createTV(material) {
    const tvGroup = new THREE.Group();
    tvGroup.name = 'Furniture_TV';

    // Frame (1.2m x 0.7m x 0.05m)
    const frame = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.7, 0.05),
        material
    );
    frame.castShadow = true;
    tvGroup.add(frame);

    // Screen (slightly smaller with emissive)
    const screen = new THREE.Mesh(
        new THREE.BoxGeometry(1.15, 0.65, 0.01),
        new THREE.MeshStandardMaterial({
            color: 0x0A0A1A,
            emissive: 0x0A0A1A,
            emissiveIntensity: 0.2,
            roughness: 0.1
        })
    );
    screen.position.z = 0.03;
    tvGroup.add(screen);

    return tvGroup;
}

/**
 * Create ladder shelf
 */
function createLadderShelf(material) {
    const shelfGroup = new THREE.Group();
    shelfGroup.name = 'Furniture_LadderShelf';

    // Side supports (leaning)
    const leftSupport = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 1.8, 0.05),
        material
    );
    leftSupport.position.set(-0.25, 0.9, 0);
    leftSupport.rotation.z = 0.1;
    leftSupport.castShadow = true;
    shelfGroup.add(leftSupport);

    const rightSupport = leftSupport.clone();
    rightSupport.position.set(0.25, 0.9, 0);
    rightSupport.rotation.z = -0.1;
    shelfGroup.add(rightSupport);

    // Shelves (4 shelves, varying widths)
    const shelfWidths = [0.6, 0.55, 0.5, 0.45];
    const shelfYPositions = [0.3, 0.7, 1.1, 1.5];

    shelfWidths.forEach((width, i) => {
        const shelf = new THREE.Mesh(
            new THREE.BoxGeometry(width, 0.02, 0.4),
            material
        );
        shelf.position.set(0, shelfYPositions[i], 0);
        shelf.castShadow = true;
        shelf.receiveShadow = true;
        shelfGroup.add(shelf);
    });

    // Decorative items on shelves
    // Plant on top shelf
    const smallPlant = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0x228B22, roughness: 0.7 })
    );
    smallPlant.position.set(0, 1.58, 0);
    smallPlant.castShadow = true;
    shelfGroup.add(smallPlant);

    // Books on middle shelves
    for (let i = 0; i < 3; i++) {
        const book = new THREE.Mesh(
            new THREE.BoxGeometry(0.04, 0.12, 0.08),
            new THREE.MeshStandardMaterial({ 
                color: Math.random() * 0xffffff,
                roughness: 0.7 
            })
        );
        book.position.set(-0.1 + i * 0.1, 0.76, 0);
        book.castShadow = true;
        shelfGroup.add(book);
    }

    return shelfGroup;
}

/**
 * Create large floor plant
 */
function createFloorPlant() {
    const plantGroup = new THREE.Group();
    plantGroup.name = 'Decor_Plant_Floor';

    // Pot (0.3m diameter x 0.4m tall)
    const pot = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.18, 0.4, 16),
        new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.3 })
    );
    pot.position.y = 0.2;
    pot.castShadow = true;
    plantGroup.add(pot);

    // Plant (multiple leaves using planes)
    const leafMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x228B22, 
        roughness: 0.7,
        side: THREE.DoubleSide 
    });

    // Main stem
    const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.03, 0.6, 8),
        new THREE.MeshStandardMaterial({ color: 0x2F4F2F, roughness: 0.6 })
    );
    stem.position.y = 0.7;
    stem.castShadow = true;
    plantGroup.add(stem);

    // Leaves (simplified as spheres)
    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const leaf = new THREE.Mesh(
            new THREE.SphereGeometry(0.12, 8, 8),
            leafMaterial
        );
        leaf.position.set(
            Math.cos(angle) * 0.15,
            0.8 + Math.random() * 0.2,
            Math.sin(angle) * 0.15
        );
        leaf.castShadow = true;
        plantGroup.add(leaf);
    }

    return plantGroup;
}
