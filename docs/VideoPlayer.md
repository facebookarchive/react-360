---
id: video-player
title: Video Player
layout: docs
category: Guides
permalink: docs/video-player.html
next: TBD
previous: TBD
---

You can write your own video player to play videos that React VR doesn't support.

React VR uses an HTML5 `<video>` element for video playback, however you may have a custom format and use your own video player.

React VR doesn't expect to cover all these features, however we provide a way to hook your customized video player into the React VR video module.

## BasicVideoPlayer
`BasicVideoPlayer` is the default video player which embedded HTML5 `<video>` element for video playback. Your customized video player needs to extend `BasicVideoPlayer`. Here're some important properties and methods of `BasicVideoPlayer` that you may want to override.

* **supportedFormats** - If your customized video player is used only for some specific video formats, and you still want the to use other video players for other video formats, you need to override supportedFormats and specify the video formats your customized video player supports.
* **videoElement** - React VR will take the videoElement and convert to texture to render in the scene.
* **initializeVideo(src, metaData)** - When the source of a `<Video>` or `<VideoPano>` is set, the video module will call this method to intialize the video. You can pass extra metaData to your video player in `source.metaData` to help you initialize the video(e.g. pass the proxy to play DRM contents).
* **dispose()** - This will be called when the video player is going to be disposed.

## addCustomizedVideoPlayer
You can hook a customized video player with React VR by calling `addCustomizedVideoPlayer`. If you have more than one customized video players, you can call `addCustomizedVideoPlayer` for each of them. React VR will choose the appropriate player via the video formats they support.

## Dash Example
One example of using customized video player is to support adaptive bitrate streaming such as MPEG-DASH.

### Write a MPEG-DASH video player 
The customized video player needs to extend `BasicVideoPlayer`.
Also define the supportedFormats for DashVideoPlayer.
```
import {BasicVideoPlayer} from 'react-vr-web';
export default class DashVideoPlayer extends BasicVideoPlayer {
  static supportedFormats: ?Array<string> = ['mp4', 'webm'];
```
Create the MPEG-DASH player:
```
  constructor() {
    super();
    this.player = dashjs.MediaPlayer().create();
    this.player.setScheduleWhilePaused(true);
  }
```
Initialize the MPEG-DASH player:

```
  initializeVideo(mpdUrl, metaData) {
    this.videoElement.crossOrigin = 'anonymous';
    this._bindMediaEvents();
    this.player.initialize(this.videoElement, mpdUrl, false);
  }
```
Here `_bindMediaEvents()` is used to register to html media events.

Dispose the player:
```
  dispose() {
    this.player.reset();
    super.dispose();
  }
```

### Hook Customized Video Player
We use `addCustomizedVideoPlayer` to hook the `DashVideoPlayer` in the `init` function of `vr/client.js` (one of the files provided as part of the Starter Project).
```
import {addCustomizedVideoPlayer} from 'react-vr-web';
...
function init(bundle, parent, options) {
  addCustomizedVideoPlayer(DashVideoPlayer);
...

```

See the `DashSample` for the full code of this example.
