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

import React from 'react';
import {AppRegistry, asset, Pano, View, Video, VideoControl, MediaPlayerState} from 'react-vr';

/**
 * DashSample displays a flat 2d video, along with a video control component.
 * DashSample injects a customzied video player `DashVideoPlayer`, which uses a
 * third-party library `dashjs` to support playing Mpeg-Dash videos.
 *
 * To run DashSample, you need to first run `npm install` in `/DashSample` to install
 * `dashjs` and download the assets.
 * 
 * The video can be controlled by the video control component. To do this, a 
 * MediaPlayerState is created and hooked to video and video control component.
 * See [MediaPlayerState](docs/mediaplayerstate.html)
 */
class DashSample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerState: new MediaPlayerState({autoPlay: true, muted: true}), // init with muted, autoPlay
    };
  }

  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')} />
        <View
          style={{
            alignItems: 'center',
            layoutOrigin: [0.5, 0.5, 0],
            transform: [{translate: [0, 0, -4]}],
          }}>
          <Video
            style={{height: 2.25, width: 4}}
            source={[
              asset('video_dash_mp4/video_stream.mpd', {format: 'mp4'}),
              asset('video_dash_webm/video_stream.mpd', {format: 'webm'}),
            ]}
            playerState={this.state.playerState}
          />
          <VideoControl style={{height: 0.2, width: 4}} playerState={this.state.playerState} />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('DashSample', () => DashSample);
