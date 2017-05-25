/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Sphere
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
 * Sphere constructs a sphere-type 3D primitive in your scene.
 *
 * It can be sized through a `radius` property, which takes numeric values
 * measured in meters. You can also specify the number of width and height
 * segments with the `widthSegments` and `heightSegments` props.
 *
 * ```
 * <Sphere
 *   radius={0.5}
 *   widthSegments={20}
 *   heightSegments={12}
 * />
 * ```
 *
 * Like all 3D primitives, Sphere also supports the `lit`, `texture`, and `wireframe` props.
 * If `lit` is true, the Sphere's materials are affected by scene lighting.
 * If `wireframe` is true, the Sphere will render in a wireframe style.
 * If `texture` is specified, React VR will look up the corresponding image
 * and use it to texture the Sphere. This can be a string, an asset() call, or a require().
 *
 * <Sphere
 *   lit={true}
 *   texture={asset('orb.png')}
 * />
 */

const Sphere = React.createClass({
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
     * `texture` is a string specifying the url of the texture to be used for the sphere,
     * this will be an http address
     * the image is wrap around the sphere
     */
    texture: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),

    /**
     * Specifying true for this property will cause the object to be displayed as a wireframe
     */
    wireframe: PropTypes.bool,

    /**
     * The radius in meters of the sphere
     */
    radius: PropTypes.number,

    /**
     * The number of segments around the sphere, large corresponds to a smoother sphere but
     * will be slower to render
     */
    widthSegments: PropTypes.number,

    /**
     * The number of segments between the poles of the sphere, large corresponds to a smoother
     * sphere but will be slower to render
     */
    heightSegments: PropTypes.number,
  },

  viewConfig: {
    uiViewClassName: 'Sphere',
    validAttributes: {
      ...ReactNativeViewAttributes.RCTView,
      radius: true,
      widthSegments: true,
      heightSegments: true,
    },
  },

  getDefaultProps() {
    return {
      radius: 0.5,
      widthSegments: 8,
      heightSegments: 6,
    };
  },

  render() {
    let {texture, ...rest} = this.props;
    if (typeof texture === 'number') {
      texture = resolveAssetSource(texture);
    }
    rest.style = rest.style || {};
    return <RKSphere {...rest} texture={texture} />;
  },
});

const RKSphere = requireNativeComponent('Sphere', Sphere, {});

module.exports = Sphere;
