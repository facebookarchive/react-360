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

import {Flexbox, SDFTextImplementation, StackingContext, TextureManager} from 'webgl-ui';

function recursiveLayout(view) {
  view.presentLayout();
  for (const child of view.children) {
    if (child) {
      recursiveLayout(child);
    }
  }
}

export default class GLRoot {
  constructor(scene: any) {
    this._scene = scene;
    this._roots = [];
    this.YGNode = Flexbox.Node.create();

    this._textImplementation = new SDFTextImplementation();
    this._textureManager = new TextureManager();

    this._hitLastFrame = new Set();
    this._hitCurrentFrame = new Set();
    this._cursorX = -9999;
    this._cursorY = -9999;
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
  }

  showCursor() {
    return false;
  }

  getTextImplementation() {
    return this._textImplementation;
  }

  getTextureManager() {
    return this._textureManager;
  }

  getScene() {
    return this._scene;
  }

  getCurrentHitSet() {
    return this._hitCurrentFrame;
  }

  setCursorCoordinates(x: number, y: number) {
    this._cursorX = x;
    this._cursorY = y;
  }

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
    const showCursor = this.showCursor();
    for (const newHit of currentHits) {
      if (!this._hitLastFrame.has(newHit)) {
        // Entered newHit
        newHit.fireEvent('onEnter');
      }
      if (showCursor) {
        const nodeRenderOrder = newHit.getRenderOrder();
        if (nodeRenderOrder > cursorOrder) {
          const nodeCursor = newHit.getCursor();
          if (nodeCursor) {
            cursor = nodeCursor;
            cursorOrder = nodeRenderOrder;
          }
        }
      }
    }
    if (showCursor) {
      this.updateCursor(cursor || 'initial');
    }

    this._hitCurrentFrame = this._hitLastFrame;
    this._hitLastFrame = currentHits;
  }
}
