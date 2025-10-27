/**
 * Kitchen Base Cabinets Component
 * Creates base cabinets with countertop, doors, and handles
 */

import * as THREE from 'three';

/**
 * Create base cabinets with countertop
 * @returns {THREE.Group} Cabinet group
 */
export function createBaseCabinets() {
    const cabinetsGroup = new THREE.Group();
    cabinetsGroup.name = 'Kitchen_Cabinets_Base';

    const cabinetMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.3,
        metalness: 0.0
    });

    const countertopMaterial = new THREE.MeshStandardMaterial({
        color: 0xE0E0E0,
        roughness: 0.2,
        metalness: 0.0
    });

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
