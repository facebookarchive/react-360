/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

const installDeps = require('./install-deps');

function buildPackage(name, dir) {
  console.log(`  Packaging \x1b[32m'${name}'\x1b[0m`);
  return new Promise((resolve, reject) => {
    const json = path.resolve(dir, 'package.json');
    fs.stat(json, (err, res) => {
      if (err) {
        console.log(`\x1b[41;1m${json} does not exist\x1b[0m`);
        reject(err);
        return;
      }
      resolve(json);
    });
  }).then(json => {
    const version = require(json).version;
    return new Promise((resolve, reject) => {
      const npm = child_process.spawn('npm', ['pack'], {stdio: 'inherit', cwd: dir, shell: true});
      npm.on('close', code => {
        if (code !== 0) {
          reject(code);
        }
        resolve(path.resolve(dir, `${name}-${version}.tgz`));
      });
    });
  });
}

function relocatePackage(name, src, dest, rev) {
  const destfile = path.join(dest, `${name}-${rev}.tgz`);
  console.log(`Moving ${src} to ${destfile}`);
  return new Promise((resolve, reject) => {
    fs.rename(src, destfile, () => {
      resolve();
    });
  });
}

function ensureDirectory(dir) {
  try {
    const stat = fs.statSync(dir);
    if (stat) {
      return;
    }
  } catch (e) {
    fs.mkdirSync(dir);
  }
}

const PACKAGES = {
  'react-360': path.resolve(__dirname, '..'),
  'react-360-web': path.resolve(__dirname, '..', 'React360'),
};

const rev = child_process.execSync('git rev-parse HEAD').toString().trim().substr(0, 8);
const DEST = path.resolve(__dirname, '..', 'package_builds');
installDeps()
  .then(() => {
    console.log(`\x1b[34;1mBuilding packages at git rev ${rev}...\x1b[0m`);
    ensureDirectory(DEST);
    return Promise.all(
      Object.keys(PACKAGES).map(p =>
        buildPackage(p, PACKAGES[p]).then(src => relocatePackage(p, src, DEST, rev))
      )
    );
  })
  .then(() => {
    console.log(`\nBuilt all packages! They are located at \x1b[34m${DEST}\x1b[0m`);
  });
