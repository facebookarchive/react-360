---
id: audio
title: Playing Audio
sidebar_label: Playing Audio
---

React 360 gives you a number of ways to play audio, including background environmental audio, one-off sound effects, and spatialized audio. All audio playback is controlled through the `AudioModule` Native Module.

## Environmental Audio

Environmental audio is used to create background noise in your application: music, bustling city noises, rushing water, or anything else that sets the mood of your scene.

`AudioModule` exposes a `playEnvironmental()` method to trigger environmental audio. By default, environmental audio is looping – once it has ended, it starts over again. `playEnvironmental()` takes a single configuration object, which contains the following values:
 - `source` - the path to the audio resource
 - `volume` - the volume at which to play the audio, from 0 to 1

Once environmental audio has begun, you can also change its playback parameters with the `AudioModule.setEnvironmentalParams()` method. This method takes a single configuration object, which contains the following values:
 - `loop` - whether to loop the playback of the audio
 - `muted` - whether the audio should be muted. When audio is unmuted, it returns to the same volume level it was at before it was muted.
 - `volume` - a new volume at which to play the audio, from 0 to 1
 - `fadeTime` - an optional length of time (in milliseconds) over which the volume should change. This is used for smooth transitions in audio volume.

Environmental audio can be stopped by calling `AudioModule.stopEnvironmental()`.

There can only be one environmental audio track playing at a time. If the background audio is already playing and you call `playEnvironmental` again, it will cancel the first audio track and play the new one.

```js
// Play environmental audio:
import {asset, NativeModules} from 'react-360';
const {AudioModule} = NativeModules;

AudioModule.playEnvironmental({
  source: asset('path/to/audio.mp3'),
  volume: 0.3, // play at 3/10 original volume
});
```

## Sound Effects

To play a single sound once, such as when a button is clicked, you can use `AudioModule.playOneShot()`. One-shot audio is meant to be simple and configuration-less, loading and playing the audio with a single method call. Once one-shot audio has begun, it cannot be stopped. When playing these sound effects, `playOneShot()` takes a single configuration object which contains the following values:
 - `source` - the path to the audio resource
 - `volume` - the volume at which to play the audio, from 0 to 1

```js
import {asset, NativeModules, VrButton} from 'react-360';
const {AudioModule} = NativeModules;

// Play a sound when the button is clicked
<VrButton
  onClick={() => {
    AudioModule.playOneShot({
      source: asset('click.wav'),
    });
  }}>
  { /* ... */ }
</VrButton>
```

## Spatial and Controlled Audio

`playOneShot` is an easy way to trigger a single sound effect, but it doesn't give you control over the lifecycle of the sound. Using other methods available on `AudioModule`, you can pre-load sounds, play and pause them, and control their playback parameters after they have already begun.

### Creating Audio

First, an audio instance needs to be created. `AudioModule.createAudio(handle: string, options: AudioOptions)` creates an audio instance with a specific name and configuration. The options object can contain the following fields:

 - `source` - the path to the audio resource
 - `autoPlay` - whether the audio should play as soon as it has loaded
 - `is3d` - whether the audio is spatial, and should sound as though it's located in a specific location relative to the user
 - `muted` - whether the audio is initially muted
 - `volume` - the initial volume of the audio, from 0 to 1
 - `loop` - whether the audio should replay once it has completed

### Controlling Audio

Once an audio instance has been created, its configuration and playback can be controlled by its handle. `AudioModule` supports the following methods to control audio instances.

 - `setParams(handle: string, options: AudioPlayOptions)` - configures the specified audio instance after it has already been created. The options object can contain the following fields:
   - `muted` - whether the audio is initially muted
   - `loop` - whether the audio should replay once it has completed
   - `volume` - the initial volume of the audio, from 0 to 1
   - `fadeTime` - an optional length of time (in milliseconds) over which the volume should change. This is used for smooth transitions in audio volume.
   - `position` - a three-element array specifying the position of the audio, if it was created with `is3d` set to true. This is covered further in the section below.
 - `play(handle: string, options: AudioPlayOptions)` - begin playing the audio instance. The options payload is identical to the one on `setParams`.
 - `stop(handle: string)` - Ends the playback of the specific audio instance.
 - `destroy(handle: string)` - Tear down an audio instance, cleaning up the resources associated with it.

### Positional Audio

Audio created with `is3d` set to true can be positioned in the virtual world. As the user moves and rotates in your scene, the audio will appear as though it is playing from a specific location in space. You can set this location with the `position` attribute available when calling `setParams` or `play`. This attribute is a three-element array specifing the absolute x, y, and z coordinates of the sound.

```js
import {asset, NativeModules} from 'react-360';
const {AudioModule} = NativeModules;

// Play a sound to the user's right (3 meters down the positive x-axis)
AudioModule.createAudio('bird', {
  source: asset('chirp.mp3'),
  is3d: true,
});
AudioModule.play('bird', {
  position: [3, 0, 0],
});
```
