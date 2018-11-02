/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ViewStylePropTypes
 * @flow
 */
'use strict';

const ColorPropType = require('ColorPropType');
const PropTypes = require('prop-types');

const OriginalViewStylePropTypes = require('react-native/Libraries/Components/View/ViewStylePropTypes');

const ViewStylePropTypes = {
  ...OriginalViewStylePropTypes,

  gradientColorA: ColorPropType,
  gradientColorB: ColorPropType,
  gradientAngle: PropTypes.string,
};

module.exports = ViewStylePropTypes;
