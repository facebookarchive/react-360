/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Sound
 */
'use strict';

const LayoutAndTransformPropTypes = require('LayoutAndTransformPropTypes');
const NativeMethodsMixin = require('NativeMethodsMixin');
const PropTypes = require('react/lib/ReactPropTypes');
const React = require('React');
const StyleSheetPropType = require('StyleSheetPropType');
const View = require('View');

const requireNativeComponent = require('requireNativeComponent');
const resolveAssetSource = require('resolveAssetSource');

/**
 * Sound represents an audio source that is located within the scene. It supports
 * 3D audio so the left/right stereo balance of the sound will change as the listener
 * moves around the scene or turns their head (in VR mode).
 *
 * Example usage:
 * ```
 * <Image style={{height: 2.0, width: 2.0}} source={uri: 'images/waterfall.jpg'}>
 *   <Sound source={uri: 'sounds/waterfall.wav'}>
 * </Image>
 * ```
 *
 * The `source` attribute represents the external resource to load.
 * It should be an asset() statement, or a resource declaration in the form
 * `{uri: 'PATH'}`. Since different browsers support different audio formats,
 * you can also supply a map of formats to their corresponding resource objects,
 * and React VR will pick the supported sound for the browser:
 * ```
 * <Sound
 *   source={{
 *    ogg: asset('ambient.ogg'),
 *    mp3: asset('ambient.mp3'),
 *   }}
 * />
 * ```
 * You can read more about supported audio formats in the docs for the
 * [Sound Effects](docs/vrsoundeffects.html) API.
 *
 * Things to keep in mind when using this component:
 *
 *  * Must be a leaf node with no child components
 *  * Defaults to `style: {position: absolute}`
 */
const Sound = React.createClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformPropTypes),

    /**
     * source audio in the form of `{uri: 'http'}`
     */
    source: PropTypes.object,

    /**
     * Whether audio starts playing automatically when component is loaded.
     * Default is `true`
     */
    autoPlay: PropTypes.bool,

    /**
     * Whether audio repeats automatically when finished playing.
     * Default is `false`
     */
    loop: PropTypes.bool,

    /**
     * Option callback evoked when audio is done playing.
     **/
    onEnded: PropTypes.func,

    /**
     * Controls the playback status.  If not set, the value of `autoPlay` determines
     * whether the audio plays when the component is loaded.
     */
    playStatus: PropTypes.oneOf(['play', 'stop']),

    /**
     * Value of the audio volume. Minimum is zero, which mutes the sound, and the suggested
     * maximum is 1.0, which is also the default value. Values greater than 1 are allowed
     * allowed this may cause clipping / distortion depending on the audio hardware.
     *
     * example: Lower the volume by 50%
     * `volume={0.5}`
     */
    volume: PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      autoPlay: true,
      volume: 1.0,
      loop: false,
      playStatus: null,
      source: null,
    };
  },

  _onEnded: function() {
    this.props.onEnded && this.props.onEnded();
  },

  render: function() {
    const props = {...this.props} || {};
    props.style = props.style || {};
    if (__DEV__) {
      if (props.children) {
        console.warn('<Sound> must be a leaf node, props.children will not be rendered');
      }
    }

    const source = resolveAssetSource(props.source);

    if (source) {
      // Default to 'absolute' position, and pass handle to native side.
      return (
        <RKSound
          style={[{position: 'absolute'}, props.style]}
          {...this.props}
          onEnded={this._onEnded}
          testID={this.props.testID}
          onStartShouldSetResponder={() => true}
          onResponderTerminationRequest={() => false}
        />
      );
    }

    // If no source property, render `null`
    return null;
  },
});

const RKSound = requireNativeComponent('Sound', Sound, {
  nativeOnly: {},
});

module.exports = Sound;
