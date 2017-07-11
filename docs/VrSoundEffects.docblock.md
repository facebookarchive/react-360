VrSoundEffects is a utility for playing one-shot sounds, such as menu sounds when
interacting with buttons or other UI elements. Note these are 2D sounds; for
3D/positional audio use the `<Sound>` component, which also supports additional
controls such as `stop` and `loop`.

Audio clips must loaded before playing them, for example in the `componentWillMount`
lifecycle method. The argument to `load`, `play`, and `unload` is either an
asset() call or an explicit resource locator in the form `{uri: 'PATH'}`.

Example usage:
```
const MY_SOUND = asset('sounds/my-sound.wav');
VrSoundEffects.load(MY_SOUND);
...
VrSoundEffects.play(MY_SOUND);
```

Since different browsers support different audio formats, you can also supply
a map of formats to their corresponding resource objects, and React VR will
pick the supported sound for the browser:
```
VrSoundEffects.load({
  ogg: asset('click.ogg'),
  mp3: asset('click.mp3'),
});
```

Currently, React VR understands the following format keys:

  - `ogg` (Ogg Vorbis)
  - `mp3` (MP3 Audio)
  - `m4a` (AAC audio)
  - `wav` (Uncompressed WAV audio)
  - `webm` (Vorbis audio in a WebM container)

For another example of using this utility, see `<VrButton>` which provides
sound effects triggered by interaction (click, hover, etc.) with the button.
