/**
 * A very simple Mpeg-Dash video player.
 */
import {BrowserVideoPlayer} from 'react-360-web';

export default class DashVideoPlayer extends BrowserVideoPlayer {
  constructor() {
    super();
    this.player = dashjs.MediaPlayer().create();
    this.player.setScheduleWhilePaused(true);
  }

  setSource(src: string, stereoFormat: string, fileFormat: string) {
    super.setSource('', stereoFormat, fileFormat);
    this.player.initialize(this._element, src, false);
  }

  destroy() {
    this.player.reset();
    super.dispose();
  }
}
