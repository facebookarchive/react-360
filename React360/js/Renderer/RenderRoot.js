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

import type ShadowViewWebGL from './Views/ShadowViewWebGL';

export type StackingContext = {
  '0': Array<ShadowViewWebGL<*>>,
  [level: string]: Array<StackingContext>,
};

function compareDescending(a: number, b: number): number {
  return b - a;
}

function stringToNumber(x: string): number {
  return parseInt(x, 10);
}

function excludeNaN(x: number): boolean {
  return !isNaN(x);
}

function getOrderedNumericKeys(obj: Object): Array<number> {
  const numbers = Object.keys(obj)
    .map(stringToNumber)
    .filter(excludeNaN);
  numbers.sort(compareDescending);
  return numbers;
}

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
    const topContext: StackingContext = {'0': []};
    const stack: Array<[StackingContext, ShadowViewWebGL<*>]> = [[topContext, rootView]];
    // DFS through the node tree
    while (stack.length > 0) {
      const [context, node] = stack.shift();
      let childContext: ?StackingContext = context;
      const z = String(node.getZIndex());
      if (z === '0') {
        context['0'].push(node);
      } else {
        childContext = ((context[z]: any): ?StackingContext);
        if (!childContext) {
          childContext = {'0': []};
          // $FlowFixMe - we know the key isn't '0', but Flow doesn't
          context[z] = childContext;
        }
        childContext['0'].push(node);
      }

      for (let i = node.getChildCount() - 1; i >= 0; i--) {
        const child = node.getChild(i);
        if (child) {
          // Flow can't guarantee child is a ShadowViewWebGL, but we know it is
          stack.unshift([
            ((childContext: any): StackingContext),
            ((child: any): ShadowViewWebGL<*>),
          ]);
        }
      }
    }

    // DFS through the contexts, visiting z-index levels in ascending order
    const contexts: Array<StackingContext> = [topContext];
    let order = 1;
    while (contexts.length > 0) {
      const context = contexts.shift();
      // Get the numeric z-indexes at this context, in descending order
      const keys = getOrderedNumericKeys(context);
      if (keys.length === 1 && keys[0] === 0) {
        const queue = context['0'];
        for (let i = 0; i < queue.length; i++) {
          const node = queue[i];
          node.setRenderOrder(order++);
          node.view.getNode().renderOrder = node.getRenderOrder();
        }
      } else {
        // For each non-zero z-index, push its nested stacking context onto the
        // front of the traversal stack
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (key === 0) {
            contexts.unshift({'0': context['0']});
          } else {
            contexts.unshift(((context[String(key)]: any): StackingContext));
          }
        }
      }
    }

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
