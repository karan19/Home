/**
 * Kitchen Refrigerator Component
 * Creates a refrigerator with doors and handles
 */

import * as THREE from 'three';

/**
 * Create refrigerator
 * @returns {THREE.Group} Refrigerator group
 */
export function createRefrigerator() {
    const fridgeGroup = new THREE.Group();
    fridgeGroup.name = 'Kitchen_Appliance_Fridge';

    const material = new THREE.MeshStandardMaterial({
        color: 0x3C3C3C,
        roughness: 0.2,
        metalness: 0.3
    });

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
