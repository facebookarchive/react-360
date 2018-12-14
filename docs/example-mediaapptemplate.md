---
id: example-mediaapptemplate
title: Example: Media App Template
sidebar_label: Media App Template
---

`MediaAppTemplate` is a sample app code template for anyone want to build a heavily media
based app using React360.
There're also inline comments to guide how each part of the sample code works.
This Template includes:
- Basic UI flow and audio.
- Preloading Medias(photo/video)
- Displaying and controlling Medias(360 photo, 360 video, rectilinear video)
- Controlling Environment transition
- Multiple Surfaces control

![Media App Template Example](/react-360/img/example-mediaapptemplate.jpg)

## Exploring the Sample

The code for this sample is found [here](https://github.com/facebook/react-360/tree/master/Samples/MediaAppTemplate). To test it out for yourself, create a new project with the React 360 CLI, and copy over the files from the repository into your project directory. When you start up the server and load http://localhost:8081/index.html, you should see the welcome scene and you can click the buttons to go to other scenes .

## The Code

Open up `client.js` and see the comments to guide you how to setup on client side. An example of how to create a subtitle surface and make it moves with camera is provided in this example.

Open up `index.js` to see how it works on React side. You can see example in `index.js` on how to send event between two root views on two surfaces.

Four React Components are used in this sample:
 - `src/MediaAppTemplateInfoButton.react.js`: A simple button provide example on how to handle user interaction, sound effect and animation.
 - `src/MediaAppTemplateSubtitleText.react.js`: A simple text showing the subtitles.
 - `src/MediaAppTemplateScenePage.react.js`: A component provide example on how to control environment on React side. It also provides example on how to reload 360 photo and videos.
 - `src/MediaAppTemplateVideoScreen.react.js`: A component provide example on how to play flat in-line video and layout it with other React component. You can also use [video uis](http://localhost:3000/react-360/docs/photos-and-videos.html#video-uis) instead.

## Further Extensions

This sample should be a good starting point for any application that want to display a lot of 360 media contents.

Instead of a hard coded data object in `index.js`, you can have another JSON file containing the data definition or serving the data on your server and query it.
