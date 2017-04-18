# Input Examples

React VR offers a pluggable input system to support the variety of current and
future VR input devices. Input events are implemented with a raycaster: each
frame, React VR casts the ray out into the scene and determines which elements
it is hitting, sending events to those React components across the bridge. To
calculate this ray, React VR queries the input implementation for the origin
and direction of the ray to cast.
