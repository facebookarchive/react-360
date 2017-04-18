/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports = (config) => ({
  filename: 'index.html',
  contents:
`<html>
  <head>
    <title>${config.name}</title>
    <style>body { margin: 0; }</style>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  </head>
  <body>
    <!-- When you're ready to deploy your app, update this line to point to your compiled client.bundle.js -->
    <script src="./client.bundle?platform=vr"></script>
    <script>
      // Initialize the React VR application
      ReactVR.init(
        // When you're ready to deploy your app, update this line to point to
        // your compiled index.bundle.js
        '../index.vr.bundle?platform=vr&dev=true',
        // Attach it to the body tag
        document.body
      );
    </script>
  </body>
</html>

`,
});
