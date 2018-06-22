---
id: static-assets
title: Static Assets
sidebar_label: Static Assets
---

While you can build entire applications based around the basic text and rectangle components of React 360, chances are that you'll want to add external resources to your app. Whether they are images, panoramas, sounds, or 3D models, assets can be pulled in to increase the richness of your 360 experience. There are two ways that these resources can come into your app: they can be hosted on an external service, or you may host them yourself.

The difference between the two options arises when you move from developing your app to publishing it. Externally-hosted assets are always found at the same location, and you can reference these directly. Your own assets need to be handled differently. The location of your assets in development mode (likely the `static_assets` directory created when you generate your project) may be different when you deploy to production. If you copy all of your files to your server as a single directory, you may not need to change anything. However, if you wish to deploy your static assets to a separate domain or CDN, you will need to configure your app to adapt to these changes.

## Referencing Static Assets

To create references to assets that can be moved at production time, you should avoid writing relative URL paths, and instead use the `asset()` method. By default, this method will point to your `static_assets` directory, but can be rewritten at runtime to point to your CDN, even if its URL is dynamically generated.

```js
// asset() example
// By default, this will point to the image at static_assets/myImage.png
<Image source={asset('myImage.png')} />
```

The `asset()` method creates a resource object containing a URI path. There may be times where you need to just generate a string path to a resource. You can use `staticResourceURL()` in those situations – it takes a local resource path, and transforms it when your static resources move.

## Specifying the Asset Location

Once you have published your app, you can configure the static resource location by passing an `assetRoot` at initialization time.

```js
const r360 = new ReactInstance(
  'MyReact360App.bundle.js',
  document.getElementById('container'),
  {
    // provide the custom asset root
    assetRoot: 'https://mycdn.example.net/myapp/',
  },
);
```

If you're building your app with `npm run bundle`, you can specify the custom asset root with the `--assets` flag.

```bash
npm run bundle -- --assets "https://mycdn.example.net/myapp/"

# OR

yarn bundle --assets "https://mycdn.example.net/myapp/"
```
