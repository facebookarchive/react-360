'use strict';

const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Running full test suite.');
console.log('If you want to skip the end-to-end tests, run `npm run test-unit`\n');

if (!process.env.SKIPBUILD) {

console.log('Building React VR apps for end-to-end testing.');
console.log('If you don\'t want to do this for every test run, set SKIPBUILD=1.');
console.log('  SKIPBUILD=1 npm test');

function buildScript(root, input, output) {
  const cliLocation = require.resolve('react-native/local-cli/cli.js');
  const configLocation = path.resolve(root, 'rn-cli.config.js');
  return new Promise(function(resolve, reject) {
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
        '--config',
        configLocation,
        '--reset-cache'
      ],
      {stdio: 'inherit', cwd: root}
    );
    npm.on('close', function(code) {
      if (code !== 0) {
        reject(code);
      }
      resolve();
    });
  });
}

const rootDir = path.resolve(__dirname, '..', 'EndToEnd', 'testapp');

new Promise(function(resolve, reject) {
  const buildDir = path.join(rootDir, 'build');
  try {
    const stat = fs.statSync(buildDir);
    if (stat.isDirectory()) {
      return resolve();
    }
  } catch (e) {}
  fs.mkdir(path.join(rootDir, 'build'), function(err) {
    if (err) {
      console.log('Failed to create `testapp/build` directory');
      return reject(1);
    }
    resolve();
  });
}).then(function() {
  return Promise.all([
    buildScript(
      rootDir,
      path.resolve(rootDir, 'e2e.vr.js'),
      path.resolve(rootDir, 'build', 'e2e.bundle.js')
    ),
    buildScript(
      rootDir,
      path.resolve(rootDir, 'client.js'),
      path.resolve(rootDir, 'build', 'client.bundle.js')
    ),
  ]);
}).then(function() {
  console.log(
    'Production versions were successfully built.' +
    'They can be found at ' + path.resolve(rootDir, 'build')
  );
}).catch(function(err) {
  console.log(
    'An error occurred during the bundling process. Exited with code ' + err +
    '.\nLook at the packager output above to see what went wrong.'
  );
  process.exit(1);
});

}
