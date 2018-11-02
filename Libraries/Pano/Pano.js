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

const NativeMethodsMixin = require('NativeMethodsMixin');
const PropTypes = require('prop-types');
const React = require('React');
const ReactNativeViewAttributes = require('ReactNativeViewAttributes');
const View = require('View');
const StyleSheetPropType = require('StyleSheetPropType');
const LayoutAndTransformTintPropTypes = require('LayoutAndTransformTintPropTypes');

const createReactClass = require('create-react-class');
const requireNativeComponent = require('requireNativeComponent');
const resolveAssetSource = require('resolveAssetSource');

/**
 * A Sphere of 1000m with center located at the local transform origin.
 * By default this is `position:'absolute'`.
 *
 * Panos are images projected onto a sphere that fully surrounds the viewer.
 * These are a core image format for VR applications.
 * You can create 360 photos by using special 360 camera hardware. These will be
 * usually in the form of Equirectangular images covering full 360° horizontal and 180°
 * vertical angles. Here is an example:
 * ![](https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Botanischer_garten_panorama_mittel.jpg/1280px-Botanischer_garten_panorama_mittel.jpg)
 *
 * Cubemap images are also supported by specifying the source url as an
 * array of 6 individual images, presented in the order `[+x, -x, +y, -y, +z, -z]`
 */
const Pano = createReactClass({
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
     * or
     * `[{uri: 'http..'}, {uri: 'http..'}, {uri: 'http..'},
     *   {uri: 'http..'}, {uri: 'http..'}, {uri: 'http..'},
     *   {uri: 'http..'}, {uri: 'http..'}, {uri: 'http..'},
     *   {uri: 'http..'}, {uri: 'http..'}, {uri: 'http..'}]` for a stereo
     * cubemap where the first 6 images are the left eye cubemap and the
     * following 6 are the right eye cubemap.
     *
     * stereo(optional): the stereo format of a panorama: '2D' | 'TOP_BOTTOM_3D' |
     * 'BOTTOM_TOP_3D' | 'LEFT_RIGHT_3D' | 'RIGHT_LEFT_3D'
     *
     * If stereo is not a supported stereo format, it'll by default use '2D'
     */
    source: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
        stereo: PropTypes.string,
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

  viewConfig: {
    uiViewClassName: 'Pano',
    validAttributes: {
      ...ReactNativeViewAttributes.RCTView,
    },
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
