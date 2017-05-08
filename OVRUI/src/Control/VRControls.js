/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

import type {Camera} from 'three';

export default class VRControls {
  camera: Camera;
  _vrDisplay: VRDisplay;

  constructor(camera: Camera, vrDisplay: VRDisplay) {
    this.camera = camera;
    this._vrDisplay = vrDisplay;
  }

  update(options: {frameData?: VRFrameData} = {}) {
    const pose = options.frameData ? options.frameData.pose : null;
    if (pose) {
      // Positional tracking from Rift-type headsets
      if (pose.position) {
        this.camera.position.fromArray(pose.position);
      }
      if (pose.orientation) {
        this.camera.quaternion.fromArray(pose.orientation);
      }
    }
  }

  get vrDisplay(): VRDisplay {
    return this._vrDisplay;
  }
}
