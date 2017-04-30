/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CylindricalPanel
 */
'use strict';

const NativeMethodsMixin = require('NativeMethodsMixin');
const PropTypes = require('react/lib/ReactPropTypes');
const React = require('React');
const View = require('View');
const requireNativeComponent = require('requireNativeComponent');
const StyleSheetPropType = require('StyleSheetPropType');
const LayoutAndTransformOpacityPropTypes = require('LayoutAndTransformOpacityPropTypes');
const invariant = require('invariant');

/**
 * CylindricalPanel is a special component in React VR that allows drawing the child components
 * to the inner surface of a cylinder. This is accomplished by drawing the child components to an offscreen
 * buffer of the specified width and height.
 *
 * By default the cylinder placed at the center position of the scene so that the viewer is
 * encapsulated by it.
 *
 * ```
 * <CylindricalPanel
 *   layer={{
 *     width: bufferWidthPx,
 *     height: bufferHeightPx,
 *     density: numberOfPxForACompleteTurn,
 *     radius: distanceFromTheViewer
 *   }}>
 *   ... Child components ...
 * </CylindricalPanel>
 * ```
 *
 * The width and height of the cylinder must be specified and the width also correspond to how much
 * of the arc that the cylinder covers. Density is defaulted to 4680px which has been empirically
 * defined to meet a 1px unit on panel space to 1px on the eye, ie the defaults allow transferal of
 * px units in 2d to work in VR.
 *
 * The degrees in the arc can be computed by (width/density * 360)
 * ie with defaults a cylinder the covers half of the view direction (180 degrees) would have a width
 * of 2340px. We recommend leaving the density to the default for the current range of VR displays.
 * Presently the width is limited to be not bigger than 4096px so should a full 360 degree cylinder
 * be required the density will have to be reduced to a value of 4096.
 *
 * The height is used to compute the height of the cylinder such that the world width and height of
 * a 1px element on the panel remain square eg a 100px by 100px <image> with a 100px by 100px source
 * bitmap would also look square when drawn to the cylinder.
 *
 * The purpose of the cylindrical layer is to provide a simple means to carry 2d settings and layouts
 * to within VR
 *
 * Child components can determine if within a Panel by using the `isOnLayer` context
 *
 */
const CylindricalPanel = React.createClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,

    layer: React.PropTypes.shape({
      width: React.PropTypes.number.isRequired,
      height: React.PropTypes.number.isRequired,
      radius: React.PropTypes.number,
      density: React.PropTypes.number,
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
      layer.height > 0 && layer.height <= 1000,
      'height is not within range of 0 and 1000 ' + layer.height.toString()
    );
    if (!layer.density) {
      // default density of 4680 maps 1px of panel to 1px in vr view
      layer.density = 4680;
    }
    if (!layer.radius) {
      layer.radius = 4;
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
      <RKCylindricalPanel
        layer={layer}
        {...rest}
        onStartShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}>
        <View style={{position: 'absolute'}}>
          {this.props.children}
        </View>
      </RKCylindricalPanel>
    );
  },
});

const RKCylindricalPanel = requireNativeComponent('CylindricalPanel', CylindricalPanel, {
  nativeOnly: {},
});

module.exports = CylindricalPanel;
