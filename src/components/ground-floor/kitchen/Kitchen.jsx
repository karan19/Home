import React from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function Kitchen({ position = [0, 0, 0] }) {
  return (
    <group position={position} name="Kitchen_Counter">
      {/* BASE CABINETS */}
      <group name="Base_Cabinets">
        {/* Main cabinet body */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.9, 0.6]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0} />
        </mesh>

        {/* Cabinet doors (3 sections) */}
        <mesh position={[-0.8, 0.45, 0.31]} castShadow>
          <boxGeometry args={[0.75, 0.7, 0.02]} />
          <meshStandardMaterial color="#F8F8F8" roughness={0.3} metalness={0} />
        </mesh>
        <mesh position={[0, 0.45, 0.31]} castShadow>
          <boxGeometry args={[0.75, 0.7, 0.02]} />
          <meshStandardMaterial color="#F8F8F8" roughness={0.3} metalness={0} />
        </mesh>
        <mesh position={[0.8, 0.45, 0.31]} castShadow>
          <boxGeometry args={[0.75, 0.7, 0.02]} />
          <meshStandardMaterial color="#F8F8F8" roughness={0.3} metalness={0} />
        </mesh>

        {/* Cabinet handles (6 handles) */}
        {[-0.8, 0, 0.8].map((x, i) => (
          <React.Fragment key={i}>
            <mesh position={[x, 0.6, 0.33]} castShadow>
              <cylinderGeometry args={[0.01, 0.01, 0.12, 8]} />
              <meshStandardMaterial color="#808080" roughness={0.3} metalness={0.6} />
            </mesh>
            <mesh position={[x, 0.3, 0.33]} castShadow>
              <cylinderGeometry args={[0.01, 0.01, 0.12, 8]} />
              <meshStandardMaterial color="#808080" roughness={0.3} metalness={0.6} />
            </mesh>
          </React.Fragment>
        ))}
      </group>

      {/* COUNTERTOP */}
      <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.6, 0.05, 0.65]} />
        <meshStandardMaterial color="#E0E0E0" roughness={0.2} metalness={0} />
      </mesh>

      {/* STOVE/COOKTOP - Clickable */}
      <group 
        name="Stove" 
        position={[-0.8, 0.975, 0]}
        onClick={(e) => {
          e.stopPropagation();
          window.open('https://www.gordonramsayrestaurants.com/', '_blank');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'default';
        }}
      >
        {/* Cooktop surface */}
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.02, 0.6]} />
          <meshStandardMaterial color="#1C1C1C" roughness={0.3} metalness={0.5} />
        </mesh>

        {/* 4 Burners */}
        {[
          [-0.15, -0.15],
          [0.15, -0.15],
          [-0.15, 0.15],
          [0.15, 0.15]
        ].map(([x, z], i) => (
          <group key={i} position={[x, 0.02, z]}>
            {/* Burner grate */}
            <mesh castShadow>
              <cylinderGeometry args={[0.08, 0.08, 0.01, 8]} />
              <meshStandardMaterial color="#2C2C2C" roughness={0.4} metalness={0.3} />
            </mesh>
            {/* Burner center */}
            <mesh position={[0, 0.01, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.005, 8]} />
              <meshStandardMaterial color="#1C1C1C" roughness={0.5} metalness={0.2} />
            </mesh>
          </group>
        ))}

        {/* Control knobs */}
        {[-0.2, -0.07, 0.07, 0.2].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.35]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.03, 8]} />
            <meshStandardMaterial color="#3C3C3C" roughness={0.4} metalness={0.3} />
          </mesh>
        ))}
      </group>

      {/* SINK */}
      <group name="Sink" position={[0.3, 0.975, 0]}>
        {/* Sink basin */}
        <mesh position={[0, -0.075, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.15, 0.4]} />
          <meshStandardMaterial 
            color="#C0C0C0" 
            roughness={0.3} 
            metalness={0.7}
            polygonOffset={true}
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>
        
        {/* Sink interior (darker) */}
        <mesh position={[0, -0.07, 0]}>
          <boxGeometry args={[0.52, 0.14, 0.37]} />
          <meshStandardMaterial 
            color="#A0A0A0" 
            roughness={0.4} 
            metalness={0.6}
            polygonOffset={true}
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
          />
        </mesh>

        {/* Drain */}
        <mesh position={[0, -0.14, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.01, 16]} />
          <meshStandardMaterial color="#808080" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>

      {/* FAUCET */}
      <group name="Faucet" position={[0.3, 0.975, -0.25]}>
        {/* Faucet base */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.05, 0.04, 16]} />
          <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Faucet neck (curved) */}
        <mesh position={[0, 0.15, 0]} rotation={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.25, 12]} />
          <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Faucet spout */}
        <mesh position={[0, 0.25, 0.1]} rotation={[Math.PI / 4, 0, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.02, 0.15, 12]} />
          <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Faucet handle */}
        <mesh position={[0.08, 0.2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.08, 12]} />
          <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>

      {/* TOASTER */}
      <group name="Toaster" position={[1, 0.975, 0]}>
        {/* Toaster body */}
        <RoundedBox args={[0.25, 0.18, 0.15]} radius={0.02} smoothness={4} castShadow>
          <meshStandardMaterial color="#C0C0C0" roughness={0.3} metalness={0.7} />
        </RoundedBox>

        {/* Toaster slots (2 slots) */}
        <mesh position={[-0.05, 0.08, 0]} castShadow>
          <boxGeometry args={[0.04, 0.02, 0.12]} />
          <meshStandardMaterial color="#1C1C1C" roughness={0.8} metalness={0} />
        </mesh>
        <mesh position={[0.05, 0.08, 0]} castShadow>
          <boxGeometry args={[0.04, 0.02, 0.12]} />
          <meshStandardMaterial color="#1C1C1C" roughness={0.8} metalness={0} />
        </mesh>

        {/* Control dial */}
        <mesh position={[0.13, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.01, 16]} />
          <meshStandardMaterial color="#3C3C3C" roughness={0.4} metalness={0.3} />
        </mesh>

        {/* Crumb tray (bottom accent) */}
        <mesh position={[0, -0.09, 0]}>
          <boxGeometry args={[0.24, 0.01, 0.14]} />
          <meshStandardMaterial color="#3C3C3C" roughness={0.4} metalness={0.3} />
        </mesh>
      </group>

      {/* BACKSPLASH */}
      <mesh position={[0, 1.475, -0.295]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.5, 0.02]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.4} metalness={0} />
      </mesh>

      {/* UPPER CABINETS */}
      <group name="Upper_Cabinets" position={[0, 1.85, -0.125]}>
        {/* Main cabinet body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.7, 0.35]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0} />
        </mesh>

        {/* Cabinet doors (3 sections) */}
        <mesh position={[-0.8, 0, 0.185]} castShadow>
          <boxGeometry args={[0.75, 0.6, 0.02]} />
          <meshStandardMaterial color="#F8F8F8" roughness={0.3} metalness={0} />
        </mesh>
        <mesh position={[0, 0, 0.185]} castShadow>
          <boxGeometry args={[0.75, 0.6, 0.02]} />
          <meshStandardMaterial color="#F8F8F8" roughness={0.3} metalness={0} />
        </mesh>
        <mesh position={[0.8, 0, 0.185]} castShadow>
          <boxGeometry args={[0.75, 0.6, 0.02]} />
          <meshStandardMaterial color="#F8F8F8" roughness={0.3} metalness={0} />
        </mesh>

        {/* Cabinet handles (3 handles) */}
        {[-0.8, 0, 0.8].map((x, i) => (
          <mesh key={i} position={[x, -0.2, 0.2]} castShadow>
            <cylinderGeometry args={[0.01, 0.01, 0.12, 8]} />
            <meshStandardMaterial color="#808080" roughness={0.3} metalness={0.6} />
          </mesh>
        ))}
      </group>

      {/* RANGE HOOD */}
      <group name="Range_Hood" position={[-0.8, 1.85, -0.125]}>
        {/* Hood body (trapezoidal shape approximation) */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[0.7, 0.3, 0.5]} />
          <meshStandardMaterial color="#C0C0C0" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Hood vent (bottom) */}
        <mesh position={[0, 0, 0.1]} castShadow>
          <boxGeometry args={[0.65, 0.25, 0.02]} />
          <meshStandardMaterial color="#3C3C3C" roughness={0.5} metalness={0.4} />
        </mesh>

        {/* Hood light */}
        <mesh position={[0, 0.02, 0.15]}>
          <boxGeometry args={[0.3, 0.01, 0.1]} />
          <meshStandardMaterial 
            color="#FFFFCC" 
            emissive="#FFFFCC"
            emissiveIntensity={0.3}
            roughness={0.1} 
            metalness={0} 
          />
        </mesh>
      </group>
    </group>
  );
}

export default Kitchen;
