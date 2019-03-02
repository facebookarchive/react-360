/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow strict
 */

const MappingSharedTouch = [
  false, // thumbstick
  true, // trigger
  false, // grip
  true, // A/X
  false, // B/Y
];
const MappingSharedMSMR = [
  false, // thumbstick
  true, // trigger
  false, // grip
  false, // menu
  true, // trackpad
];

const WellKnownGamepads = {
  // Gear VR HMD Touchpad
  'Gear VR Touchpad': [true],
  // Gear VR Controller
  'Gear VR Controller': [true, true],
  // Oculus Go Controller
  'Oculus Go Controller': [true, true],
  // Daydream controller
  'Daydream Controller': [true],
  // Oculus Touch
  'Oculus Touch (Left)': MappingSharedTouch,
  'Oculus Touch (Right)': MappingSharedTouch,
  // Standard MS Mixed Reality
  'Spatial Controller (Spatial Interaction Source) 045E-065B': MappingSharedMSMR,
  // Samsung Odyssey
  'Spatial Controller (Spatial Interaction Source) 045E-065D': MappingSharedMSMR,
};
export default WellKnownGamepads;
