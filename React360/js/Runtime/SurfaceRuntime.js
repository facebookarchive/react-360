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

import type {Scene} from 'three';
import RenderRoot from '../Renderer/RenderRoot';
import ReactContext from './ReactContext';

/**
 * Implements runtime functionality for 2D surfaces. It isn't aware of any 3D
 * world concepts like Surface, Location, etc, allowing it to be used separately.
 * Breaking out this functionality also allows rendering and hit testing to be
 * performed directly, when viewing an individual surface in "focus" mode.
 */
export default class SurfaceRuntime {
  context: ReactContext;
  _renderRoots: Array<RenderRoot>;

  constructor(context: ReactContext) {
    this.context = context;
    this._renderRoots = [];
  }

  createRootView(name: string, initialProps: Object, scene: Scene): number {
    const root = new RenderRoot();
    const tag = this.context.createRootView(name, root, initialProps);
    this._renderRoots[tag] = root;
    if (root.rootView) {
      scene.add(root.rootView.view.getNode());
    }

    return tag;
  }

  getHitTag(root: number, x: number, y: number): ?number {
    const hit = this._renderRoots[root].hitTest(x, y);
    if (hit) {
      return hit.tag;
    }
    return null;
  }
}
