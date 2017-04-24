'use strict';

var path = require('path');
var blacklist = require('react-native/packager/blacklist');
console.log(path.resolve('react-native'));

/**
 * Default configuration for the CLI.
 *
 * If you need to override any of this functions do so by defining the file
 * `rn-cli.config.js` on the root of your project with the functions you need
 * to tweak.
 */
var config = {
  getProjectRoots() {
    return getRoots();
  },

  getBlacklistRE() {
    return blacklist([
      /.*[/\\]ReactVR[/\\]OVRUI[/\\]package\.json/,
    ]);
  },

  getAssetExts() {
    return [
      'obj', 'mtl',
    ];
  },

  getPlatforms() {
    return ['vr'];
  },

  getProvidesModuleNodeModules() {
    return ['react-native', 'react-vr'];
  },

  extraNodeModules: {
    'ovrui':
      path.resolve(__dirname, '..', '..', 'OVRUI', 'src', 'OVRUI.js'),
  },
};

function getRoots() {
  var root = process.env.REACT_NATIVE_APP_ROOT;
  if (root) {
    return [path.resolve(root)];
  }
  return [path.resolve(__dirname, '..', '..')];
}

module.exports = config;
