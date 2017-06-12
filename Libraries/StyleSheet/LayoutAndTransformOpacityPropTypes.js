/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule LayoutAndTransformOpacityPropTypes
 * @flow
 */
'use strict';

const LayoutPropTypes = require('LayoutPropTypes');
const PropTypes = require('prop-types');
const TransformPropTypes = require('TransformPropTypes');

/**
 * Warning: Some of these properties may not be supported in all releases.
 */
const LayoutAndTransformOpacityPropTypes = {
  ...LayoutPropTypes,
  ...TransformPropTypes,
  opacity: PropTypes.number,
};

module.exports = LayoutAndTransformOpacityPropTypes;
