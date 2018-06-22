---
id: example-slideshow
title: Example: 360 Slideshow
sidebar_label: 360 Slideshow
---

A demonstration of how easy it is to build a spherical photo viewer, projecting 180 and 360 images in both mono and stereo formats.

![Slideshow Example](/react-360/img/example_slideshow.jpg)

## Exploring the Sample

The code for this sample is found [here](https://github.com/facebook/react-360/tree/master/Samples/Slideshow). To test it out for yourself, create a new project with the React 360 CLI, and copy over the files from the repository into your project directory. When you start up the server and load http://localhost:8081/index.html, you should see the 360 world from the starter project, as well as a simple UI bar that contains a title and two directional arrows.

To make the example your own, open up `client.js` to find the array of props being passed to the application. You can add your own entries to that array and add photos to the slideshow: include a `uri` field pointing to the path of your equirectangular photo, and an optional `format` field for stereo images that include left and right views in a single photo. The options for the `format` are listed [here](/react-360/docs/photos-and-videos.html#mono-and-stereo-formats). For example, if you had a photo containing two views, where the left viewport was in the top half, and the right viewport was on the bottom, you would add an object like this:

```js
// ...
{uri: 'path/to/my/stereo_photo.jpg', format: '3DTB'},
// ...
```

## The Code

Open up `index.js` to see how it works. The slideshow component keeps a very simple state object – it stores the index of the current photo, and updates whenever it changes. It renders two buttons which increase or decrease this index, as well as the title of the current image.

We also include a secondary component, `Background`, that doesn't render anything directly, but uses the `Environment` module and the current URI and Format to change the background. We could have added this directly into the render method of `Slideshow`, but triggering side-effects in a render method is a React antipattern. By breaking it out into a secondary component and only changing the environment when the props change, we guarantee that the background only transitions when we want it to.

## Further Extensions

This sample should be a good starting point for any application that shows off 360 scenes. You could extend it to also support video – create players for each video entry, and restart them whenever the user navigates to a video entry. The `Environment` module lets you attach players to the background, as described [here](/react-360/docs/photos-and-videos.html#displaying-panoramic-videos).

Instead of using a single-dimensional array to move from photo to photo, you could also replace it with a JSON object containing links from one entry to the next. With this, you could built a multi-room tour, or even a dungeon-crawler adventure game. They all use the same basic principles.
