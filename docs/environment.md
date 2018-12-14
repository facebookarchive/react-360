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

### `setBackgroundImage(url: {uri: string}, options?: EnvironmentOptions)`

Sets the current background image to a specified resource, using a `uri` object or the `asset()` helper. The options object is optional, and supports the following fields:
 - `format` - One of the [supported 3D formats](photos-and-videos.md#mono-and-stereo-formats)
 - `transition` - Specify the transition time for environment fading in/out. Do notice the transition time is doubled for fading out previous environment and then fading in new one.
 - `fadeLevel` - Specify the fading level of the environment.
 - `rotateTransform` - The transform of rotation of the environment. On React side you can pass in transform style similar as `style.transform`, e.g. `[{rotateY: '30deg'}, [rotateZ: '90rad']]`. On client side, you need to pass in a 16 size number array for a 4x4 matrix.

### `setBackgroundVideo(handle: string, options?: EnvironmentOptions)`

Sets the current background to a video, referenced by the specified handle. The video player must have been initialized before it can be set as the background. The options is the same as image.

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

### `setScreen(screenId: string, handle: ?string, surfaceId: string, x: number, y: number, width: number, height: number)`

Set a video to be played on a screen. A screen defined a position attached to a surface.
  - `screenId` - the id of the screen. A screen id must be pre-defined. By default there's only one screen: 'default'. You can call `Environment.updateScreenIds()` to provide a list of screen ids for usage.
  - `handle` - the unique video handle
  - `surface` - the unique surface name
  - `x, y, width, height` - The relative position related to the surface 


### `preloadBackgroundImage(url: {uri: string})`

Preload an 360 image so you can get a smoother transition when calling `setBackgroundImage`

### `animateFade(fadeLevel: number, fadeTime: number)`

Trigger a fading on current environment background to a specific fade level.

