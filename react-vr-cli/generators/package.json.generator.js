/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/* eslint-disable */

module.exports = (config) => ({
  filename: 'package.json',
  contents:
`{
  "name": "${config.name}",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node -e \\"console.log('open browser at http:/localhost:8081/vr/\\\\n\\\\n');\\" && node node_modules/react-native/local-cli/cli.js start",
    "bundle": "node node_modules/react-vr/scripts/bundle.js",
    "open": "node -e \\"require('xopen')('http://localhost:8081/vr/')\\"",
    "test": "jest"
  },
  "dependencies": {
    "ovrui": "~1.0.0",
    "react": "~15.4.1",
    "react-native": "~0.42.0",
    "three": "^0.80.1",
    "react-vr": "~1.0.0",
    "react-vr-web": "~1.0.0"
  },
  "devDependencies": {
    "babel-jest": "^19.0.0",
    "babel-preset-react-native": "^1.9.1",
    "jest": "^19.0.2",
    "react-test-renderer": "~15.4.1",
    "xopen": "1.0.0"
  },
  "jest": {
    "preset": "react-vr"
  }
}`,
});
