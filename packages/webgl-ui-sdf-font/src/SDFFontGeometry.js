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

import {FontGeometry, type SDFTextImplementation} from 'webgl-ui';

export default class SDFFontGeometry extends FontGeometry {
  _center: number;

  constructor(
    gl: WebGLRenderingContext,
    impl: SDFTextImplementation,
    text: string,
    options: Object = {}
  ) {
    super(gl, impl, text, options);
  }

  getParms() {
    return {
      ...super.getParams(),
      center: this._center,
    };
  }

  setWeight(weight: number) {
    this._center = 0.54 - weight / 10000.0;
    this.markGeometryDirty();
  }
}
