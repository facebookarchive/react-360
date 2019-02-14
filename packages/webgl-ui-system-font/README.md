# `webgl-ui-system-font`

Text implementation for `webgl-ui` that can generate glyphs from system fonts.
The constructor takes a WebGL context as its only argument, so that it can
generate the textures necessary to render text.

To use with `webgl-ui` surfaces:

```js
import {FontImplementation} from 'webgl-ui-system-font';
import {Surface} from 'webgl-ui';

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');
const surface = new Surface(gl);
surface.useTextImplementation(new FontImplementation(gl));
```
