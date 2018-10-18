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

    this._hitLastFrame = new Set();
    this._hitCurrentFrame = new Set();
    this._cursorX = -9999;
    this._cursorY = -9999;
    this._renderer.domElement.addEventListener('mousemove', this._onMouseMove);
    this._renderer.domElement.addEventListener('mouseleave', this._onMouseLeave);
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
    this._detectCurrentHits();
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

  _onMouseMove = e => {
    this._cursorX = e.offsetX;
    this._cursorY = e.offsetY;
  };

  _onMouseLeave = () => {
    this._cursorX = -9999;
    this._cursorY = -9999;
  };

  _detectCurrentHits() {
    const currentHits = this._hitCurrentFrame;
    currentHits.clear();
    const x = this._cursorX;
    const y = this._cursorY;
    const nodes = this._roots.slice();
    while (nodes.length > 0) {
      const node = nodes.shift();
      if (node.hasCursorEvent()) {
        if (node.view.containsPoint(x, y)) {
          currentHits.add(node);
        }
      }
      nodes.unshift.apply(nodes, node.children);
    }
    for (const oldHit of this._hitLastFrame) {
      if (!currentHits.has(oldHit)) {
        // Left oldHit
        oldHit.fireEvent('onExit');
      }
    }
    let cursor = null;
    let cursorOrder = -1;
    for (const newHit of currentHits) {
      if (!this._hitLastFrame.has(newHit)) {
        // Entered newHit
        newHit.fireEvent('onEnter');
      }
      const nodeRenderOrder = newHit.getRenderOrder();
      if (nodeRenderOrder > cursorOrder) {
        const nodeCursor = newHit.getCursor();
        if (nodeCursor) {
          cursor = nodeCursor;
          cursorOrder = nodeRenderOrder;
        }
      }
    }
    this._renderer.domElement.style.cursor = cursor || 'initial';

    this._hitCurrentFrame = this._hitLastFrame;
    this._hitLastFrame = currentHits;
  }
}
