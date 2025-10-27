import React from 'react';
import * as THREE from 'three';
import { LIVING_ROOM } from '../../../config/groundFloorCoordinates';

function Bookshelf({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { shelfMaterial, bookMaterial, structure, books } = LIVING_ROOM.bookshelf;

  return (
    <group position={position} rotation={rotation} name="Bookshelf">
      {/* Back panel */}
      <mesh 
        position={[0, structure.backPanel.positionY, structure.backPanel.positionZ]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[structure.backPanel.width, structure.backPanel.height, structure.backPanel.depth]} />
        <meshStandardMaterial 
          color={shelfMaterial.color} 
          roughness={shelfMaterial.roughness} 
          metalness={shelfMaterial.metalness} 
        />
      </mesh>

      {/* Side panels */}
      <mesh 
        position={[structure.sidePanel.leftPositionX, structure.sidePanel.positionY, structure.sidePanel.positionZ]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[structure.sidePanel.width, structure.sidePanel.height, structure.sidePanel.depth]} />
        <meshStandardMaterial 
          color={shelfMaterial.color} 
          roughness={shelfMaterial.roughness} 
          metalness={shelfMaterial.metalness} 
        />
      </mesh>
      <mesh 
        position={[structure.sidePanel.rightPositionX, structure.sidePanel.positionY, structure.sidePanel.positionZ]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[structure.sidePanel.width, structure.sidePanel.height, structure.sidePanel.depth]} />
        <meshStandardMaterial 
          color={shelfMaterial.color} 
          roughness={shelfMaterial.roughness} 
          metalness={shelfMaterial.metalness} 
        />
      </mesh>

      {/* Top */}
      <mesh 
        position={[0, structure.top.positionY, structure.top.positionZ]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[structure.top.width, structure.top.height, structure.top.depth]} />
        <meshStandardMaterial 
          color={shelfMaterial.color} 
          roughness={shelfMaterial.roughness} 
          metalness={shelfMaterial.metalness} 
        />
      </mesh>

      {/* Bottom */}
      <mesh 
        position={[0, structure.bottom.positionY, structure.bottom.positionZ]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[structure.bottom.width, structure.bottom.height, structure.bottom.depth]} />
        <meshStandardMaterial 
          color={shelfMaterial.color} 
          roughness={shelfMaterial.roughness} 
          metalness={shelfMaterial.metalness} 
        />
      </mesh>

      {/* Shelves */}
      {structure.shelf.yPositions.map((y, i) => (
        <mesh key={i} position={[0, y, structure.shelf.positionZ]} castShadow receiveShadow>
          <boxGeometry args={[structure.shelf.width, structure.shelf.height, structure.shelf.depth]} />
          <meshStandardMaterial 
            color={shelfMaterial.color} 
            roughness={shelfMaterial.roughness} 
            metalness={shelfMaterial.metalness} 
          />
        </mesh>
      ))}

      {/* Books on shelves */}
      {books.shelves.map((shelf, shelfIndex) => (
        <React.Fragment key={shelfIndex}>
          {shelf.books.map((book, bookIndex) => (
            <mesh 
              key={`${shelfIndex}-${bookIndex}`} 
              position={[book.x, shelf.y, books.positionZ]} 
              castShadow
            >
              <boxGeometry args={[books.width, books.height, book.depth]} />
              <meshStandardMaterial 
                color={bookMaterial.colors[book.colorIndex]} 
                roughness={bookMaterial.roughness} 
                metalness={bookMaterial.metalness} 
              />
            </mesh>
          ))}
        </React.Fragment>
      ))}
    </group>
  );
}

export default Bookshelf;
