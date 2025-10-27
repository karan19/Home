import React from 'react';

function CoordinateExplorer({ previewPosition, placedMarkers }) {
  const markerColors = ['#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#FF00FF', '#00FFFF'];

  return (
    <group name="CoordinateExplorer">
      {/* Live preview marker (semi-transparent) */}
      {previewPosition && (
        <mesh position={[previewPosition.x, previewPosition.y, previewPosition.z]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            transparent
            opacity={0.5}
            emissive="#FFFFFF"
            emissiveIntensity={0.5}
          />
        </mesh>
      )}

      {/* Placed markers (solid) */}
      {placedMarkers.map((marker, index) => (
        <group key={marker.id} position={[marker.x, marker.y, marker.z]}>
          {/* Marker sphere */}
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
              color={markerColors[index % markerColors.length]}
              emissive={markerColors[index % markerColors.length]}
              emissiveIntensity={0.3}
            />
          </mesh>
          
          {/* Vertical line to floor for reference */}
          <mesh position={[0, -marker.y / 2, 0]}>
            <cylinderGeometry args={[0.01, 0.01, marker.y, 8]} />
            <meshStandardMaterial
              color={markerColors[index % markerColors.length]}
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default CoordinateExplorer;
