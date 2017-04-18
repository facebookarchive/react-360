/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Pano
 */
'use strict';

const ColorPropType = require('ColorPropType');
const NativeMethodsMixin = require('NativeMethodsMixin');
const PropTypes = require('react/lib/ReactPropTypes');
const React = require('React');
const View = require('View');
const requireNativeComponent = require('requireNativeComponent');
const resolveAssetSource = require('resolveAssetSource');
const StyleSheetPropType = require('StyleSheetPropType');
const LayoutAndTransformTintPropTypes = require('LayoutAndTransformTintPropTypes');

/**
 * A Sphere of 1000m with center located at the local transform origin
 * by default this is position:'absolute'
 *
 * Panos are images that allows you to view the scene from every angle: above, below,
 * behind and next to you. These are a core image format for VR applications
 * You can create 360 photos by using special 360 camera hardware and these will be
 * usually in the form of Equirectangular images covering the full 360x180 angles
 * an example is
 * ![](https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Botanischer_garten_panorama_mittel.jpg/1280px-Botanischer_garten_panorama_mittel.jpg)
 *
 * Cubemap images are also supported and to enable this the source url is specified as an
 * array of 6 individual images presented in the order `[+x, -x, +y, -y, +z, -z]`
 */
const Pano = React.createClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformTintPropTypes),

    /**
     * source image in the form of
     * `{uri: 'http'}` for a panorama
     * or
     * `[{uri: 'http..'}, {uri: 'http..'}, {uri: 'http..'},
     *   {uri: 'http..'}, {uri: 'http..'}, {uri: 'http..'}]` for a cubemap
     */
    source: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
      }),
      PropTypes.arrayOf(
        PropTypes.shape({
          uri: PropTypes.string,
        })
      ),
      PropTypes.shape({
        tile: PropTypes.string,
        maxDepth: PropTypes.number,
      }),
      // Opaque type returned by require('./image.jpg')
      PropTypes.number,
    ]),

    /**
     * Option onLoad callback called on success
     **/
    onLoad: PropTypes.func,

    /**
     * Option onLoadEnd callback called on success or failure
     **/
    onLoadEnd: PropTypes.func,
  },

  _onLoad: function() {
    this.props.onLoad && this.props.onLoad();
  },

  _onLoadEnd: function() {
    this.props.onLoadEnd && this.props.onLoadEnd();
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

    const source = resolveAssetSource(this.props.source);
    if (!source) {
      // If source is not defined, set uri to undefined and RCTPano will
      // handle the undefined uri
      props.source = {uri: undefined};
    } else {
      props.source = source;
    }

    return (
      <RKPano
        {...props}
        onLoad={this._onLoad}
        onLoadEnd={this._onLoadEnd}
        testID={this.props.testID}
        onStartShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}>
        {this.props.children}
      </RKPano>
    );
  },
});

const RKPano = requireNativeComponent('Pano', Pano, {
  nativeOnly: {},
});

module.exports = Pano;
