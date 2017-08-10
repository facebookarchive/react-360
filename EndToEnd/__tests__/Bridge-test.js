/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

jest
  .dontMock('../runner/MockBlob')
  .dontMock('../runner/MockURL')
  .dontMock('../runner/MockWorker')
  .dontMock('../runner/Runner')
  .dontMock('../runner/MockCanvas')
  .dontMock('path')
  .mock('canvas', () => require('../runner/MockCanvas').default, {virtual: true});

const Runner = require('../runner/Runner').default;
const path = require('path');

process.chdir(path.resolve(__dirname, '..'));

const html = `
<html>
  <body>
    <script src="./testapp/build/client.bundle.js"></script>
    <script>
      ReactVR.init(
        './testapp/build/e2e.bundle.js',
        document.body
      );
    </script>
  </body>
</html>
`;

describe('React Bridge', () => {
  it('exposes Native Modules', () => {
    const runner = new Runner(html, {});
    return runner.loaded.then((window) => {
      const workerWindow = window.vr.rootView.context.bridge.getWorker().sandbox.window;
      expect(workerWindow.NativeModules).toBeTruthy();
      const vrConstants = workerWindow.NativeModules.ReactVRConstants;
      expect(vrConstants.Runtime).toBe('WebVR');
    });
  });

  it('constructs the scene', () => {
    const runner = new Runner(html, {});
    return runner.loaded.then((window) => {
      const top = window.vr.scene.children[0].children[0];
      expect(top).toBeTruthy();
      expect(top.type).toBe('UIView');
      expect(top.children[0].type).toBe('SDFText');
    });
  });
});
