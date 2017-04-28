/**
 * A very simple Mpeg-Dash video player.
 */
import {BasicVideoPlayer} from 'react-vr-web';
import dashjs from 'dashjs';

export default class DashVideoPlayer extends BasicVideoPlayer {
  static supportedFormats: ?Array<string> = ['mp4', 'webm'];

  constructor() {
    super();
    this.player = dashjs.MediaPlayer().create();
    this.player.setScheduleWhilePaused(true);
  }

  initializeVideo(mpdUrl, metaData) {
    this.videoElement.crossOrigin = 'anonymous';
    this._bindMediaEvents();
    this.player.initialize(this.videoElement, mpdUrl, false);
  }

  dispose() {
    this.player.reset();
    super.dispose();
  }
}
