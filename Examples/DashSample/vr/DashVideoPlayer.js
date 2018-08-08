/**
 * A very simple Mpeg-Dash video player.
 */
import {BasicVideoPlayer, getSupportedFormats} from 'react-vr-web';
import dashjs from 'dashjs';

const browserSupportedFormat = getSupportedFormats();
const dashFormats = ['mp4', 'webm'];
const dashSupportedFormats = dashFormats.filter((format) => {
  return browserSupportedFormat.indexOf(format) > -1;
});

export default class DashVideoPlayer extends BasicVideoPlayer {
  static supportedFormats: ?Array<string> = dashSupportedFormats;

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
