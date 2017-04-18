/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import * as THREE from 'three';

/**
 * Class managing Head Model for ReactVR.
 * @constructor
 * @param {ReactNativeContext} rnctx - React Native Context
 */
export default class RCTHeadModel {
  constructor(rnctx) {
    this._rnctx = rnctx;
  }

  sendHeadModel(camera) {
    // Send head(center eye) pose information
    // TODO: send left/right eye pose information
    camera.updateMatrixWorld(true);
    // This is the transform from camera to world
    const headMatrix = camera.matrixWorld;
    // This is the transform from world to camera
    const viewMatrix = new THREE.Matrix4();
    viewMatrix.getInverse(headMatrix);

    const headMatrixArray = headMatrix.toArray();
    const viewMatrixArray = viewMatrix.toArray();

    const target = this._rnctx.lastHit ? this._rnctx.getHitTag(this._rnctx.lastHit) : null;
    const source = this._rnctx.lastSource;
    if (target) {
      // Dispatch head pose to hit view
      this._rnctx.callFunction('RCTEventEmitter', 'receiveEvent', [
        target,
        'topHeadPose',
        {
          headMatrix: headMatrixArray,
          viewMatrix: viewMatrixArray,
          target: target,
          source: source,
        },
      ]);
    }

    // Dispatch event to registered callbacks
    this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [
      'onReceivedHeadMatrix',
      headMatrixArray,
      viewMatrixArray,
      camera.fov,
      camera.aspect,
    ]);
  }

  frame(camera) {
    this.sendHeadModel(camera);
  }
}
