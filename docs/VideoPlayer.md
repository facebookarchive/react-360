---
id: video-player
title: Video Player
layout: docs
category: Guides
permalink: docs/video-player.html
next: TBD
previous: TBD
---

To play videos in a custom format or to provide features that React VR doesn't support, we provide a way for you to hook your own customized video player into the React VR video module.

## BasicVideoPlayer
`BasicVideoPlayer` is the default video player which embeds an HTML5 `<video>` element for video playback. Your customized video player needs to extend `BasicVideoPlayer`. Here are some important properties and methods of `BasicVideoPlayer` that you may override.

* **supportedFormats** - If your customized video player is used only for some specific video formats and you still want the to use other video players for other video formats, you need to override supportedFormats to specify the video formats your customized video player supports.
* **videoElement** - React VR takes the videoElement and converts to texture to render in the scene.
* **initializeVideo(src, metaData)** - When the source of a `<Video>` or `<VideoPano>` is set, the video module calls this method to initialize the video. You can pass extra metadata to your video player in `source.metaData` to help you initialize the video. For example, to pass a proxy to play DRM content).
* **dispose()** - This will be called when the video player is going to be disposed.

## addCustomizedVideoPlayer
You can hook a customized video player with React VR by calling `addCustomizedVideoPlayer`. If you have more than one customized video player, you can call `addCustomizedVideoPlayer` for each of them. React VR chooses the appropriate player via the video formats they support.

## Dash Example
A use case for using customized video player is to support adaptive bitrate streaming such as MPEG-DASH.

### Write a MPEG-DASH video player
Our customized video player extends `BasicVideoPlayer`. It also defines the supportedFormats for DashVideoPlayer. DashVideoPlayer's supported video formats depend on the HTML5 `<video>` element's supported formats
```
import {BasicVideoPlayer, getSupportedFormats} from 'react-vr-web';

const browserSupportedFormat = getSupportedFormats();
const dashFormats = ['mp4', 'webm'];
const dashSupportedFormats = dashFormats.filter((format) => {
  return browserSupportedFormat.indexOf(format) > -1;
});

export default class DashVideoPlayer extends BasicVideoPlayer {
  static supportedFormats: ?Array<string> = dashSupportedFormats;
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
We use `addCustomizedVideoPlayer` to hook `DashVideoPlayer` into the `init` function of `vr/client.js`, one of the files provided as part of the Starter Project.
```
import {addCustomizedVideoPlayer} from 'react-vr-web';
...
function init(bundle, parent, options) {
  addCustomizedVideoPlayer(DashVideoPlayer);
...

```

See the `DashSample` for the full code of this example.
