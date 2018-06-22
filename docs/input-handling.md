---
id: input
title: Input Handling
sidebar_label: Input Handling
---

Your users consume your experience through a variety of devices, each with its own input configuration. React 360 has been designed to support this hardware diversity in a way that lets you focus on your app's logic, instead of special-casing different inputs. 

## Button Input

The most common way for your user to interact with your app is through pressing a physical button: a keyboard key, a mouse click, a gamepad button, or something similar. React 360 is designed to collect input from a wide range of devices and send it to your React code in an easy-to-use format. When you create a new React 360 app, it is already configured to collect input from a mouse, a touchscreen, a keyboard, or a gamepad. To start handling events in React, add an onInput callback to one of your components. When the cursor is over your component and the user triggers an input event, it will be sent to that callback.

```
<View onInput={e => {
  const event = e.nativeEvent; // Extract the value from the runtime
  // event contains the actual event payload, as well as information on
  // which cursor the user was using, and which React tag was targeted
  const inputEvent = event.inputEvent; // Extract the payload
  // inputEvent.button is the raw button index, used to determine what was pressed
  // inputEvent.buttonClass is a field added to some buttons for common actions,
  //   like 'confirm', 'back', 'up', 'down', etc.
  // inputEvent.action is 'up', 'down', or 'repeat'
  // inputEvent.source identifies the button device, such as keyboard, mouse, etc
}}>
  { /* ... */ }
</View>
```

Out of the box, React 360 supports collecting inputs from four common interfaces: mouse, touchscreen, keyboard, and gamepads. Between the four of these, the majority of user input systems should be covered. These input systems are themselves highly configurable, and can be extended or overridden to align with your app's behavior. For instance, the Gamepad interface is designed to handle both traditional gamepads and tracked VR inputs. It contains presets for common inputs, such as the Xbox controller, Oculus Touch devices, the Oculus Go controller, and Microsoft Mixed Reality controllers. It also allows you to define your own custom mappings, in case you want to override the presets or add support for a new device.

If you wanted to capture every time a confirm button was pressed down, it would be implemented as follows:

```
onInput={e => {
  const inputEvent = e.nativeEvent.inputEvent;
  if (inputEvent.action === 'down' && inputEvent.buttonClass === 'confirm') {
    // do something
  }
}}
```

### VrButton and Clicks

Input events allow you to respond to raw signals, but you often want to respond to a confirmation key being pressed and released, signifying a click event. We provide a component that contains the state-machine logic necessary to track these complex events: `VrButton`. In addition to the existing `onEnter`, `onExit`, and `onInput` handlers, VrButton also provides an `onClick` event handler. When the cursor is placed over the VrButton, and a confirm-type button is pressed and released on any input device, this callback is triggered. VrButtons are the easiest way to build click-driven effects into your app. Because they contain general-purpose logic, they don't have any styling of their own. You can make a VrButton look however you want, or combine it with some enter & exit highlight effects to create a custom visual Button component for your application.

## Cursors

Enter, exit, and input events are sent to React based on where the cursor is pointing. The cursor is also highly configurable to support multiple input scenarios. Out of the box, React 360 supports mouse and touch input, as well as 3DoF and 6DoF VR controllers. These inputs work by casting a virtual laser beam into the screen – the cursor is drawn where the beam intersects with a scene element.

Components can listen to enter and exit events with `onEnter` and `onExit` callbacks. When the cursor begins to intersect with an element, its `onEnter` handler will be triggered; when the cursor later leaves the element, its `onExit` handler will be called.

Currently, cursors are tested in the order they are registered. The first cursor that successfully returns a ray will be used to determine the location of the cursor. Future iterations of React 360 will enable multiple cursors for users who are using two-handed inputs like Oculus Touch.

### Custom Raycasters

If you want to implement your own cursor system, you will need to build a **Raycaster** – a piece of code that continuously tells your application where the virtual laser beam is located. Raycasters must implement a specific interface, described [here](https://github.com/facebook/react-360/blob/master/React360/js/Controls/Types.js).

At their simplest, Raycasters describe a 3D ray that intersects with your scene: a starting point and a direction in which the ray is projected. This information is collected each frame through the `fillOrigin` and `fillDirection` methods. These each take a 3-element array as their argument, and optionally fill it with the current origin location or direction (as a 3-dimensional vector). If a value has been inserted, they return true; otherwise, they return false. These methods fill pre-allocated arrays, rather than creating new ones, to avoid constant creation of new JS objects.

Depending on your input data, your raycaster may be positioned relative to the camera (such as with the mouse cursor), or in absolute world coordinates (as seen in the controller raycaster, which gets the absolute location from the Gamepad API). Raycasters implement a `hasAbsoluteCoordinates()` method that returns a boolean telling the Runtime whether the orientation and direction are absolute or relative to the camera. If it returns false, the ray data will be translated to the camera's frame of reference before it is consumed by React 360.
