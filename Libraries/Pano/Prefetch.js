/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Prefetch
 */
'use strict';

const NativeMethodsMixin = require('NativeMethodsMixin');
const PropTypes = require('prop-types');
const React = require('React');
const View = require('View');

const createReactClass = require('create-react-class');
const requireNativeComponent = require('requireNativeComponent');
const resolveAssetSource = require('resolveAssetSource');

/**
 * Prefetch is a component that declaratively hints the need to download and cache
 * pano images
 */
const Prefetch = createReactClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,

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
  },

  getDefaultProps: function() {
    return {};
  },

  render: function() {
    const props = {...this.props} || {};

    const source = resolveAssetSource(this.props.source);
    if (!source) {
      // If source is not defined, set uri to undefined and RCTPano will
      // handle the undefined uri
      props.source = {uri: undefined};
    } else {
      props.source = source;
    }

    return (
      <RKPrefetch {...props}>
        {this.props.children}
      </RKPrefetch>
    );
  },
});

const RKPrefetch = requireNativeComponent('Prefetch', Prefetch, {});

module.exports = Prefetch;
