import test from 'node:test';
import assert from 'node:assert/strict';
import fiber from '@react-three/fiber';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { TextureLoader } from 'three';
import { portraitSvgLoader } from '../src/components/interactive/portraitSvgLoader.js';

test('roof SVG loads parsed paths even when its URL is already cached as a wall texture', async () => {
  const url = '/crest-cache-regression.svg';
  const originalTextureLoad = TextureLoader.prototype.load;
  const originalSvgLoad = portraitSvgLoader.load;
  let svgLoads = 0;
  try {
    TextureLoader.prototype.load = (_url, onLoad) => onLoad({ isTexture: true });
    portraitSvgLoader.load = (_url, onLoad) => { svgLoads++; onLoad({ paths: [] }); };
    function WallTexture() { fiber.useLoader(TextureLoader, url); return null; }
    renderToString(React.createElement(React.Suspense, { fallback: null }, React.createElement(WallTexture)));
    await new Promise(resolve => setImmediate(resolve));
    fiber.useLoader.preload(portraitSvgLoader, url);
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(svgLoads, 1, 'SVG parsing must not be skipped by a cached texture');
  } finally {
    TextureLoader.prototype.load = originalTextureLoad;
    portraitSvgLoader.load = originalSvgLoad;
    fiber.useLoader.clear(TextureLoader, url);
    fiber.useLoader.clear(portraitSvgLoader, url);
  }
});
