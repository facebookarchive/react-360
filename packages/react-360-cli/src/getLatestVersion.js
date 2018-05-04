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
const https = require('https');

const getPackager = require('./getPackager');

function getLatestVersion() {
  return new Promise((resolve, reject) => {
    // We want any errors to fail silently
    try {
      const packager = getPackager();
      // run `packager config get registry`
      const response = child_process
        .execSync(packager + ' config get registry', {encoding: 'utf8'})
        .trim()
        .split('\n');
      let registry = response[response.length - 1];
      if (!registry || registry === 'undefined') {
        resolve(null);
        return;
      }
      if (!registry.endsWith('/')) {
        registry += '/';
      }
      const chunks = [];
      https
        .get(registry + 'react-360-cli/latest', res => {
          const statusCode = res.statusCode;
          if (statusCode !== 200) {
            resolve(null);
            return;
          }
          res.setEncoding('utf8');
          res.on('data', d => {
            chunks.push(d);
          });
          res.on('end', () => {
            try {
              const parsed = JSON.parse(chunks.join(''));
              resolve(parsed.version);
            } catch (e) {
              resolve(null);
            }
          });
        })
        .on('error', e => {
          resolve(null);
        });
    } catch (e) {
      resolve(null);
    }
  });
}

module.exports = getLatestVersion;
