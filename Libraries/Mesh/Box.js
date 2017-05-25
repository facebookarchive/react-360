/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Box
 */
'use strict';

const NativeMethodsMixin = require('NativeMethodsMixin');
const PropTypes = require('react/lib/ReactPropTypes');
const React = require('React');
const ReactNativeViewAttributes = require('ReactNativeViewAttributes');
const View = require('View');
const StyleSheetPropType = require('StyleSheetPropType');
const LayoutAndTransformColorPropTypes = require('LayoutAndTransformColorPropTypes');
const requireNativeComponent = require('requireNativeComponent');
const resolveAssetSource = require('resolveAssetSource');

/**
 * Box constructs a box-type 3D primitive in your scene.
 *
 * It can be sized through `dimWidth`, `dimHeight`, and `dimDepth` properties, which take
 * numeric values measured in meters. If one of these dimensions is not specified,
 * it defaults to 1.
 *
 * ```
 * <Box
 *   dimWidth={2}
 *   dimDepth={2}
 *   dimHeight={1}
 * />
 * ```
 *
 * Like all 3D primitives, Box also supports the `lit`, `texture`, and `wireframe` props.
 * If `lit` is true, the Box's materials are affected by scene lighting.
 * If `wireframe` is true, the Box will render in a wireframe style.
 * If `texture` is specified, React VR will look up the corresponding image
 * and use it to texture the Box. This can be a string, an asset() call, or a require().
 *
 * <Box
 *   lit={true}
 *   texture={asset('crate_512.png')}
 * />
 */
const Box = React.createClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformColorPropTypes),

    /**
     * The lit property specifies if the Model will be affected by lights placed in the scene.
     */
    lit: PropTypes.bool,

    /**
     * `texture` is a string specifying the url of the texture to be used for the Model, this will be
     * an http address
     */
    texture: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),

    /**
     * set material parameters in three.js
     */
    materialParameters: PropTypes.object,

    /**
     * Specifying true for this property will cause the object to be displayed as a wireframe
     */
    wireframe: PropTypes.bool,

    /**
     * width of the box in meters
     */
    dimWidth: PropTypes.number,

    /**
     * height of the box in meters
     */
    dimHeight: PropTypes.number,

    /**
     * depth of the box in meters
     */
    dimDepth: PropTypes.number,
  },

  viewConfig: {
    uiViewClassName: 'Box',
    validAttributes: {
      ...ReactNativeViewAttributes.RCTView,
      dimWidth: true,
      dimHeight: true,
      dimDepth: true,
    },
  },

  getDefaultProps() {
    return {
      dimWidth: 1,
      dimHeight: 1,
      dimDepth: 1,
    };
  },

  render() {
    let {texture, ...rest} = this.props;
    if (typeof texture === 'number') {
      texture = resolveAssetSource(texture);
    }
    rest.style = rest.style || {};
    return <RKBox {...rest} texture={texture} />;
  },
});

const RKBox = requireNativeComponent('Box', Box, {});

module.exports = Box;
