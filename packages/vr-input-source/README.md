# `vr-input-source`

vr-input-source tracks all positionally-tracked gamepads, and exposes them in
an API similar to the `XRInputSource` defined in the upcoming WebXR API.

The package performs a few key tasks related to using VR input sources. It keeps
track of all connected gamepads that report their physical position, and fires
events when their buttons are pressed or released. When multiple gamepads are
used simultaneously, typically two-handed controllers like Oculus Touch, it
tracks which one was most recently used. This allows developers to use that
controller as the device that controls the cursor, a behavior commonly seen on
VR platforms.

## Button Events

The **Web Gamepad API** relies on polling to get gamepad data, and does not fire
events like keyboard or mouse inputs. This requires some code to run on each
rendered frame, inspect gamepad state, and determine which buttons changed since
the last frame. `vr-input-source` performs this action for all tracked gamepads,
and will fire the following events:

### Primary Button Events
Primary buttons are those that perform a selection action, and vary from
controller to controller. Due to the wide range of input devices used for VR,
it's recommended that developers build interfaces around a single select action,
rather than relying on the presence of many buttons. How a button is determined
to be primary or secondary is described in a later section.
 - `selectstart` - Triggered when one of the gamepad's primary buttons is
   pressed down. Similar to `mousedown`.
 - `selectend` - Triggered when one of the gamepad's primary buttons is
   released, or the gamepad is disconnected while some buttons are pressed.
   Similar to `mouseup`.
 - `select` - Triggered when one of the gamepad's primary buttons is
   pressed down, then released. Similar to `click`.

### Alternative Button Events
Generic button-press events also exist to track when any button, primary or
otherwise, is pressed or released.
 - `pressstart` - Triggered when any of the gamepad's buttons is pressed down.
   Similar to `mousedown`.
 - `pressend` - Triggered when any of the gamepad's buttons is released, or the
   gamepad is disconnected while some buttons are pressed. Similar to `mouseup`.
 - `press` - Triggered when any of the gamepad's buttons is pressed down, then
   released. Similar to `click`.

### Capacitive Button Events
Some controllers have capacitive buttons or trackpads
 - `touchstart` - Triggered when the user's finger touches a capacitive button.
 - `touchend` - Triggered when a user's finger stops touching a capacitive button.

## Primary vs Secondary
Some gamepads have a single button (Daydream); others have a button and a
trigger (Oculus Go); others have many different buttons (Oculus Touch, Vive
Wand, Windows MR Motion Controllers). There is rarely a correlation between the
reported ordering of the buttons and their intended action. `vr-input-source`
is aware of popular gamepads, and maps their primary actions to the `select`
events. For example, it maps both the A button and main trigger on Oculus Touch
as primary actions.
For unrecognized gamepads, every button is considered primary. This is to
future-proof applications against new input hardware; otherwise, developers
would need to upgrade older apps to add mappings for new devices.

The list of recognized gamepad mappings is found in `WellKnownGamepads.js`, and
can be updated to support new input types.

## Controller Events
The top-level `VRInputSource` class also fires events related to changes in
input devices.
 - `inputsourceschange` - Triggered when the set of connected gamepads with pose
   changes. This could either be the result of a connection or a disconnection.
 - `activesourcechange` - Triggered when the Active Input Source changes. The
   active source is the gamepad that was most recently used. This can be used
   by the application to change which gamepad draws the cursor.
