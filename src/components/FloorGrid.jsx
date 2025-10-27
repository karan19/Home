import React from 'react';
import { Text } from '@react-three/drei';
import { GRID_CONFIG, GRID_TYPES } from '../utils/gridMapping';

function FloorGrid({ floor = 'ground', visible = true }) {
  if (!visible) return null;

  const gridType = floor === 'ground' ? GRID_TYPES.FLOOR_GROUND : GRID_TYPES.FLOOR_UPPER;
  const config = GRID_CONFIG[gridType];
  
  const { columns, rows, squareSize, yPosition, origin } = config;

  // Calculate grid position (X, Z) from column and row indices
  const getPosition = (colIndex, rowIndex) => {
    const x = origin.x + colIndex * squareSize + squareSize / 2;
    const z = origin.z - rowIndex * squareSize - squareSize / 2;
    return [x, z];
  };

  // For upper floor, check if square has floor (L-shaped)
  const hasFloor = (colIndex, rowIndex) => {
    // Ground floor: ALL squares have floor
    if (floor === 'ground') return true;
    
    // Upper floor L-shape logic based on actual Structure.jsx geometry:
    // Back section: 8m × 4.2m at [0, 2.85, -1.9] covers all columns, Z from -4m to +0.1m
    // Front-right section: 6.2m × 3.8m at [0.9, 2.85, 1.9] covers X from -2.2m to +4m, Z from 0m to +3.8m
    const x = origin.x + colIndex * squareSize + squareSize / 2;
    const z = origin.z - rowIndex * squareSize - squareSize / 2;
    
    // Back section: all columns, Z <= 0.1m (approximately rows 8-16)
    if (z <= 0.1) return true;
    
    // Front-right section: X >= -2.2m, Z > 0.1m (approximately rows 1-7)
    if (x >= -2.2 && z > 0.1) return true;
    
    return false;
  };

  const gridY = yPosition + 0.15; // Slightly above floor surface

  return (
    <group name={`Floor_Grid_${floor}`}>
      {/* Vertical grid lines (columns) */}
      {columns.map((col, colIndex) => {
        const x = origin.x + colIndex * squareSize;
        return (
          <mesh key={`v-${col}`} position={[x, gridY, 0]}>
            <boxGeometry args={[0.005, 0.01, 8]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.3} />
          </mesh>
        );
      })}
      
      {/* Add final vertical line at right edge */}
      <mesh key="v-final" position={[origin.x + columns.length * squareSize, gridY, 0]}>
        <boxGeometry args={[0.005, 0.01, 8]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.3} />
      </mesh>

      {/* Horizontal grid lines (rows) */}
      {rows.map((row, rowIndex) => {
        const z = origin.z - rowIndex * squareSize;
        return (
          <mesh key={`h-${row}`} position={[0, gridY, z]}>
            <boxGeometry args={[8, 0.01, 0.005]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.3} />
          </mesh>
        );
      })}
      
      {/* Add final horizontal line at back edge */}
      <mesh key="h-final" position={[0, gridY, origin.z - rows.length * squareSize]}>
        <boxGeometry args={[8, 0.01, 0.005]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.3} />
      </mesh>

      {/* Square labels - only where floor exists */}
      {columns.map((col, colIndex) =>
        rows.map((row, rowIndex) => {
          if (!hasFloor(colIndex, rowIndex)) return null;
          
          const [x, z] = getPosition(colIndex, rowIndex);
          const label = `${col}${row}`;
          
          return (
            <Text
              key={label}
              position={[x, gridY + 0.2, z]}
              fontSize={0.15}
              color="#FFFFFF"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.015}
              outlineColor="#000000"
              frustumCulled={false}
              renderOrder={999}
              depthWrite={false}
            >
              {label}
            </Text>
          );
        })
      )}
    </group>
  );
}

export default FloorGrid;
