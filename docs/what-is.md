---
id: what-is
title: What is React 360?
sidebar_label: What is React 360?
---

## About React 360

React 360 is a framework for the creation of 3D and VR user interfaces. Built on top of React – a library designed to simplify the creation of complex UI – React 360 allows you to use familiar tools and concepts to create immersive 360 content on the web.

### What is it for?

React 360 is optimized for the creation of user interfaces that power rich multimedia experiences. It provides the tools necessary to to create high-quality interfaces and delivers a strong foundation for applications built around 360 and 3D content. The techniques and tools used in React 360 are similar to the ones used by Oculus and Facebook when developing their VR applications on mobile and PC platforms, and are the result of years of research into best practices.

React 360 is about bringing interactivity into 360 spaces. Applications that combine 2D or 3D interfaces are easily within your reach. Photo and video viewers, 360 tours, classic adventure games, and 3D board games are all examples of things that have been built with React 360 so far.

### How is React 360 Different from React VR?

In early 2017, Facebook and Oculus released a JavaScript library called “React VR,” which was designed for the creation of 3D and VR experiences in the web browser. At the same time, Oculus began using a native C++ version of the framework to build its own first-party apps. Over time, the APIs of the two projects diverged as we addressed the different needs of the frameworks. To avoid confusion between the two systems, the open source framework has been renamed “React 360,” which better reflects its use case: the creation of immersive 360 experiences that can be consumed across PC, Mobile, and VR devices.

If you previously used React VR, you should find React 360 to be very similar. We've simplified a lot of the more common workflows, such as placing 2D UI elements in 3D space, and optimized performance for these use cases. If you want to migrate a legacy React VR app over to use the new tools, follow [this guide](/react-360/docs/from-react-vr.html).

### How is React 360 Different from A-Frame?

A-Frame is a framework for building VR worlds using declarative HTML-like components. It has a rich collection of available components from a vibrant community, and is great for creating intricate 3D scenes that can be viewed in VR. We believe that React 360 serves a different use case optimized around applications that rely on user interfaces, or are event-driven in nature. Look through our examples to see the types of things you can easily build with React 360.

Trying to figure out which framework is right for you? Here's a quick test. If your application is driven by user interaction, and has many 2D or 3D UI elements, React 360 will provide the tools you need. If your application consists of many 3D objects, or relies on complex effects like shaders and post-processing, you'll get better support from A-Frame. Either way, you'll be building great immersive experiences that are VR-ready!

### How is React 360 Different from Three.js?

Three.js is a library for 3D rendering in the web browser. It's a much lower-level tool than React 360, and requires control of raw 3D meshes and textures. React 360 is designed to hide much of this from you unless it's needed, so that you can focus on the behavior and appearance of your application.

Currently, React 360 relies on Three.js for some of its rendering work. However we are opening up the relevant APIs so that React 360 developers may soon be able to use the 3D rendering library of their choice, including raw WebGL calls.
