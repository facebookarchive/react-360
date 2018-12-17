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
    super(gl);
    this._canvas = canvas;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const width = options.width || (options.canvas ? options.canvas.width : 300);
    const height = options.height || (options.canvas ? options.canvas.height : 300);
    this.resize(width, height);

    canvas.addEventListener('click', this._onClick);
    canvas.addEventListener('mousemove', this._onMouseMove);
    canvas.addEventListener('mouseleave', this._onMouseLeave);
  }

  resize(width: number, height: number) {
    const pixelRatio = window.devicePixelRatio || 1;
    this._canvas.width = width * pixelRatio;
    this._canvas.height = height * pixelRatio;
    this._canvas.style.width = width + 'px';
    this._canvas.style.height = height + 'px';

    this.getGLContext().viewport(0, 0, width * pixelRatio, height * pixelRatio);
    this.getSurface().setViewport(width, height);
  }

  getCanvas() {
    return this._canvas;
  }

  _onClick = () => {
    this.getSurface().dispatchEvent('click');
  };

  _onMouseMove = e => {
    this.getSurface().setCursor(e.offsetX, e.offsetY);
  };

  _onMouseLeave = () => {
    this.getSurface().clearCursor();
  };
}
