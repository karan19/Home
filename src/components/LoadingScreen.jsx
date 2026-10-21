import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

export default function LoadingScreen({ sceneReady }) {
  const preview = import.meta.env.DEV && new URLSearchParams(window.location.search).has('loading-preview');
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
    if (preview || dismissed || finished) return;
    setPercent(previous => Math.max(previous, Math.min(99, Math.floor(snapshot.progress))));
    if (!sceneReady || snapshot.active || hasError) return;
    // Wait for late texture/font requests and the committed scene before revealing it.
    const timer = setTimeout(() => { setPercent(100); setFinished(true); }, 600);
    return () => clearTimeout(timer);
  }, [sceneReady, snapshot.active, snapshot.progress, hasError, finished, dismissed, preview]);

  useEffect(() => {
    if (!finished) return;
    const timer = setTimeout(() => setDismissed(true), 450);
    return () => clearTimeout(timer);
  }, [finished]);

  useEffect(() => {
    if (!preview) return;
    const started = performance.now();
    const timer = setInterval(() => setPercent(Math.floor(((performance.now() - started) % 12000) / 120)), 100);
    return () => clearInterval(timer);
  }, [preview]);

  if (dismissed) return null;
  return <div className={`house-loading${finished ? ' house-loading--done' : ''}`}>
    <section className="house-loading__card" aria-label="Loading the house">
      <div className="house-loading__eyebrow">A LITTLE WORLD, COMING TO LIFE</div>
      <svg className="house-loading__drawing" viewBox="0 0 400 290" aria-hidden="true" fill="none">
        <ellipse cx="204" cy="251" rx="135" ry="12" fill="#344333" opacity=".06" />
        <g stroke="#50614e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path className="house-loading__draw" pathLength="1" d="M50 217 199 263 351 214M70 210 207 250 331 207" />
          <path className="house-loading__draw house-loading__draw--walls" pathLength="1" d="M83 211V91L207 127V249M207 249 320 205V86M83 155 207 193 320 149" />
          <path className="house-loading__draw house-loading__draw--roof" pathLength="1" d="M66 86 184 43 337 81 207 132 66 92V86L207 126 337 75 184 37 66 80" />
          <g className="house-loading__details">
            <path d="M105 218v-48l29 9v48M111 195v9M224 238v-32l23-9v32M266 221v-32l33-13v32" />
            <path d="m95 139 41 12v-37l-41-12zM115 108v37M95 121l41 12M226 139v33l31-12v-33zM272 122v32l31-12v-32z" />
            <path d="m156 225 0-7 9 3 0-8 9 3 0-8 9 3 0-8 9 3" />
          </g>
        </g>
        <g fill="#e9b76e" className="house-loading__windows">
          <path d="m96 103 39 12v35l-39-12z" style={{opacity: percent >= 20 ? .8 : .08}} />
          <path d="m227 140 29-11v30l-29 12z" style={{opacity: percent >= 45 ? .85 : .08}} />
          <path d="m273 123 29-11v29l-29 12z" style={{opacity: percent >= 70 ? .9 : .08}} />
          <path d="m267 190 31-12v29l-31 12z" style={{opacity: percent >= 90 ? .85 : .08}} />
        </g>
        <g className="house-loading__resident" style={{opacity: percent >= 55 ? 1 : 0}} fill="#50614e">
          <circle cx="54" cy="192" r="5" />
          <path d="M48 202q6-5 12 0l2 15h-5l2 20h-4l-2-16-2 16h-4l2-20h-4z" />
        </g>
        <g className="house-loading__details" stroke="#71846a" strokeLinecap="round">
          <path d="M342 226v-25m0 12q-16-3-12-14 13 0 12 14m0-5q14-5 12-16-14 1-12 16" />
          <path d="m334 221 2 13h12l3-13z" fill="#b3bba7" />
        </g>
        <g className="house-loading__spark" stroke="#ac814c" strokeLinecap="round">
          <path d="M279 34v10m-5-5h10M101 57v6m-3-3h6" />
        </g>
      </svg>
      <h1>Making room<br /><em>for possibility.</em></h1>
      <p role="status" aria-live="polite">{hasError ? 'Something couldn’t load. Please try again.' : finished ? 'Welcome in.' : 'A few little details, then you’re home.'}</p>
      <div className="house-loading__track" role="progressbar" aria-label="House loading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
        <div className="house-loading__fill" style={{width:`${percent}%`}} />
      </div>
      <span className="house-loading__percent" aria-hidden="true">{percent}%</span>
      {preview && <button onClick={() => {
        const url = new URL(window.location.href);
        url.searchParams.delete('loading-preview');
        window.location.href = url.href;
      }}>Enter the house · preview</button>}
      {hasError && <button onClick={() => window.location.reload()}>Try again</button>}
    </section>
  </div>;
}
