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
import Surface from './Surface';

export default class SurfaceManager {
  _defaultSurface: ?Surface;
  _surfaceRoot: THREE.Object3D;
  _surfaces: {[name: string]: Surface};

  constructor(scene: THREE.Scene) {
    this._defaultSurface = null;
    this._surfaces = {};
    this._surfaceRoot = new THREE.Object3D();
    scene.add(this._surfaceRoot);
  }

  registerSurface(name: string, surface: Surface) {
    if (this._surfaces[name]) {
      throw new Error(
        `Cannot register Surface with tag '${name}', a Surface with that name already exists.`
      );
    }
    this._surfaces[name] = surface;
  }

  unregisterSurface(name: string) {
    if (!this._surfaces[name]) {
      throw new Error(
        `Cannot unregister Surface with tag '${name}', the Surface with that name doesn't exists.`
      );
    }
    delete this._surfaces[name];
  }

  showSurface(surface: Surface) {
    this._surfaceRoot.add(surface.getNode());
  }

  hideSurface(surface: Surface) {
    this._surfaceRoot.remove(surface.getNode());
  }

  getSurface(name: string): ?Surface {
    return this._surfaces[name];
  }

  getDefaultSurface(): Surface {
    if (!this._defaultSurface) {
      this._defaultSurface = new Surface(1000, 600);
      this._surfaces.default = this._defaultSurface;
    }
    return this._defaultSurface;
  }
}
