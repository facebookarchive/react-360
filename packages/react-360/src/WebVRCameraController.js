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

export default class WebVRCameraController {
  _display: ?VRDisplay;
  _frameData: VRFrameData;

  constructor(frameData: VRFrameData) {
    this._display = null;
    this._frameData = frameData;
  }

  setDisplay(display: ?VRDisplay) {
    this._display = display;
  }

  fillCameraProperties(
    cameraPos: [number, number, number],
    cameraQuat: [number, number, number, number]
  ): boolean {
    if (!this._display || !this._display.isPresenting) {
      return false;
    }

    // Fill camera properties from VR Display
    this._display.getFrameData(this._frameData);
    const pose = this._frameData.pose;
    if (pose.position) {
      const position = pose.position;
      cameraPos[0] = position[0];
      cameraPos[1] = position[1];
      cameraPos[2] = position[2];
    }
    if (pose.orientation) {
      const orientation = pose.orientation;
      cameraQuat[0] = orientation[0];
      cameraQuat[1] = orientation[1];
      cameraQuat[2] = orientation[2];
      cameraQuat[3] = orientation[3];
    }

    return true;
  }
}
