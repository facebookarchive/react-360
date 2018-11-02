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
const path = require('path');
const getPackager = require('../packages/react-360-cli/src/getPackager');

/**
 * Script to install development dependencies for users building the codebase
 * from the GitHub repo.
 */
function installDeps() {
  const paths = {
    'react-360': path.resolve(__dirname, '..'),
    'react-360-web': path.resolve(__dirname, '..', 'React360'),
  };
  console.log('Determining packager...');
  const packager = getPackager();
  if (packager !== 'yarn' && packager !== 'npm') {
    throw new Error('Unexpected packager: ' + packager);
  }
  console.log(`\x1b[34;1m${packager}\x1b[0m detected`);
  const args = packager === 'yarn' ? ['--pure-lockfile'] : ['install'];
  let promise = Promise.resolve();
  Object.keys(paths).forEach(pkg => {
    promise = promise.then(() => {
      console.log('Installing dependencies for ' + pkg);
      return new Promise((resolve, reject) => {
        const proc = child_process.spawn(packager, args, {
          stdio: 'inherit',
          cwd: paths[pkg],
          shell: true,
        });
        proc.on('close', code => {
          if (code !== 0) {
            reject({pkg, code});
          }
          resolve();
        });
      });
    });
  });
  return promise.then(
    () => {
      console.log('Completed successfully!');
    },
    ({pkg, code}) => {
      console.log(`Dependency installation for ${pkg} failed with code ${code}`);
    }
  );
}

module.exports = installDeps;

if (require.main === module) {
  // Called from the command line directly
  installDeps();
}
