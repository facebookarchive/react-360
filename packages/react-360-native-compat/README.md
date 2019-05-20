# react-360-native-compat

Utilities for compatibility with legacy React Native-style APIs, such as Native
Modules.

Previous versions of React 360 were built on top of React Native, for both
performance and upgradeability reasons. Since the advent of React Fiber, it's
now possible to build cleaner, faster integrations for custom React renderers
like React WebGL. Code now runs all on the main thread, but in order to provide
compatibility for legacy React 360 code, we still implement the Native Modules
and nonstandard components from past versions.
