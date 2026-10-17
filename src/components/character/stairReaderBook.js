import { CanvasTexture, SRGBColorSpace } from 'three';

// Original typography inspired by Atomic Habits, projected onto the authored cover.
export function createReadingCover() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 640;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f5efdf'; ctx.fillRect(0, 0, 512, 640);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#77664e'; ctx.font = '17px sans-serif';
  ctx.fillText('TINY CHANGES, REMARKABLE RESULTS', 256, 65);
  // A dot screen through the large title echoes the familiar cover treatment.
  const title = document.createElement('canvas'); title.width = 512; title.height = 640;
  const text = title.getContext('2d');
  text.textAlign = 'center'; text.font = 'bold 92px sans-serif';
  text.fillText('ATOMIC', 256, 260); text.fillText('HABITS', 256, 363);
  const pixels = text.getImageData(0, 0, 512, 640).data;
  ctx.fillStyle = '#9a7648';
  for (let y = 160; y < 380; y += 5) for (let x = 30; x < 485; x += 5) {
    if (pixels[(y * 512 + x) * 4 + 3] < 100) continue;
    ctx.beginPath(); ctx.arc(x, y, 1.8, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = '#302e28'; ctx.font = 'bold 39px sans-serif';
  ctx.fillText('JAMES CLEAR', 256, 548);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export function addReadingCover(material, texture) {
  const previous = material.onBeforeCompile;
  const key = material.customProgramCacheKey();
  material.onBeforeCompile = shader => {
    previous(shader);
    shader.uniforms.uReadingCover = { value: texture };
    shader.fragmentShader = 'uniform sampler2D uReadingCover;\n' + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `
      vec3 bookRelative = vResidentPosition - vec3(-0.002, 0.935, 0.245);
      vec2 bookUv = vec2(bookRelative.x / 0.255 + 0.5,
        dot(bookRelative, vec3(0.0, 0.883, 0.469)) / 0.245 + 0.5);
      float bookPlane = abs(dot(bookRelative, vec3(0.049, -0.469, 0.882)));
      float bookSurface = (1.0-smoothstep(0.010, 0.022, bookPlane))
        * step(0.0, bookUv.x) * step(bookUv.x, 1.0)
        * step(0.0, bookUv.y) * step(bookUv.y, 1.0);
      // Keep skin in front of the cover untouched.
      float bookSkin = smoothstep(0.05, 0.12, readerBase.r-readerBase.g);
      diffuseColor.rgb = mix(diffuseColor.rgb, texture2D(uReadingCover, bookUv).rgb,
        bookSurface * (1.0-bookSkin));
      #include <color_fragment>
    `);
  };
  material.customProgramCacheKey = () => key + '-atomic-habits-1';
}
