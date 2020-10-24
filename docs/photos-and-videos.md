---
id: photos-and-videos
title: 360 Photos and Videos
sidebar_label: 360 Photos and Videos
---

React 360 is optimized for the presentation of 360 (and 180) photos and videos. These are essential for creating an immersive environment, and allow you to seemingly transport your user to a virtual location. Because they are an important part of interactive 360 experiences, there are many ways to control the current background. React360 also supports in-line flat video attached to surface.

## Supported Formats

### Photos

 - 360 mono equirectangular
 - 360 stereo equirectangular (top/bottom)
 - 180 mono equirectangular
 - 180 stereo equirectangular (top/bottom)
 - 180 stereo equirectangular (left/right)
 - 360 mono 1x6 cubic format

### Videos

 - 360 mono equirectangular
 - 360 stereo equirectangular (top/bottom)
 - 180 mono equirectangular
 - 180 stereo equirectangular (left/right)
 - 360 mono 3x2 cubic format (with 1% expansion)

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

### Photo Layout Format

For 360 image, React 360 currently support two different type of 360 photo layout encoding. React 360 will automatically detects the layout from the aspect-ratio of the image:

 - **Equirectangular**: Equirectangular photo uses equirectangular projection
 - **1x6 Cubic Format**: The 1x6 Cubic format is organized with 6 undistorted, perspective images on each direction in the order of `right, left, top, bottom, back, front` from top to bottom. 

 Equirectangular projection is more popular and is supported by most 360 camera. Cubic format provides better render quality as it suffers less distortion, but usually need to convert from an equirectangular projection source image. 

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

## Displaying Videos

Video are handled in two parts: first, the creation of a Video Player, and then mapping that player to your Environment. The separation of video playback from the environment itself allows you to control the progression of video from different locations in your codebase.

Environment support two ways of rendering video:
 - 360 background video
 - Flat in-line video attached to a surface

### Video Layout Format

The video layout is similar as photo layout format. For 360 video, React 360 currently support **Equirectangular** and **3x2 Cubic Format with 1% expansion**.

 - **3x2 Cubic Format with 1% expansion**: Video image is divided to 3x2 image on the direction in the order of `right, left, top, bottom, front, back` from top-left to bottom-right. This format also has extra 1% expansion on the perspective projection of each image to reduce the texture rendering issue on the edge of each faces. You can try [Transform360](https://github.com/facebook/transform360) to create 3x2 cubic format 360 video. To use 3x2 cubic format video in React 360, you need to specify video layout format `layout: 'CUBEMAP_32',` in the VideoOption.

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
 - `addEventListener(event: string, listener: VideoEventListener)` - add a listener to listen to video player's events
 - `removeEventListener(event: string, listener: VideoEventListener)` - remove a event listener

Once a video player has been created and its source has been set, it can be used for your environment.

To render a background 360 video:

```js
// To play a video as your background, reference it by its unique id
r360.compositor.setBackgroundVideo('myplayer');
```

To render a in-line flat video:

```js
r360.compositor.setScreen(
  'default', /* screen name */
  'myplayer', /* player unique id */
  'default', /* surface name */
  0, 0, 600, 400 /* relative position on the surface */
);
```

### From React

To create a Video Player from the React side, use the `VideoModule` Module. Again, a Player must be set up before it can be set to the Environment. Once it has been created, it can be attached to the background with the `Environment` module.

```js
import {Environment, VideoModule, staticResourceURL} from 'react-360';

// Create a player
const player = VideoModule.createPlayer('myplayer');
// Play a specific video
player.play({
  source: {url: staticResourceURL('path/to/video.mp4')}, // provide the path to the video
  stereo: '3DTB', // optionally, supply the format of the video
});
// Display the background video on the Environment
Environment.setBackgroundVideo('myplayer'); // or you can use player._player which is same value
// Or, play in-line on a surface
Environment.setScreen(
  'default', /* screen name */
  'myplayer', /* player unique id */
  'default', /* surface name */
  0, 0, 600, 400 /* relative position on the surface */
);
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

The `VideoModule` provides a video player wrapper to support playing video on React side. Calling `const player = createPlayer(handle?: string)`, will return a `VideoPlayerInstance`, and `VideoPlayerInstance` provides following methods:
 - `play(options: VideoOptions)` - begin playback of the video. The options object can take the following keys:
    - `source` - The video source.
    - `startPosition`: the video will seek to this position when start playing
    - `autoPlay`: whether the video will start playing after loaded. If not, you can call `resume` to play the video later. This is useful for pre-loading video.
    - `layout` - An optional key specifying layout format. Use `CUBEMAP_32` if you want to play 3x2 cubic format video.
    - `stereo` - an optional key specifying the 2D/3D format of the video
    - `volume` - an optional key specifying the volume of the video, from 0 to 1
    - `muted` - an optional key specifying whether the video is muted
 - `pause()` - stop playback of the video, maintaining its location
 - `resume()` - resume the paused video
 - `seek(position: number)` - seek to a specific position in time, provided in ms
 - `setMuted(muted: boolean)` - determines whether the video is muted or not
 - `setVolume(volume: number)` - sets the volume of the video, on a scale from 0 to 1
 - `destroy()` - tear down the video and clean up its resources
 - `addEventListener(event: string, listener: VideoEventListener)` - add a listener to listen to video player's events, it will return a subscription for unregister
 - `removeSubscription(subscription: EmitterSubscription)` - remove a event listener using the subscription

You can also directly use `VideoModule` Native Module with following methods:

 - `createPlayer(handle: string)` - create a video player with a specific id
 - `destroyPlayer(handle: string)` - destroy the player referenced by this handle
 - `play(handle: string, options: VideoOptions)` - play a video on a specific video player. The options object is the same as above.
 - `pause(handle: string)` - pause the video being played by the specific player
 - `resume(handle: string)` - resume the video being played by the specific player, if it is currently paused
 - `stop(handle: string)` - stop playback of the video on the specific player, returning its time back to 0:00
 - `seek(handle: string, timeMs: number)` - move playback of the video on the referenced player to a specific time
 - `setParams(handle: string, options: VideoPlayOptions)` - set the playback options for a specific video player. The options object can take the following keys:
   - `volume` - an optional key specifying the volume of the video, from 0 to 1
   - `muted` - an optional key specifying whether the video is muted

### Video Events

By calling `addEventListener` you will be able to listening to video events from React side. For example:

```
const player = VideoModule.createPlayer('myplayer');
player.addEventListener('onVideoStatusChanged', (event: VideoStatusEvent) => {
  if (event.status === 'ready') {
    player.removeSubscription(onVideoLoadedSubscription);
    console.log('Video is ready');
  }
})
``` 

The VideoStatusEvent is emitted every time the video status changes, e.g paused, ended, time position update, etc. The event provides following fields:
 - `duration` - The total duration of the video
 - `error` - If there's an error, this will include the error message
 - `isBuffering` - Whether the video is buffering for more data
 - `isMuted` - Whether the video is muted 
 - `volume` - The volume of the video
 - `position` - The time position of the video
 - `status` - Video play status, can be 
    - `closed`: No session.
    - `closing`: Session is being closed.
    - `failed`: Session had an error.
    - `finished`: Session has finished playing video
    - `paused`: Session is paused.
    - `playing`: Session is playing a video.
    - `seeking`: Session is seeking a position
    - `ready`: Session is ready to play a video.
    - `stopped`: Session is stopped (ready to play)

### Video UIs

An optional UI library is also provided as `react-360-common-ui`, it provides some basic UIs for Flat Video and Video Control

To install it:
 - Add `react-360-common-ui` as dependency in you package.json
 - Run `npm install` or `yarn`

To use it
```
import {VideoPlayer} from 'react-360-common-ui';

class VideoTest extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <VideoPlayer
          muted={true}
          source={{url: staticResourceURL('path/to/video.mp4')}}
          stereo={'2D'}
          style={{
            width: 600,
            height: 400,
          }}
        />
      </View>
    );
  }
}
```

`VideoPlayer` is a useful react component that can render a flat video in-line and layout-ed with your other react components. And it contains a `VideoControl` component inside which can also be use separately.

### Custom Video Player

React360 provides a default functional video player using HTML5 video element. If you want use your own version of video player to provide additional functionalities such as Mpeg-Dash, HLS, etc. You can implement your own custom video player. And add it to `customVideoPlayers` in ReactInstance's option. An example on how to use custom video players is provided [here](example-customplayer.md).

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
