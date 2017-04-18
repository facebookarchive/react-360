---
id: publishing
title: Publishing Your Project
layout: docs
category: The Basics
permalink: docs/publishing.html
---

### Building a production release

Once you've built a compelling VR experience, chances are you'll want to share
it on the web. React VR ships with a script to package everything up into a few
files that you can place on your web server. From the root directory of your
project, run the following:

```
npm run bundle
```

This creates a new directory in `vr` called `build`. Inside are the compiled
versions of your application files. These can be placed on a web server and
should work without any changes as long as they are placed in the
same directory.

If you use any external assets (`asset()`), you'll also want to copy your
`static_assets` directory alongside your files so that they can be referenced
by your application. At this point, your directory structure should resemble
the following:

```
Web Server
├─ static_assets/
│
├─ index.html
├─ index.bundle.js
└─ client.bundle.js
```

If you want to host your JavaScript files from a separate location, you can do
so by modifying the contents of `index.html`. Make sure the `script` tag at the
top points to the correct location for `client.bundle.js`, and that the call to
`ReactVR.init()` contains the correct path to `index.bundle.js`.

If you want to host your asset files from a separate location, such as a
dedicated CDN, you can pass the root directory as the `assetRoot` at the
`ReactVR.init()` call. For example, if your files were hosted at
`https://cdn.example.com/vr_assets/`, you would change the method call to
include the following third argument:

```
ReactVR.init(
  'path/to/index.bundle.js',
  document.body,
  { assetRoot: 'https://cdn.example.com/vr_assets/' }
);
```

### Integrating with an existing web page

If you want to embed your VR experience within a web page, the recommended
method is to use an `<iframe>` tag. Set the `src` attribute to point to your
project's `index.html` file, and set an appropriate size on the `iframe`.
