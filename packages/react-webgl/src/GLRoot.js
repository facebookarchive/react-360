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
import {
  Flexbox,
  SDFTextImplementation,
  StackingContext,
  TextureManager,
} from '../../../React360/js/WebGLRendering';

function recursiveLayout(view) {
  view.presentLayout();
  for (const child of view.children) {
    if (child) {
      recursiveLayout(child);
    }
  }
}

export default class GLRoot {
  constructor(width: number, height: number) {
    this._renderer = new THREE.WebGLRenderer();
    this._scene = new THREE.Scene();
    this._camera = new THREE.OrthographicCamera();
    this.resize(width, height);

    this._roots = [];
    this.YGNode = Flexbox.Node.create();

    this._textImplementation = new SDFTextImplementation();
    this._textureManager = new TextureManager();
  }

  resize(width: number, height: number) {
    this._renderer.setSize(width, height, true);
    this._camera.left = 0;
    this._camera.right = width;
    this._camera.top = 0;
    this._camera.bottom = height;
    this._camera.near = -1000;
    this._camera.far = 1000;
    this._camera.setViewOffset(width, height, 0, 0, width, height);
    this._camera.updateProjectionMatrix();
  }

  append(child) {
    this._roots.push(child);
    this._scene.add(child.view.getNode());
    this.YGNode.insertChild(child.YGNode, this._roots.length - 1);
  }

  update() {
    this.YGNode.calculateLayout(Flexbox.UNDEFINED, Flexbox.UNDEFINED, Flexbox.DIRECTION_LTR);
    for (const root of this._roots) {
      recursiveLayout(root);
      StackingContext.restack(root);
    }
    this._renderer.render(this._scene, this._camera);
  }

  getRenderer() {
    return this._renderer;
  }

  getScene() {
    return this._scene;
  }

  getTextImplementation() {
    return this._textImplementation;
  }

  getTextureManager() {
    return this._textureManager;
  }
}
