import React from 'react';
import { Text } from '@react-three/drei';
import { GRID_CONFIG, GRID_TYPES } from '../utils/gridMapping';

function WallGrid({ wall = 'back', visible = true }) {
  if (!visible) return null;

  const gridType = wall === 'back' ? GRID_TYPES.WALL_BACK : GRID_TYPES.WALL_RIGHT;
  const config = GRID_CONFIG[gridType];
  
  const { columns, rows, squareSize, origin } = config;
  const horizontalSize = squareSize.horizontal;
  const verticalSize = squareSize.vertical;

  const isBackWall = wall === 'back';

  // Debug logging for right wall
  if (!isBackWall && visible) {
    console.log('Right wall grid rendering - No rotation approach');
  }

  if (isBackWall) {
    // BACK WALL - Original working implementation
    const wallPosition = [0, 3, config.zPosition + 0.1];
    const wallRotation = [0, 0, 0];

    const getPosition = (colIndex, rowIndex) => {
      const x = origin.x + colIndex * horizontalSize + horizontalSize / 2;
      const y = -3 + rowIndex * verticalSize + verticalSize / 2;
      return [x, y];
    };

    return (
      <group position={wallPosition} rotation={wallRotation} name="Wall_Grid_back">
        {/* Vertical grid lines */}
        {columns.map((col, colIndex) => {
          const x = origin.x + colIndex * horizontalSize;
          return (
            <mesh key={`v-${col}`} position={[x, 0, 0.05]}>
              <boxGeometry args={[0.008, 6, 0.01]} />
              <meshBasicMaterial color="#ADD8E6" transparent opacity={0.7} />
            </mesh>
          );
        })}
        <mesh key="v-final" position={[origin.x + columns.length * horizontalSize, 0, 0.05]}>
          <boxGeometry args={[0.008, 6, 0.01]} />
          <meshBasicMaterial color="#ADD8E6" transparent opacity={0.7} />
        </mesh>

        {/* Horizontal grid lines */}
        {rows.map((row, rowIndex) => {
          const y = -3 + rowIndex * verticalSize;
          return (
            <mesh key={`h-${row}`} position={[0, y, 0.05]}>
              <boxGeometry args={[8, 0.008, 0.01]} />
              <meshBasicMaterial color="#ADD8E6" transparent opacity={0.7} />
            </mesh>
          );
        })}
        <mesh key="h-final" position={[0, -3 + rows.length * verticalSize, 0.05]}>
          <boxGeometry args={[8, 0.008, 0.01]} />
          <meshBasicMaterial color="#ADD8E6" transparent opacity={0.7} />
        </mesh>

        {/* Labels */}
        {columns.map((col, colIndex) =>
          rows.map((row, rowIndex) => {
            const [x, y] = getPosition(colIndex, rowIndex);
            return (
              <Text
                key={`${col}${row}`}
                position={[x, y, 0.06]}
                fontSize={0.08}
                color="#FF0000"
                anchorX="center"
                anchorY="middle"
                frustumCulled={false}
              >
                {`${col}${row}`}
              </Text>
            );
          })
        )}
      </group>
    );
  } else {
    // RIGHT WALL - New approach without rotation
    const wallX = config.xPosition - 0.3; // 30cm inside from wall

    return (
      <group name="Wall_Grid_right">
        {/* Vertical grid lines (run along Z-axis, front to back) */}
        {columns.map((col, colIndex) => {
          const z = origin.z + colIndex * horizontalSize; // Using origin.z which is -4 for walls
          return (
            <mesh key={`v-${col}`} position={[wallX, 3, z]}>
              <boxGeometry args={[0.01, 6, 0.008]} />
              <meshBasicMaterial color="#FFFF00" transparent opacity={0.9} />
            </mesh>
          );
        })}
        <mesh key="v-final" position={[wallX, 3, origin.z + columns.length * horizontalSize]}>
          <boxGeometry args={[0.01, 6, 0.008]} />
          <meshBasicMaterial color="#FFFF00" transparent opacity={0.9} />
        </mesh>

        {/* Horizontal grid lines (run along Z-axis, front to back) */}
        {rows.map((row, rowIndex) => {
          const y = rowIndex * verticalSize + verticalSize / 2;
          return (
            <mesh key={`h-${row}`} position={[wallX, y, 0]}>
              <boxGeometry args={[0.01, 0.008, 8]} />
              <meshBasicMaterial color="#FFFF00" transparent opacity={0.9} />
            </mesh>
          );
        })}
        <mesh key="h-final" position={[wallX, rows.length * verticalSize, 0]}>
          <boxGeometry args={[0.01, 0.008, 8]} />
          <meshBasicMaterial color="#FFFF00" transparent opacity={0.9} />
        </mesh>

        {/* Labels */}
        {columns.map((col, colIndex) =>
          rows.map((row, rowIndex) => {
            const z = origin.z + colIndex * horizontalSize + horizontalSize / 2;
            const y = rowIndex * verticalSize + verticalSize / 2;
            return (
              <Text
                key={`${col}${row}`}
                position={[wallX - 0.05, y, z]}
                rotation={[0, -Math.PI / 2, 0]}
                fontSize={0.12}
                color="#FFFF00"
                anchorX="center"
                anchorY="middle"
                frustumCulled={false}
              >
                {`${col}${row}`}
              </Text>
            );
          })
        )}
      </group>
    );
  }
}

export default WallGrid;
