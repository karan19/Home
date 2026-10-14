import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

export default function LoadingScreen({ sceneReady }) {
  const [snapshot, setSnapshot] = useState(useProgress.getState);
  const [percent, setPercent] = useState(0);
  const [finished, setFinished] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Sample outside render: Three's manager can update during a suspended render.
    const timer = setInterval(() => setSnapshot(useProgress.getState()), 100);
    const onError = () => setFailed(true);
    window.addEventListener('house-asset-error', onError);
    return () => { clearInterval(timer); window.removeEventListener('house-asset-error', onError); };
  }, []);

  const hasError = failed || snapshot.errors.length > 0;
  useEffect(() => {
    if (dismissed || finished) return;
    setPercent(previous => Math.max(previous, Math.min(99, Math.floor(snapshot.progress))));
    if (!sceneReady || snapshot.active || hasError) return;
    // Wait for late texture/font requests and the committed scene before revealing it.
    const timer = setTimeout(() => { setPercent(100); setFinished(true); }, 600);
    return () => clearTimeout(timer);
  }, [sceneReady, snapshot.active, snapshot.progress, hasError, finished, dismissed]);

  useEffect(() => {
    if (!finished) return;
    const timer = setTimeout(() => setDismissed(true), 450);
    return () => clearTimeout(timer);
  }, [finished]);

  if (dismissed) return null;
  return <div className={`house-loading${finished ? ' house-loading--done' : ''}`}>
    <section className="house-loading__card" aria-label="Loading the house">
      <div className="house-loading__icon" aria-hidden="true">⌂</div>
      <h1>Make yourself at home.</h1>
      <p role="status" aria-live="polite">{hasError ? 'Something couldn’t load. Please try again.' : finished ? 'Welcome in.' : 'Getting everything ready for you…'}</p>
      <div className="house-loading__track" role="progressbar" aria-label="House loading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
        <div className="house-loading__fill" style={{width:`${percent}%`}} />
      </div>
      <span className="house-loading__percent" aria-hidden="true">{percent}%</span>
      {hasError && <button onClick={() => window.location.reload()}>Try again</button>}
    </section>
  </div>;
}
