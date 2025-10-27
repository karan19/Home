/**
 * Kitchen Bar Stool Component
 * Creates a bar stool with seat, legs, and footrest
 */

import * as THREE from 'three';

/**
 * Create bar stool
 * @returns {THREE.Group} Stool group
 */
export function createBarStool() {
    const stoolGroup = new THREE.Group();
    stoolGroup.name = 'Kitchen_Stool';

    const woodMaterial = new THREE.MeshStandardMaterial({
        color: 0xD2B48C,
        roughness: 0.4,
        metalness: 0.0
    });

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
