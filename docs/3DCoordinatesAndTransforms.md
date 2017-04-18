---
id: coordinates-and-transforms
title: 3D Coordinates and Transforms
layout: docs
category: The Basics
permalink: docs/coordinates-and-transforms.html
next: project-configuration
previous: reactnative
---

Most React UI components are positioned automatically by the layout algorithm.
Such layouts typically have X axis pointing to the right and Y axis pointing down.
In other words, top left is (0, 0) and the bottom right is (width, height).

This orientation behavior changes when we start positioning objects in 3D, which has its own coordinate system.

### React VR Uses the OpenGL® 3D Coordinate System

With React VR, we introduce a 3D coordinate system with the following effects:

* UI components can still be laid out in 2D in a traditional way, but the **`<View>`** plane they are located in can be transformed and positioned in 3D space.
* Individual components can be transformed, moved or rotated 3D relative to their layout in their parent.
* Each individual component can be positioned absolutely in 3D space.

React VR transformations use the right-handed OpenGL coordinate system. Right-handed means that when you use the thumb of your right hand to point in a positive direction along an axis, the curl of your fingers represent the direction of positive rotation.

![](img/coordinates.jpg)

Unlike in React, **the Y axis points up, not down.** This enables stronger overlap with the common coordinate systems of world space in assets and 3D world modeling.

Also, **the Z axis points forwards towards the user**. Because the default view of the user starts out at the origin, this means they start out looking in the –Z direction. Take care to place objects at a negative distance, such as -3 meters, if they are to be visible at the start. Here is an example of how such a transformation can be specified through a **`transform`** style property. We discuss chaining transforms later in this topic.
```
<Text style={{ position: 'absolute', transform: [{translate: [0, 0, -6]}],
               layoutOrigin: [0.5, 0.5] }}
      fontSize={0.4} text='Office Lobby' />
```

### Units

Distance and dimensional units are in meters.

Rotation units are in degrees.

### Transforms

Transforms place the various components in 3D space. React VR extends the transform style of React to be fully 3D. Here is a code example for a mesh transform from one of our samples.

```
<Model style={{
    transform : [   {translate : [0, -30, -300]}, { scale : 0.1 },
                    {rotateY : this.state.rotation}, {rotateX : -90} ] }}
    source={{url:'./creature/', mesh:'creature.obj', mtl:'creature.mtl',
    lit : true}}
/>
```

Transforms are represented as an array of objects within a style. Transforms within this array are applied last to first, for example:

```
  style={{
    transform: [
      {rotateZ : this.state.rotation},
      {translate: [0, 2, 0]},
      {scale : 0.01 },
    ],
  }}
```
In the above example, scale is applied first, then translate, then the Z-axis rotation. The end result moves the component 2 meters in the Y-axis and then rotates around the Z-axis.

The result of the transform example below is quite different:

```
  style={{
    transform: [
      {translate: [0, 2, 0]},
      {rotateZ : this.state.rotation},
      {scale : 0.01 },
    ],
  }}
```

In this example, the component rotates around its own origin before being moved 2 meters.

### Transform Properties

Transform properties are described by a sequence of commands paired with values in the form:

```
transform: [
              {TRANSFORM_COMMAND: TRANSFORM_VALUE},
              ...
            ]
```

**`TRANSFORM_COMMAND`** can be one of the following.

**`matrix`** : This accepts a value which is an array of 16 numbers where

* translation is stored as `[1,0,0,0, 0,1,0,0, 0,0,1,0, Tx,Ty,Tz,1]`
* a scale is represented by `[Sx,0,0,0, 0,Sy,0,0, 0,0,Sz,0, 0,0,0,1]`
* rotation can be represented the R values in `[R00,R01,R01,0, R10,R11,R12,0, R20,R21,R22,0, 0,0,0,1]`

**`matrix`** is the most flexible way of handling transforms and allows developers to use their own JavaScript modules and still be able to interface with React components.

For example, a matrix which scales all axes by `0.01` and then translates by `[3,2,1]` can be represented by:

```
  style={{
    transform: [
      {matrix : [0.01,0,0,0, 0,0.01,0,0, 0,0,0.01,0, 3,2,0,1]},
    ],
  }}
```

**`rotateX`** : This command accepts a single value which rotates around the X axis by a number of degrees. The default units for numbers or string representations of a number are degrees. To specify radians instead, append **`rad`** to the string, for example, **`-0.5rad`**.

```
  style={{
    transform: [
      {rotateX : 10},
    ],
  }}
```

**`rotateY`** : This command accepts a single value which rotates around the Y axis by a number of degrees. The default units for numbers or string representations of a number are degrees. To specify radians instead, append **`rad`** to the string, for example, **`-0.5rad`**.

```
  style={{
    transform: [
      {rotateY : 10},
    ],
  }}
```

**`rotateZ`** : This command accepts a single value which rotates around the Z axis by a number of degrees. The default units for numbers or string representations of a number are degrees. To specify radians instead, append **`rad`** to the string, for example, **`-0.5rad`**.

```
  style={{
    transform: [
      {rotateZ : 10},
    ],
  }}
```

**`scale`**: The scale command can take a number or an array. If the value is a number, the scale is uniform across all axis. For example:

```
  style={{
    transform: [
      {scale : 10},
    ],
  }}
```
If using an array, the scale values can be stipulated per axis. For example:
```
  style={{
    transform: [
      {scale : [0.01, 0.02, 0.03]},
    ],
  }}
```

**`translate`**: The translate command takes an array of numbers specifying the translation in meters along each of the principal axis in the order of **`[X,Y,Z]`**.

```
  style={{
    transform: [
      {translate : [0.01, 0.02, 0.03]},
    ],
  }}
```

**`translateX`**: Allows a translation along only the X axis in units of meters.

```
  style={{
    transform: [
      {translateX : 1},
    ],
  }}
```

**`translateY`**: Allows a translation along only the Y axis in units of meters.

```
  style={{
    transform: [
      {translateY : 1},
    ],
  }}
```

**`translateZ`**: Allows a translation along only the Z axis in units of meters.

```
  style={{
    transform: [
      {translateZ : 1},
    ],
  }}
```
