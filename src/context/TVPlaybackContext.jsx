import React,{createContext,useContext,useEffect,useMemo,useRef,useState} from 'react';
import {VideoTexture,SRGBColorSpace,LinearFilter} from 'three';
import {TV_VIDEOS,chooseTVVideo} from '../config/tvVideos';
import {mediaManager} from '../utils/mediaManager';
const Context=createContext(null);
export const useTVPlayback=()=>useContext(Context);
export function TVPlaybackProvider({children}){
 const media=useMemo(()=>{
  const video=document.createElement('video');
  video.playsInline=true;video.preload='metadata';video.loop=false;video.volume=.65;
  const texture=new VideoTexture(video);texture.colorSpace=SRGBColorSpace;texture.minFilter=LinearFilter;texture.magFilter=LinearFilter;
  return {video,texture};
 },[]);
 const current=useRef(null),request=useRef(0);
 const [active,setActive]=useState(false),[message,setMessage]=useState(''),[size,setSize]=useState([16,9]);
 useEffect(()=>{
  const metadata=()=>setSize([media.video.videoWidth,media.video.videoHeight]);
  const ended=()=>{setActive(false);setMessage('Video finished. Click the remote to play another.');};
  const stopped=()=>setActive(false);
  const failed=()=>{setActive(false);setMessage('This video could not play. Try another video.');};
  media.video.addEventListener('loadedmetadata',metadata);media.video.addEventListener('ended',ended);media.video.addEventListener('error',failed);
  window.addEventListener('tv-video-ended',stopped);
  return()=>{request.current++;media.video.removeEventListener('loadedmetadata',metadata);media.video.removeEventListener('ended',ended);media.video.removeEventListener('error',failed);window.removeEventListener('tv-video-ended',stopped);if(mediaManager.currentAudio===media.video)mediaManager.stopCurrent();media.video.pause();media.video.removeAttribute('src');media.video.load();media.texture.dispose();};
 },[media]);
 const playNext=async()=>{
  const next=chooseTVVideo(TV_VIDEOS,current.current?.src);
  if(!next){setMessage('No TV videos added yet.');return;}
  const id=++request.current;
  mediaManager.stopCurrent();media.video.pause();setActive(false);
  current.current=next;media.video.src=next.src;media.video.load();setMessage('Loading video…');
  const played=await mediaManager.play(media.video,'tv-video-playing','tv-video-ended');
  if(id!==request.current)return;
  setActive(played);setMessage(played?next.title:'Playback could not start. Click the remote to retry.');
 };
 const stop=()=>{request.current++;if(mediaManager.currentAudio===media.video)mediaManager.stopCurrent();else media.video.pause();setActive(false);setMessage('TV video stopped.');};
 return <Context.Provider value={{...media,active,message,size,playNext,stop}}>{children}</Context.Provider>;
}
