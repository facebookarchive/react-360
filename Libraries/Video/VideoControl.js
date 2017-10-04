/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule VideoControl
 */

const PropTypes = require('prop-types');
const React = require('React');
const View = require('View');
const Text = require('Text');
const Image = require('Image');
const VrButton = require('VrButton');
const UIManager = require('UIManager');
const ReactNative = require('ReactNative');
const StyleSheet = require('StyleSheet');
const {videoTimeFormat} = require('VideoUtils');

const createReactClass = require('create-react-class');
const createGlyph = require('createGlyph');

const ControlGlyphs = require('../../lib-assets/VideoControlGlyphs');
const IMAGE_PLAY = createGlyph(ControlGlyphs.PLAY);
const IMAGE_PAUSE = createGlyph(ControlGlyphs.PAUSE);
const IMAGE_MUTE = createGlyph(ControlGlyphs.MUTE);
const IMAGE_UNMUTE = createGlyph(ControlGlyphs.UNMUTE);

class VideoControlButton extends React.Component {
  state: {
    isFocused: boolean,
  } = {
    isFocused: false,
  };
  props: {
    style: any,
    icon: {uri: string},
    onClick?: ?(event: Object) => any,
    onExit?: ?(event: Object) => any,
    onButtonPress?: ?(event: Object) => any,
    onButtonRelease?: ?(event: Object) => any,
  };
  render() {
    return (
      <VrButton
        style={[this.props.style, {backgroundColor: this.state.isFocused ? '#444' : '#222'}]}
        onClick={this.props.onClick}
        onButtonPress={this.props.onButtonPress}
        onButtonRelease={this.props.onButtonRelease}
        onEnter={() => this.setState({isFocused: true})}
        onExit={e => {
          this.setState({isFocused: false});
          this.props.onExit && this.props.onExit(e);
        }}>
        <Image style={styles.icon} source={this.props.icon} />
      </VrButton>
    );
  }
}

class VideoSliderBar extends React.Component {
  props: {
    fillColor: string,
    style: any,
    progress: number,
    onClickProgress?: ?(position: number) => any,
  };
  _gazedPosition: number = -1;

  _onExit = () => {
    this._gazedPosition = -1;
  };

  _onClick = () => {
    this._gazedPosition >= 0 &&
      this.props.onClickProgress &&
      this.props.onClickProgress(this._gazedPosition);
  };

  _onFillMove = (e: Object) => {
    this._gazedPosition = this.props.progress * e.nativeEvent.offset[0];
  };

  _onEmptyMove = (e: Object) => {
    this._gazedPosition = this.props.progress + (1 - this.props.progress) * e.nativeEvent.offset[0];
  };

  render() {
    return (
      <VrButton
        style={[this.props.style, styles.barContainer]}
        onExit={this._onExit}
        onClick={this._onClick}>
        <View
          style={[
            styles.barFill,
            {flex: this.props.progress, backgroundColor: this.props.fillColor},
          ]}
          onMove={this._onFillMove}
        />
        <View
          style={[styles.barEmpty, {flex: 1 - this.props.progress}]}
          onMove={this._onEmptyMove}
        />
      </VrButton>
    );
  }
}

/**
 * Component for controling video playback and volume. Appears as a horizontal
 * bar that can be placed below the Video component (2D video) or anywhere
 * in the scene, as when used with the VideoPano (360 video).
 *
 * Contains the following UI elements:
 *
 * - buttons for play/pause, unmute/mute, and volume
 * - progress bar and timer showing both elapased and total time
 *
 * For example usage, see [MediaPlayerState](docs/mediaplayerstate.html)
 */
const VideoControl = createReactClass({
  propTypes: {
    ...View.propTypes,

    /**
     * fontSize - the fontSize of texts in VideoControl. Default is 0.1(meter)
     */
    fontSize: PropTypes.number.isRequired,

    /**
     * playerState - a `MediaPlayerState`, which controls video states.
     * Typically shared between this VideoControl and the Video it controls.
     * See [MediaPlayerState](docs/mediaplayerstate.html)
     */
    playerState: PropTypes.object.isRequired,
  },

  getDefaultProps: function() {
    return {
      fontSize: 0.1,
    };
  },

  getInitialState: function() {
    return {
      volume: 1.0,
      muted: false,
      playStatus: 'loading',
      duration: null,
      currentTime: null,
    };
  },

  componentWillMount() {
    if (this.props.playerState) {
      this._subscribe(this.props.playerState);
    }
    this._registeredUserGesture = false;
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
    playerState.addListener('volumeChange', this._volumeChange);
    playerState.addListener('mutedChange', this._mutedChange);
    playerState.addListener('durationChange', this._durationChange);
    playerState.addListener('timeUpdate', this._timeUpdate);
    playerState.addListener('playStatusChange', this._playStatusChange);
    this.setState({
      playStatus: playerState.playStatus,
      volume: playerState.volume,
      muted: playerState.muted,
      duration: playerState.duration,
      currentTime: playerState.currentTime,
    });
  },

  _unsubscribe(playerState) {
    playerState.removeListener('volumeChange', this._volumeChange);
    playerState.removeListener('mutedChange', this._mutedChange);
    playerState.removeListener('durationChange', this._durationChange);
    playerState.removeListener('timeUpdate', this._timeUpdate);
    playerState.removeListener('playStatusChange', this._playStatusChange);
  },

  _volumeChange(volume) {
    this.setState({volume: volume});
  },

  _mutedChange(muted) {
    this.setState({muted: muted});
  },

  _durationChange(duration) {
    this.setState({duration: duration});
  },

  _timeUpdate(currentTime) {
    this.setState({currentTime: currentTime});
  },

  _playStatusChange(playStatus) {
    this.setState({playStatus: playStatus});
  },

  _onPlayButtonClick() {
    if (!this._registeredUserGesture) {
      if (this.state.playStatus === 'playing') {
        this.props.playerState.pause();
      } else {
        this.props.playerState.play();
      }
    }
  },

  _onPlayButtonPress(event) {
    // Only register for user gesture call back for touch event
    if (event.nativeEvent.inputEvent.type === 'TouchInputEvent') {
      if (this.state.playStatus !== 'playing') {
        this.props.playerState.registerUserGesture(
          UIManager.Video.Commands.play,
          [],
          ReactNative.findNodeHandle(this)
        );
        this._registeredUserGesture = true;
      }
    }
  },

  _onPlayButtonRelease(event) {
    // Only unregister for user gesture call back for touch event
    if (event.nativeEvent.inputEvent.type === 'TouchInputEvent') {
      if (this._registeredUserGesture) {
        this.props.playerState.unregisterUserGesture(ReactNative.findNodeHandle(this));
        this._registeredUserGesture = false;
      }
    }
  },

  _onPlayButtonExit() {
    if (this._registeredUserGesture) {
      this.props.playerState.unregisterUserGesture(ReactNative.findNodeHandle(this));
      this._registeredUserGesture = false;
    }
  },

  _onMuteButtonClick() {
    this.props.playerState.setMuted(!this.state.muted);
  },

  _onVolumeClick(volume) {
    this.props.playerState.setVolume(volume);
  },

  _onClickProgress(progress) {
    this.props.playerState.seekTo(this.state.duration * progress);

    // If media is not playing, we will not be getting progress updates, so let's
    // manually update the progress bar to reflect the most recent progress click.
    if (this.state.playStatus !== 'playing') {
      this.setState({currentTime: this.state.duration * progress});
    }
  },

  render: function() {
    const playButtonIcon = this.state.playStatus === 'playing' ? IMAGE_PAUSE : IMAGE_PLAY;
    const muteButonIcon = this.state.muted ? IMAGE_MUTE : IMAGE_UNMUTE;
    const videoProgress = this.state.currentTime && this.state.duration
      ? this.state.currentTime / this.state.duration
      : 0;
    return (
      <View style={[this.props.style, styles.container]}>
        <VideoControlButton
          onClick={this._onPlayButtonClick}
          onButtonPress={this._onPlayButtonPress}
          onButtonRelease={this._onPlayButtonRelease}
          onExit={this._onPlayButtonExit}
          style={styles.button}
          icon={playButtonIcon}
        />
        <View style={styles.timerContainer}>
          <VideoSliderBar
            fillColor={'#1099eb'}
            onClickProgress={this._onClickProgress}
            progress={videoProgress}
            style={styles.progressBar}
          />
          <Text style={[styles.text, styles.timerText, {fontSize: this.props.fontSize}]}>
            {`${videoTimeFormat(this.state.currentTime)}/${videoTimeFormat(this.state.duration)}`}
          </Text>
        </View>
        <VideoControlButton
          onClick={this._onMuteButtonClick}
          style={styles.button}
          icon={muteButonIcon}
        />
        <View style={styles.volumeContainer}>
          <VideoSliderBar
            fillColor={'#888'}
            onClickProgress={this._onVolumeClick}
            progress={this.state.volume}
            style={styles.volumeBar}
          />
        </View>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#999',
  },
  button: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: '70%',
    maxWidth: '100%',
    aspectRatio: 1.0,
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: '2%',
  },
  timerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '2%',
  },
  timerText: {
    paddingLeft: '2%',
    paddingRight: 0,
  },
  progressBar: {
    flex: 1,
  },
  barContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  barFill: {
    height: '30%',
  },
  barEmpty: {
    height: '30%',
    backgroundColor: '#333',
  },
  volumeContainer: {
    flex: 0.3,
    paddingHorizontal: '2%',
    backgroundColor: '#222',
  },
  volumeBar: {
    flex: 1,
  },
});

module.exports = VideoControl;
