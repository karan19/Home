import React from 'react';
import { RoundedBox } from '@react-three/drei';
import { DECORATIONS } from '../../../config/upperFloorCoordinates';

function DrawerTable({ position = [0, 0, 0] }) {
  const { dimensions, materials: mat, cabinetBody, drawerFront, handle, tabletopTrim } = DECORATIONS.drawerTable;
  const { tableWidth, tableHeight, tableDepth } = dimensions;

  return (
    <group position={position} name="Furniture_DrawerTable">
      {/* Main cabinet body */}
      <RoundedBox
        args={[tableWidth, tableHeight, tableDepth]}
        radius={cabinetBody.radius}
        smoothness={cabinetBody.smoothness}
        position={[0, tableHeight / 2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...mat.wood} />
      </RoundedBox>

      {/* Drawer front (slightly lighter wood) */}
      <RoundedBox
        args={[tableWidth - drawerFront.widthOffset, tableHeight * drawerFront.heightFactor, drawerFront.depth]}
        radius={drawerFront.radius}
        smoothness={drawerFront.smoothness}
        position={[0, tableHeight * drawerFront.yFactor, tableDepth / 2 + drawerFront.zOffset]}
        castShadow
      >
        <meshStandardMaterial {...mat.drawerFront} />
      </RoundedBox>

      {/* Drawer handle (metal) */}
      <RoundedBox
        args={[handle.width, handle.height, handle.depth]}
        radius={handle.radius}
        smoothness={handle.smoothness}
        position={[0, tableHeight * handle.yFactor, tableDepth / 2 + handle.zOffset]}
        castShadow
      >
        <meshStandardMaterial {...mat.handle} />
      </RoundedBox>

      {/* Tabletop edge detail (darker wood trim) */}
      <RoundedBox
        args={[tableWidth + tabletopTrim.widthOffset, tabletopTrim.height, tableDepth + tabletopTrim.depthOffset]}
        radius={tabletopTrim.radius}
        smoothness={tabletopTrim.smoothness}
        position={[0, tableHeight, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial {...mat.trim} />
      </RoundedBox>
    </group>
  );
}

export default DrawerTable;
