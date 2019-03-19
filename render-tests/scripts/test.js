/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const tests = require('../tests/tests');

const host = process.env.RENDER_TEST_HOST || 'localhost:4444';
const rawMode = process.argv[2] || 'compare';

function ensureDir(dir) {
  try {
    const stat = fs.statSync(dir);
    if (stat) {
      return;
    }
  } catch (e) {}
  fs.mkdirSync(dir);
}

async function snapshotTest(page, test, options) {
  const url = `http://${host}/runner.html?${test}`;
  console.log(`  Running test ${test} [${url}]`);
  await page.goto(url);
  if (options.capture) {
    const dir =
      options.rawMode === 'update'
        ? path.join(__dirname, '..', '__glsnapshots__')
        : path.join(__dirname, '..', 'capture');
    ensureDir(dir);
    await page.screenshot({path: path.join(dir, test + '.png'), clip: options.capture});
  }
}

async function runTests() {
  console.log('Running Visual Tests');
  if (rawMode === 'update') {
    console.log('  Updating snapshots on this test run');
  }
  console.log('  Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  for (const t in tests) {
    await snapshotTest(page, t, {...tests[t], rawMode});
  }
  console.log('  Closing headless browser');
  await browser.close();
  console.log('Ran all tests.');
}

runTests();
