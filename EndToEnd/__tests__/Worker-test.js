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
  .dontMock('../runner/Runner');

const Runner = require('../runner/Runner').default;

process.chdir(__dirname);

describe('End to End Web Worker', () => {
  it('sets up globals correctly', () => {
    const runner = new Runner(
      `
<html>
<script>
window.worker = new Worker('worker.js');
</script>
</html>`,
      {'worker.js': 'window.a = 1; self.b = 2;'},
    );
    return runner.loaded.then((window) => {
      expect(window.worker.sandbox.a).toBe(1);
      expect(window.worker.sandbox.b).toBe(2);
    });
  });

  it('can receive messages', () => {
    const runner = new Runner(
      `
<html>
<script>
window.worker = new Worker('worker.js');
worker.postMessage('hello');
</script>
</html>`,
      {'worker.js': 'onmessage = function(e) {data = e.data}'},
    );
    return runner.loaded.then((window) => {
      expect(window.worker.sandbox.data).toBe('hello');
    });
  });

  it('can send message', () => {
    const runner = new Runner(
      `
<html>
<script>
window.worker = new Worker('worker.js');
worker.onmessage = function(e) {
  if (e.data === 'pong') {
    window.pongReceived = true;
  }
}
worker.postMessage('ping');
</script>
</html>`,
      {'worker.js': `
self.onmessage = function(e) {
  if (e.data === 'ping') {
    self.postMessage('pong');
  }
};`
    });
    return runner.loaded.then((window) => {
      expect(window.pongReceived).toBe(true);
    });
  });
});
