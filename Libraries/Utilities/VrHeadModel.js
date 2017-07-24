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
 * VrHeadModel is a utility module that simplifies obtaining the current orientation of the headset.
 *
 * Orientation data contains some latency and is not fully in sync with the display due to how React VR code runs asynchronously from the main render thread.
 */
class VrHeadModelImpl {
  constructor() {
    this.headMatrix = MatrixMath.createIdentityMatrix();
    this.viewMatrix = MatrixMath.createIdentityMatrix();
    this._inVR = false;
    this.fov = 0;
    this.aspect = 1;
    this._headMatrixListener = RCTDeviceEventEmitter.addListener(
      'onReceivedHeadMatrix',
      this._onReceivedHeadMatrix.bind(this)
    );
    RCTDeviceEventEmitter.addListener('onEnterVR', () => {
      this._inVR = true;
    });
    RCTDeviceEventEmitter.addListener('onExitVR', () => {
      this._inVR = false;
    });
  }

  _onReceivedHeadMatrix(headMatrix, viewMatrix, fov, aspect) {
    this.headMatrix = headMatrix;
    this.viewMatrix = viewMatrix;
    this.fov = fov;
    this.aspect = aspect;
  }

  /**
   * Returns the position of the head as [X,Y,Z].
   *
   * If headMatrix is not specified, we use the current orientation of the headset.
   */
  positionOfHeadMatrix(headMatrix) {
    console.warn('positionOfHeadMatrix is deprecated.  Please use position instead');
    const matrix = headMatrix || this.headMatrix;
    return VrMath.getTranslation(matrix);
  }

  /**
   * Returns the rotation as Euler angles in radians.
   *
   * If headMatrix is not specified, we use the current orientation of the headset.
   * If eulerOrder is not specified, we use `YXZ` order, that is Yaw, Pitch, and Roll.
   */
  rotationOfHeadMatrix(headMatrix, eulerOrder) {
    console.warn(
      'rotationOfHeadMatrix is deprecated.  Please use rotation, rotationInRadians, ' +
        'yawPitchRoll or yawPitchRollInRadians instead'
    );
    const matrix = headMatrix || this.headMatrix;
    return VrMath.getRotation(matrix, eulerOrder);
  }

  /**
   * Return the position of the head as [X,Y,Z].
   */
  position() {
    return VrMath.getTranslation(this.headMatrix);
  }

  /**
   * Returns the rotation as Euler angles in degrees.
   *
   * Returns an array in the form:
   * [rotation about X axis, rotation about Y axis, rotation about Z axis]
   */
  rotation() {
    return this.rotationInRadians().map(VrMath.radToDeg);
  }

  /**
   * Returns the rotation as Euler angles in degrees.
   *
   * Returns an array in the form:
   * [rotation about X axis, rotation about Y axis, rotation about Z axis]
   */
  rotationInRadians() {
    return VrMath.getRotation(this.headMatrix);
  }

  /**
   * Return the rotation in yaw, pitch, roll order in degrees.
   *
   * For those new to 3D graphics and who are not former pilots:
   *   Yaw = looking up and down
   *   Pitch = looking to the left and right
   *   Roll = tilting your head from side to side
   *
   * Returns an array of rotations in the form:
   * [Y axis, X axis, Z axis]
   */
  yawPitchRoll() {
    return this.yawPitchRollInRadians().map(VrMath.radToDeg);
  }

  /**
   * Returns the rotation in yaw, pitch, roll order in radians.
   *
   * For those new to 3D graphics and who are not former pilots:
   *   Yaw = looking up and down
   *   Pitch = looking to the left and right
   *   Roll = tilting your head from side to side
   *
   * Returns an array of rotations in the form:
   * [Y axis, X axis, Z axis]
   */
  yawPitchRollInRadians() {
    const rotation = this.rotationInRadians();
    return [rotation[1], rotation[0], rotation[2]];
  }

  /**
   * Returns the horizontal field of view of the camera in degrees.
   */
  horizontalFov() {
    return this.fov;
  }

  /**
   * Returns the vertical field of view of the camera in degrees.
   */
  verticalFov() {
    return this.fov / this.aspect;
  }

  /**
   * Returns the horizontal field of view of the camera in radians.
   */
  horizontalFovInRadians() {
    return VrMath.degToRad(this.horizontalFov());
  }

  /**
   * Returns the vertical field of view of the camera in radians.
   */
  verticalFovInRadians() {
    return VrMath.degToRad(this.verticalFov());
  }
  /**
   * Returns the Head matrix as an array of numbers.
   */
  getHeadMatrix() {
    return [...this.headMatrix];
  }

  /**
   * Returns true if the headset is in use.
   */
  getVRStatus() {
    console.warn('getVRStatus is deprecated.  Please use inVR instead');
    return this._inVR;
  }

  /**
   * Returns true if the headset is in use, false if viewed outside of VR
   */
  inVR() {
    return this._inVR;
  }
}

module.exports = new VrHeadModelImpl();
