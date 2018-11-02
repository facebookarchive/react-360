/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule LiveEnvCamera
 */
'use strict';

const NativeMethodsMixin = require('NativeMethodsMixin');
const React = require('React');
const ReactNativeViewAttributes = require('ReactNativeViewAttributes');
const View = require('View');
const requireNativeComponent = require('requireNativeComponent');
const StyleSheetPropType = require('StyleSheetPropType');
const LayoutAndTransformPropTypes = require('LayoutAndTransformPropTypes');

const createReactClass = require('create-react-class');

/**
 * Displays the environment facing camera. By default the camera is position:'absolute'
 * `<LiveEnvCamera />`
 * The camera image is displayed on geometry that is 1000m away from the viewer
 */
const LiveEnvCamera = createReactClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformPropTypes),
  },

  viewConfig: {
    uiViewClassName: 'LiveEnvCamera',
    validAttributes: {
      ...ReactNativeViewAttributes.RCTView,
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
    // default panos to being a render group
    if (!props.style.renderGroup) {
      props.style.renderGroup = true;
    }

    return (
      <RKLiveEnvCamera
        {...props}
        testID={this.props.testID}
        onStartShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}>
        {this.props.children}
      </RKLiveEnvCamera>
    );
  },
});

const RKLiveEnvCamera = requireNativeComponent('LiveEnvCamera', LiveEnvCamera, {
  nativeOnly: {},
});

module.exports = LiveEnvCamera;
