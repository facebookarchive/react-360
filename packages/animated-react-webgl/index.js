/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const Animated = require('animated');
const ReactWebGL = require('react-webgl');
const createAnimatedComponent = require('./createAnimatedComponent');

Animated.inject.FlattenStyle(ReactWebGL.StyleSheet.flatten);

module.exports = {
  ...Animated,
  createAnimatedComponent,
  View: createAnimatedComponent('quad'),
  Text: createAnimatedComponent('text'),
  Image: createAnimatedComponent('image'),
};
