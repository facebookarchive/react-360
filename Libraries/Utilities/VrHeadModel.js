/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule VrHeadModel
 */
'use strict';

const MatrixMath = require('MatrixMath');
const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
const VrMath = require('VrMath');

/**
 * VrHeadModel is a util module that simplifies obtaining the current orientation of the headset
 *
 * As React VR code runs asynchronously from the main render thread the data obtained will be laggy
 * so the data should not be expected to be fully in sync with display
 */
class VrHeadModelImpl {
  constructor() {
    this.headMatrix = MatrixMath.createIdentityMatrix();
    this.viewMatrix = MatrixMath.createIdentityMatrix();
    this.inVR = false;
    this.fov = 0;
    this.aspect = 1;
    this._headMatrixListener = RCTDeviceEventEmitter.addListener(
      'onReceivedHeadMatrix',
      this._onReceivedHeadMatrix.bind(this)
    );
    RCTDeviceEventEmitter.addListener('onEnterVR', () => {
      this.inVR = true;
    });
    RCTDeviceEventEmitter.addListener('onExitVR', () => {
      this.inVR = false;
    });
  }

  _onReceivedHeadMatrix(headMatrix, viewMatrix, fov, aspect) {
    this.headMatrix = headMatrix;
    this.viewMatrix = viewMatrix;
    this.fov = fov;
    this.aspect = aspect;
  }

  /**
   * Return position of the head as [X,Y,Z]
   */
  positionOfHeadMatrix(headMatrix) {
    const matrix = headMatrix || this.headMatrix;
    return VrMath.getTranslation(matrix);
  }

  /**
   * Return rotation as Euler angles
   * if eulerOrder is not specified `YXZ` order is used
   */
  rotationOfHeadMatrix(headMatrix, eulerOrder) {
    const matrix = headMatrix || this.headMatrix;
    return VrMath.getRotation(matrix, eulerOrder);
  }

  /**
   * Return the horizontal field of view of the camera
   */
  horizontalFov() {
    return this.fov;
  }

  /**
   * Return the vertical field of view of the camera
   */
  verticalFov() {
    return this.fov / this.aspect;
  }

  /**
   * Return Head matrix as array of numbers
   */
  getHeadMatrix() {
    return [...this.headMatrix];
  }

  /**
   * Return true if the headset is currently used
   */
  getVRStatus() {
    return this.inVR;
  }
}

module.exports = new VrHeadModelImpl();
