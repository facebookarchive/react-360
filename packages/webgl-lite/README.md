# webgl-lite – Convenience wrappers around WebGL primitives

WebGL Lite implements convenient wrappers around both low- and high-level WebGL
APIs and concepts. It makes it easy to construct shader programs, associate
them with groups of attributes and uniforms, and combine multiple elements into
a single render pass. It handles things like auto-binding textures at render
time, automatically using WebGL 2.0 shaders when supported, and setting default
uniforms for an entire scene.

On its own, WebGL Lite is not a full-featured 3D rendering environment. It does
not implement any primitives, or even a scene graph, but instead provides the
hooks for both 2D and 3D libraries to compose larger WebGL scenes.
