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

import {StackingContext, type ShadowViewWebGL} from 'webgl-ui';

const {restack} = StackingContext;

/**
 * Manages a tree of view nodes.
 * The RenderRoot provides higher-level functionality that needs to account for
 * the entire node tree, like rendering order or hit testing.
 */
export default class RenderRoot {
  _renderOrderDirty: boolean;
  rootView: ?ShadowViewWebGL<*>;
  views: Array<ShadowViewWebGL<*>>;

  constructor() {
    this.rootView = null;
    this.views = [];
    this._renderOrderDirty = true;
  }

  setRenderOrderDirty(dirty: boolean) {
    this._renderOrderDirty = dirty;
  }

  replaceRootView(root: ShadowViewWebGL<*>): void {
    this.rootView = root;
    if (!this.views[root.tag]) {
      this.views[root.tag] = root;
    }
    this._renderOrderDirty = true;
  }

  addView(view: ShadowViewWebGL<*>): void {
    this.views[view.tag] = view;
  }

  removeView(tag: number): void {
    const view = this.views[tag];
    if (this.rootView === view) {
      this.rootView = null;
    }
    delete this.views[tag];
    this._renderOrderDirty = true;
  }

  getView(tag: number): ?ShadowViewWebGL<*> {
    return this.views[tag];
  }

  setChildAtIndex(parent: ShadowViewWebGL<*>, index: number, child: ShadowViewWebGL<*>): void {
    parent.addChild(index, child);
    this._renderOrderDirty = true;
  }

  removeChildAtIndex(parent: ShadowViewWebGL<*>, index: number) {
    parent.removeChild(index);
    this._renderOrderDirty = true;
  }

  /**
   * Implements basic z-index stacking, similar to how CSS works.
   * Arrangement is implemented using Stacking Contexts, which contain nodes and
   * nested Stacking Contexts. By default, nodes have a z-index of 0; when this
   * is overridden, a new Stacking Context is created with that level. Nodes
   * within a Stacking Context can only be compared to other descendants of that
   * Context – they cannot be compared to descendants of a parent context.
   * Within a given Context, nodes are arranged in order of increasing z-index.
   */
  updateRenderOrder() {
    if (!this._renderOrderDirty) {
      return;
    }
    const rootView = this.rootView;
    if (!rootView) {
      return;
    }
    restack(rootView);
    this._renderOrderDirty = false;
  }

  hitTest(x: number, y: number): ?ShadowViewWebGL<*> {
    // Currently O(# of views), potentially optimizable with quadtrees but it's
    // uncertain whether that would be measurably faster for most cases
    let hit = null;
    let maxRenderOrder = -1;
    for (const view of this.views) {
      if (!view) {
        continue;
      }
      if (view.view.containsPoint(x, y)) {
        const renderOrder = view.getRenderOrder();
        if (renderOrder > maxRenderOrder) {
          hit = view;
          maxRenderOrder = renderOrder;
        }
      }
    }
    return hit;
  }
}
