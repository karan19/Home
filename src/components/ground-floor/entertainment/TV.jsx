import { useTVPlayback } from '../../../context/TVPlaybackContext';
import { fitTVVideo } from '../../../config/tvVideos';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useResident } from '../../../context/ResidentContext';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { ENTERTAINMENT } from '../../../config/groundFloorCoordinates';
import { useInteractiveAudio } from '../../../hooks/useInteractiveAudio';

function TV({ position }) {
  const resident=useResident();
  const playback=useTVPlayback();
  const display=useRef();
  const elapsed=useRef(0);
  const picture=useMemo(()=>{
    const canvas=document.createElement('canvas');canvas.width=384;canvas.height=216;
    const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
    return {canvas,texture,context:canvas.getContext('2d')};
  },[]);
  useEffect(()=>()=>picture.texture.dispose(),[picture]);
  useFrame((_,dt)=>{
    const active=Boolean(resident?.current.tv)&&!playback.active;
    if(display.current)display.current.visible=active;
    if(!active || resident.current.paused)return;
    elapsed.current+=Math.min(dt,.05);
    const {context:c,texture}=picture;const t=elapsed.current;
    c.fillStyle='#9ebbd0';c.fillRect(0,0,384,216);
    c.fillStyle='#f9de98';c.beginPath();c.arc(290,48,22,0,Math.PI*2);c.fill();
    for(let layer=0;layer<3;layer++){
      c.fillStyle=['#8b9d9d','#637f79','#365b52'][layer];c.beginPath();c.moveTo(0,216);
      for(let x=0;x<=384;x+=4)c.lineTo(x,110+layer*29+Math.sin(x*.013+layer*2+t*.04)*22+Math.sin(x*.03+layer)*8);
      c.lineTo(384,216);c.fill();
    }
    c.fillStyle='#ffffffb0';for(let i=0;i<3;i++){let x=(i*147+t*3)%450-45;c.beginPath();c.ellipse(x,34+i*13,28,6,0,0,Math.PI*2);c.fill();}
    texture.needsUpdate=true;
  });
  const { config, toggle } = useInteractiveAudio('messi');
  const { frame, screen } = ENTERTAINMENT.tv;
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleTVPlaying = (event) => {
      setIsPlaying(Boolean(event.detail));
    };

    window.addEventListener(config.audio.playEvent, handleTVPlaying);
    return () => window.removeEventListener(config.audio.playEvent, handleTVPlaying);
  }, [config.audio.playEvent]);

  const handleClick = async (e) => {
    e.stopPropagation();
    if(playback.active){playback.stop();return;}
    await toggle();
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'default';
  };

  return (
    <group 
      position={position}
      rotation={ENTERTAINMENT.tv.rotation}
      name="Furniture_TV"
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* TV Frame with rounded edges */}
      <RoundedBox
        args={[frame.width, frame.height, frame.depth]}
        radius={frame.radius}
        smoothness={frame.smoothness}
        castShadow
      >
        <meshStandardMaterial
          color={frame.color}
          roughness={frame.roughness}
          metalness={frame.metalness}
        />
      </RoundedBox>

      <mesh ref={display} position={[0,0,screen.positionZ+.006]} visible={false}>
        <planeGeometry args={[screen.width-.025,screen.height-.025]} />
        <meshBasicMaterial map={picture.texture} toneMapped={false} />
      </mesh>
      {playback.active&&<group position={[0,0,screen.positionZ+.008]} name="TV_Video_Display" userData={{skipExport:true}}>
        <mesh><planeGeometry args={[screen.width-.025,screen.height-.025]}/><meshBasicMaterial color="black" toneMapped={false}/></mesh>
        <mesh position={[0,0,.001]}>
          <planeGeometry args={fitTVVideo(screen.width-.025,screen.height-.025,...playback.size)}/>
          <meshBasicMaterial map={playback.texture} toneMapped={false}/>
        </mesh>
      </group>}
      {/* Screen (slightly inset with emissive glow) */}
      <RoundedBox
        args={[screen.width, screen.height, screen.depth]}
        radius={screen.radius}
        smoothness={screen.smoothness}
        position={[0, 0, screen.positionZ]}
      >
        <meshStandardMaterial
          color={isPlaying ? screen.colorOn : screen.colorOff}
          emissive={isPlaying ? screen.emissiveOn : screen.emissiveOff}
          emissiveIntensity={isPlaying ? screen.emissiveIntensityOn : screen.emissiveIntensityOff}
          roughness={screen.roughness}
        />
      </RoundedBox>
    </group>
  );
}

export default TV;
