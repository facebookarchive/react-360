/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

'use strict';

import React from 'react';
import {VrButton, Environment} from 'react-360';
import {UIManager, findNodeHandle} from 'react-native';
import VideoModule, {VideoPlayerInstance} from 'VideoModule';
import VideoControl from './VideoControl.react';

import type {VideoLayout, VideoStereoFormat, VideoSource} from 'VideoModule';
import type {ViewStyleProp} from 'StyleSheetTypes';

type Source = VideoSource | Array<VideoSource>;

type Props = {
  style?: ViewStyleProp,
  controlStyle?: ViewStyleProp,
  layout?: VideoLayout,
  muted: boolean,
  onPlayerCreated: (player: VideoPlayerInstance) => void,
  screenId: string,
  source: Source,
  stereo?: VideoStereoFormat,
  visible: boolean,
  volume: number,
  showControl: boolean,
};

type VideoBound = {
  x: number,
  y: number,
  width: number,
  height: number,
};

type State = {
  videoBound: ?VideoBound,
  surface: ?string,
  controlVisible: boolean,
  isControlFocused: boolean,
};

function sourceEqual(a: ?Source, b: ?Source) {
  if (!a && !b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    const length = a.length;
    if (length !== b.length) {
      return false;
    }
    for (let i = 0; i < length; i++) {
      if (!a[i] || !b[i]) {
        return false;
      }
      if (a[i].url !== b[i].url) {
        return false;
      }
    }
    return true;
  } else if (!Array.isArray(a) && !Array.isArray(b)) {
    return a.url === b.url;
  }
  return false;
}

const VIDEO_CONTROL_FADE_DURATION = 3000;

class VideoPlayer extends React.PureComponent<Props, State> {
  static defaultProps = {
    muted: false,
    screenId: 'default',
    visible: true,
    volume: 1.0,
    showControl: true,
  };
  state: State;
  _player: VideoPlayerInstance;
  _playingSource: ?Source;
  _controlFadeTimeout: ?TimeoutID = null;
  _unmounted: boolean = false;

  constructor(props: Props) {
    super(props);
    this.state = {
      videoBound: null,
      surface: null,
      controlVisible: true,
      isControlFocused: false,
    };
    this._player = VideoModule.createPlayer();
  }

  componentWillReceiveProps(nextProps: Props) {
    this._updateVideo(nextProps);
  }

  componentDidMount() {
    const tag = findNodeHandle(this);
    UIManager.getViewRootID(tag).then(surface => {
      if (!this._unmounted) {
        this.setState({
          surface: surface,
        });
      }
    });
    this._updateVideo(this.props);
    this.props.onPlayerCreated && this.props.onPlayerCreated(this._player);
    this._fadeVideoControl();
  }

  componentWillUnmount() {
    this._cancelFadeVideoControl();
    if (this.state.surface) {
      Environment.setScreen(
        this.props.screenId,
        null,
        this.state.surface,
        0,
        0,
        1,
        1,
      );
    }
    this._player.destroy();
    this._unmounted = true;
  }

  _cancelFadeVideoControl = () => {
    if (this._controlFadeTimeout) {
      clearTimeout(this._controlFadeTimeout);
      this._controlFadeTimeout = null;
    }
  };

  _fadeVideoControl = () => {
    this._cancelFadeVideoControl();
    this._controlFadeTimeout = setTimeout(() => {
      this.setState({
        controlVisible: false,
      });
    }, VIDEO_CONTROL_FADE_DURATION);
  };

  _showVideoControl = () => {
    this.setState({
      controlVisible: true,
    });
    if (!this.state.isControlFocused) {
      this._fadeVideoControl();
    }
  };

  _onControlEnter = () => {
    this.setState({
      isControlFocused: true,
    });
    this._cancelFadeVideoControl();
  };

  _onControlExit = () => {
    this.setState({
      isControlFocused: false,
    });
    this._fadeVideoControl();
  };

  _updateVideo(props: Props) {
    if (!sourceEqual(props.source, this._playingSource)) {
      this._player.play({
        source: props.source,
        layout: props.layout,
        muted: props.muted,
        stereo: props.stereo,
        volume: props.volume,
      });
      this._playingSource = props.source;
    } else {
      this._player.setParams({
        muted: props.muted,
        volume: props.volume,
      });
    }
  }

  _setVideoBound = () => {
    const tag = findNodeHandle(this);
    UIManager.measureInWindow(tag, (x, y, width, height) => {
      if (!this._unmounted) {
        this.setState({
          videoBound: {x: x, y: y, width: width, height: height},
        });
      }
    });
  };

  render() {
    if (this.state.surface && this.state.videoBound) {
      const {x, y, width, height} = this.state.videoBound;
      if (this.props.visible) {
        Environment.setScreen(
          this.props.screenId,
          this._player._player,
          this.state.surface,
          x,
          y,
          width,
          height
        );
      } else {
        Environment.setScreen(
          this.props.screenId,
          null,
          this.state.surface,
          x,
          y,
          width,
          height
        );
      }
    }
    const showCallback = this.props.showControl ? this._showVideoControl : undefined;
    const fadeCallback = this.props.showControl ? this._fadeVideoControl : undefined;
    return (
      <VrButton
        onExit={fadeCallback}
        onEnter={showCallback}
        onClick={showCallback}
        onLayout={this._setVideoBound}
        style={[{justifyContent: 'flex-end', alignItems: 'center', opacity: this.props.visible ? 1.0 : 0.0}, this.props.style]}>
        {this.props.showControl && (
          <VideoControl
            onEnter={this._onControlEnter}
            onExit={this._onControlExit}
            player={this._player}
            style={[
              {
                height: '10%',
                width: '100%',
                opacity: this.state.controlVisible ? 1.0 : 0.0,
              },
              this.props.controlStyle,
            ]}
          />
        )}
      </VrButton>
    );
  }
}

module.exports = VideoPlayer;
