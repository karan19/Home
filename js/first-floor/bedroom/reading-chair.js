/**
 * Bedroom Reading Chair Component
 * Creates reading chair with seat, back, legs, and pillow
 */

import * as THREE from 'three';

/**
 * Create reading chair
 * @returns {THREE.Group} Chair group
 */
export function createReadingChair() {
    const chairGroup = new THREE.Group();
    chairGroup.name = 'Furniture_Chair_Reading';

    const fabricMaterial = new THREE.MeshStandardMaterial({
        color: 0xF5F5DC,
        roughness: 0.6,
        metalness: 0.0
    });

    const woodMaterial = new THREE.MeshStandardMaterial({
        color: 0xD2B48C,
        roughness: 0.4,
        metalness: 0.0
    });

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
