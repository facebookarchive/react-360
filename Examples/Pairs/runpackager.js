#!/usr/bin/env node

const child_process = require('child_process');
const path = require('path');
const fs = require('fs');
const config = path.join(path.dirname(fs.realpathSync(__filename)), 'rn-pairs.config.js');

child_process.spawnSync(
  'node',
  [
    '../../node_modules/react-native/local-cli/cli.js',
    'start',
    '--config',
    config,
    '--reset-cache',
  ],
  {
    stdio: 'inherit',
    shell: true,
  }
);
