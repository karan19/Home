import React, { useEffect, useState } from 'react';
import { Html, useProgress } from '@react-three/drei';

export default function LoadingScreen() {
  // LoadingManager may fire during a suspending component's render. Sample it
  // outside React's render phase instead of synchronously updating this component.
  const [{ active, progress, errors }, setProgress] = useState(useProgress.getState);
  useEffect(() => {
    const timer = setInterval(() => setProgress(useProgress.getState()), 200);
    return () => clearInterval(timer);
  }, []);
  if (!active && !errors.length) return null;
  return <Html fullscreen style={{pointerEvents:'none'}}><div role="status" style={{position:'absolute',bottom:52,left:16,padding:'10px 14px',borderRadius:8,background:'#302b28dd',color:'#fff',font:'13px system-ui'}}>
    {errors.length ? 'An asset could not load. Reload to try again.' : `Adding furniture · ${Math.round(progress)}%`}
    {active && <progress aria-label="Loading furniture" value={progress} max={100} style={{display:'block',width:200,marginTop:8,accentColor:'#bba183'}} />}
  </div></Html>;
}
