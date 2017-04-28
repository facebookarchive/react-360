/**
 * The examples provided by Oculus are for non-commercial testing and
 * evaluation purposes only.
 *
 * Oculus reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * OCULUS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

/**
 * VideoSample360 displays a 360 video pano, along with a video control component.
 * 
 * The video can be controlled by the video control component. To do this, a 
 * MediaPlayerState is created and hooked to video and video control component.
 * See [MediaPlayerState](docs/mediaplayerstate.html)
 */

import React from 'react';
import {
  asset,
  AppRegistry,
  View,
  VideoPano,
  VideoControl,
  MediaPlayerState,
} from 'react-vr';

/**
 * VideoSample360 created a MediaPlayerState and hook it with video and video control.
 * Internal changes of MediaPlayerState will notify both video and video control to update.
 */

class VideoSample360 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerState: new MediaPlayerState({autoPlay: true, muted: true}), // init with muted, autoPlay
    };
  }
  render() {
    return (
      <View>
        <VideoPano
          playerState={this.state.playerState}
          source={[
            asset('video.mp4', {format: 'mp4', layout: 'SPHERE'}),
            asset('video.webm', {format: 'webm', layout: 'SPHERE'}),
          ]}
        />
        <VideoControl
          style={{
            height: 0.2,
            width: 4,
            layoutOrigin: [0.5, 0.5, 0],
            transform: [{translate: [0, 0, -4]}],
          }}
          playerState={this.state.playerState}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('VideoSample360', () => VideoSample360);
