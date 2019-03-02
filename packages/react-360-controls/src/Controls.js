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

import {
  type CameraController,
  type Mat4,
  type Quaternion,
  type Ray,
  type Raycaster,
  type Vec3,
} from './ControlsTypes';

function rotationFromQuaternion(rot: Mat4, quat: Quaternion) {
  const x = quat[0];
  const y = quat[1];
  const z = quat[2];
  const w = quat[3];

  const s = 2 / Math.sqrt(x * x + y * y + z * z + w * w);
  rot[0] = 1 - s * (y * y + z * z);
  rot[1] = s * (x * y - z * w);
  rot[2] = s * (x * z + y * w);
  rot[3] = 0;
  rot[4] = s * (x * y + z * w);
  rot[5] = 1 - s * (x * x + z * z);
  rot[6] = s * (y * z - x * w);
  rot[7] = 0;
  rot[8] = s * (x * z - y * w);
  rot[9] = s * (y * z + x * w);
  rot[10] = 1 - s * (x * x + y * y);
  rot[11] = 0;
  rot[12] = 0;
  rot[13] = 0;
  rot[14] = 0;
  rot[15] = 1;
}

export default class Controls {
  cameraControllers: Array<CameraController>;
  raycasters: Array<Raycaster>;
  _cameraPosition: Vec3;
  _cameraQuat: Quaternion;
  _cameraView: Mat4;
  _rayObjects: Array<Ray>;

  constructor() {
    this.cameraControllers = [];
    this.raycasters = [];
    this._rayObjects = [];

    this._cameraPosition = [0, 0, 0];
    this._cameraQuat = [0, 0, 0, 1];
    // prettier-ignore
    this._cameraView = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];
  }

  addCameraController(controller: CameraController) {
    this.cameraControllers.push(controller);
  }

  addRaycaster(caster: Raycaster) {
    this.raycasters.push(caster);
    this._rayObjects.push({
      direction: [0, 0, 0],
      drawsCursor: false,
      hasAbsoluteCoordinates: false,
      maxLength: Infinity,
      origin: [0, 0, 0],
      type: '',
    });
  }

  clearCameraControllers() {
    this.cameraControllers.length = 0;
  }

  clearRaycasters() {
    this.raycasters.length = 0;
  }

  getCameraControllers(): Array<CameraController> {
    return this.cameraControllers.slice();
  }

  getRaycasters(): Array<Raycaster> {
    return this.raycasters.slice();
  }

  getCameraPosition(): Vec3 {
    return this._cameraPosition;
  }

  getCameraQuaternion(): Quaternion {
    return this._cameraQuat;
  }

  getCameraViewMatrix(): Mat4 {
    return this._cameraView;
  }

  fillCameraProperties(position: Vec3, rotation: Quaternion) {
    for (let i = 0; i < this.cameraControllers.length; i++) {
      const controller = this.cameraControllers[i];
      if (controller.fillCameraProperties(position, rotation)) {
        return;
      }
    }
  }

  fillRays(queue: Array<Ray>) {
    for (let i = 0; i < this.raycasters.length; i++) {
      const caster = this.raycasters[i];
      const rayObject = this._rayObjects[i];
      if (caster.fillDirection(rayObject.direction) && caster.fillOrigin(rayObject.origin)) {
        rayObject.type = caster.getType();
        rayObject.maxLength = caster.getMaxLength();
        rayObject.drawsCursor = caster.drawsCursor();
        rayObject.hasAbsoluteCoordinates = caster.hasAbsoluteCoordinates();
        queue.push(rayObject);
        return;
      }
    }
  }

  updateCamera() {
    this.fillCameraProperties(this._cameraPosition, this._cameraQuat);
    rotationFromQuaternion(this._cameraView, this._cameraQuat);
    const px = -this._cameraPosition[0];
    const py = -this._cameraPosition[1];
    const pz = -this._cameraPosition[2];
    this._cameraView[12] =
      this._cameraView[0] * px + this._cameraView[4] * py + this._cameraView[8] * pz;
    this._cameraView[13] =
      this._cameraView[1] * px + this._cameraView[5] * py + this._cameraView[9] * pz;
    this._cameraView[14] =
      this._cameraView[2] * px + this._cameraView[6] * py + this._cameraView[10] * pz;
  }
}
