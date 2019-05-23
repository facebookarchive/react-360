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

import * as WebGL from 'webgl-lite';
import GLRoot from './GLRoot';
import type {TextImplementation} from 'webgl-ui';

export type RenderTargetRootOptions = {
  height?: number,
  width?: number,
  text?: TextImplementation,
};

/**
 * RenderTargetRoot draws a React WebGL scene to a GL FrameBuffer / Texture,
 * which can then be used in a larger WebGL scene.
 */
export default class RenderTargetRoot extends GLRoot {
  constructor(gl: WebGLRenderingContext, options: RenderTargetRootOptions = {}) {
    super(gl, options.text);
    const width = options.width || 0;
    const height = options.height || 0;
    this._fb = new WebGL.FrameBuffer(gl, width, height);
    this.getSurface().setViewport(width, height);
  }

  getFrameBuffer() {
    return this._fb;
  }

  update() {
    this._fb.drawToBuffer(() => {
      const textureNeedsUpdate = this.getSurface().isDirty();
      super.update();
      if (textureNeedsUpdate) {
        this._fb.getTexture().update();
      }
    });
  }
}
