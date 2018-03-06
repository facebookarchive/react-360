/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

import * as THREE from 'three';
import StereoTextureUniforms from './StereoTextureUniforms';
import StereoShaderLib from './StereoShaderLib';

const DEFAULT_UNIFORM_COLOR = new THREE.Color();
const DEFAULT_OFFSET_REPEATS = [new THREE.Vector4(0, 0, 1, 1)];

export default class StereoBasicTextureMaterial extends THREE.ShaderMaterial {
  isStereoBasicTextureMaterial: boolean;
  stereoOffsetRepeats: Array<Array<number> | THREE.Vector4>;

  constructor(parameters: Object) {
    const uniforms = THREE.UniformsUtils.merge([
      new StereoTextureUniforms(),
      {
        color: {value: DEFAULT_UNIFORM_COLOR, type: 'f'}, // The color of material
        opacity: {value: 1.0, type: 'f'}, // The opacity of material
        useUV: {value: 1.0, type: 'f'}, // The opacity of material
        map: {value: null, type: 't'}, // The color map of material
        envMap: {value: null, type: 't'}, // The environment map of material
        arcOffset: {value: 0, type: 'f'}, // Horizontal angle offset of the map
        arcLengthReciprocal: {value: 1 / Math.PI / 2, type: 'f'}, // Horizontal arc length of the surface
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

  copy(source: StereoBasicTextureMaterial) {
    super.copy(source);
    this.stereoOffsetRepeats = source.stereoOffsetRepeats.slice();
    return this;
  }

  set color(value: THREE.Color) {
    this.uniforms.color.value = new THREE.Color(value);
  }

  get color(): THREE.Color {
    return this.uniforms.color.value;
  }

  set opacity(value: number) {
    this.uniforms && (this.uniforms.opacity.value = value);
  }

  get opacity(): number {
    return this.uniforms.opacity.value;
  }

  set map(value: ?THREE.Texture) {
    this.uniforms.map.value = value;
  }

  get map(): ?THREE.Texture {
    return this.uniforms.map.value;
  }

  set envMap(value: THREE.Texture) {
    this.uniforms.envMap.value = value;
  }

  get envMap(): THREE.Texture {
    return this.uniforms.envMap.value;
  }

  set useUV(value: number) {
    this.uniforms.useUV.value = value;
  }
}
