/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Scene
 */
'use strict';

const NativeMethodsMixin = require('NativeMethodsMixin');
const React = require('React');
const ReactNativeViewAttributes = require('ReactNativeViewAttributes');
const View = require('View');
const StyleSheetPropType = require('StyleSheetPropType');
const LayoutAndTransformPropTypes = require('LayoutAndTransformPropTypes');

const createReactClass = require('create-react-class');
const requireNativeComponent = require('requireNativeComponent');

/**
 * The Scene transform represents the camera location in the world.
 *
 * There should only be a single Scene node within a React VR view tree.
 * The transform of a Scene node, rather than affecting any children, is
 * instead the transform of the camera in the scene.
 */
const Scene = createReactClass({
  mixins: [NativeMethodsMixin],

  viewConfig: {
    uiViewClassName: 'Scene',
    validAttributes: ReactNativeViewAttributes.RCTView,
  },

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformPropTypes),
    /**
     */
  },

  getDefaultProps: function() {
    return {};
  },

  render: function() {
    // TODO: prevent propagation of changes to 'transform' property up the view hierarchy
    // the viewer transform change is handled via the runtime
    return (
      <RKScene
        {...this.props}
        testID={this.props.testID}
        onStartShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}>
        <View>
          {this.props.children}
        </View>
      </RKScene>
    );
  },
});

const RKScene = requireNativeComponent('Scene', Scene, {
  nativeOnly: {},
});

module.exports = Scene;
