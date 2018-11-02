/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactNativeViewAttributes
 * @flow
 */
'use strict';

const ReactNativeStyleAttributes = require('ReactNativeStyleAttributes');

const ReactNativeViewAttributes = {};

ReactNativeViewAttributes.UIView = {
  pointerEvents: true,
  accessible: true,
  accessibilityLabel: true,
  accessibilityComponentType: true,
  accessibilityLiveRegion: true,
  accessibilityTraits: true,
  importantForAccessibility: true,
  testID: true,
  renderToHardwareTextureAndroid: true,
  shouldRasterizeIOS: true,
  onLayout: true,
  onAccessibilityTap: true,
  onMagicTap: true,
  onEnter: true,
  onExit: true,
  onInput: true,
  onGazeEnter: true,
  onGazeExit: true,
  onMouseEnter: true,
  onMouseExit: true,
  onChange: true,
  onHeadPose: true,
  onGazeInput: true,
  onGazeHeadPose: true,
  onMouseInput: true,
  onMouseHeadPose: true,
  onChangeCaptured: true,
  onInputCaptured: true,
  onHeadPoseCaptured: true,
  onGazeInputCaptured: true,
  onGazeHeadPoseCaptured: true,
  onMouseInputCaptured: true,
  onMouseHeadPoseCaptured: true,
  collapsable: true,
  needsOffscreenAlphaCompositing: true,
  style: ReactNativeStyleAttributes,
};

ReactNativeViewAttributes.RCTView = {
  ...ReactNativeViewAttributes.UIView,

  // This is a special performance property exposed by RCTView and useful for
  // scrolling content when there are many subviews, most of which are offscreen.
  // For this property to be effective, it must be applied to a view that contains
  // many subviews that extend outside its bound. The subviews must also have
  // overflow: hidden, as should the containing view (or one of its superviews).
  removeClippedSubviews: true,
};

module.exports = ReactNativeViewAttributes;
