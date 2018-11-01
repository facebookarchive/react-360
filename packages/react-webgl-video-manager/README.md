# React WebGL Video Manager

`react-webgl-video-manager` is a centralized video manager that uses `webgl-ui`
for easy control and playback of videos in WebGL contexts. It is designed to fit
into the render loop of a React WebGL application, though it can also be used
on its own.

The Video Manager allows you to load videos and control their playback via play,
pause, seek, and other actions. It hooks directly into the `TextureManager` from
`webgl-ui` using a custom protocol, allowing React WebGL image components to
play videos using a `video://` URL.

From your Video Manager, you can create individual Video Players that each handle
the playback of a single video. A single player can be referenced multiple times
within your app, much like how a single computer can be attached to multiple
monitors.

## Using the Video Manager

Your application should have a single `VideoManager` instance. This is where you
will create and fetch individual players.

To construct a Video Manager, you need a reference to your `webgl-ui` texture
manager. If you're using `webgl-ui` on its own, this is the instance you use
to construct individual `Image` elements. If you're using `react-webgl`, you can
get this from your `CanvasRoot` or `RenderTargetRoot`.

Actual playback is handled by implementations that decode video to a texture
that can be rendered in WebGL. The package comes with a browser-based
implementation that should cover most playback cases. If you have custom video
decoding logic, like streaming video, you can create and register your own
implementation.

```js
import {VideoManager, BrowserVideoImplementation} from 'react-webgl-video-manager';

// ...

// Get the texture manager from your React WebGL root
const textureManager = root.getTextureManager();
const videos = new VideoManager(textureManager);

// From here, you can create individual players, and hook up React WebGL image
// components to those videos
```

## Creating a video instance

To play a video, you must first create a player. Each player has a unique name,
which is how it is referenced from your components.

```js
const player = videos.createPlayer('birds-footage');
// player can now be controlled
player.setSource('https://example.net/birds.webm');
player.play();

// At any point in time, you can also retrieve the player by its name
const playerAgain = videos.getPlayer('birds-footage');
playerAgain.seekTo(14);
playerAgain.pause();
```

## Referencing a video from `react-webgl` or `webgl-ui`

### React WebGL Example

```js
// point the <image /> to a video:// URI with your video's name
<image source={{uri: 'video://birds-footage'}} width={320} height={180} />
```

### WebGL UI Example

```js
const image = new Image(textureManager);
setStyle(image, {
  width: 320,
  height: 160,
});
// point the image to a video:// URI with your video's name
image.setSource({uri: 'video://birds-footage'});
```
