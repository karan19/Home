export const QUALITY = {
  Low: { dpr: 1, bloom: false, ssao: false, interiorShadows: false, shadowSize: 512 },
  Medium: { dpr: 1.25, bloom: true, ssao: false, interiorShadows: false, shadowSize: 1024 },
  High: { dpr: 1.5, bloom: true, ssao: true, interiorShadows: true, shadowSize: 1024 },
};
export const lowerQuality = (quality) => quality === 'High' ? 'Medium' : 'Low';
