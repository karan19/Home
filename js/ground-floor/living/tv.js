/**
 * Living Room TV Component
 * Creates wall-mounted TV with frame and screen
 */

import * as THREE from 'three';

/**
 * Create wall-mounted TV
 * @returns {THREE.Group} TV group
 */
export function createTV() {
    const tvGroup = new THREE.Group();
    tvGroup.name = 'Furniture_TV';

    const material = new THREE.MeshStandardMaterial({
        color: 0x1C1C1C,
        roughness: 0.4,
        metalness: 0.3
    });

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
