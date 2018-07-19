---
id: environment
title: Environment
sidebar_label: Environment
---

Environment is used to change the background of the scene, as described in the [360 photo and video documentation](photos-and-videos.md).

```js
Environment.setBackgroundImage(asset('city-pano.jpg'), {
  format: '3DTB',
});
```

## Methods

### `clearBackground()`

Fades out the current background to black.

### `setBackgroundImage(url: {uri: string}, options?: Object)`

Sets the current background image to a specified resource, using a `uri` object or the `asset()` helper. The options object is optional, and supports the following fields:
 - `format` - One of the [supported 3D formats](photos-and-videos.md#mono-and-stereo-formats)

### `setBackgroundVideo(handle: string)`

Sets the current background to a video, referenced by the specified handle. The video player must have been initialized before it can be set as the background.

```js
VideoModule.createPlayer('myplayer');
// Play a specific video
VideoModule.play('myplayer', {
  source: {url: staticResourceURL('path/to/video.mp4')}, // provide the path to the video
  stereo: '3DTB', // optionally, supply the format of the video
});
// Display the video on the Environment
Environment.setBackgroundVideo('myplayer');
```