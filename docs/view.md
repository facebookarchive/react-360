---
id: view
title: View
sidebar_label: View
---

The most fundamental component for building a UI, View is a container that supports layout with Flexbox, appearance styling, and input events. In 2D space, View is a box for spacing elements, or creating borders and background colors. In 3D space, View is used for grouping Entities or other Views, applying transforms in 3D space.

This example creates a View that wraps two colored boxes and a text component in a row with padding.

```js
class ViewColoredBoxesWithText extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row', height: 100, padding: 20}}>
        <View style={{backgroundColor: 'blue', flex: 0.3}} />
        <View style={{backgroundColor: 'red', flex: 0.5}} />
        <Text>Hello World!</Text>
      </View>
    );
  }
}
```

## Props

### `hitSlop?: number`

This defines how far a touch event can start away from the view. This becomes important when creating small interactive targets that are clicked with a VR controller.

### `onEnter?: function`

Invoked when a cursor begins intersecting with the view

### `onExit?: function`

Invoked when a cursor stops intersecting with the view

### `onInput?: function`

Invoked when a user presses an input button while the cursor is over the view. More on this in the [Input Handling docs](input.md).

### `pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto'`

Controls whether the View can be the target of input events.

 - `auto` - The view can be the target of events
 - `none` - The view is never the target of events
 - `box-none` - The view is never the target of touch events, but its subviews can be.
 - `box-only` - The view can be the target of touch events, but its subviews cannot be.

### `style? Style | Object`

 - **[Layout Props...](layout-props.md)**
 - **[Shadow Props...](shadow-props.md)**
 - **transform** - `transform` takes an array of transformation objects that are applied last-to-first. The following entries are supported:
   - `{rotateX: number | string}`
   - `{rotateY: number | string}`
   - `{rotateZ: number | string}` - Not supported on Surfaces
   - `{scaleX: number}`
   - `{scaleY: number}`
   - `{scaleZ: number}` - Not supported on Surfaces
   - `{translateX: number}`
   - `{translateY: number}`
   - `{translateZ: number}` - Not supported on Surfaces
 - **backgroundColor** `color`
 - **borderBottomLeftRadius** `number`
 - **borderBottomRightRadius** `number`
 - **borderBottomWidth** `number`
 - **borderColor** `color`
 - **borderLeftWidth** `number`
 - **borderRadius** `number`
 - **borderRightWidth** `number`
 - **borderTopLeftRadius** `number`
 - **borderTopRightRadius** `number`
 - **borderTopWidth** `number`
 - **borderWidth** `number`
 - **opacity** `number`
 - **overflow** `'visible' | 'hidden'`
