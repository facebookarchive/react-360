---
id: images
title: Images
layout: docs
category: Guides
permalink: docs/images.html
next:  animations
previous: colors
---

You must manually specify the dimensions of your image. Image dimensions are
specified in meters and it is not possible to predict the intended dimensions
merely from the pixel width and height of the image.

```javascript
// GOOD
<Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
       style={{width: 1, height: 1}} />

// BAD
<Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
```

## Why Not Automatically Size Everything?

The issue is that React VR is fully 3D. Pixels don't correspond directly to
world units because it is possible to place an image at various different
depths. If you don't specify the image dimensions *in the browser*, the browser
renders a 0x0 element, downloads the image, and then renders the image based
with the correct size. Therefore, we have chosen to make developers specify
explicit image dimensions.

## Source as an object

An interesting React Native decision is that the `src` attribute is named
`source` and doesn't take a string but an object with a `uri` attribute.

```javascript
<Image source={{uri: 'something.jpg'}} />
```

This is desirable from an infrastructure viewpoint. It allows us to attach
metadata to this object. For example, if you are using
`require('./my-icon.png')`, then we add information about its actual location
and size. This is also future proofing, for example, we may want to support
sprites at some point, or texture sampling methods such as `nearest`, `mipmaps`,
and so on.

## Background Image via Nesting

A common feature request from developers familiar with the web is an equivalent
of `background-image`. To do this, create a normal `<Image>` component and then
add whatever children you would like to layer on top of it.

```javascript
return (
  <Image source={...}>
    <Text>Inside</Text>
  </Image>
);
```

## Border Radius Styles

Please note that the following corner specific, border radius style properties are currently ignored by the image component:

* `borderTopLeftRadius`
* `borderTopRightRadius`
* `borderBottomLeftRadius`
* `borderBottomRightRadius`
