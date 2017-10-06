/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule AmbientLight
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
 * A light that affects all objects in the scene equally and from all directions.
 *
 * The [Wikipedia](https://en.wikipedia.org/wiki/Shading#Ambient_lighting) definition is as follows:
 * An ambient light source represents an omni-directional, fixed-intensity and
 * fixed-color light source that affects all objects in the scene equally. Upon rendering,
 * all objects in the scene are brightened with the specified intensity and color.
 * This type of light source is mainly used to provide the scene with a basic view of the
 * different objects in it. This is the simplest type of lighting to implement and models
 * how light can be scattered or reflected many times producing a uniform effect.
 *
 * Representation of
 *
 * https://threejs.org/docs/index.html#api/lights/AmbientLight
 */
const AmbientLight = createReactClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformColorPropTypes),

    /**
     * Intensity of the light
     */
    intensity: PropTypes.number,
  },

  viewConfig: {
    uiViewClassName: 'AmbientLight',
    validAttributes: {
      ...ReactNativeViewAttributes.RCTView,
      intensity: true,
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
      <RKAmbientLight
        {...props}
        testID={this.props.testID}
        onStartShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}>
        {this.props.children}
      </RKAmbientLight>
    );
  },
});

const RKAmbientLight = requireNativeComponent('AmbientLight', AmbientLight, {
  nativeOnly: {},
});

module.exports = AmbientLight;
