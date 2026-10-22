import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import { CanvasTexture, LinearFilter, SRGBColorSpace } from 'three';
import { ROOF_QUOTES } from '../config/roofQuotes';
import { restoreQuoteCycle, saveQuoteCycle } from './roofQuoteStorage';
import { advanceQuoteCycle, nextQuote } from './roofQuoteCycle';

function drawQuoteCanvas({ text, author, label, font }, canvas) {
  const caption = label || author;
  canvas.width = 1536;
  canvas.height = 1232;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#172019';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  let fontSize = 152;
  let lines;
  // Fit future longer copy without overflowing the roof.
  do {
    ctx.font = `italic 400 ${fontSize}px "${font}", "Times New Roman", serif`;
    lines = [];
    let line = '';
    for (const word of text.split(/\s+/)) {
      const next = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(next).width > 1340) { lines.push(line); line = word; }
      else line = next;
    }
    if (line) lines.push(line);
    if (lines.length * fontSize * 1.12 <= 920) break;
    fontSize -= 4;
  } while (fontSize > 32);
  const lineHeight = fontSize * 1.12;
  const start = (caption ? 540 : canvas.height / 2) - (lines.length - 1) * lineHeight / 2;
  lines.forEach((line, i) => ctx.fillText(line, 768, start + i * lineHeight));
  if (caption) {
    ctx.font = '600 44px Arial, sans-serif';
    ctx.fillStyle = '#414b3e';
    ctx.fillText(label || `— ${author}`, 768, start + lines.length * lineHeight + 45);
  }
  return canvas;
}

function RoofRefresh({ disabled, onRefresh }) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered && !disabled);
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f4f2e9';
    ctx.beginPath(); ctx.arc(128, 128, 122, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#79846f'; ctx.lineWidth = 5; ctx.stroke();
    ctx.strokeStyle = '#343c31'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.arc(128, 128, 55, .35, Math.PI * 1.87); ctx.stroke();
    const angle = Math.PI * 1.87;
    const x = 128 + Math.cos(angle) * 55, y = 128 + Math.sin(angle) * 55;
    ctx.beginPath(); ctx.moveTo(x - 27, y - 5); ctx.lineTo(x, y); ctx.lineTo(x + 2, y - 28); ctx.stroke();
    return new CanvasTexture(canvas);
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return <mesh name="Roof_Quote_Refresh" position={[3.6, 6.46, 3.6]} rotation-x={-Math.PI / 2}
    scale={hovered && !disabled ? 1.08 : 1}
    onPointerOver={event => { event.stopPropagation(); setHovered(true); }}
    onPointerOut={() => setHovered(false)}
    onPointerDown={event => {
      event.stopPropagation();
      if (event.button !== 0 || disabled) return;
      onRefresh();
    }}
    onClick={event => event.stopPropagation()}>

    <circleGeometry args={[.24, 48]} />
    <meshBasicMaterial map={texture} transparent alphaTest={.05} toneMapped={false}
      color={disabled ? '#b0b0a8' : '#ffffff'} />
    {/* Preserve a comfortable hit area around the smaller visible icon. */}
    <mesh position-z={-.001}>
      <circleGeometry args={[.36, 32]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
    </mesh>
  </mesh>;
}

export default function RoofQuotes({ portraitActive }) {
  const material = useRef();
  const mesh = useRef();
  const cycle = useRef(null);
  if (cycle.current === null) cycle.current = restoreQuoteCycle(ROOF_QUOTES);
  const savedIndex = useRef(null);
  const source = useMemo(() => ({ canvas: document.createElement('canvas'), index: -1 }), []);
  const motion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)'), []);
  const display = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1536;
    canvas.height = 1232;
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    texture.minFilter = LinearFilter;
    texture.generateMipmaps = false;
    return { canvas, texture, progress: -1, reduced: false };
  }, []);
  useEffect(() => () => display.texture.dispose(), [display]);
  useFrame((_, delta) => {
    advanceQuoteCycle(cycle.current, delta, portraitActive, ROOF_QUOTES.length);
    const state = cycle.current;
    mesh.current.visible = !portraitActive && state.progress > 0;
    if (mesh.current.visible && savedIndex.current !== state.index) {
      saveQuoteCycle(state, ROOF_QUOTES);
      savedIndex.current = state.index;
    }
    if (source.quote !== ROOF_QUOTES[state.index]) {
      drawQuoteCanvas(ROOF_QUOTES[state.index], source.canvas);
      source.quote = ROOF_QUOTES[state.index];
      display.progress = -1;
    }
    // Upload only while forming/dissolving or when the quote/font changes.
    const progress = Math.round(state.progress * 60) / 60;
    if (display.progress !== progress || display.reduced !== motion.matches) {
      const ctx = display.canvas.getContext('2d');
      const { width, height } = display.canvas;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = motion.matches ? progress : 1;
      ctx.drawImage(source.canvas, 0, 0);
      ctx.globalAlpha = 1;
      if (!motion.matches && progress < 1) {
        const edge = progress * 1.12;
        const mask = ctx.createLinearGradient(0, 0, 0, height);
        mask.addColorStop(Math.max(0, edge - .12), '#000');
        mask.addColorStop(Math.min(1, edge), 'transparent');
        ctx.globalCompositeOperation = 'destination-in';
        ctx.fillStyle = mask;
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';
      }
      display.texture.needsUpdate = true;
      display.progress = progress;
      display.reduced = motion.matches;
    }
  });
  return <group userData={{ skipExport: true }}>
    <mesh ref={mesh} visible={false} position={[0, 6.45, 0]} rotation-x={-Math.PI / 2}
    name="Forming_Roof_Quote" raycast={() => null} userData={{ skipExport: true }}>
    <planeGeometry args={[7.6, 6.1]} />
    <meshBasicMaterial ref={material} map={display.texture} transparent
      depthWrite={false} toneMapped={false} polygonOffset polygonOffsetFactor={-1} />
    </mesh>
    <RoofRefresh disabled={portraitActive} onRefresh={() => {
      if (portraitActive) return;
      cycle.current.blocked = false;
      if (nextQuote(cycle.current, ROOF_QUOTES.length)) {
        mesh.current.visible = false;
      }
    }} />
  </group>;
}
