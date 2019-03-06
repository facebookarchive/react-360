/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/* eslint-disable */

module.exports = config => ({
  filename: 'package.json',
  contents: `{
  "name": "${config.name}",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node node_modules/react-360/scripts/packager.js",
    "bundle": "node node_modules/react-360/scripts/bundle.js",
    "open": "node -e \\"require('xopen')('http://localhost:8081/index.html')\\"",
    "devtools": "react-devtools",
    "test": "jest"
  },
  "dependencies": {
    "react": "16.3.2",
    "react-native": "~0.55.4",
    "three": "^0.87.0",
    "react-360": "~1.1.0",
    "react-360-web": "~1.1.0"
  },
  "devDependencies": {
    "babel-jest": "^19.0.0",
    "babel-preset-react-native": "^1.9.1",
    "jest": "^19.0.2",
    "react-devtools": "^2.5.2",
    "react-test-renderer": "16.0.0",
    "xopen": "1.0.0"
  },
  "jest": {
    "preset": "react-360"
  }
}`,
});
