/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SpotLight
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

/**
 * Light originates from a single point, and spreads outward in a cone.
 *
 * Representation of
 * https://threejs.org/docs/index.html#api/lights/SpotLight
 */
const SpotLight = createReactClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformColorPropTypes),

    /**
     * In "physically correct" mode, the product of color * intensity is
     * interpreted as luminous intensity measured in candela.
     */
    intensity: PropTypes.number,
    /**
     * If non-zero, light attenuates linearly from maximum intensity at
     * light position down to zero at distance.
     */
    distance: PropTypes.number,
    /**
     * The amount the light dims along the distance of the light.
     * In "physically correct" mode, decay = 2 leads to physically realistic light falloff.
     */
    decay: PropTypes.number,

    /**
     * Maximum angle of light dispersion from its direction whose upper bound is Math.PI/2.
     */
    angle: PropTypes.number,
    /**
     * Percent of the spotlight cone that is attenuated due to penumbra. Takes
     * values between zero and 100. Default is zero.
     */
    penumbra: PropTypes.number,
  },

  viewConfig: {
    uiViewClassName: 'SpotLight',
    validAttributes: {
      ...ReactNativeViewAttributes.RCTView,
      intensity: true,
      distance: true,
      decay: true,
      angle: true,
      penumbra: true,
    },
  },

  getDefaultProps: function() {
    return {};
  },

  render: function() {
    const props = {...this.props} || {};
    props.style = props.style || {};
    if (!props.style.position) {
      props.style.position = 'absolute';
    }
    return (
      <RKSpotLight
        {...props}
        testID={this.props.testID}
        onStartShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}>
        {this.props.children}
      </RKSpotLight>
    );
  },
});

const RKSpotLight = requireNativeComponent('SpotLight', SpotLight, {
  nativeOnly: {},
});

module.exports = SpotLight;
