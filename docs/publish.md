---
id: publish
title: Build a Production Version of Your App
sidebar_label: Build for Production
---

Running on the local server is only for development. Once you're ready to publish your app, you'll need to build prodution versions of the code.

React 360 includes a command that packages everything up into a single folder. Running `npm run bundle` from the root directory of your project will create production builds of your JS, create a copy of your `index.html` and `NonBlobBridge.js` file pointing to the production JS, and place it all in a new `build` directory. To publish your application, copy the contents of this directory to your server. If you used any files in the `static_assets` directory, you should also copy this folder to your server. The layout of the files should resemble the following structure:

```
Web Server
├─ static_assets/
│
├─ index.html
├─ index.bundle.js
├─ client.bundle.js
└─ NonBlobBridge.js 
```

It's also possible to place your static assets in a different location. You can learn more about this in the next section.