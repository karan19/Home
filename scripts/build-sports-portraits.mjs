// Trace illustrated adaptations of the owner's Desktop PNGs into path-only artwork.
// Flattening onto white excludes transparent background and white negative space.
import fs from 'node:fs';
import sharp from 'sharp';
import potrace from 'potrace';
fs.mkdirSync('artifacts/portraits', {recursive:true});
for (const [id, threshold] of [['sachin',170],['federer',170],['jordan',170]]) {
  let source = sharp(`public/celebrities/${id}/illustrated.png`);
  // A tighter batting portrait gives the face enough room to read on the wall.
  if (id === 'sachin') source = source.extract({left: 0, top: 0, width: 1254, height: 700});
  const mask = await source
    .flatten({background:'white'}).resize(1000,1000,{fit:'inside'}).grayscale().threshold(threshold).png().toBuffer();
  const fitted = await sharp(mask).trim({background:'white',threshold:10})
    .resize(688,850,{fit:'contain',background:'white'}).png().toBuffer();
  const traced = await new Promise((resolve,reject)=>potrace.trace(fitted,
    {threshold:170,color:'#252923',background:'transparent',turdSize:id === 'sachin' ? 3 : 10,optTolerance:id === 'sachin' ? .2 : .35},
    (e,s)=>e?reject(e):resolve(s)));
  const name = {sachin: 'Sachin Tendulkar batting', federer: 'Roger Federer thumbs up', jordan: 'Michael Jordan'}[id];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000" role="img" aria-label="${name}"><title>${name}</title><desc>Illustrated adaptation of owner-supplied ${id} Desktop PNG using the built-in image-generation tool, then vector traced. Original photo source and license not supplied.</desc><g transform="translate(56 75)">${traced.match(/<path\b[^>]*\/>/g).join('\n')}</g></svg>`;
  fs.writeFileSync(`public/celebrities/gallery/${id}.svg`,svg);
  await sharp(Buffer.from(svg)).resize(400,500).flatten({background:'#efeee7'}).png().toFile(`artifacts/portraits/${id}.png`);
}
