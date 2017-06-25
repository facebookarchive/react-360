/**
 * Basic Material support rendering mono/stereo textures
 * @constructor
 * @param {Object} parameters - parameters for THREE.Material
 */

import THREE from '../ThreeShim';
import StereoTextureUniforms from './StereoTextureUniforms';
import StereoShaderLib from './StereoShaderLib';

const DEFAULT_UNIFORM_COLOR = new THREE.Color();
const DEFAULT_OFFSET_REPEATS = [new THREE.Vector4(0, 0, 1, 1)];

export default class StereoBasicTextureMaterial extends THREE.ShaderMaterial {
  constructor(parameters) {
    const uniforms = THREE.UniformsUtils.merge([
      new StereoTextureUniforms(),
      {
        color: {value: DEFAULT_UNIFORM_COLOR, type: 'f'}, // The color of material
        opacity: {value: 1.0, type: 'f'}, // The opacity of material
        useUV: {value: 1.0, type: 'f'}, // The opacity of material
        map: {value: null, type: 't'}, // The color map of material
        envMap: {value: null, type: 't'}, // The environment map of material
      },
    ]);

    super({
      uniforms: uniforms,
      vertexShader: StereoShaderLib.stereo_basic_vert,
      fragmentShader: StereoShaderLib.stereo_basic_frag,
    });

    this.isStereoBasicTextureMaterial = true;
    // The offset repeats of each eye, this makes each eye use different uv to get stereo rendering output
    this.stereoOffsetRepeats = DEFAULT_OFFSET_REPEATS;
    this.setValues(parameters);
  }

  copy(source) {
    super.copy(source);
    this.stereoOffsetRepeats = source.stereoOffsetRepeats.slice();
    return this;
  }

  set color(value) {
    this.uniforms.color.value = new THREE.Color(value);
  }

  get color() {
    return this.uniforms.color.value;
  }

  set opacity(value) {
    this.uniforms && (this.uniforms.opacity.value = value);
  }

  get opacity() {
    return this.uniforms.opacity.value;
  }

  set map(value) {
    this.uniforms.map.value = value;
  }

  get map() {
    return this.uniforms.map.value;
  }

  set envMap(value) {
    this.uniforms.envMap.value = value;
  }

  get envMap() {
    return this.uniforms.envMap.value;
  }

  set useUV(value) {
    this.uniforms.useUV.value = value;
  }
}
