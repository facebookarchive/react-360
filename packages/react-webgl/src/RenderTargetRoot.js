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

export type RenderTargetRootOptions = {
  height: number,
  width: number,
};

export default class RenderTargetRoot extends GLRoot {
  constructor(gl: WebGLRenderingContext, options: RenderTargetRootOptions = {}) {
    const renderGroup = new WebGL.RenderGroup(gl);
    super(renderGroup);
    const width = options.width || 0;
    const height = options.height || 0;
    this._fb = new WebGL.FrameBuffer(gl, width, height);
    // prettier-ignore
    renderGroup.setUniform('projectionMatrix', [
      2 / width, 0, 0, 0,
      0, -2 / height, 0, 0,
      0, 0, -0.001, 0,
      -1, 1, 0, 1,
    ]);
  }

  getFrameBuffer() {
    return this._fb;
  }

  update() {
    super.update();
    const rg = this.getRenderGroup();
    this._fb.drawToBuffer(() => {
      if (rg.needsRender()) {
        const gl = rg.getGLContext();
        gl.clear(gl.COLOR_BUFFER_BIT);
        rg.draw();
        this._fb.getTexture().update();
      }
    });
  }

  showCursor() {
    return false;
  }
}
