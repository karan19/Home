/**
 * Living Room Sofa Component
 * Creates L-shaped sectional sofa with segmented cushions
 */

import * as THREE from 'three';

/**
 * Create L-shaped sectional sofa
 * @returns {THREE.Group} Sofa group
 */
export function createSofa() {
    const sofaGroup = new THREE.Group();
    sofaGroup.name = 'Furniture_Sofa';

    const fabricMaterial = new THREE.MeshStandardMaterial({
        color: 0xF5F5DC,
        roughness: 0.6,
        metalness: 0.0
    });

    const woodMaterial = new THREE.MeshStandardMaterial({
        color: 0x654321,
        roughness: 0.4,
        metalness: 0.0
    });

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
