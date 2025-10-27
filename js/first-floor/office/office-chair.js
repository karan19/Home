/**
 * Office Chair Component
 * Creates office chair with seat, backrest, base, post, and armrests
 */

import * as THREE from 'three';

/**
 * Create office chair
 * @returns {THREE.Group} Chair group
 */
export function createOfficeChair() {
    const chairGroup = new THREE.Group();
    chairGroup.name = 'Furniture_Chair_Office';

    const fabricMaterial = new THREE.MeshStandardMaterial({
        color: 0x808080,
        roughness: 0.6,
        metalness: 0.0
    });

    const plasticMaterial = new THREE.MeshStandardMaterial({
        color: 0x1C1C1C,
        roughness: 0.4,
        metalness: 0.3
    });

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
