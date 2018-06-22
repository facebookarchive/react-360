---
id: entity
title: Entity
sidebar_label: Entity
---

Entity allows you to render 3D objects, as described in the [3D Object documentation](objects.md). At the moment, React 360 supports Wavefront OBJ files and GLTF files. The external resource (or resources) containing the model's information are provided using a `source` attribute, which is an object of key-value pairs mapping resource types to their locations.

The following properties are currently supported:
 - `obj` - Location of an OBJ-formatted model
 - `mtl` - Location of a MTL-formatted material (the companion of OBJ)
 - `gltf2` - Location of a standalone GLTF2 model

```js
// Entity with a material
<Entity
  source={{
    obj: asset('sculpture.obj'),
    mtl: asset('sculpture.mtl'),
  }}
/>

// Entity without a material
<Entity
  source={{
    obj: asset('standalone.obj'),
  }}
/>
```

## Props

### `source?: Object`

An object containing keys pointing to the resources for the 3D model, as described above.

### `style? Style | Object`

 - **transform** - `transform` takes an array of transformation objects that are applied last-to-first. The following entries are supported:
   - `{rotateX: number | string}`
   - `{rotateY: number | string}`
   - `{rotateZ: number | string}`
   - `{scaleX: number}`
   - `{scaleY: number}`
   - `{scaleZ: number}`
   - `{translateX: number}`
   - `{translateY: number}`
   - `{translateZ: number}`
 - **color** `color`
 - **opacity** `opacity`