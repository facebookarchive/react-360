# react-360-surfaces

The Surfaces package provides the code for building and manipulating 2D surfaces
that live in 3D space. These flat and cylindrical surfaces are intended to place
React WebGL interfaces into a 3D or VR application. Additionally, the package
includes logic for an environment sphere that can display 2D and 3D
equirectangular photos and videos, in both 180 and 360 formats. These can be
used to create immersive backgrounds for VR scenes.

For flat and cylindrical React surfaces, it's critical to know where the user's
cursor is on the surface, so that events can be sent to the appropriate React
elements. In order to do this, the surfaces implement a trigonometry-based
intersection computation, rather than a traditional geometry-based one. This
implementation is faster, especially on mobile chipsets, and will enable future
versions of the Surfaces package to take advantage of emerging WebXR features
that draw these surfaces late in the rendering process, allowing for a higher
resolution.
