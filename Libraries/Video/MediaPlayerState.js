/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule MediaPlayerState
 */

const EventEmitter = require('EventEmitter');

/**
 * MediaPlayerState creates an instance that controls video states internally,
 * which can be shared between media components and control components.
 * The simplest workflow is to create a `MediaPlayerState`, and hook it with components:
 * ```
 * class VideoPlayer extends React.Component {
 * constructor(props) {
 *   super(props);
 *   this.state = {
 *    playerState: new MediaPlayerState({autoPlay: true, muted: true}), // init with muted, autoPlay
 *   };
 * }
 * render() {
 *   return (
 *     <View>
 *      <Video
 *        style={{height: 2.25, width: 4}}
 *        source={{uri: 'assets/1.webm'}}
 *        playerState={this.state.playerState} />
 *      <VideoControl
 *        style={{height: 0.2, width: 4}}
 *        playerState={this.state.playerState} />
 *     </View>
 *   );
 * }
 * }
 * ```
 * To control video playback, you can directly call functions on `playerState`
 * ```
 * this.state.playerState.play();
 * this.state.playerState.pause();
 * this.state.playerState.setMuted(false);
 * ```
 */
class MediaPlayerState extends EventEmitter {
  /**
   * Create a new MediaPlayerState.
   *
   * @param options (optional) - Configure the initial state.
   *
   * - autoPlay {boolean}: whether the media should start playing automatically. Default is false.
   * - muted {boolean}: whether the media should be muted. Default is false.
   * - volume {number}: Volume of the media, generally in the range 0 to 1. Default is 1.0
   */
  constructor(options) {
    super();
    this.playStatus = 'closed';
    this.duration = undefined;
    this.currentTime = undefined;
    this.volume = options.volume !== undefined ? options.volume : 1.0;
    this.muted = options.muted || false;
    this.autoPlay = options.autoPlay || false;

    this.onDurationChange = this.onDurationChange.bind(this);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.onPlayStatusChange = this.onPlayStatusChange.bind(this);
  }

  /**
   * Begin or resume playback.
   */
  play() {
    // call play
    this.emit('play');
  }

  /**
   * Pause playback.
   */
  pause() {
    // call pause
    this.emit('pause');
  }

  /**
   * Seek to a position of the video
   * @param timeSec - the position seek to.
   */
  seekTo(timeSec) {
    // call seekTo
    this.emit('seekTo', timeSec);
  }

  /**
   * Register for calling a command on a Video on a user gesture on a Component
   * @param commandID - the command id.
   * @param commandArgs - the command arguments.
   * @param reactTag - the tag of the component that listen to the user gesture.
   */
  registerUserGesture(commandID, commandArgs, reactTag) {
    // call registerUserGesture
    this.emit('registerUserGesture', commandID, commandArgs, reactTag);
  }

  /**
   * Unregister for calling a command on a Video on a user gesture on a Component
   * @param reactTag - the tag of the component that listen to the user gesture.
   */
  unregisterUserGesture(reactTag) {
    // call unregisterUserGesture
    this.emit('unregisterUserGesture', reactTag);
  }

  /**
   * Set the volume of the media (0.0 ~ 1.0). Default is 1.0
   */
  setVolume(value) {
    this.volume = value;
    this.emit('volumeChange', value);
  }

  /**
   * Whether the audio should be muted. Default is false.
   */
  setMuted(value) {
    this.muted = value;
    this.emit('mutedChange', value);
  }

  onDurationChange(event) {
    if (event.nativeEvent.duration) {
      this.duration = event.nativeEvent.duration;
      this.emit('durationChange', this.duration);
    }
  }

  onTimeUpdate(event) {
    if (event.nativeEvent.currentTime) {
      this.currentTime = event.nativeEvent.currentTime;
      this.emit('timeUpdate', this.currentTime);
    }
  }

  onPlayStatusChange(event) {
    this.playStatus = event.nativeEvent.playStatus;
    this.emit('playStatusChange', this.playStatus);
    if (this.playStatus === 'ready' && this.autoPlay) {
      this.play();
    }
  }
}

module.exports = MediaPlayerState;
