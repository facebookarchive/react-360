---
id: debugging
title: Debugging
layout: docs
category: Guides
permalink: docs/debugging.html
next: platform-specific-code
previous: timers
---

## Reloading JavaScript

Instead of recompiling your app every time you make a change, you can reload
your app's JavaScript code instantly. To do so, press **F5** in the browser on
Windows, or **Command ⌘** + **R** on MacOS.

If you have loaded your application in Hot Reloading mode, you should also see changes dynamically update as you save source files on your host machine.

```
http://localhost:8081/vr/?hotreload
```

For more information, see the Dev Tools section.

## In-app Errors and Warnings

Errors and warnings are displayed in the console of your web browser.

### Errors

Console logs and output as console.error.

### Warnings

Console logs and output as console.warn.

## Chrome Developer Tools

The browser developer tools can be used for debugging, this includes adding
breakpoints and inspecting runtime values. You will notice that the source is
presented as a single bundle of JavaScript. However, as the React Native
packager also supports sourcemaps, the original source code can also be used.
