import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';

// Fiber's shallow cache comparison can equate loader constructors that inherit
// the same enumerable static fields. An instance has reference identity, keeping
// parsed paths separate from TextureLoader results for the same SVG URL.
export const portraitSvgLoader = new SVGLoader();
