/**
 * Office Monitor Component
 * Creates monitor/display with screen and stand
 */

import * as THREE from 'three';

/**
 * Create monitor/display
 * @returns {THREE.Group} Monitor group
 */
export function createMonitor() {
    const monitorGroup = new THREE.Group();
    monitorGroup.name = 'Furniture_Monitor';

    const material = new THREE.MeshStandardMaterial({
        color: 0x1C1C1C,
        roughness: 0.4,
        metalness: 0.3
    });

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
