import React from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
  asset,
} from 'react-360';
import VideoModule from 'VideoModule';
import * as Environment from 'Environment';

const VIDEO_PLAYER = 'dash_video';
const VIDEO_SOURCE =[
  {
    url: asset('video_dash_mp4/video_stream.mpd').uri, 
    fileFormat: 'mp4',
  },
  {
    url: asset('video_dash_webm/video_stream.mpd').uri, 
    fileFormat: 'webm',
  }
];

class CustomPlayerSample extends React.Component {
  componentDidMount() {
    VideoModule.createPlayer(VIDEO_PLAYER);
    VideoModule.play(VIDEO_PLAYER, {
      source: VIDEO_SOURCE,
      stereo: '2D',
    });

    Environment.setScreen('default', VIDEO_PLAYER, 'default', 0, 0, 1000, 600);
  }

  render() {
    return null;
  }
}

AppRegistry.registerComponent('CustomPlayerSample', () => CustomPlayerSample);
