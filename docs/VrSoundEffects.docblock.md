VrSoundEffects is a utility for playing non-positional, one-shot samples
such as menu clicks when interacting with UI elements.

**Note**: This utility only plays non-looping, non-positional sound. For 3D positional audio, use the `<Sound>` component instead, which also supports additional controls such as `stop` and `loop`.

Audio clips must be loaded before they are played, for example, from within
the `componentWillMount` lifecycle method. The argument to `load`, `play`,
and `unload` is either an asset() call or an explicit resource locator in
the form `{uri: 'PATH'}`.

Example usage:
```
const MY_SOUND = asset('sounds/my-sound.wav');
VrSoundEffects.load(MY_SOUND);
...
VrSoundEffects.play(MY_SOUND);
```

Because different browsers support different audio formats, you can map
formats to their corresponding resource objects to have React VR pick the
sound file the browser supports:
```
VrSoundEffects.load({
  ogg: asset('click.ogg'),
  mp3: asset('click.mp3'),
});
```

React VR recognizes the following format keys:

  - `ogg` (Ogg Vorbis)
  - `mp3` (MP3 Audio)
  - `m4a` (AAC audio)
  - `wav` (Uncompressed WAV audio)
  - `webm` (Vorbis audio in a WebM container)

For more examples, see `<VrButton>` which triggers sound effects when you
interact (click, hover, and so on) with the button.
