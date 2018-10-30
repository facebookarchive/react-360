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

import GLView from '../primitives/GLView';
import ShadowViewWebGL from './ShadowViewWebGL';
import type {Dispatcher} from './ShadowView';

/**
 * Implementation of View backed by the new GLView
 */
export default class RCTView extends ShadowViewWebGL<GLView> {
  constructor() {
    super(() => new GLView());
  }

  setCursorVisibilitySlop(slop: number) {
    throw new Error('to be implemented');
  }

  setHitSlop(slop: number) {
    throw new Error('to be implemented');
  }

  setPointerEvents(mode: string) {}

  static registerBindings(dispatch: Dispatcher) {
    super.registerBindings(dispatch);

    dispatch.cursorVisibilitySlop = this.prototype.setCursorVisibilitySlop;
    dispatch.hitSlop = this.prototype.setHitSlop;
    dispatch.pointerEvents = this.prototype.setPointerEvents;
  }
}
