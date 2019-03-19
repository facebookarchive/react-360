/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import * as UI from 'webgl-ui';
import assertColorEqual from '../test-utils/assertColorEqual';
import getPixelData from '../test-utils/getPixelData';

export default function test(container) {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 300;
  canvas.style.width = 300 + 'px';
  canvas.style.height = 300 + 'px';
  container.appendChild(canvas);
  const gl = canvas.getContext('webgl', {premultipliedAlpha: false, preserveDrawingBuffer: true});
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.viewport(0, 0, canvas.width, canvas.height);

  const surface = new UI.Surface(gl);
  surface.setViewport(300, 300);
  const top = surface.createView();
  surface.setRootNode(top);
  UI.setStyle(top, {
    width: 300,
    height: 300,
    backgroundColor: '#000',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  });

  const a = surface.createView();
  top.appendChild(a);
  UI.setStyle(a, {
    width: 100,
    height: 100,
    backgroundColor: '#ff0',
  });

  const b = surface.createView();
  top.appendChild(b);
  UI.setStyle(b, {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#00f',
  });

  const c = surface.createView();
  top.appendChild(c);
  UI.setStyle(c, {
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 50,
  });

  const d = surface.createView();
  top.appendChild(d);
  UI.setStyle(d, {
    width: 50,
    height: 100,
    marginRight: 50,
    backgroundColor: '#f00',
    justifyContent: 'center',
    alignItems: 'center',
  });
  const e = surface.createView();
  d.appendChild(e);
  UI.setStyle(e, {
    position: 'absolute',
    top: 25,
    left: 25,
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0, 255, 0, 0.5)',
  });

  const f = surface.createView();
  top.appendChild(f);
  UI.setStyle(f, {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderColor: 'rgba(255, 0, 0, 0.5)',
    borderRadius: 50,
    borderWidth: 10,
  });

  surface.updateGeometry();
  surface.draw();

  const pixelData = getPixelData(gl);
  assertColorEqual(pixelData.getPixel(10, 10), [255, 255, 0, 255]);
  assertColorEqual(pixelData.getPixel(102, 2), [0, 0, 0, 255]);
  assertColorEqual(pixelData.getPixel(150, 50), [0, 0, 255, 255]);
  assertColorEqual(pixelData.getPixel(202, 2), [204, 204, 204, 255]);
  assertColorEqual(pixelData.getPixel(220, 20), [255, 255, 255, 255]);
  assertColorEqual(pixelData.getPixel(20, 120), [255, 0, 0, 255]);
  assertColorEqual(pixelData.getPixel(40, 150), [128, 127, 0, 255]);
  assertColorEqual(pixelData.getPixel(60, 150), [0, 127, 0, 255]);
  assertColorEqual(pixelData.getPixel(110, 110), [0, 0, 0, 255]);
  assertColorEqual(pixelData.getPixel(105, 150), [127, 0, 0, 255]);
  assertColorEqual(pixelData.getPixel(150, 150), [255, 255, 255, 255]);
}
