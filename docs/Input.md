---
id: input
title: Cursors and Input
layout: docs
category: The Basics
permalink: docs/input.html
---

## Cursors and Input

Our goal is to make writing cross-platform interactions simple. The input schemes might vary with the device used to interact with your application, so we provide event handlers and API hooks to enable a diverse variety of input systems.

Input events are collected from mouse, keyboard, touch, and gamepad interactions, and cursors are implemented as simple raycasters into your scene. The events are collected each frame by the runtime, and passed to your React application.

Similarly, the runtime collects cursor position continuously and events such as entering or exiting a View are calculated and passed to the appropriate event handlers on the React side.

**Note:** If you're looking for simple, button-style, `onClick` behavior, that is provided out of the box by [VrButton](docs/vrbutton.html).

## Supported Input Events

### `onEnter`

This event fires whenever the platform cursor begins intersecting with a
component. If you have configured your application to use multiple cursors,
you can determine which cursor generated the event by examining the `source`
property of the event. This is useful for implementing different behaviors for
different cursor systems.

### `onExit`

This event fires whenever the platform cursor stops intersecting with a
component. It has the same properties as `onEnter` events.

### `onMove`

This event fires as the cursor moves across a View. The position of the
cursor is passed as the `offset` property of the event: a two-unit array
array representing the x and y coordinates of the cursor relative to the view.
These values are unitless numbers ranging from 0.0 to 1.0, where `[0, 0]`
represents the top-left corner of a View, `[0.5, 0.5]` represents the center of
the view, and `[1.0, 1.0]` represents the bottom-right corner. Using unitless
values allows the same product code to be used in both 3D-positioned Views
(which use meters), and Views in a CylindricalPanel (which use pixels).

### `onInput`

This event captures all interaction events: keyboard, mouse, touch, and gamepad.
Events coming into `onInput` can be further filtered by inspecting the `type`
field, which will be one of `'MouseInputEvent'`, `'KeyboardInputEvent'`,
`'TouchInputEvent'`, or `'GamepadInputEvent'`. Custom input systems can also
specify their own unique identifiers. For example, the `onClick` handler of
`VrButton` filters events to capture the primary buttons for each input channel.

## Cursor Systems

Cursors are implemented as raycasters. Originating from a point in space, an
invisible ray is sent into the scene until it intersects with a view or mesh
with an `onEnter`, `onExit`, or `onMove` event handler. If the interaction
state has changed, an appropriate event is sent to the view in the React
application. Your application can use any number of cursors at once; the first
implementation to return a value sets the cursor position on each frame.

React VR ships with a cursor implementation that allows users to
use a mouse or touchscreen to interact with your application. We don't
initialize applications with any other cursors by default, because the set of
possible input devices for users with VR headsets can be wide-ranging. However,
we've made it extremely simple to implement your own raycasters, and we've
provided examples of raycasters that work with 3DOF or 6DOF controllers.

Custom raycasters need to implement three methods: `getType`, `getRayOrigin`, and
`getRayDirection`.

`getType` returns a unique string identifier for the
raycaster, so that React applications can provide special handling for specific
cursors. These two methods are called each frame to compose the ray
and calculate intersections.

`getRayOrigin()` returns a 3-element array
representing the 3D position of the ray's origin, relative to the camera.

`getRayDirection()` returns a 3-element array representing the vector direction
of the ray, relative to the camera's orientation. The current `camera` object
is passed to each of these methods when they are called.
As an example, the default mouse raycaster returns a fixed origin of
`[0, 0, 0]`, and calculates the direction of the ray by calculating the vector
from the origin to the mouse coordinates on your screen. A raycaster can also
return `null` from either of these methods and defer cursor calculation
to the next raycaster.

Custom raycasters can also implement two optional methods: `frame` and
`drawsCursor`. If `frame()` is implemented, it is called on each frame of
the application; this is handy for updating virtual representations of
positional controllers in your 3D scene. `drawsCursor` returns a boolean value
determining whether this raycaster should ever draw a visible cursor.

You can determine which raycasters your application uses by supplying a
`raycasters` option to `VRInstance` in your `client.js` file. The key should
point to an array of raycaster instances.

## Cursor Visibility

Raycaster implementations can determine whether a visible cursor
is drawn in your scene. A visible cursor helps users determine
where their interactions will land. To help you implement this, we provide a standard
application-level cursor that tracks where interactions occur.

The `cursorVisibility` setting, passed at initialization time, controls the cursor
visibility and can have the following values:

 * `hidden` - No cursor is visible. This is the default.
 * `visible` - Cursor is always displayed.
 * `auto` - Visibility is computed each frame by React VR. Cursor is visible
 when hovering over components that have input event handlers, for example
 <VrButton> or a <View> to which you've attached handlers.

These settings are set at initialization time, which means they can be defined
in one of two different places. The first is in your `index.html` page:
`ReactVR.init()` takes a map of options as its third argument.

```
<!-- vr/index.html -->
<script>
ReactVR.init(
  '../index.vr.bundle?platform=vr',
  document.body,
  // third argument is a map of initialization options
  {
    cursorVisibility: 'visible',
  }
);
</script>
```

Alternatively, if you want these options to be compiled into your application,
you can also set them in the autogenerated `vr/client.js` file. These options
are passed as the last argument when the `VRInstance` is constructed.

```
// vr/client.js

const vr = new VRInstance(bundle, 'YourProject', parent, {
  // Custom initialization options go here
  cursorVisibility: 'visible',

  ...options,
});
```

## Example

The following code builds a simple component that changes text color when the
cursor hovers over it:

```
class ColorChange extends React.Component {
  constructor() {
    super();

    this.state = {textColor: 'white'};
  }

  render() {
    return (
      <Text
        style={{color: this.state.textColor}}
        onEnter={() => this.setState({textColor: 'red'})}
        onExit={() => this.setState({textColor: 'white'})}>
        This text will turn red when you look at it.
      </Text>
    );
  }
}
```
