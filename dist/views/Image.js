/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

/* eslint-disable camelcase */
import GLTexturedView from '../primitives/GLTexturedView';
import TextureManager from '../TextureManager';
import ShadowViewWebGL from './ShadowViewWebGL';
export default class RCTImage extends ShadowViewWebGL {
  constructor(textureManager) {
    super(() => new GLTexturedView());
    this._textures = textureManager;
  }

  setSource(value) {
    // Will use a centralized store soon
    if (!value || !value.uri) {
      this.view.setBackgroundImage(null);
      return;
    }

    this._textures.getTextureForURL(value.uri).then(tex => {
      this.view.setBackgroundImage(tex);
    }, () => {
      this.view.setBackgroundImage(null);
    });
  }

  __setStyle_resizeMode(mode) {
    this.view.setBackgroundResizeMode(mode);
  }

  static registerBindings(dispatch) {
    super.registerBindings(dispatch);
    dispatch.source = this.prototype.setSource;
  }

}