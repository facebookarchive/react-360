---
id: photos-and-videos
title: 360 Photos and Videos
sidebar_label: 360 Photos and Videos
---

React 360 is optimized for the presentation of 360 (and 180) photos and videos. These are essential for creating an immersive environment, and allow you to seemingly transport your user to a virtual location. Because they are an important part of interactive 360 experiences, there are many ways to control the current background.

## Supported Formats

### Photos

 - 360 mono equirectangular
 - 360 stereo equirectangular (top/bottom)
 - 180 mono equirectangular
 - 180 stereo equirectangular (top/bottom)
 - 180 stereo equirectangular (left/right)

### Videos

 - 360 mono equirectangular
 - 360 stereo equirectangular (top/bottom)
 - 180 mono equirectangular
 - 180 stereo equirectangular (left/right)

## Displaying Panoramic Images

### From the Runtime (client.js)

If you only need to set the background once during your app's lifetime, this is the easiest way. In fact, this is how every newly-created React 360 project sets the background. In client.js, you'll find a line similar to the following:

```js
r360.compositor.setBackground('./static_assets/360_world.jpg');
```

This immediately sets the background to a specific 180 or 360 image. This technique has the benefit of immediately fetching the image while your React bundle is downloading, so you present content to your user sooner. You can also use this to show a loading screen that is immediately replaced when your React code runs.

Based on the dimensions of the image, React 360 attempts to automatically determine the format (180 or 360, mono or 3D). However, there are some configurations it can't differentiate between, so you explicitly specify the layout of your background image with a second options argument.

```js
r360.compositor.setBackground('./static_assets/180_mono_image.jpg', {
  format: '2D',
});
```

### Mono and Stereo Formats

The currently-supported formats are:

 - `'2D'` - Used for mono images
 - `'3DTB'` - Used for stereo images where the left viewport is on top, and the right viewport is on the bottom
 - `'3DBT'` - Used for stereo images where the left viewport is on the bottom, and the right viewport is on top
 - `'3DLR'` - Used for stereo images where the left viewport is on the left half, and the right viewport is on the right

When using a 3D background, the depth effect will only be visible when viewing in a VR headset. The left viewport will be used for desktop and mobile displays.

### From React

If your background is dynamic, such as in a multi-room environment, you'll want to control it from your React application. This is possible through the Environment module.

```js
import {Environment} from 'react-360';

// Set the background to a 360 or 180 image
Environment.setBackground(
  asset('path/to/image.jpg'),
  {format: '2D'}, /* one of the formats mentioned above */
);
```

## Displaying Panoramic Videos

Video panoramas are handled in two parts: first, the creation of a Video Player, and then mapping that player to your Environment. The separation of video playback from the environment itself allows you to control the progression of video from different locations in your codebase.

### From the Runtime (client.js)

The steps for video playback are very similar in both the Runtime and your React app. First, a Video Player must be created. Video Players are referenced by their unique name, which can be used from the React side to control the player after it has been created.

```js
// Creating a Video Player
const player = r360.compositor.createVideoPlayer('myplayer');
// Set the video to be played, and its format
player.setSource('path/to/video.mp4', '2D');
```

The formats supported by videos are the same as those listed above for panoramic photos. Once a player has been created, you can configure it and control its playback. A Player object supports the following methods:

 - `play()` - begin playback of the video
 - `pause()` - stop playback of the video, maintaining its location
 - `seekTo(position: number)` - seek to a specific position in time, provided in ms
 - `setLoop(loop: boolean)` - determines whether the video should restart after it ends
 - `setMuted(muted: boolean)` - determines whether the video is muted or not
 - `setVolume(volume: number)` - sets the volume of the video, on a scale from 0 to 1
 - `destroy()` - tear down the video and clean up its resources

Once a video player has been created and its source has been set, it can be used for your environment.

```js
// To play a video as your background, reference it by its unique id
r360.compositor.setBackgroundVideo('myplayer');
```

### From React

To create a Video Player from the React side, use the `VideoModule` Native Module. Again, a Player must be set up before it can be set to the Environment. Once it has been created, it can be attached to the background with the `Environment` module.

```js
import {Environment, NativeModules, staticResourceURL} from 'react-360';
const {VideoModule} = NativeModules;

// Create a player
VideoModule.createPlayer('myplayer');
// Play a specific video
VideoModule.play('myplayer', {
  source: {url: staticResourceURL('path/to/video.mp4')}, // provide the path to the video
  stereo: '3DTB', // optionally, supply the format of the video
});
// Display the video on the Environment
Environment.setBackgroundVideo('myplayer');
```

You can also combine these techniques to create a video in the runtime, and layer play it from your React application.

```js
// in client.js
const player = r360.compositor.createVideoPlayer('myplayer');
// Instantiate the video, but do not play it yet
player.setSource('path/to/video.mp4', '2D');
```

```js
// in index.js
Environment.setBackgroundVideo('myplayer');
VideoModule.resume('myplayer'); // Start playback
```

The `VideoModule` Native Module exposes the following methods:

 - `createPlayer(handle: string)` - create a video player with a specific id
 - `destroyPlayer(handle: string)` - destroy the player referenced by this handle
 - `play(handle: string, options: VideoOptions)` - play a video on a specific video player. The options object can take the following keys:
   - `source` - an object containing the URL of the video, in the format `{url: string}`
   - `stereo` - an optional key specifying the 2D/3D format of the video
   - `volume` - an optional key specifying the volume of the video, from 0 to 1
   - `muted` - an optional key specifying whether the video is muted
 - `pause(handle: string)` - pause the video being played by the specific player
 - `resume(handle: string)` - resume the video being played by the specific player, if it is currently paused
 - `stop(handle: string)` - stop playback of the video on the specific player, returning its time back to 0:00
 - `seek(handle: string, timeMs: number)` - move playback of the video on the referenced player to a specific time
 - `setParams(handle: string, options: VideoPlayOptions)` - set the playback options for a specific video player. The options object can take the following keys:
   - `volume` - an optional key specifying the volume of the video, from 0 to 1
   - `muted` - an optional key specifying whether the video is muted

## Clearing the Background

It is also possible to remove all backgrounds and fade the environment to black. From the Runtime this can be done by passing `null` to the `setBackground` method.

```js
r360.compositor.setBackground(null);
```

From the React side, the `Environment` module provides a `clearBackground()` method.

```js
import {Environment} from 'react-360';

// Fade to black
Environment.clearBackground();
```
