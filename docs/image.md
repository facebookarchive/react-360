---
id: image
title: Image
sidebar_label: Image
---

A React component for displaying 2D images on a surface. Image sources can be externally-hosted resources, or referenced from your `static_assets` directory and hosted alongside your app.

```js
renderImages() {
  return (
    <View>
      <Image source={{uri: 'http://example.net/externally/hosted/image.png'}} />
      <Image source={asset('image-in-static-assets.jpg')} />
    </View>
  );
}
```

Images will not automatically size based on their contents, because that blocks layout on a network request. In order for Images to render, they must have their shape explicitly declared, either through `width` and `height` styles, or Flexbox properties.

## Props

### `crop?: [number, number]`

Specifies the extends of the UV coordinates to display

### `onLoad?: function`

Invoked when the currently-referenced image source loads successfully

### `onLoadEnd?: function`

Invoked when the currently-referenced image source succeeds or fails to load

### `onLoadStart?: function`

Invoked when the Image begins fetching a new source

### `source: {uri: string}`

`uri` is a string representing the URI for the image, which could be an absolute or relative HTTP path. In the case of assets that you host alongside your app, it is recommended you import them using the [`asset()` helper](static-assets.md#referencing-static-assets), which generates the source object for you.

### `style? Style | Object`

 - **[View Styles...](view.md#style-style-object)**
 - **tintColor** `color`
