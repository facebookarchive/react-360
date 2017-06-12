/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule TransformPropTypes
 * @flow
 */
'use strict';

const ReactPropTypes = require('prop-types');
const deprecatedPropType = require('deprecatedPropType');

const ArrayOfNumberPropType = ReactPropTypes.arrayOf(ReactPropTypes.number);
const NumberOrStringPropType = ReactPropTypes.oneOfType([
  ReactPropTypes.number,
  ReactPropTypes.string,
]);
const NumberOrArrayOfNumberPropType = ReactPropTypes.oneOfType([
  ReactPropTypes.number,
  ArrayOfNumberPropType,
]);

const TransformMatrixPropType = function(
  props: Object,
  propName: string,
  componentName: string,
  ...rest
): ?Error {
  if (props.transform && props.transformMatrix) {
    return new Error('transformMatrix and transform styles cannot be used on the same component');
  }
  return ArrayOfNumberPropType(props, propName, componentName, ...rest);
};

const TransformPropTypes = {
  transform: ReactPropTypes.arrayOf(
    ReactPropTypes.oneOfType([
      ReactPropTypes.shape({perspective: ReactPropTypes.number}),
      ReactPropTypes.shape({rotate: NumberOrStringPropType}),
      ReactPropTypes.shape({rotateX: NumberOrStringPropType}),
      ReactPropTypes.shape({rotateY: NumberOrStringPropType}),
      ReactPropTypes.shape({rotateZ: NumberOrStringPropType}),
      ReactPropTypes.shape({scale: NumberOrArrayOfNumberPropType}),
      ReactPropTypes.shape({scaleX: ReactPropTypes.number}),
      ReactPropTypes.shape({scaleY: ReactPropTypes.number}),
      ReactPropTypes.shape({scaleZ: ReactPropTypes.number}),
      ReactPropTypes.shape({scale3d: ArrayOfNumberPropType}),
      ReactPropTypes.shape({translate: ArrayOfNumberPropType}),
      ReactPropTypes.shape({translateX: ReactPropTypes.number}),
      ReactPropTypes.shape({translateY: ReactPropTypes.number}),
      ReactPropTypes.shape({translateZ: ReactPropTypes.number}),
      ReactPropTypes.shape({skewX: ReactPropTypes.string}),
      ReactPropTypes.shape({skewY: ReactPropTypes.string}),
    ])
  ),
  transformMatrix: TransformMatrixPropType,

  /* Deprecated transform props used on Android only */
  scaleX: deprecatedPropType(ReactPropTypes.number, 'Use the transform prop instead.'),
  scaleY: deprecatedPropType(ReactPropTypes.number, 'Use the transform prop instead.'),
  rotation: deprecatedPropType(ReactPropTypes.number, 'Use the transform prop instead.'),
  translateX: deprecatedPropType(ReactPropTypes.number, 'Use the transform prop instead.'),
  translateY: deprecatedPropType(ReactPropTypes.number, 'Use the transform prop instead.'),
};

module.exports = TransformPropTypes;
