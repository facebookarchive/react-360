---
id: project-configuration
title: Project Configuration
layout: docs
category: The Basics
permalink: docs/project-configuration.html
next: vr-browsers
---

### Understanding the project structure

When you initially ran the `react-vr` tool, it created a bunch of files in the project directory. What are they all for?

* `index.vr.js` is the entry point for your React VR app. It contains your application code.
* `static_assets` contains all external resource files. Textures, models, and other objects you import should be placed here. They can be referenced with the `asset(path)` method, which will automatically resolve to the correct location.
* `vr` contains the support code necessary for running your app. Chances are, you don't need to change these files. This directory contains `index.html`, which is the web page that launches your application.
* `package.json` is a configuration file for your project. It tells `npm` how to install your project's external dependencies, such as the React VR and OVRUI libraries.
