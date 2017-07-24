---
id: fonts
title: Fonts and Text
layout: docs
category: The Basics
permalink: docs/fonts.html
---

The rendering of fonts and text in VR is tricky as text elements (glyphs) are rendered in 3D.

#### Options

One option is to use geometry fonts as used in three.js [TextGeometry](https://github.com/mrdoob/three.js/blob/master/src/geometries/TextGeometry.js) however this can be computationally expensive for large quantities of text. A second option is to use the browser to generate text blocks and then make these available through html5 canvas bitmaps to OpenGLES textures used by React VR. However, the difficulty with this approach is determining an ideal rendering size that strikes a proper balance between minimizing blur and managing the amount of texture memory required.

#### React VR

For these reasons, React VR takes a slightly different approach, one which attempts to maximize for the common usage, but in turn has its own constraints. React VR text rendering makes use of the same method as the Oculus Mobile SDK and uses [Signed Distance Field](http://www.valvesoftware.com/publications/2007/SIGGRAPH2007_AlphaTestedMagnification.pdf) fonts.

Using distance field fonts allows the font to remain crisp and sharp even when dynamically rendered to the screen in 3D. Because the fonts are rendered using bitmap textures, a minimal amount of geometry is used. We get dynamic font content and placement with minimal geometry and texture usage.

The constraint is that because glyphs are not generated dynamically, the full unicode character set often present in browsers is not available.

#### Character sets

The React VR default character set is based on 387 glyphs covering [EFIGS](https://en.wiktionary.org/wiki/EFIGS) languages. Also included are pregenerated textures for Japanese and Korean although these understandably are larger downloads. They are shipped within the `ovrui` npm package, in the `fonts/` directory.

To use an alternative font texture, you need to load it before React VR is initialized. The loaded font can then be passed to React VR in your `client.js` code.

```
OVRUI.loadFont(
  'path/to/custom.fnt',
  'path/to/custom.png'
).then((font) => {
  // 'font' contains everything React VR needs to render <Text> elements with
  // your custom font.

  // Pass it to the boilerplate init code
  const vr = new VRInstance(bundle, 'MyProject', parent, {
    // Pass in the custom font as an initialization property
    font: font,
    ...options,
  });

  // ...
});
```

You can install fallback fonts should the main font set not cover enough of the character set by loading fonts explicitly. Contained within the repository are fonts that cover the majority of Chinese, Japanese and Korean glyphs. Use the OVRUI function `addFontFallback` to add a fallback to an already loaded font set.

```
const fallbackFonts = {
  '../static_assets/cjk_0.fnt': '../static_assets/cjk_0_sdf.png',
  '../static_assets/cjk_1.fnt': '../static_assets/cjk_1_sdf.png',
  '../static_assets/cjk_2.fnt': '../static_assets/cjk_2_sdf.png',
  '../static_assets/korean_0.fnt': '../static_assets/korean_0_sdf.png',
  '../static_assets/korean_1.fnt': '../static_assets/korean_1_sdf.png',
  '../static_assets/efigs.fnt': '../static_assets/efigs.png',
};

function init(bundle, parent, options) {
  // use the embedded defaultFont and and fallbacks
  const font = OVRUI.loadFont();
  Promise.all(
    Object.keys(fallbackFonts).map(key => OVRUI.loadFont(key, fallbackFonts[key]))
  ).then(fonts => {
    for (let i = 0; i < fonts.length; i++) {
      OVRUI.addFontFallback(font, fonts[i]);
    }

    const vr = new VRInstance(bundle, 'MyProject', parent, {
      // Pass in the custom font as an initialization property
      font: font,
      ...options,
    });

    // ...
  });
}
```

It is also possible to generate your own font set textures using the fontue tool in the [Oculus Mobile SDK](https://developer.oculus.com/downloads/). The tool has a dependency on [FreeType](https://www.freetype.org), and can be found in the Oculus Mobile SDK `Tools/fontue` directory, along with a `readme.txt` describing its operation.

The base command line for the EFIGS font is:

```
OculusSans-Medium.otf efigs\efigs -co -0.01 -ts 1.0 -hpad 128 -vpad 128 -sdf 256 1024 1024 -cf data\strings\values\strings.xml -cf data\strings\values-de\strings.xml -cf data\strings\values-en-rGB\strings.xml -cf data\strings\values-es\strings.xml -cf data\strings\values-es-rES\strings.xml -cf data\strings\values-fr\strings.xml -cf data\strings\values-it\strings.xml -cf data\EFIGS_extended.txt
```

Further characters can be added using additional `-cf` entries.
