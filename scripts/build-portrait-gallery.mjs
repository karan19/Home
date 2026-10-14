// Trace existing illustrated artwork into a consistent, genuinely vector SVG set.
import fs from 'node:fs';
import sharp from 'sharp';
import potrace from 'potrace';
const sources = {
  kalam: ['kalam/source.svg', 'A. P. J. ABDUL KALAM'],
  einstein: ['einstein/source.svg', 'ALBERT EINSTEIN'],
  messi: ['messi/messi.svg', 'LIONEL MESSI'],
  ali: ['ali/MAli.svg', 'MUHAMMAD ALI'],
  jobs: ['jobs/SteveJobs.svg', 'STEVE JOBS'],
  musk: ['musk/ElonMusk-illustrated.png', 'ELON MUSK'],
  bezos: ['bezos/JeffBezos.svg', 'JEFF BEZOS'],
};
for (const [id, [source, label]] of Object.entries(sources)) {
  // Discard pale background/checker pixels before tracing; keep the existing illustration.
  const mask = await sharp(`public/celebrities/${source}`, {density:144})
    .flatten({background:'#ffffff'}).resize(900,900,{fit:'inside'}).grayscale().threshold(170).png().toBuffer();
  const fitted = await sharp(mask).trim({background:'#ffffff',threshold:10})
    .resize(688,800,{fit:'contain',background:'#ffffff'}).png().toBuffer();
  const traced = await new Promise((resolve,reject) => potrace.trace(fitted,
    {threshold:170,color:'#252923',background:'transparent',turdSize:8,optTolerance:0.45},
    (err,svg) => err ? reject(err) : resolve(svg)));
  let paths = traced.match(/<path\b[^>]*\/>/g).join('\n');
  if (id === 'bezos') {
    // Remove isolated scan debris beyond the portrait's right edge, preserving the connected silhouette.
    paths = paths.replace(/d="([^"]+)"/g, (_, data) => {
      const clean = data.split(/(?=M )/).filter(part => {
        const values = part.match(/-?\d+(?:\.\d+)?/g)?.map(Number) || [];
        const xs = values.filter((_, i) => i % 2 === 0);
        return !xs.length || Math.min(...xs) < 620;
      }).join('');
      return `d="${clean}"`;
    });
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000" role="img" aria-label="${label} illustrated portrait">
<g transform="translate(56 50)">${paths}</g>
</svg>`;
  fs.writeFileSync(`public/celebrities/gallery/${id}.svg`,svg);
  await sharp(Buffer.from(svg)).resize(320,400).png().toFile(`artifacts/portraits/${id}.png`);
  console.log(`${id}: ${svg.length} bytes, vector paths only`);
}
