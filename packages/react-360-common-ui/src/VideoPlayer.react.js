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
import {View, Environment} from 'react-360';
import {UIManager, findNodeHandle} from 'react-native';
import VideoModule, {VideoPlayerInstance} from 'VideoModule';

import type {VideoLayout, VideoStereoFormat, VideoSource} from 'VideoModule';
import type {ViewStyleProp} from 'StyleSheetTypes';

type Source = VideoSource | Array<VideoSource>;

type Props = {
  style?: ViewStyleProp,
  layout?: VideoLayout,
  muted: boolean,
  onPlayerCreated: (player: VideoPlayerInstance) => void,
  screenId: string,
  source: Source,
  stereo?: VideoStereoFormat,
  visible: boolean,
  volume: number,
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

class VideoPlayer extends React.PureComponent<Props, State> {
  static defaultProps = {
    muted: false,
    screenId: 'default',
    visible: true,
    volume: 1.0,
  };
  state: State;
  _player: VideoPlayerInstance;
  _playingSource: ?Source;

  constructor(props: Props) {
    super(props);
    this.state = {
      videoBound: null,
      surface: null,
    };
    this._player = VideoModule.createPlayer();
  }

  componentWillReceiveProps(nextProps: Props) {
    this._updateVideo(nextProps);
  }

  componentDidMount() {
    const tag = findNodeHandle(this);
    UIManager.getViewRootID(tag).then(surface => {
      this.setState({
        surface: surface,
      });
    });
    this._updateVideo(this.props);
    this.props.onPlayerCreated && this.props.onPlayerCreated(this._player);
  }

  componentWillUnmount() {
    this._player.destroy();
  }

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
      this.setState({
        videoBound: {x: x, y: y, width: width, height: height},
      });
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
          this._player._player,
          this.state.surface,
          x,
          y,
          width,
          height
        );
      }
    }

    return <View onLayout={this._setVideoBound} style={this.props.style} />;
  }
}

module.exports = VideoPlayer;
