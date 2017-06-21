/**
 * Dynamic uniforms for rendering stereo texture.
 *
 * Callback function onUpdateCallback will be called in every render loop before
 * setting the value of the uniform to WebGL. To enable stereo texture, you
 * should set viewID=1 for the right eye camera. If you set two stereoOffsetRepeats
 * to the material, the right eye camera will use the second stereoOffsetRepeat
 */

import THREE from '../ThreeShim';

export default class StereoTextureUniforms {
  constructor() {
    /** The right eye camera will use stereoOffsetRepeats[1] if it's defined. */
    this.stereoOffsetRepeat = {
      type: 'f',
      value: new THREE.Vector4(0, 0, 1, 1),
    };
  }
}
