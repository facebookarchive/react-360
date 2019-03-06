/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports = config => ({
  filename: 'index.html',
  contents: `<html>
  <head>
    <title>${config.name}</title>
    <style>body { margin: 0; }</style>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  </head>
  <body>
    <!-- Attachment point for your app -->
    <div id="container"></div>
    <script src="./client.bundle?platform=vr"></script>
    <script>
      // Initialize the React 360 application
      React360.init(
        'index.bundle?platform=vr&dev=true',
        document.getElementById('container'),
        {
          bridgeFile: 'NonBlobBridge.js',
          assetRoot: 'static_assets/',
        }
      );
    </script>
  </body>
</html>

`,
});
