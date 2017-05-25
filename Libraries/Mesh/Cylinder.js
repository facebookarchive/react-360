/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Cylinder
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
 * Cylinder constructs a cylinder-type 3D primitive in your scene.
 *
 * It can be sized through `dimHeight`, `radiusTop`, and `radiusBottom` properties, which take
 * numeric values measured in meters. You can also specify the number of segments
 * in the cylinder with the `segments` property.
 *
 * ```
 * // Round cylinder
 * <Cylinder
 *   radiusTop={0.5}
 *   radiusBottom={0.5}
 *   dimHeight={2}
 *   segments={12}
 * />
 *
 * // Cone
 * <Cylinder
 *   radiusTop={0}
 *   radiusBottom={1}
 *   dimHeight={2}
 *   segments={12}
 * />
 * ```
 *
 * Like all 3D primitives, Cylinder also supports the `lit`, `texture`, and `wireframe` props.
 * If `lit` is true, the Cylinder's materials are affected by scene lighting.
 * If `wireframe` is true, the Cylinder will render in a wireframe style.
 * If `texture` is specified, React VR will look up the corresponding image
 * and use it to texture the Cylinder. This can be a string, an asset() call, or a require().
 *
 * <Cylinder
 *   lit={true}
 *   texture={asset('column.png')}
 * />
 */

const Cylinder = React.createClass({
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
     * Specifying true for this property will cause the object to be displayed as a wireframe
     */
    wireframe: PropTypes.bool,

    /**
     * Radius of the cylinder top in meters
     */
    radiusTop: PropTypes.number,

    /**
     * Radius of the cylinder bottom in meters
     */
    radiusBottom: PropTypes.number,

    /**
     * Height of the cylinder in meters
     */
    dimHeight: PropTypes.number,

    /**
     * Number of segments around the cylinder
     * higher numbers corresponds to a smoother cylinder
     */
    segments: PropTypes.number,

    /**
     * set material parameters in three.js
     */
    materialParameters: PropTypes.object,
  },

  viewConfig: {
    uiViewClassName: 'Cylinder',
    validAttributes: {
      ...ReactNativeViewAttributes.RCTView,
      radiusTop: true,
      radiusBottom: true,
      dimHeight: true,
      segments: true,
    },
  },

  getDefaultProps() {
    return {
      radiusTop: 0.5,
      radiusBottom: 0.5,
      dimHeight: 1,
      segments: 8,
    };
  },

  render() {
    let {texture, ...rest} = this.props;
    if (typeof texture === 'number') {
      texture = resolveAssetSource(texture);
    }
    rest.style = rest.style || {};
    return <RKCylinder {...rest} texture={texture} />;
  },
});

const RKCylinder = requireNativeComponent('Cylinder', Cylinder, {});

module.exports = Cylinder;
