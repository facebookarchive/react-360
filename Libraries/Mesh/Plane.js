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
const PropTypes = require('prop-types');
const React = require('React');
const ReactNativeViewAttributes = require('ReactNativeViewAttributes');
const View = require('View');
const StyleSheetPropType = require('StyleSheetPropType');
const LayoutAndTransformColorPropTypes = require('LayoutAndTransformColorPropTypes');

const createReactClass = require('create-react-class');
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
 * If `wireframe` is true, the Plane renders in a wireframe style.
 * If `texture` is specified, React VR looks up the corresponding image
 * and uses it to texture the Plane. This can be a string, an asset() call, or a require().
 *
 * <Plane
 *   lit={true}
 *   texture={asset('floor.png')}
 * />
 */

const Plane = createReactClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformColorPropTypes),

    /**
     * The lit property specifies if the Model is affected by lights placed in the scene.
     */
    lit: PropTypes.bool,

    /**
     * Set material parameters in three.js
     */
    materialParameters: PropTypes.object,

    /**
     * The texture property specifies the url of the texture to be used for the Model.
     * To make texture repeat, pass an object with `repeat` property, for example:
     * `texture={{ ...asset('path/to/texture.jpg'), repeat: [4, 4] }}`
     *
     * First and second element in `repeat` sets how many times texture is repeated
     * in x and y directions.
     */
    texture: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.shape({
        uri: PropTypes.string.isRequired,
        repeat: PropTypes.arrayOf(PropTypes.number),
      }),
    ]),

    /**
     * Specifying true for this property causes the object to be displayed as a wireframe
     */
    wireframe: PropTypes.bool,

    /**
     * Width of the box in meters
     */
    dimWidth: PropTypes.number,

    /**
     * Height of the box in meters
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
    if (!rest.style.position) {
      rest.style.position = 'absolute';
    }
    return <RKPlane {...rest} texture={texture} />;
  },
});

const RKPlane = requireNativeComponent('Plane', Plane, {});

module.exports = Plane;
