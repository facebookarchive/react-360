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

export type CanvasRootOptions = {
  canvas?: HTMLCanvasElement,
  height?: number,
  width?: number,
};

export default class CanvasRoot extends GLRoot {
  constructor(options: CanvasRootOptions = {}) {
    const canvas = options.canvas || document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    const renderGroup = new WebGL.RenderGroup(gl);
    super(renderGroup);
    this._canvas = canvas;
    this._renderGroup = renderGroup;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const width = options.width || (options.canvas ? options.canvas.width : 300);
    const height = options.height || (options.canvas ? options.canvas.height : 300);
    this.resize(width, height);

    canvas.addEventListener('mousedown', this._onInput.bind(this, 'mousedown'));
    canvas.addEventListener('mousemove', this._onMouseMove);
    canvas.addEventListener('mouseleave', this._onMouseLeave);
  }

  resize(width: number, height: number) {
    const pixelRatio = window.devicePixelRatio || 1;
    this._canvas.width = width * pixelRatio;
    this._canvas.height = height * pixelRatio;
    this._canvas.style.width = width + 'px';
    this._canvas.style.height = height + 'px';
    this._renderGroup.getGLContext().viewport(0, 0, width * pixelRatio, height * pixelRatio);
    this._renderGroup.setUniform('projectionMatrix', [
      2 / width,
      0,
      0,
      0,
      0,
      -2 / height,
      0,
      0,
      0,
      0,
      -0.001,
      0,
      -1,
      1,
      0,
      1,
    ]);
  }

  getCanvas() {
    return this._canvas;
  }

  update() {
    super.update();
    this._renderGroup.draw();
  }

  showCursor() {
    return true;
  }

  updateCursor(cursor: string) {
    this._canvas.style.cursor = cursor;
  }

  _onMouseMove = e => {
    this.setCursorCoordinates(e.offsetX, e.offsetY);
  };

  _onMouseLeave = () => {
    this.setCursorCoordinates(-9999, -9999);
  };

  _onInput(event) {
    for (const node of this.getCurrentHitSet()) {
      node.fireEvent('onInput', {type: event});
    }
  }
}
