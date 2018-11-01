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
import GLRoot from './GLRoot';

export type CanvasRootOptions = {
  canvas?: HTMLCanvasElement,
  height?: number,
  width?: number,
};

export default class CanvasRoot extends GLRoot {
  constructor(options: CanvasRootOptions = {}) {
    super(new THREE.Scene());

    const width = options.width || (options.canvas ? options.canvas.width : 300);
    const height = options.height || (options.canvas ? options.canvas.height : 300);

    this._renderer = new THREE.WebGLRenderer({canvas: options.canvas});
    this._camera = new THREE.OrthographicCamera();
    this.resize(width, height);

    this._renderer.domElement.addEventListener('mousedown', this._onInput.bind(this, 'mousedown'));
    this._renderer.domElement.addEventListener('mousemove', this._onMouseMove);
    this._renderer.domElement.addEventListener('mouseleave', this._onMouseLeave);
  }

  resize(width: number, height: number) {
    this._renderer.setSize(width, height, true);
    this._renderer.setPixelRatio(window.devicePixelRatio || 1);
    this._camera.left = 0;
    this._camera.right = width;
    this._camera.top = 0;
    this._camera.bottom = height;
    this._camera.near = -1000;
    this._camera.far = 1000;
    this._camera.setViewOffset(width, height, 0, 0, width, height);
    this._camera.updateProjectionMatrix();
  }

  getRenderer() {
    return this._renderer;
  }

  update() {
    super.update();
    this._renderer.render(this.getScene(), this._camera);
  }

  showCursor() {
    return true;
  }

  updateCursor(cursor: string) {
    this._renderer.domElement.style.cursor = cursor;
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
