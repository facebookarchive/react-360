---
id: example-basicapptemplate
title: Example: Basic App Template
sidebar_label: Basic App Template
---

`BasicAppTemplate` is a sample app code template for anyone to start building an app with React360.
There are also inline comments to guide how each part of the sample code works.
This Template includes:
- Basic UI and interaction
- Basic Audio Control
- Basic Environment(photo/video) control.
- Basic UI Animation.

![Basic App Template Example](/react-360/img/example-basicapptemplate.jpg)

## Exploring the Sample

The code for this sample is found [here](https://github.com/facebook/react-360/tree/master/Samples/BasicAppTemplate). To test it out for yourself, create a new project with the React 360 CLI, and copy over the files from the repository into your project directory. When you start up the server and load http://localhost:8081/index.html, you should see the 360 world from the starter project, as well as a simple panel with animation when you hovering on each section.

## The Code

Open up `client.js` and see the comments to guide you how to setup on client side.

Open up `index.js` to see how it works on React side.

Two React Components are used in this sample:
 - `src/BasicAppTemplateInfoButton.react.js`: A simple button provide example on how to handle user interaction, sound effect and animation.
 - `src/BasicAppTemplateScenePage.react.js`: A simple component provide example on how to control environment on React side.

## Further Extensions

This sample should be a good starting point for any application that has UI interaction and environment control.

Instead of a hard coded data object in `BasicAppTemplateScenePage`, you can have another JSON file containing the data definition or serving the data on your server and query it.
