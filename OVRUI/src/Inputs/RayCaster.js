/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Abstract implementation of a RayCaster. Override the getRayOrigin and
 * getRayDirection methods to implement your own RayCaster.
 */
export default class RayCaster {
  getType() {
    // Return a unique string identifier to send along with input events.
    // This can be used on the React side to determine the type of raycaster
    // that triggered an onEnter / onExit event, allowing the application to
    // provide different behavior for different input schemes..
    throw new Error('RayCaster subclasses must override getType()');
  }

  frame(startTime) {
    // Run any per-frame updates, like modifying the rendered
  }

  getRayOrigin(camera) {
    // Return the origin of the ray, relative to the camera's position.
    // Returned value should either be an array of 3 values (x, y, z),
    // or null. Returning a falsy value will cause React VR to use another
    // RayCaster to determine the cursor position.
    throw new Error('RayCaster subclasses must override getRayOrigin()');
  }

  getRayDirection(camera) {
    // Return the direction vector of the ray, relative to the camera.
    // Returned value should either be an array of 3 values (x, y, z),
    // or null. Returning a falsy value will cause React VR to use another
    // RayCaster to determine the cursor position.
    throw new Error('RayCaster subclasses must override getRayDirection()');
  }

  drawsCursor() {
    // Return a boolean determining whether this ray caster can draw a cursor.
    // The application will control when it's shown, but cursors can be
    // completely disabled by returning false here.
    return true;
  }
}
