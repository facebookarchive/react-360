/**
 * Produces production builds of the React application (index.vr.js) and the
 * client-side implementation (client.js).
 */

'use strict';

const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

function buildScript(root, buildDir, input, output) {
  // Allow overriding the CLI location with an env variable
  const cliLocation = process.env.RN_CLI_LOCATION ||
    path.resolve('node_modules', 'react-native', 'local-cli', 'cli.js');
  return new Promise((resolve, reject) => {
    const npm = child_process.spawn(
      (/^win/.test(process.platform) ? 'node.exe' : 'node'),
      [
        cliLocation,
        'bundle',
        '--entry-file',
        input,
        '--platform',
        'vr',
        '--bundle-output',
        output,
        '--dev',
        'false',
        '--assets-dest',
        buildDir,
      ],
      {stdio: 'inherit', cwd: root}
    );
    npm.on('close', (code) => {
      if (code !== 0) {
        reject(code);
      }
      resolve();
    });
  });
}

function hasPackage(dir) {
  const packagePath = path.join(dir, 'package.json');
  try {
    fs.statSync(packagePath);
  } catch (e) {
    return false;
  }
  const pkg = require(packagePath);
  if (
    pkg &&
    pkg.dependencies &&
    pkg.dependencies['react-vr']
  ) {
    return true;
  }
  return false;
}

function findProjectDir(dir) {
  while (!hasPackage(dir)) {
    const next = path.join(dir, '..');
    if (dir === next) {
      console.log('Could not find a React VR project directory');
      process.exit(1);
    }
    dir = path.join(dir, '..');
  }
  return dir;
}

// Allow overriding the project location with an env variable
const projectDir = process.env.PROJECT_LOCATION ||
  findProjectDir(process.cwd());

const buildDir = path.join(projectDir, 'vr', 'build');

new Promise((resolve, reject) => {
  try {
    const stat = fs.statSync(buildDir);
    if (stat.isDirectory()) {
      return resolve();
    }
  } catch (e) {}
  fs.mkdir(path.join(projectDir, 'vr', 'build'), (err) => {
    if (err) {
      console.log('Failed to create `vr/build` directory');
      return reject(1);
    }
    resolve();
  });
}).then(() => {
  return Promise.all([
    buildScript(
      projectDir,
      buildDir,
      path.resolve(projectDir, 'index.vr.js'),
      path.resolve(projectDir, 'vr', 'build', 'index.bundle.js')
    ),
    buildScript(
      projectDir,
      buildDir,
      path.resolve(projectDir, 'vr', 'client.js'),
      path.resolve(projectDir, 'vr', 'build', 'client.bundle.js')
    ),
  ]);
}).then(() => {
  console.log(
    'Production versions were successfully built.' +
    'They can be found at ' + path.resolve(projectDir, 'vr', 'build')
  );
}).catch((err) => {
  console.log(
    'An error occurred during the bundling process. Exited with code ' + err +
    '.\nLook at the packager output above to see what went wrong.'
  );
  process.exit(1);
});
