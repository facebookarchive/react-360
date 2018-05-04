/**
 * Produces production builds of the React application (index.vr.js) and the
 * client-side implementation (client.js).
 */

'use strict';

const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

let customAssetRoot = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--assets' && args[i + 1]) {
    customAssetRoot = args[i + 1];
    if (customAssetRoot[customAssetRoot.length - 1] !== '/') {
      customAssetRoot += '/';
    }
  }
}

function buildScript(root, buildDir, input, output) {
  // Allow overriding the CLI location with an env variable
  const cliLocation =
    process.env.RN_CLI_LOCATION ||
    path.resolve('node_modules', 'react-native', 'local-cli', 'cli.js');
  return new Promise((resolve, reject) => {
    const npm = child_process.spawn(
      /^win/.test(process.platform) ? 'node.exe' : 'node',
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
      {stdio: 'inherit', cwd: root},
    );
    npm.on('close', code => {
      if (code !== 0) {
        reject(code);
      }
      resolve();
    });
  });
}

function updateHTML(root, output, assetRoot) {
  const indexPath = path.join(root, 'index.html');
  let contents = null;
  try {
    contents = fs.readFileSync(indexPath, 'utf8');
  } catch (e) {
    return [
      'Could not find index.html. You will need to manually update the paths to your bundled JavaScript files',
    ];
  }
  const writeErrors = [];
  if (contents.indexOf('./client.bundle') < 0) {
    writeErrors.push(
      'Could not find path to client in index.html. You will need to manually update it.',
    );
  } else {
    contents = contents.replace(
      'client.bundle?platform=vr',
      'client.bundle.js',
    );
  }
  if (contents.indexOf('index.bundle') < 0) {
    writeErrors.push(
      'Could not find path to index.js in index.html. You will need to manually update it.',
    );
  } else {
    contents = contents.replace(
      /index\.bundle\?platform=vr(&dev=true)?/,
      'index.bundle.js',
    );
  }
  if (assetRoot) {
    if (contents.indexOf("'static_assets/'") < 0) {
      writeErrors.push('Could not find assetRoot');
    } else {
      contents = contents.replace(
        /assetRoot:\s*'static_assets\/'/,
        `assetRoot: '${assetRoot}'`,
      );
    }
  }
  try {
    fs.writeFileSync(path.join(output, 'index.html'), contents, 'utf8');
  } catch (e) {
    return [`Unable to write index.html to ${output}`];
  }
  return writeErrors;
}

function hasPackage(dir) {
  const packagePath = path.join(dir, 'package.json');
  try {
    fs.statSync(packagePath);
  } catch (e) {
    return false;
  }
  const pkg = require(packagePath);
  if (pkg && pkg.dependencies && pkg.dependencies['react-360']) {
    return true;
  }
  return false;
}

function findProjectDir(dir) {
  while (!hasPackage(dir)) {
    const next = path.join(dir, '..');
    if (dir === next) {
      console.log('Could not find a React 360 project directory');
      process.exit(1);
    }
    dir = path.join(dir, '..');
  }
  return dir;
}

// Allow overriding the project location with an env variable
const projectDir =
  process.env.PROJECT_LOCATION || findProjectDir(process.cwd());

const buildDir = path.join(projectDir, 'build');

new Promise((resolve, reject) => {
  try {
    const stat = fs.statSync(buildDir);
    if (stat.isDirectory()) {
      return resolve();
    }
  } catch (e) {}
  fs.mkdir(path.join(projectDir, 'build'), err => {
    if (err) {
      console.log('Failed to create `build` directory');
      return reject(1);
    }
    resolve();
  });
})
  .then(() => {
    return Promise.all([
      buildScript(
        projectDir,
        buildDir,
        path.resolve(projectDir, 'index.js'),
        path.resolve(projectDir, 'build', 'index.bundle.js'),
      ),
      buildScript(
        projectDir,
        buildDir,
        path.resolve(projectDir, 'client.js'),
        path.resolve(projectDir, 'build', 'client.bundle.js'),
      ),
    ]);
  })
  .then(() => {
    console.log(
      'Production versions of JS were successfully built.' +
        'They can be found at ' +
        path.resolve(projectDir, 'build'),
    );
    const errors = updateHTML(projectDir, path.resolve(projectDir, 'build'), customAssetRoot);
    if (errors.length) {
      errors.forEach(err => console.log(' ** ', err));
    }
  })
  .catch(err => {
    console.log(
      'An error occurred during the bundling process. Exited with code ' +
        err +
        '.\nLook at the packager output above to see what went wrong.',
    );
    process.exit(1);
  });
