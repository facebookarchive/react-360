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
const PropTypes = require('prop-types');
const React = require('React');
const View = require('View');
const StyleSheetPropType = require('StyleSheetPropType');
const LayoutAndTransformOpacityPropTypes = require('LayoutAndTransformOpacityPropTypes');

const createReactClass = require('create-react-class');
const invariant = require('invariant');
const requireNativeComponent = require('requireNativeComponent');

/**
 * The primary purpose of CylindricalPanel is to provide a simple means
 * of carrying settings and layouts from 2D into VR. CylindricalPanel
 * draws child components to the inner surface of a cylinder by first
 * drawing the child components to an offscreen buffer of the specified
 * width and height.
 *
 * By default, the cylinder placed at the center position of the scene so that the viewer is
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
 * The width and height of the cylinder must be specified, and the width must also correspond to
 * the arc that the cylinder covers. The default Density is 4680px, which has been empirically
 * defined to match a 1px unit on panel space to 1px on the eye. That is, the defaults allow transferring
 * pixel units from 2D to also work in VR.
 *
 * The degrees in the arc can be computed by (width/density * 360).
 * For example, with the default values, a cylinder covering half of the view direction (180 degrees) would have a width
 * of 2340px. We recommend leaving the density to the default for the current range of VR displays.
 * Presently, the maximum width is limited to 4096px, so if you require a full 360 degree cylinder,
 * the density must be reduced to a value of 4096.
 *
 * The height is used to compute the height of the cylinder such that the world width and height of
 * a 1px element on the panel remain square. For example, a 100px by 100px <image> with a 100px by 100px source
 * bitmap would also look square when drawn to the cylinder.
 *
 * Child components can determine if they are within a Panel by using the `isOnLayer` context
 *
 */
const CylindricalPanel = createReactClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,

    layer: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      radius: PropTypes.number,
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
