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
const PropTypes = require('prop-types');
const React = require('React');
const ReactNativeViewAttributes = require('ReactNativeViewAttributes');
const UIManager = require('UIManager');
const ReactNative = require('ReactNative');
const StyleSheetPropType = require('StyleSheetPropType');
const View = require('View');

const createReactClass = require('create-react-class');
const requireNativeComponent = require('requireNativeComponent');
const resolveAssetSource = require('resolveAssetSource');

/**
 * Sound represents an audio source located within the scene. It supports
 * 3D positional audio, changing the stereo balance of the sound as the
 * listener moves around the scene or turns their head in VR.
 *
 * Example usage:
 * ```
 * <Image style={{height: 2.0, width: 2.0}} source={uri: 'images/waterfall.jpg'}>
 *   <Sound source={uri: 'sounds/waterfall.wav'} />
 * </Image>
 * ```
 *
 * The `source` attribute represents the external resource to load.
 * It should be an `asset()`` statement, or a resource declaration in the form
 * `{uri: 'PATH'}`. Since different browsers support different audio formats,
 * you can also supply a map of formats to their corresponding resource objects,
 * and React VR can select the sound file supported by the browser:
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
const Sound = createReactClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformPropTypes),

    /**
     * Source audio in the form of `{uri: 'http'}`
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
     * Whether the audio is muted.
     * Default is `false`.
     */
    muted: PropTypes.bool,

    /**
     * Option callback evoked when audio is done playing.
     **/
    onEnded: PropTypes.func,

    /**
     * Option callback evoked when video duration changed.
     * event.nativeEvent.duration - the duration of video
     **/
    onDurationChange: PropTypes.func,

    /**
     * Option callback evoked when video currentTime of video changed.
     * event.nativeEvent.currentTime - the currentTime of video
     **/
    onTimeUpdate: PropTypes.func,

    /**
     * Option callback evoked when video play status changed.
     * event.nativeEvent.playStatus - the play status of video:
     * play status is one of 'closed' | 'loading' | 'error' | 'ended' | 'paused' | 'playing' | 'ready'
     **/
    onPlayStatusChange: PropTypes.func,

    /**
     * Controls the playback status.  If not set, the value of `autoPlay` determines
     * whether the audio plays when the component is loaded.
     * This prop is scheduled to be deprecated. Use `playControl` instead.
     */
    playStatus: PropTypes.oneOf(['play', 'pause', 'stop']),

    /**
     * Controls the playback status.  If not set, the value of `autoPlay` determines
     * whether the audio plays when the component is loaded.
     */
    playControl: PropTypes.oneOf(['play', 'pause', 'stop']),

    /**
     * playerState - playerState is a `MediaPlayerState` that controls video
     * playback with its inner state. When playerState is set, the value of
     * `autoPlay`, `muted` `volume` and `playControl` properties are ignored
     * as they will be set by playerState instead.
     * See [MediaPlayerState](docs/mediaplayerstate.html)
     */
    playerState: PropTypes.object,

    /**
     * Value of the audio volume. The minimum value 0 mutes the sound.
     * The suggested maximum is 1.0, which is also the default value.
     * Values greater than 1.0 are allowed, but may cause clipping or
     * distortion depending on the audio hardware.
     *
     * For example: Lower the volume by 50%
     *
     * `volume={0.5}`
     */
    volume: PropTypes.number,
  },

  viewConfig: {
    uiViewClassName: 'Sound',
    validAttributes: {
      ...ReactNativeViewAttributes.RCTView,
      volume: true,
    },
  },

  getDefaultProps: function() {
    return {
      autoPlay: true,
      volume: 1.0,
      loop: false,
      playControl: null,
      source: null,
    };
  },

  getInitialState: function() {
    return {
      volume: 1.0,
      muted: false,
    };
  },

  componentWillMount() {
    if (__DEV__) {
      if (this.props.playStatus) {
        console.warn(
          'playStatus has been renamed to playControl. Please update your code before v2.0.0'
        );
      }
    }
    if (this.props.playerState) {
      this._subscribe(this.props.playerState);
    }
  },

  componentWillReceiveProps(nextProps) {
    if (__DEV__) {
      if (nextProps.playStatus) {
        console.warn(
          'playStatus has been renamed to playControl. Please update your code before v2.0.0'
        );
      }
    }
    if (this.props.playerState !== nextProps.playerState) {
      if (this.props.playerState) {
        this._unsubscribe(this.props.playerState);
      }
      if (nextProps.playerState) {
        this._subscribe(nextProps.playerState);
      }
    }
  },

  componentWillUnmount() {
    if (this.props.playerState) {
      this._unsubscribe(this.props.playerState);
    }
  },

  _subscribe(playerState) {
    playerState.addListener('play', this._play);
    playerState.addListener('pause', this._pause);
    playerState.addListener('seekTo', this._seekTo);
    playerState.addListener('volumeChange', this._volumeChange);
    playerState.addListener('mutedChange', this._mutedChange);
    this.setState({
      volume: playerState.volume,
      muted: playerState.muted,
    });
  },

  _unsubscribe(playerState) {
    playerState.removeListener('play', this._play);
    playerState.removeListener('pause', this._pause);
    playerState.removeListener('seekTo', this._seekTo);
    playerState.removeListener('volumeChange', this._volumeChange);
    playerState.removeListener('mutedChange', this._mutedChange);
  },

  _play() {
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      UIManager.Sound.Commands.play,
      []
    );
  },

  _pause() {
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      UIManager.Sound.Commands.pause,
      []
    );
  },

  _seekTo(timeSec) {
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      UIManager.Sound.Commands.seekTo,
      [timeSec]
    );
  },

  _volumeChange(volume) {
    this.setState({volume: volume});
  },

  _mutedChange(muted) {
    this.setState({muted: muted});
  },

  _onEnded: function() {
    this.props.onEnded && this.props.onEnded();
  },

  _onDurationChange: function(event) {
    if (this.props.playerState) {
      this.props.playerState.onDurationChange(event);
    }
    this.props.onDurationChange && this.props.onDurationChange(event);
  },

  _onTimeUpdate: function(event) {
    if (this.props.playerState) {
      this.props.playerState.onTimeUpdate(event);
    }
    this.props.onTimeUpdate && this.props.onTimeUpdate(event);
  },

  _onPlayStatusChange: function(event) {
    if (this.props.playerState) {
      this.props.playerState.onPlayStatusChange(event);
    }
    this.props.onPlayStatusChange && this.props.onPlayStatusChange(event);
  },

  render: function() {
    const props = {...this.props} || {};
    props.style = props.style || {};
    if (__DEV__) {
      if (props.children) {
        console.warn('<Sound> must be a leaf node, props.children will not be rendered');
      }
    }
    if (props.playStatus && !props.playControl) {
      props.playControl = props.playStatus;
      delete props['playStatus'];
    }
    if (this.props.playerState) {
      props.autoPlay = false;
      props.volume = this.state.volume;
      props.muted = this.state.muted;
    }

    // events
    props.onDurationChange = this._onDurationChange;
    props.onTimeUpdate = this._onTimeUpdate;
    props.onPlayStatusChange = this._onPlayStatusChange;

    const source = resolveAssetSource(props.source);

    if (source) {
      // Default to 'absolute' position, and pass handle to native side.
      return (
        <RKSound
          style={[{position: 'absolute'}, props.style]}
          {...props}
          onEnded={this._onEnded}
          testID={props.testID}
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
