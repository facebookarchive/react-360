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

describe('End to End Test Runner', () => {
  it('loads injected contents', () => {
    const runner = new Runner(
      `<html><script src="./mocked.js"></script></html>`,
      {
        '/mocked.js': 'window.mockedLoaded = true;',
      }
    );
    return runner.loaded.then((window) => {
      expect(window.mockedLoaded).toBe(true);
    });
  });

  it('loads contents from the filesystem', () => {
    const runner = new Runner(
      `<html><script src="./loadingtest.res.js"></script></html>`,
      {}
    );
    return runner.loaded.then((window) => {
      expect(window.loadedFile).toBe(true);
    });
  });

  it('loads injected contents in the worker', () => {
    const runner = new Runner(
      `
<html>
<script>
window.worker = new Worker('worker.js');
</script>
</html>`,
      {'worker.js': 'self.workerLoaded = true;'},
    );
    return runner.loaded.then((window) => {
      expect(window.worker.sandbox.workerLoaded).toBe(true);
    });
  });

  it('loads filesystem contents in the worker', () => {
    const runner = new Runner(
      `
<html>
<script>
window.worker = new Worker('loadingtest.res.js');
</script>
</html>`,
      {},
    );
    return runner.loaded.then((window) => {
      expect(window.worker.sandbox.loadedFile).toBe(true);
    });
  });

  it('loads injected content via importScripts', () => {
    const runner = new Runner(
      `
<html>
<script>
window.worker = new Worker('worker.js');
</script>
</html>`,
      {'worker.js': 'importScripts("part2.js")', 'part2.js': 'self.part2loaded = true;'},
    );
    return runner.loaded.then((window) => {
      expect(window.worker.sandbox.part2loaded).toBe(true);
    });
  });

  it('loads filesystem content via importScripts', () => {
    const runner = new Runner(
      `
<html>
<script>
window.worker = new Worker('worker.js');
</script>
</html>`,
      {'worker.js': 'importScripts("loadingtest.res.js")'},
    );
    return runner.loaded.then((window) => {
      expect(window.worker.sandbox.loadedFile).toBe(true);
    });
  });

  it('can load worker scripts from Blobs', () => {
    const runner = new Runner(
      `
<html>
<script>
var blob = new Blob(['self.blobLoaded = true;']);
window.worker = new Worker(URL.createObjectURL(blob));
</script>
</html>`,
      {},
    );
    return runner.loaded.then((window) => {
      expect(window.worker.sandbox.blobLoaded).toBe(true);
    });
  });
});
