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

import {Surface, TextureManager, type TextImplementation} from 'webgl-ui';
import {FontImplementation} from 'webgl-ui-system-font';

export default class GLRoot {
  constructor(gl: WebGLRenderingContext, text?: TextImplementation) {
    this._gl = gl;
    this._surface = new Surface(gl);
    this._textImplementation = text || new FontImplementation(gl);
    this._textureManager = new TextureManager(gl);
    this._surface.useTextImplementation(this._textImplementation);
    this._surface.useTextureManager(this._textureManager);
  }

  setRoot(child) {
    this._surface.setRootNode(child);
  }

  update() {
    this._surface.updateGeometry();
    if (true || this._surface.isDirty()) {
      this._surface.clear();
      this._surface.draw();
    }
  }

  useTextureManager(tm: TextureManager) {
    this._textureManager = tm;
    this._surface.useTextureManager(tm);
  }

  getTextImplementation() {
    return this._textImplementation;
  }

  getTextureManager() {
    return this._textureManager;
  }

  getSurface() {
    return this._surface;
  }

  getGLContext() {
    return this._gl;
  }

  setCursor(x: number, y: number) {
    this._surface.setCursor(x, y);
  }

  clearCursor() {
    this._surface.clearCursor();
  }

  dispatchEvent(event: string, payload: any) {
    this._surface.dispatchEvent(event, payload);
  }
}
