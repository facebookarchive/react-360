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

/* eslint-disable import/no-commonjs */

// Entry point for the react-360 npm module

const React360 = {
  // React Native overrides
  get View() {
    return require('View');
  },
  get Image() {
    return require('Image');
  },
  get Text() {
    return require('Text');
  },

  // VR Components and modules
  get AmbientLight() {
    return require('AmbientLight');
  },
  get Box() {
    return require('Box');
  },
  get LiveEnvCamera() {
    return require('LiveEnvCamera');
  },
  get Cylinder() {
    return require('Cylinder');
  },
  get CylindricalPanel() {
    return require('CylindricalPanel');
  },
  get QuadPanel() {
    return require('QuadPanel');
  },
  get Plane() {
    return require('Plane');
  },
  get Sphere() {
    return require('Sphere');
  },
  get DirectionalLight() {
    return require('DirectionalLight');
  },
  get PointLight() {
    return require('PointLight');
  },
  get SpotLight() {
    return require('SpotLight');
  },
  get Model() {
    return require('Model');
  },
  get Pano() {
    return require('Pano');
  },
  get Prefetch() {
    return require('Prefetch');
  },
  get Scene() {
    return require('Scene');
  },
  get Sound() {
    return require('Sound');
  },
  get Video() {
    return require('Video');
  },
  get VideoPano() {
    return require('VideoPano');
  },
  get VideoControl() {
    return require('VideoControl');
  },
  get MediaPlayerState() {
    return require('MediaPlayerState');
  },
  get VrAnimated() {
    return require('VrAnimated');
  },
  get VrButton() {
    return require('VrButton');
  },
  get VrHeadModel() {
    return require('VrHeadModel');
  },
  get VrSoundEffects() {
    return require('VrSoundEffects');
  },

  get Environment() {
    return require('Environment');
  },

  // React VR-specific utilities
  get asset() {
    return require('asset');
  },
  get staticAssetURL() {
    return require('staticAssetURL').default;
  },
  get texture() {
    return require('texture');
  },

  // Direct access to RN properties
  get Animated() {
    return require('Animated');
  },
  get AppRegistry() {
    return require('AppRegistry');
  },
  get AsyncStorage() {
    return require('AsyncStorage');
  },
  get NativeModules() {
    return require('NativeModules');
  },
  get StyleSheet() {
    return require('StyleSheet');
  },
};

module.exports = React360;
