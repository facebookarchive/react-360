/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Video
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
 * A react component for displaying 2D video.
 *
 * Note: Auto-play is restricted on some browsers. For example on Chrome
 * Android, auto-play only works if the video is `muted`, otherwise
 * a user gesture (typically touch, mouse, and keyboard but not gamepad)
 * is required to begin video playback.
 *
 * Example Usage:
 * ```
 * <Video style={{width: 3.0, height:2.0}} source={{uri: 'assets/my-video.webm'}} />
 * ```
 *
 * For an example of using with [VideoControl](docs/videocontrol.html),
 * see [MediaPlayerState](docs/mediaplayerstate.html)
 */
const Video = createReactClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformTintPropTypes),

    /**
     * source of video in the form of `{uri: 'http', format: FORMAT}`
     *
     * `format` (optional): the video format, for example: mp4, webm, and so on.
     *
     * `metaData` (optional): the video meta data, used for customized video player
     *
     * Source can be an array of sources with different formats, and VideoPano selects
     * a format that current browser supports. If format is not specified,
     * it can select whatever format is supported.
     */
    source: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
        format: PropTypes.string,
        metaData: PropTypes.any,
      }),
      PropTypes.arrayOf(
        PropTypes.shape({
          uri: PropTypes.string,
          format: PropTypes.string,
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
     * `autoPlay`, `muted` `volume` and `playControl` properties are ignored
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
    uiViewClassName: 'Video',
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
      UIManager.Video.Commands.setImmediateOnTouchEnd,
      ['touchend', ReactNative.findNodeHandle(this), commandID, commandArgs]
    );
  },

  _unregisterUserGesture(reactTag) {
    UIManager.dispatchViewManagerCommand(
      reactTag,
      UIManager.Video.Commands.setImmediateOnTouchEnd,
      []
    );
  },

  _play() {
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      UIManager.Video.Commands.play,
      []
    );
  },

  _pause() {
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      UIManager.Video.Commands.pause,
      []
    );
  },

  _seekTo(timeSec) {
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      UIManager.Video.Commands.seekTo,
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
      <RKVideo
        style={styleProps}
        {...props}
        onEnded={this._onEnded}
        testID={this.props.testID}
        onStartShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}>
        {this.props.children}
      </RKVideo>
    );
  },
});

const RKVideo = requireNativeComponent('Video', Video, {
  nativeOnly: {},
});

module.exports = Video;
