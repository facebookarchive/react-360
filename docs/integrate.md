---
id: integrate
title: Integrating into an Existing Web Site
sidebar_label: Integrate with Another Site
---

When building your application, you have an HTML page that allows you to view your project on its own. Many experiences are best viewed at full screen, especially on mobile, and the easiest way to do this is to send users directly to this HTML page. There may be times, though, where you wish to embed it into a larger page. There are two techniques for this.

## Embedding via Iframe

The recommended manner of embedding React 360 content into a larger web page is to use an Iframe. Point the `src` attribute of your `<iframe>` tag to your project's index HTML file. This technique guarantees that your application won't interfere with the parent web page, and the parent web page won't be able to slow down rendering of your app. This also allows you to serve up your content from a single endpoint, and use both the embedded and full-screen experience.

## Add to a Larger JS App

If you want to add your runtime code into part of a larger JS application, you can take the code found in your `client.js` file and place it into your app. While the React part (`index.js`) of your app requires the built-in bundler to compile its code, the runtime (`client.js`) does not, and can be integrated into a larger project built by Webpack or similar tech.

When your React 360 code initializes, it declares the DOM node to attach itself to. You can replace this with any DOM node if you take your code out of the starter project. You will also want to disable the `fullScreen` flag if you do this – otherwise it will render over your other content.
