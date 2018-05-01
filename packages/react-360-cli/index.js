#!/usr/bin/env node

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */
'use strict';

const chalk = require('chalk');
const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

const copyAssets = require('./src/copyAssets');
const generateFiles = require('./src/generateFiles');
const getLatestVersion = require('./src/getLatestVersion');
const getPackager = require('./src/getPackager');

const CURRENT_VERSION = require('./package.json').version;

function printUsageAndExit() {
  console.log(
    `React 360 Command Line Interface
Version ${CURRENT_VERSION}

Usage:
  react-360 init ${chalk.gray('[project name]')}\tCreate a new React 360 application with the specified name
`
  );
  process.exit(0);
}

const binLocation = fs.realpathSync(__filename);
const binDir = binLocation.substr(0, binLocation.lastIndexOf(path.sep));
const source = path.join(binDir, 'generators');
const args = process.argv.slice(2);
// Currently we only support the init command
getLatestVersion().then(version => {
  if (version && version !== CURRENT_VERSION) {
    // We can just perform an inequality check, since the local version should
    // never be ahead of the registry version
    console.log(
      chalk.red(
        `Current CLI version is ${CURRENT_VERSION}, but the latest available version is ${version}`
      )
    );
    console.log('You can upgrade your CLI with:');
    if (getPackager() === 'yarn') {
      console.log(chalk.green('  yarn global upgrade react-360-cli'));
    } else {
      console.log(chalk.green('  npm update -g react-360-cli'));
    }
  }
  if (args.length === 0 || args[0] === '--help') {
    printUsageAndExit();
  }
  if (args[0] === 'init') {
    const rawName = args[1];
    if (!rawName) {
      printUsageAndExit();
    }
    if (rawName.match(/[~!@#%^&*()+=;:{}\[\]\/.,<>'"]/)) {
      console.log('Invalid project name: ' + chalk.red(rawName));
      process.exit(1);
    }
    // Sanitize the name and check that it's a valid variable name
    const name = rawName.replace(/[-\s]+/g, '_');
    try {
      eval(`const ${name} = null`); // eslint-disable-line no-eval
    } catch (e) {
      console.log('Invalid project name: ' + chalk.red(name));
      process.exit(1);
    }

    const dest = path.join(process.cwd(), rawName);

    console.log('Creating new React 360 project...');
    try {
      const stat = fs.statSync(dest);
      if (stat) {
        console.log(
          'A ' +
            (stat.isDirectory() ? 'directory' : 'file') +
            ' named ' +
            rawName +
            ' already exists. Exiting without creating a new project.'
        );
        process.exit(1);
      }
    } catch (e) {
      if (e.code !== 'ENOENT') {
        console.error(e);
        process.exit(1);
      } else {
        fs.mkdirSync(dest);
      }
    }

    generateFiles(source, dest, {name})
      .then(() => {
        console.log('Project directory created at ' + rawName);
        // Create watchmanconfig
        fs.closeSync(fs.openSync(path.join(dest, '.watchmanconfig'), 'w'));
        console.log(chalk.blue('\nCopying assets...'));
        copyAssets(binDir, dest);
        console.log(chalk.blue('\nInstalling dependencies...'));
        return new Promise((resolve, reject) => {
          const cmdName = getPackager();
          const cmd = cmdName === 'yarn'
            ? child_process.spawn(/^win/.test(process.platform) ? 'yarn.cmd' : 'yarn', {
                stdio: 'inherit',
                cwd: dest,
              })
            : child_process.spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install'], {
                stdio: 'inherit',
                cwd: dest,
              });
          cmd.on('close', code => {
            if (code !== 0) {
              console.log(
                '`' +
                  cmdName +
                  '` exited with code ' +
                  code +
                  '. Try fixing the errors above and run `' +
                  cmdName +
                  '` from within ' +
                  name +
                  ' again.'
              );
              process.exit(1);
            }
            resolve();
          });
        });
      })
      .then(() => {
        console.log('Done!');
        console.log(
          '  Now enter the new project directory by running ' + chalk.green('`cd ' + rawName + '`')
        );
        console.log(
          '  Run ' + chalk.green('`npm start`') + ' to initialize the development server'
        );
        console.log('  From there, browse to ' + chalk.green('http://localhost:8081/index.html'));
        console.log('  Open ' + chalk.green('`index.js`') + ' to begin editing your app.');
      })
      .catch(err => {
        console.error(err);
        process.exit(1);
      });
  } else {
    console.log('Unsupported command: ' + args[0]);
    printUsageAndExit();
  }
});
