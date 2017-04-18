---
id: releasechangelog
title: Release Changelog
layout: docs
category: The Basics
permalink: docs/releasechangelog.html
---

List of significant features and fixes added with each release of our npm packages.

Show which version is installed:
```
npm <name> --version
```
Show version details:
```
npm view <name>
```
In the above commands, `<name>` is the npm module, such as `react-vr`.

## `react-vr`

### 0.2.0
------
* `<Mesh>` has been renamed to `<Model>`
* New API for declaring the `lit`, `texture`, and `source` properties for a `<Model>`, allowing these to be easily toggled without recomputing the mesh
* New 3D primitives: `<Box>`, `<Cylinder>`, `<Sphere>`, `<Plane>`
* Sound effects now support passing multiple formats, so that React VR can load the version that will play best in the browser at runtime

### 0.1.7
------
* Add `loop` property to `<Video>` component.
* Update package.json to use Three.js version r80

### 0.1.6
------
* New `<Video>` component for adding 2D Video elements to the scene.
* Add `loop` and `volume` properties to Sound component.
* Fix Pano cubemap syntax to work with asset utility.

### 0.1.5
------
* New `<Sound>` component for adding 3D Audio elements to the scene.
* Sound effects for 'click' and 'enter' (hover) can now be added to `<VrButton>`
* VRSoundEffects utility improved and added to API docs.
* '<Mesh>' now supports models with vertex colors.
* Allow user to pass a custom camera to VRInstance.

### 0.1.2
------
* expose 'cursorVisibilitySlop' to determine how close the cursor must be to the view before it is visible. Default is `{top: 0, bottom: 0, left: 0, right: 0}` meaning  the cursor is visible
only when intersecting with the view.
* various fixes

### 0.1.1
------
* Hot Reload: automatically append hot=true to bundle request from pack
* Fix rotate and -ve scale that should only be on equirect

## `react-vr-web`

### 0.2.0
------
* Overhaul of mesh construction to allow toggling of lighting, textures, and the construction of new primitives
* Custom SDF fonts can be provided at initialization time

### 0.1.7
------
* Update package.json to use Three.js version r80

### 0.1.6
------
* Extend Video native module to provide access to the video texture.

### 0.1.4
------
* Location native module providing access to the browser's window.location object
* Billboarding option makes view rotate to face the camera in non-VR mode.

### 0.1.2
------
* Cache download of Wavefront objects and materials used by Mesh component
* Browser History NativeModule
* Fix flexbox layout where components with position:'absolute' with no specified top or left were incorrectly offset
* various fixes discovered by Flow

### 0.1.1
------
* Fix rotate and -ve scale that should only be on equirect

## `react-vr-cli`

### 0.2.1
------
* New projects are initialized with a Jest unit testing environment
* CLI will let you know when it is out of date

### 0.1.4
------
* Removed postinstall script, no longer needed.

### 0.1.2
------
* Break when invalid project names are used, perform whitespace sanitization


### 0.1.1
------
* Fix path description in CLI, use yarn when available

## `ovrui`

### 0.1.7
------
* Small changes necessary to allow custom fonts

### 0.1.5
------
* Update package.json to use Three.js version r80


###0.1.4
------
* Initial verision of the cylinder layout.

###0.1.3
------
* Change default behavior of touchEvents to hit object under cursor instead of at tap location.

### 0.1.1
------
* Adjust non VR clipping planes to be same as WebVR defaults [0.01, 10000.]
* GuiSys changed cursorEnabled/cursorAutoHide flags to cursorVisibility. More details in `handling-input` documents section
* Add cursorSlop property to configure cursorVisibility='auto' behavior. Defines how close the cursor must be to the view before it is visible.
