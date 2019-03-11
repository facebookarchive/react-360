# `/packages` Directory

React 360 is composed of a series of packages that are layered to create an immersive 360 environment. Each package is designed to provide a single function, so that developers can pick and choose the pieces they need.

This directory is a Lerna monorepo, which makes it easy to manage many packages with a single script.

## `webgl-lite`

This package implements the low-level WebGL operations needed to render 2D UI elements and basic 3D scenes. It is intentionally lightweight and optimized for the use cases of our interface-drawing libraries. Because it adds very little on top of the WebGL primitives, content rendered by `webgl-lite` can be easily integrated into other WebGL projects.

## `webgl-ui`

This package implements flexible, styleable primitives for 2D interfaces. It's like a DOM for WebGL. Within a `webgl-ui` surface, you can construct rectangles, text, and images, style them with CSS-like properties, and combine them using Flexbox layouts.

## `react-webgl`

React WebGL provides true React bindings for `webgl-ui`. It allows you to use React to construct a UI in WebGL, and render it to any canvas or texture. It handles event collection, and includes convenience wrappers for drawing to a canvas or framebuffer.
You can add support for React Native's Animated library through `animated-react-webgl`.

## `react-360`

React 360 brings the interface-building capabilities of React WebGL into a 360 environment. It lets you draw React WebGL components to surfaces in 3D space, display panoramic environments, play audio and video, and work with VR headsets. Most of the packages in this directory are used to support React 360.

## Building and Publishing Packages

The majority of these packages need to be "built" before they are published – this just extracts their Flow types, so that they can be imported into a project that doesn't use Flow. To build all packages, run:

```
lerna run build
```

Any package with a `build` script will create a directory containing its built files, which will be referenced when users pull the package down from npm.

We do not rely on Lerna to publish a single version number for all packages. Each package is allowed to have its own version number, so that we can easily publish patches and hotfixes as needed. All packages that have new changes (hint, use `lerna changed`) should have their `package.json` version fields updated and committed back to the repo. Once version numbers have been updated, they can be published by running `npm publish` in their invidual directories.
