/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule VideoPano
 */
'use strict';

const NativeMethodsMixin = require('NativeMethodsMixin');
const PropTypes = require('prop-types');
const React = require('React');
const ReactNativeViewAttributes = require('ReactNativeViewAttributes');
const View = require('View');
const requireNativeComponent = require('requireNativeComponent');
const StyleSheetPropType = require('StyleSheetPropType');
const UIManager = require('UIManager');
const ReactNative = require('ReactNative');
const LayoutAndTransformTintPropTypes = require('LayoutAndTransformTintPropTypes');

const createReactClass = require('create-react-class');
const resolveAssetSource = require('resolveAssetSource');

/**
 * A react component for displaying 360 video.
 *
 * Note: Auto-play is restricted on some browsers. For example on Chrome
 * Android, auto-play only works if the video is `muted`, otherwise
 * a user gesture (typically touch, mouse, and keyboard but not gamepad)
 * is required to begin video playback.
 *
 * Example Usage:
 * ```
 * <VideoPano source={{uri: 'assets/my-video.webm'}} />
 * ```
 *
 * For an example of using with VideoControls,
 * see [MediaPlayerState](docs/mediaplayerstate.html)
 */
const VideoPano = createReactClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformTintPropTypes),

    /**
     * source of video in the form of `{uri: 'http', format: FORMAT, layout: LAYOUT}`
     *
     * format(optional): the video format, e.g mp4, webm, etc.
     *
     * layout(optional): the layout format of 360 video: 'SPHERE' | 'CUBEMAP_32'
     *
     * stereo(optional): the stereo format of 360 video: '2D' | 'TOP_BOTTOM_3D' |
     * 'BOTTOM_TOP_3D' | 'LEFT_RIGHT_3D' | 'RIGHT_LEFT_3D'
     *
     * metaData(optional): the video meta data, used for customized video player
     *
     * If layout is not a supported layout format, it'll by default use 'SPHERE'(equirectangular)
     * If stereo is not a supported stereo format, it'll by default use '2D'
     * Source can be an array of sources with different formats, and VideoPano will
     * choose one of the formats that current browser supports. If format is not specified,
     * it can be chose whatever format is supported.
     */
    source: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
        format: PropTypes.string,
        layout: PropTypes.string,
        stereo: PropTypes.string,
        metaData: PropTypes.any,
      }),
      PropTypes.arrayOf(
        PropTypes.shape({
          uri: PropTypes.string,
          format: PropTypes.string,
          layout: PropTypes.string,
          stereo: PropTypes.string,
          metaData: PropTypes.any,
        })
      ),
    ]),
    /**
     * Source for a poster frame to show until the video starts playing.
     * If not set, nothing will display until first frame of the video
     * is loaded.
     */
    poster: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
      }),
      // Opaque type returned by require('./image.jpg')
      PropTypes.number,
    ]),

    /**
     * Whether video starts playing automatically when component is loaded.
     * Auto-play is restricted on some browsers due to security considerations.
     * Default is `true`.
     * Ignored when `playerState` property is set.
     */
    autoPlay: PropTypes.bool,

    /**
     * Whether the video is replayed when finished.
     * Default is `false`.
     */
    loop: PropTypes.bool,

    /**
     * Whether the video is muted.
     * Default is `false`.
     * Ignored when `playerState` property is set.
     */
    muted: PropTypes.bool,

    /**
     * Option callback evoked when video is done playing.
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
     * Controls the playback.  If not set, the value of `autoPlay` determines
     * whether the video plays when the component is loaded.
     * Ignored when `playerState` property is set.
     */
    playControl: PropTypes.oneOf(['play', 'pause']),

    /**
     * playerState - playerState is a `MediaPlayerState` that controls video
     * playback with its inner state. When playerState is set, the value of
     * `autoPlay`, `muted` `volume` and `playControl` properties is ignored
     * as they will be set by playerState instead.
     * See [MediaPlayerState](docs/mediaplayerstate.html)
     */
    playerState: PropTypes.object,

    /**
     * The volume of the video(0.0 ~ 1.0)
     * Default is 1.0
     */
    volume: PropTypes.number,
  },

  viewConfig: {
    uiViewClassName: 'VideoPano',
    validAttributes: {
      ...ReactNativeViewAttributes.RCTView,
      volume: true,
    },
  },

  getDefaultProps: function() {
    return {
      autoPlay: true,
      loop: false,
      muted: false,
      volume: 1.0,
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
    if (this.props.playerState) {
      this._subscribe(this.props.playerState);
    }
  },

  componentWillReceiveProps(nextProps) {
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
    playerState.addListener('registerUserGesture', this._registerUserGesture);
    playerState.addListener('unregisterUserGesture', this._unregisterUserGesture);
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
    playerState.removeListener('registerUserGesture', this._registerUserGesture);
    playerState.removeListener('unregisterUserGesture', this._unregisterUserGesture);
    playerState.removeListener('volumeChange', this._volumeChange);
    playerState.removeListener('mutedChange', this._mutedChange);
  },

  _registerUserGesture(commandID, commandArgs, reactTag) {
    UIManager.dispatchViewManagerCommand(
      reactTag,
      UIManager.VideoPano.Commands.setImmediateOnTouchEnd,
      ['touchend', ReactNative.findNodeHandle(this), commandID, commandArgs]
    );
  },

  _unregisterUserGesture(reactTag) {
    UIManager.dispatchViewManagerCommand(
      reactTag,
      UIManager.VideoPano.Commands.setImmediateOnTouchEnd,
      []
    );
  },

  _play() {
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      UIManager.VideoPano.Commands.play,
      []
    );
  },

  _pause() {
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      UIManager.VideoPano.Commands.pause,
      []
    );
  },

  _seekTo(timeSec) {
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      UIManager.VideoPano.Commands.seekTo,
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
    // default videos to being a render group
    const styleProps = [{renderGroup: true}, this.props.style];

    const props = {...this.props};
    props.poster = resolveAssetSource(this.props.poster);
    if (this.props.playerState) {
      props.autoPlay = false;
      props.volume = this.state.volume;
      props.muted = this.state.muted;
    }

    // events
    props.onDurationChange = this._onDurationChange;
    props.onTimeUpdate = this._onTimeUpdate;
    props.onPlayStatusChange = this._onPlayStatusChange;

    return (
      <RKVideoPano
        style={styleProps}
        {...props}
        onEnded={this._onEnded}
        testID={this.props.testID}
        onStartShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}>
        {this.props.children}
      </RKVideoPano>
    );
  },
});

const RKVideoPano = requireNativeComponent('VideoPano', VideoPano, {
  nativeOnly: {},
});

module.exports = VideoPano;
