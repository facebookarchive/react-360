/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Plane
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
 * Plane constructs a plane-type 3D primitive in your scene.
 *
 * It can be sized through `dimWidth` and `dimHeight` properties, which take numeric
 * values measured in meters. If not specified, these props default to 1.
 *
 * ```
 * <Plane
 *   dimWidth={10}
 *   dimHeight={10}
 * />
 * ```
 *
 * Like all 3D primitives, Plane also supports the `lit`, `texture`, and `wireframe` props.
 * If `lit` is true, the Plane's materials are affected by scene lighting.
 * If `wireframe` is true, the Plane will render in a wireframe style.
 * If `texture` is specified, React VR will look up the corresponding image
 * and use it to texture the Plane. This can be a string, an asset() call, or a require().
 *
 * <Plane
 *   lit={true}
 *   texture={asset('floor.png')}
 * />
 */

const Plane = React.createClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformColorPropTypes),

    /**
     * The lit property specifies if the Model will be affected by lights placed in the scene.
     */
    lit: PropTypes.bool,

    /**
     * set material parameters in three.js
     */
    materialParameters: PropTypes.object,

    /**
     * `texture` is a string specifying the url of the texture to be used for the Plane face,
     * this will be an http address
     */
    texture: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),

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
  },

  viewConfig: {
    uiViewClassName: 'Plane',
    validAttributes: {
      ...ReactNativeViewAttributes.RCTView,
      dimWidth: true,
      dimHeight: true,
    },
  },

  getDefaultProps() {
    return {
      dimWidth: 1,
      dimHeight: 1,
    };
  },

  render() {
    let {texture, ...rest} = this.props;
    if (typeof texture === 'number') {
      texture = resolveAssetSource(texture);
    }
    rest.style = rest.style || {};
    return <RKPlane {...rest} texture={texture} />;
  },
});

const RKPlane = requireNativeComponent('Plane', Plane, {});

module.exports = Plane;
