# `react-360-controls` - Implementations of various camera controls for React 360

React 360 relies on this package to update the camera parameters used to render
the 3D scene without a VR headset. It provides a few implementations of camera
controls out of the box that allow basic movement on mobile, touchscreen, and
desktop environments.

Camera controls are queried once per frame, and are given the opportunity to
update the camera's current position (as a <X, Y, Z> vector) and orientation
(as a rotation Quaternion). For example, the mouse pan controls only update the
camera's orientation when the user has clicked and dragged the mouse. If the
mouse is not pressed, it leaves the orientation unaffected. This system makes
it easy to implement both absolute controls (update position and orientation in
absolute physical space), and relative controls (update position and orientation
relative to their last values).

Controls are implemented as an ordered queue. Each frame, the React 360 system
iterates through this queue until it encounters a control that updates the
camera. Once this happens, any other controls are disregarded. This allows the
developer to cascade through multiple possible update systems and respond to
the one the user is currently interacting with. This is how we are able to
use device orientation on hardware that supports it, and mouse dragging on
devices with external cursors.

The `controls` package also handles the input cursor, since this is often
closely related to camera orientation. It includes raycasting implementations
for mouse and touchscreen input.
