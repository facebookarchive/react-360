---
id: layout
title: Layout in 2D and 3D
sidebar_label: Layout
---

## Layout in 2D Surfaces

Within the context of 2D surfaces, React 360 uses a layout technique called Flexbox. This constraint-based system of layout was originally developed for the web, but its power and ability to represent many different layout types lends itself to the declarative nature of React. It was adopted by React Native, from which React 360 borrows its implementation. The React Native documentation covers these topics well, and should be used to understand how to [size your objects](http://facebook.github.io/react-native/docs/height-and-width.html) and [lay them out in 2D space](http://facebook.github.io/react-native/docs/flexbox.html).

## Layout in 3D Space

When mounting to a [Location](/react-360/docs/objects.html#locations) instead of a Surface, React 360 switches to a three-dimensional, meter based coordinate system. This is typical of 3D modeling programs and game engines – once you switch to placing objects into physical space, you need to use a phyically-based measurement system.

In this coordinate system, there are three axes: the x axis points towards the right of the user, the y axis points upwards, and the z axis points behind the user. Placement of 3D objects is done through the `transform` style attribute, which takes an array of transformations that are applied to the object. You can translate and rotate an object in 3D space with the following options:

 - `{rotateX: x}` - rotate by some number of degrees around the x-axis
 - `{rotateY: y}` - rotate by some number of degrees around the y-axis
 - `{rotateZ: z}` - rotate by some number of degrees around the z-axis
 - `{translate: [x, y, z]}` - move the object relative to its parent

Multiple transformations can be applied to a single object, and they are applied right-to-left. This is important, because a rotation followed by a translate is different from a translate followed by a rotation!

Transforms are relative to the parent – as you move down the React tree, they are added up from parent to child. You can use `<View>` elements in 3D space to group your 3D elements together and apply translations to groups.

```js
// In this example, both entities will be placed
// two meters in front of the user, and each will
// be one meter to either the left or right

<View
  style={{transform: [
    {translate: [0, 0, -2]}
  ]}}>

  <Entity
    style={{transform: [
      {translate: [1, 0, 0]}
    ]}}
    { /* ... */ }
  />

  <Entity
    style={{transform: [
      {translate: [-1, 0, 0]}
    ]}}
    { /* ... */ }
  />

</View>
```