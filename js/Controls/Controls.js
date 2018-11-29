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

import {type Quaternion, type Ray, type Vec3} from './Types';
import {type CameraController} from './CameraControllers/Types';
import {type InputChannel, type InputEvent} from './InputChannels/Types';
import {type Raycaster} from './Raycasters/Types';

export default class Controls {
  cameraControllers: Array<CameraController>;
  eventChannels: Array<InputChannel>;
  raycasters: Array<Raycaster>;
  _rayObjects: Array<Ray>;

  constructor() {
    this.cameraControllers = [];
    this.eventChannels = [];
    this.raycasters = [];
    this._rayObjects = [];
  }

  addCameraController(controller: CameraController) {
    this.cameraControllers.push(controller);
  }

  addEventChannel(channel: InputChannel) {
    this.eventChannels.push(channel);
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

  clearEventChannels() {
    this.eventChannels.length = 0;
  }

  clearRaycasters() {
    this.raycasters.length = 0;
  }

  getCameraControllers(): Array<CameraController> {
    return this.cameraControllers.slice();
  }

  getEventChannels(): Array<InputChannel> {
    return this.eventChannels.slice();
  }

  getRaycasters(): Array<Raycaster> {
    return this.raycasters.slice();
  }

  fillEvents(queue: Array<InputEvent>) {
    for (let i = 0; i < this.eventChannels.length; i++) {
      const channel = this.eventChannels[i];
      channel.getEvents(queue);
    }
  }

  fillRays(queue: Array<Ray>) {
    for (let i = 0; i < this.raycasters.length; i++) {
      const caster = this.raycasters[i];
      const rayObject = this._rayObjects[i];
      if (
        caster.fillDirection(rayObject.direction) &&
        caster.fillOrigin(rayObject.origin)
      ) {
        rayObject.type = caster.getType();
        rayObject.maxLength = caster.getMaxLength();
        rayObject.drawsCursor = caster.drawsCursor();
        rayObject.hasAbsoluteCoordinates = caster.hasAbsoluteCoordinates();
        queue.push(rayObject);
      }
    }
  }

  fillCameraProperties(position: Vec3, rotation: Quaternion) {
    for (let i = 0; i < this.cameraControllers.length; i++) {
      const controller = this.cameraControllers[i];
      if (controller.fillCameraProperties(position, rotation)) {
        return;
      }
    }
  }
}
