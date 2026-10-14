const VIDEO_TEXTURE_KEYS = new Set([
  'map',
  'alphaMap',
  'aoMap',
  'bumpMap',
  'clearcoatMap',
  'clearcoatNormalMap',
  'clearcoatRoughnessMap',
  'displacementMap',
  'emissiveMap',
  'envMap',
  'iridescenceMap',
  'iridescenceThicknessMap',
  'lightMap',
  'metalnessMap',
  'normalMap',
  'roughnessMap',
  'sheenColorMap',
  'sheenRoughnessMap',
  'specularColorMap',
  'specularIntensityMap',
  'specularMap',
  'thicknessMap',
  'transmissionMap'
]);

const materialList = (material) => {
  if (!material) return [];
  return Array.isArray(material) ? material : [material];
};

const hasVideoTexture = (material) => {
  return materialList(material).some((item) => {
    return Object.entries(item).some(([key, value]) => {
      return VIDEO_TEXTURE_KEYS.has(key) && value?.isVideoTexture;
    });
  });
};

const shouldSkipExport = (object) => {
  return object.userData?.skipExport || (object.isMesh && hasVideoTexture(object.material));
};

const cloneForExport = (source) => {
  if (shouldSkipExport(source)) return null;

  const clone = source.clone(false);
  clone.children.length = 0;

  source.children.forEach((child) => {
    const childClone = cloneForExport(child);
    if (childClone) clone.add(childClone);
  });

  return clone;
};

const parseGlb = async (object, options) => {
  const { GLTFExporter } = await import('three/examples/jsm/exporters/GLTFExporter.js');
  const exporter = new GLTFExporter();

  return new Promise((resolve, reject) => {
    exporter.parse(
      object,
      resolve,
      reject,
      options
    );
  });
};

const downloadArrayBuffer = (arrayBuffer, fileName) => {
  const blob = new Blob([arrayBuffer], { type: 'model/gltf-binary' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = fileName;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
};

export const exportObjectAsGlb = async (source, fileName = 'modern-house-cutaway.glb') => {
  if (!source) {
    throw new Error('No scene object is available to export.');
  }

  const exportRoot = cloneForExport(source);
  if (!exportRoot) {
    throw new Error('Scene object was marked as non-exportable.');
  }

  const result = await parseGlb(exportRoot, {
    binary: true,
    onlyVisible: true,
    maxTextureSize: 2048
  });

  downloadArrayBuffer(result, fileName);
  return result;
};
