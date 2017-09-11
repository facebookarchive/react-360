/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule LayoutAndTransformTintPropTypes
 * @flow
 */
'use strict';

const ColorPropType = require('ColorPropType');
const LayoutPropTypes = require('LayoutPropTypes');
const TransformPropTypes = require('TransformPropTypes');
const PropTypes = require('prop-types');

/**
 * Warning: Some of these properties may not be supported in all releases.
 */
const LayoutAndTransformTintPropTypes = {
  ...LayoutPropTypes,
  ...TransformPropTypes,
  /**
   * Changes the color of all the non-transparent pixels to the tintColor.
   */
  tintColor: ColorPropType,
  opacity: PropTypes.number,
};

module.exports = LayoutAndTransformTintPropTypes;
