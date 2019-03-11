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

import GLTexturedView from '../primitives/GLTexturedView';
import ShadowView, {type Dispatcher} from './ShadowView';
import ShadowViewWebGL from './ShadowViewWebGL';
import View from './View';
import Surface from '../Surface';
import type {Transform} from '../Math';
import {FrameBuffer} from 'webgl-lite';

const intersect = [-1, -1];

/**
 * Implementation of View that contains an embedded Surface
 */
export default class SurfaceView extends ShadowViewWebGL<GLTexturedView> {
  fb: FrameBuffer;
  surface: Surface;
  surfaceRoot: View;
  _contentTransform: Transform;

  constructor(gl: WebGLRenderingContext) {
    super(gl, gl_ => new GLTexturedView(gl_));
    this.surface = new Surface(gl);
    this.surfaceRoot = new View(gl);
    this.surface.setRootNode(this.surfaceRoot);

    this.fb = new FrameBuffer(gl, 1, 1);
    this.surface.setViewport(1, 1);

    this.surface.updateGeometry();
    this.fb.drawToBuffer(() => {
      this.surface.clear();
      this.surface.draw();
    });

    this.fb.getTexture().update();

    this.view.setFlipVertical(true);
    this.view.setBackgroundImage(this.fb.getTexture());

    this._contentTransform = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  }

  addChild(index: number, child: ShadowView) {
    this.surfaceRoot.addChild(index, child);
  }

  removeChild(index: number) {
    this.surfaceRoot.removeChild(index);
  }

  setOffsetX(offset: number) {
    this._contentTransform[12] = offset;
    this.surfaceRoot.__setStyle_transform(this._contentTransform);
  }

  setOffsetY(offset: number) {
    this._contentTransform[13] = offset;
    this.surfaceRoot.__setStyle_transform(this._contentTransform);
  }

  setParentCursor(x: ?number, y: ?number) {
    if (x == null || y == null) {
      this.surface.clearCursor();
    } else {
      this.view.getLocalOffsetCoordinates(intersect, x, y);
      this.surface.setCursor(intersect[0], intersect[1]);
    }
  }

  presentLayout() {
    super.presentLayout();
    const flex = this.YGNode;
    if (
      flex.getComputedWidth() !== this.fb.getWidth() ||
      flex.getComputedHeight() !== this.fb.getHeight()
    ) {
      this.fb.resize(flex.getComputedWidth(), flex.getComputedHeight());
      this.surface.setViewport(flex.getComputedWidth(), flex.getComputedHeight());
      this.surface.getRenderGroup().setNeedsRender(true);
    }
    this.surface.updateGeometry();
    if (this.surface.isDirty()) {
      this.fb.drawToBuffer(() => {
        this.surface.clear();
        this.surface.draw();
      });
      this.fb.getTexture().update();
    }
  }

  static registerBindings(dispatch: Dispatcher) {
    super.registerBindings(dispatch);
  }
}
