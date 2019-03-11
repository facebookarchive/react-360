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

import type {TextImplementation} from './text/TextTypes';
import type TextureManager from './TextureManager';
import type ShadowViewWebGL from './views/ShadowViewWebGL';
import * as Flexbox from './vendor/Yoga.bundle';
import Image from './views/Image';
import RawText from './views/RawText';
import SurfaceView from './views/SurfaceView';
import Text from './views/Text';
import View from './views/View';
import {restack} from './StackingContext';
import recursiveLayout from './recursiveLayout';
import {RenderGroup} from 'webgl-lite';

type Node = ShadowViewWebGL<*>;

/**
 * Surface represents a group of 2D UI elements. It handles layout, stacking,
 * and event handling.
 */
export default class Surface {
  _cursorX: ?number;
  _cursorY: ?number;
  _hitCurrentFrame: Set<Node>;
  _hitLastFrame: Set<Node>;
  _gl: WebGLRenderingContext;
  _renderGroup: RenderGroup;
  _rootNode: Node;
  _textImplementation: ?TextImplementation;
  _textureManager: ?TextureManager;
  YGNode: any;

  constructor(gl: WebGLRenderingContext) {
    this._gl = gl;
    this.YGNode = Flexbox.Node.create();
    this._cursorX = null;
    this._cursorY = null;
    this._hitCurrentFrame = new Set();
    this._hitLastFrame = new Set();
    this._renderGroup = new RenderGroup(gl);
  }

  /**
   * Place a view, text, or image as the root of the surface
   */
  setRootNode(node: Node) {
    this._rootNode = node;
    this._renderGroup.addNode(node.view.getNode());
    this.YGNode.insertChild(node.YGNode, 0);
  }

  /**
   * Set the TextImplementation used for all Text nodes on this surface
   */
  useTextImplementation(impl: TextImplementation) {
    this._textImplementation = impl;
  }

  /**
   * Set the TextureManager used for all the Image nodes on this surface
   */
  useTextureManager(tm: TextureManager) {
    this._textureManager = tm;
  }

  /**
   * Shortcut for creating a raw text node from a string, which can be added to
   * a Text element.
   */
  createTextNode(text: string) {
    const node = new RawText();
    node.setText(text);
    return node;
  }

  /**
   * Shortcut for creating an instance of a View element
   */
  createView() {
    return new View(this._gl);
  }

  /**
   * Shortcut for creating an instance of a Text element
   */
  createText() {
    if (!this._textImplementation) {
      throw new Error('Cannot create a Text node until a text implementation has been set');
    }
    return new Text(this._gl, this._textImplementation);
  }

  /**
   * Shortcut for creating an instance of an Image element
   */
  createImage() {
    if (!this._textureManager) {
      throw new Error('Cannot create an Image node until a texture manager has been set');
    }
    return new Image(this._gl, this._textureManager);
  }

  /**
   * Trigger an event at the currently-set coordinates. Any views in the
   * current hit set that have event handlers will have them triggered.
   */
  dispatchEvent(event: string, payload: any) {
    for (const hit of this._hitCurrentFrame) {
      hit.dispatchEvent(event, payload);
      if (hit instanceof SurfaceView) {
        hit.surface.dispatchEvent(event, payload);
      }
    }
  }

  /**
   * Set the current cursor coordinates, used for updating hit sets and
   * triggering enter and exit events
   */
  setCursor(x: number, y: number, forceHitDetection?: boolean) {
    this._cursorX = x;
    this._cursorY = y;
    if (forceHitDetection) {
      this._detectCurrentHits();
    }
  }

  /**
   * Clear the current cursor coordinates, such as when a cursor no longer
   * intersects with the surface
   */
  clearCursor() {
    this._cursorX = null;
    this._cursorY = null;
  }

  /**
   * Set the top viewport window size of the surface. This establishes the
   * orthographic projection matrix, ensuring the proper size for elements.
   * For example, if you intend to render a surface to a specific texture size,
   * those dimensions should be used here.
   */
  setViewport(width: number, height: number) {
    // prettier-ignore
    this._renderGroup.setUniform('projectionMatrix', [
      2 / width, 0, 0, 0,
      0, -2 / height, 0, 0,
      0, 0, -0.001, 0,
      -1, 1, 0, 1,
    ]);
  }

  /**
   * Update the Flexbox layouts of all nodes in the scene, then compute any
   * new geometries, and reorder the nodes. Finally, using the current cursor
   * coordinates, update the current hit set in case the cursor or views have
   * changed.
   */
  updateGeometry() {
    this.YGNode.calculateLayout(Flexbox.UNDEFINED, Flexbox.UNDEFINED, Flexbox.DIRECTION_LTR);
    if (this._rootNode) {
      recursiveLayout(this._rootNode);
      restack(this._rootNode);
      this._renderGroup.refreshRenderOrder();
    }
    this._detectCurrentHits();
  }

  /**
   * Reflect whether the contained node tree is dirty, and needs to be rendered
   */
  isDirty() {
    return this._renderGroup.needsRender();
  }

  /**
   * Clear the pixels of the current draw context
   */
  clear() {
    this._gl.clearColor(1, 1, 1, 0);
    this._gl.clear(this._gl.COLOR_BUFFER_BIT);
  }

  /**
   * Draw the scene, if it's dirty
   */
  draw() {
    const gl = this._gl;
    gl.disable(gl.DEPTH_TEST);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    this._renderGroup.draw();
  }

  getRenderGroup() {
    return this._renderGroup;
  }

  _detectCurrentHits() {
    const currentHits = this._hitLastFrame;
    currentHits.clear();
    this._hitLastFrame = this._hitCurrentFrame;
    this._hitCurrentFrame = currentHits;
    const x = this._cursorX;
    const y = this._cursorY;
    const rootNode = this._rootNode;
    if (x != null && y != null && rootNode) {
      const nodes = [rootNode];
      while (nodes.length > 0) {
        const node = nodes.shift();
        if (node.hasEvents() || node instanceof SurfaceView) {
          // $FlowFixMe
          if (node.view.containsPoint(x, y)) {
            // $FlowFixMe
            currentHits.add(node);
            if (node instanceof SurfaceView) {
              node.setParentCursor(x, y);
            }
          }
        }
        nodes.unshift.apply(nodes, node.children);
      }
    }
    for (const oldHit of this._hitLastFrame) {
      if (!currentHits.has(oldHit)) {
        // Left oldHit
        oldHit.dispatchEvent('exit');
        if (oldHit instanceof SurfaceView) {
          oldHit.setParentCursor(null, null);
        }
      }
    }
    for (const newHit of currentHits) {
      if (!this._hitLastFrame.has(newHit)) {
        // Entered newHit
        newHit.dispatchEvent('enter');
      }
    }
  }
}
