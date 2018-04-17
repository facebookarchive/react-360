/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const versionExpr = /^\d+\.\d+\.\d+$/;

// Replaces the string `"version": "..."` with a specific version entry
// Can also replace strings of the form `"somedependency": "..."` with newer versions
function updateVersion(pkg, version, deps) {
  const contents = fs.readFileSync(pkg, 'utf8');
  let updated = contents.replace(/"version":\s*"[^"]+"/, `"version": "${version}"`);
  if (deps) {
    for (const dep in deps) {
      updated = updated.replace(new RegExp(`"${dep}":\\s*"[^"]+"`), `"${dep}": "${deps[dep]}"`);
    }
  }
  fs.writeFileSync(pkg, updated);
}

const args = process.argv;

const version = args[2];
if (typeof version !== 'string' || version.length === 0) {
  console.log('\x1b[31;1mMust provide a new version string\x1b[0m');
  console.log('Usage: node bump-versions.js VERSION');
  console.log('    VERSION - a new version string for packages');
  process.exit(1);
}
if (!version.match(versionExpr)) {
  console.log('\x1b[31;1mVersion must be in the form `MAJOR.MINOR.PATCH`\x1b[0m');
}
const packages = {
  'react-vr': path.resolve(__dirname, '..', 'package.json'),
  'react-vr-web': path.resolve(__dirname, '..', 'ReactVR', 'package.json'),
  ovrui: path.resolve(__dirname, '..', 'OVRUI', 'package.json'),
  'react-vr-cli': path.resolve(__dirname, '..', 'react-vr-cli', 'package.json'),
};
const cliGenerator = path.resolve(
  __dirname,
  '..',
  'react-vr-cli',
  'generators',
  'package.json.generator.js'
);
const currentVersion = require('../package.json').version;
console.log(
  `Current version is \x1b[34;1m${currentVersion}\x1b[0m, updating packages to \x1b[34;1m${version}\x1b[0m`
);
const cliVersionPieces = require('../react-vr-cli/package.json').version
  .split('.')
  .map(s => parseInt(s, 10));
cliVersionPieces[2]++; // increment patch version of CLI package

console.log('Updating OVRUI...');
updateVersion(packages.ovrui, version);
console.log('Updating react-vr...');
updateVersion(packages['react-vr'], version);
console.log('Updating react-vr-web...');
updateVersion(packages['react-vr-web'], version, {ovrui: '~' + version});
console.log('Updating new project generator...');
updateVersion(cliGenerator, '0.0.1', {
  ovrui: '~' + version,
  'react-vr': '~' + version,
  'react-vr-web': '~' + version,
});
console.log('Updating react-vr-cli...');
updateVersion(packages['react-vr-cli'], cliVersionPieces.join('.'));

console.log(`All packages updated to \x1b[34;1m${version}\x1b[0m`);
