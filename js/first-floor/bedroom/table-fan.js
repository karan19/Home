/**
 * Bedroom Table Fan Component
 * Creates an animated table fan with rotating blades
 */

import * as THREE from 'three';

/**
 * Create table fan with rotating blades
 * @returns {Object} Object containing fan group and blades reference for animation
 */
export function createTableFan() {
    const fanGroup = new THREE.Group();
    fanGroup.name = 'Furniture_TableFan';

    const plasticMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.3,
        metalness: 0.1
    });

    const metalMaterial = new THREE.MeshStandardMaterial({
        color: 0x808080,
        roughness: 0.2,
        metalness: 0.8
    });

    // Base (circular platform)
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.1, 0.02, 16),
        plasticMaterial
    );
    base.position.y = 0.01;
    base.castShadow = true;
    base.receiveShadow = true;
    fanGroup.add(base);

    // Stand/pole (vertical support)
    const stand = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 0.15, 8),
        metalMaterial
    );
    stand.position.y = 0.095;
    stand.castShadow = true;
    fanGroup.add(stand);

    // Motor housing (central hub)
    const motorHousing = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.06, 16),
        plasticMaterial
    );
    motorHousing.rotation.z = Math.PI / 2;
    motorHousing.position.set(0, 0.17, 0);
    motorHousing.castShadow = true;
    fanGroup.add(motorHousing);

    // Blades group (THIS WILL ROTATE!)
    const bladesGroup = new THREE.Group();
    bladesGroup.name = 'Fan_Blades';
    bladesGroup.position.set(0, 0.17, 0);
    
    // Create 3 blades
    const bladeMaterial = new THREE.MeshStandardMaterial({
        color: 0xE0E0E0,
        roughness: 0.4,
        metalness: 0.2,
        side: THREE.DoubleSide
    });

    for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2;
        
        // Blade shape (elongated)
        const bladeGeometry = new THREE.BoxGeometry(0.12, 0.01, 0.03);
        const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
        
        // Position blade radiating from center
        blade.position.set(
            Math.cos(angle) * 0.06,
            0,
            Math.sin(angle) * 0.06
        );
        
        // Rotate blade to align with radial direction
        blade.rotation.y = angle;
        
        // Slight pitch angle for realism
        blade.rotation.x = 0.1;
        
        blade.castShadow = true;
        bladesGroup.add(blade);
    }
    
    fanGroup.add(bladesGroup);

    // Front cage (protective grill)
    const frontCage = createCage(metalMaterial);
    frontCage.position.set(0.04, 0.17, 0);
    frontCage.rotation.y = Math.PI / 2;
    fanGroup.add(frontCage);

    // Back cage
    const backCage = createCage(metalMaterial);
    backCage.position.set(-0.04, 0.17, 0);
    backCage.rotation.y = Math.PI / 2;
    fanGroup.add(backCage);

    // Return both the fan group and the blades reference for animation
    return {
        fanGroup: fanGroup,
        bladesGroup: bladesGroup
    };
}

/**
 * Create protective cage/grill
 */
function createCage(material) {
    const cageGroup = new THREE.Group();

    // Outer ring
    const outerRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.09, 0.005, 8, 16),
        material
    );
    cageGroup.add(outerRing);

    // Inner rings (2 concentric circles)
    const innerRing1 = new THREE.Mesh(
        new THREE.TorusGeometry(0.06, 0.003, 8, 16),
        material
    );
    cageGroup.add(innerRing1);

    const innerRing2 = new THREE.Mesh(
        new THREE.TorusGeometry(0.03, 0.003, 8, 16),
        material
    );
    cageGroup.add(innerRing2);

    // Cross bars (4 spokes)
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const bar = new THREE.Mesh(
            new THREE.CylinderGeometry(0.002, 0.002, 0.18, 6),
            material
        );
        bar.rotation.z = angle;
        cageGroup.add(bar);
    }

    return cageGroup;
}
