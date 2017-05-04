/**
 * Dynamic uniforms for rendering stereo texture.
 *
 * Callback function onUpdateCallback will be called in every render loop before
 * setting the value of the uniform to WebGL. To enable stereo texture, you
 * should set viewID=1 for the right eye camera. If you set two stereoOffsetRepeats
 * to the material, the right eye camera will use the second stereoOffsetRepeat
 */
export default class StereoTextureUniforms {
  constructor() {
    /** The right eye camera will use stereoOffsetRepeats[1] if it's defined. */
    this.stereoOffsetRepeat = {
      dynamic: true,
      type: 'f',
      value: null,
      onUpdateCallback: function(object, camera) {
        // if it's right eye camera and has second offsetRepeats, use the second offsetRepeats
        if (camera.viewID === 1 && object.material.stereoOffsetRepeats[1]) {
          this.value = object.material.stereoOffsetRepeats[1];
        } else {
          this.value = object.material.stereoOffsetRepeats[0];
        }
      },
    };
  }
}
