/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule QuadPanel
 */
'use strict';

const NativeMethodsMixin = require('NativeMethodsMixin');
const PropTypes = require('prop-types');
const React = require('React');
const View = require('View');
const StyleSheetPropType = require('StyleSheetPropType');
const LayoutAndTransformOpacityPropTypes = require('LayoutAndTransformOpacityPropTypes');

const createReactClass = require('create-react-class');
const invariant = require('invariant');
const requireNativeComponent = require('requireNativeComponent');

/**
 * QuadPanel is a special component in React VR that allows drawing the child components
 * to the surface of a quad. This is accomplished by drawing the child components to an offscreen
 * buffer of the specified width and height.
 *
 * ```
 * <QuadPanel
 *   layer={{
 *     width: bufferWidthPx,
 *     height: bufferHeightPx,
 *     density: numberOfPxForACompleteTurn,
 *     distance: distanceFromTheViewer
 *   }}>
 *   ... Child components ...
 * </QuadPanel>
 * ```
 *
 * The width and height of the quad must be specified in pixels when presented at distance units.
 * Density is defaulted to 4680px which has been empirically
 * defined to meet a 1px unit on panel space to 1px on the eye, ie the defaults allow transferal of
 * px units in 2d to work in VR.
 *
 * We recommend leaving the density to the default for the current range of VR displays.
 * Presently the width and height is limited to be not bigger than 4096px.
 *
 * The purpose of the quad layer is to provide a simple means to carry 2d settings and layouts
 * to within VR
 *
 * Child components can determine if within a Panel by using the `isOnLayer` context
 *
 */
const QuadPanel = createReactClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,

    layer: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      distance: PropTypes.number,
      density: PropTypes.number,
    }).isRequired,

    style: StyleSheetPropType(LayoutAndTransformOpacityPropTypes),
  },

  getChildContext(): Object {
    return {isOnLayer: true};
  },
  childContextTypes: {
    isOnLayer: PropTypes.bool,
  },
  contextTypes: {
    isOnLayer: PropTypes.bool,
  },

  getDefaultProps: function() {
    return {};
  },
  render: function() {
    // TODO: prevent propagtion of changes to 'transform' property up the view hierarchy
    const {layer, ...rest} = this.props;
    rest.style = rest.style || {};
    if (!rest.style.renderGroup) {
      rest.style.renderGroup = true;
    }
    invariant(
      layer.width > 0 && layer.width <= 4096,
      'width is not within range of 0 and 4096 ' + layer.width.toString()
    );
    invariant(
      layer.height > 0 && layer.height <= 4096,
      'height is not within range of 0 and 4096 ' + layer.height.toString()
    );
    if (!layer.density) {
      // default density of 4680 maps 1px of panel to 1px in vr view
      layer.density = 4680;
    }
    if (!layer.distance) {
      layer.distance = 4;
    }
    invariant(
      layer.width <= layer.density,
      'width value should be less than density ' + layer.width.toString(),
      layer.density.toString()
    );
    invariant(
      layer.height <= layer.density,
      'height value should be less than density ' + layer.height.toString(),
      layer.density.toString()
    );
    return (
      <RKQuadPanel
        layer={layer}
        {...rest}
        onStartShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}>
        <View style={{position: 'absolute'}}>
          {this.props.children}
        </View>
      </RKQuadPanel>
    );
  },
});

const RKQuadPanel = requireNativeComponent('QuadPanel', QuadPanel, {
  nativeOnly: {},
});

module.exports = QuadPanel;
