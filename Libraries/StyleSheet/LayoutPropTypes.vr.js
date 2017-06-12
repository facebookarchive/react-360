/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule LayoutPropTypes
 * @flow
 */
'use strict';

const ReactPropTypes = require('prop-types');

// We add a few overrides to the original React Native implementation
// Import the original, and add the extra values before re-exporting it
const OriginalLayoutPropTypes = require('react-native/Libraries/StyleSheet/LayoutPropTypes');

const LayoutPropTypes = {
  ...OriginalLayoutPropTypes,

  /** `width` sets the width of this component.
   *
   *  It works similarly to `width` in CSS, but in React Native you
   *  must use points or percentages. Ems and other units are not supported.
   *  See https://developer.mozilla.org/en-US/docs/Web/CSS/width for more details.
   */
  width: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** `height` sets the height of this component.
   *
   *  It works similarly to `height` in CSS, but in React Native you
   *  must use points or percentages. Ems and other units are not supported.
   *  See https://developer.mozilla.org/en-US/docs/Web/CSS/height for more details.
   */
  height: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** `top` is the number of logical pixels to offset the top edge of
   *  this component.
   *
   *  It works similarly to `top` in CSS, but in React Native you
   *  must use points or percentages. Ems and other units are not supported.
   *
   *  See https://developer.mozilla.org/en-US/docs/Web/CSS/top
   *  for more details of how `top` affects layout.
   */
  top: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** `left` is the number of logical pixels to offset the left edge of
   *  this component.
   *
   *  It works similarly to `left` in CSS, but in React Native you
   *  must use points or percentages. Ems and other units are not supported.
   *
   *  See https://developer.mozilla.org/en-US/docs/Web/CSS/left
   *  for more details of how `left` affects layout.
   */
  left: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** `right` is the number of logical pixels to offset the right edge of
   *  this component.
   *
   *  It works similarly to `right` in CSS, but in React Native you
   *  must use points or percentages. Ems and other units are not supported.
   *
   *  See https://developer.mozilla.org/en-US/docs/Web/CSS/right
   *  for more details of how `right` affects layout.
   */
  right: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** `bottom` is the number of logical pixels to offset the bottom edge of
   *  this component.
   *
   *  It works similarly to `bottom` in CSS, but in React Native you
   *  must use points or percentages. Ems and other units are not supported.
   *
   *  See https://developer.mozilla.org/en-US/docs/Web/CSS/bottom
   *  for more details of how `bottom` affects layout.
   */
  bottom: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** `minWidth` is the minimum width for this component, in logical pixels.
   *
   *  It works similarly to `min-width` in CSS, but in React Native you
   *  must use points or percentages. Ems and other units are not supported.
   *
   *  See https://developer.mozilla.org/en-US/docs/Web/CSS/min-width
   *  for more details.
   */
  minWidth: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** `maxWidth` is the maximum width for this component, in logical pixels.
   *
   *  It works similarly to `max-width` in CSS, but in React Native you
   *  must use points or percentages. Ems and other units are not supported.
   *
   *  See https://developer.mozilla.org/en-US/docs/Web/CSS/max-width
   *  for more details.
   */
  maxWidth: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** `minHeight` is the minimum height for this component, in logical pixels.
   *
   *  It works similarly to `min-height` in CSS, but in React Native you
   *  must use points or percentages. Ems and other units are not supported.
   *
   *  See https://developer.mozilla.org/en-US/docs/Web/CSS/min-height
   *  for more details.
   */
  minHeight: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** `maxHeight` is the maximum height for this component, in logical pixels.
   *
   *  It works similarly to `max-height` in CSS, but in React Native you
   *  must use points or percentages. Ems and other units are not supported.
   *
   *  See https://developer.mozilla.org/en-US/docs/Web/CSS/max-height
   *  for more details.
   */
  maxHeight: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** Setting `margin` has the same effect as setting each of
   *  `marginTop`, `marginLeft`, `marginBottom`, and `marginRight`.
   *  See https://developer.mozilla.org/en-US/docs/Web/CSS/margin
   *  for more details.
   */
  margin: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** Setting `marginVertical` has the same effect as setting both
   *  `marginTop` and `marginBottom`.
   */
  marginVertical: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** Setting `marginHorizontal` has the same effect as setting
   *  both `marginLeft` and `marginRight`.
   */
  marginHorizontal: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** `marginTop` works like `margin-top` in CSS.
   *  See https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top
   *  for more details.
   */
  marginTop: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** `marginBottom` works like `margin-bottom` in CSS.
   *  See https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom
   *  for more details.
   */
  marginBottom: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** `marginLeft` works like `margin-left` in CSS.
   *  See https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left
   *  for more details.
   */
  marginLeft: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** `marginRight` works like `margin-right` in CSS.
   *  See https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right
   *  for more details.
   */
  marginRight: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** Setting `padding` has the same effect as setting each of
   *  `paddingTop`, `paddingBottom`, `paddingLeft`, and `paddingRight`.
   *  See https://developer.mozilla.org/en-US/docs/Web/CSS/padding
   *  for more details.
   */
  padding: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** Setting `paddingVertical` is like setting both of
   *  `paddingTop` and `paddingBottom`.
   */
  paddingVertical: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** Setting `paddingHorizontal` is like setting both of
   *  `paddingLeft` and `paddingRight`.
   */
  paddingHorizontal: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** `paddingTop` works like `padding-top` in CSS.
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top
   * for more details.
   */
  paddingTop: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** `paddingBottom` works like `padding-bottom` in CSS.
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom
   * for more details.
   */
  paddingBottom: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** `paddingLeft` works like `padding-left` in CSS.
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left
   * for more details.
   */
  paddingLeft: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /** `paddingRight` works like `padding-right` in CSS.
   * See https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right
   * for more details.
   */
  paddingRight: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  flexBasis: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),

  /**
   * `display` display defines if the component will play a part in the layout and draw passes
   * this is not supported by RN so extending for React VR
   */
  display: ReactPropTypes.oneOf(['flex', 'none']),

  /**
   * `layoutOrigin` defines how the final top and left locations are determined prior to rendering
   * The equivalent is computing the world location by
   * `style.left` = -layoutOrigin[0] * style.width
   * `style.top` = -layoutOrigin[1] * style.height
   * The advantage is that this is calculated after width and height are computed by flex box meaning that
   * it can be used without prior knowledge of the final layout
   * the default is [0,0]
   */
  layoutOrigin: ReactPropTypes.arrayOf(ReactPropTypes.number),

  /**
   * `animation` defines a native per view version of the `LayoutAnimation`
   * This is currently only availble on the native version of react VR
   */
  animation: ReactPropTypes.object,

  /**
   * `renderGroup` defines a component which is used for depth sorting the
   *  components under it. This is generally used on any component which is position
   *  `absolute` and transformed.
   */
  renderGroup: ReactPropTypes.bool,
};

module.exports = LayoutPropTypes;
