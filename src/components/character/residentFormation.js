import { MeshDepthMaterial, RGBADepthPacking } from 'three';
export const FORM_MS=1200;
export const DISSOLVE_MS=1100;
export function formationAmount(elapsedMs,departing){
 const t=Math.max(0,Math.min(1,elapsedMs/(departing?DISSOLVE_MS:FORM_MS)));
 const eased=t*t*(3-2*t);
 return departing?1-eased:eased;
}

export function addResidentFormation(material,amount,{depth=false}={}){
 material.onBeforeCompile=shader=>{
  shader.uniforms.uResidentAmount=amount;
  shader.vertexShader='varying vec3 vResidentPosition;\n'+shader.vertexShader;
  shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvResidentPosition = position;');
  shader.fragmentShader=`uniform float uResidentAmount;
varying vec3 vResidentPosition;
float residentNoise(vec3 p){return fract(sin(dot(p,vec3(12.9898,78.233,39.425)))*43758.5453);}
`+shader.fragmentShader;
  shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>',`#include <clipping_planes_fragment>
 float residentField = clamp(vResidentPosition.y / 1.76,0.0,1.0)*0.79 + residentNoise(floor(vResidentPosition*70.0))*0.21;
 float residentCut = uResidentAmount*1.10 - 0.05;
 if(uResidentAmount<0.999 && residentField>residentCut) discard;
 float residentEdge = (1.0-smoothstep(0.0,0.06,residentCut-residentField))*step(0.001,uResidentAmount)*(1.0-step(0.999,uResidentAmount));
 `);
  if(!depth)shader.fragmentShader=shader.fragmentShader.replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance += vec3(1.0,0.63,0.25)*residentEdge*2.0;');
 };
 material.customProgramCacheKey=()=>`resident-formation-${depth?'depth':'surface'}-1`;
 return material;
}
export function residentFormationDepth(amount){
 return addResidentFormation(new MeshDepthMaterial({depthPacking:RGBADepthPacking}),amount,{depth:true});
}
