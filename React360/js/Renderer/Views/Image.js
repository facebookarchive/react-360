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

/* eslint-disable camelcase */

import * as THREE from 'three';
import GLTexturedView, {type ResizeMode} from '../Primitives/GLTexturedView';
import ShadowViewWebGL from './ShadowViewWebGL';
import type {Dispatcher} from './ShadowView';

export default class RCTImage extends ShadowViewWebGL<GLTexturedView> {
  constructor() {
    super(() => new GLTexturedView());
  }

  setSource(value: {uri: string}) {
    // Will use a centralized store soon
    new THREE.TextureLoader().load(value.uri, tex => {
      this.view.setBackgroundImage(tex);
    });
  }

  __setStyle_resizeMode(mode: ResizeMode) {
    this.view.setBackgroundResizeMode(mode);
  }

  static registerBindings(dispatch: Dispatcher) {
    super.registerBindings(dispatch);

    dispatch.source = this.prototype.setSource;
  }
}
