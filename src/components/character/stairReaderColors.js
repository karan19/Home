// Use the authored garment mask to replace distressed fabric with clean cream.
// Retain original skin, hair and prop textures outside the garment.
export function addStairReaderColors(material, { fabricFloor = 0.44 } = {}) {
  const formationCompile = material.onBeforeCompile;
  const formationKey = material.customProgramCacheKey();
  material.onBeforeCompile = shader => {
    formationCompile(shader);
    shader.vertexShader = 'attribute float _shirt_mask;\nvarying float vCleanShirt;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvCleanShirt = _shirt_mask;');
    shader.fragmentShader = 'varying float vCleanShirt;\n' + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', `#include <map_fragment>
      vec3 readerBase = diffuseColor.rgb;
      // Authored garment mask fills the small exposed patches in generated
      // fabric without recoloring skin, hair, the book, or the trousers.
      float fabric = smoothstep(0.15, 0.85, vCleanShirt);
      vec3 cream = vec3(0.768, 0.708, 0.658);
      diffuseColor.rgb = mix(readerBase, cream, fabric);
      float skin = smoothstep(0.025, 0.075, readerBase.r-readerBase.g)
        * smoothstep(0.015, 0.05, readerBase.g-readerBase.b)
        * smoothstep(0.58, 0.64, vResidentPosition.y);
      diffuseColor.rgb = mix(diffuseColor.rgb, mix(readerBase, vec3(0.92, 0.79, 0.68), 0.18), skin * (1.0-fabric));
    `);
  };
  material.customProgramCacheKey = () => `${formationKey}-clean-shirt-reader-4-${fabricFloor}`;
}
