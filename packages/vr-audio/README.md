# `vr-audio` - Positional audio implementation for WebVR / WebXR applications

VR Audio uses Web Audio APIs to simulate the sensation of positional audio.
Provided the current position and rotation of the user's head, it can play a
sound as though it is coming from a location relative to the user in real-world
3D space. This is designed for use with VR headsets, so that the audio reaches
one ear before the other, and changes sound as the user turns or moves.
