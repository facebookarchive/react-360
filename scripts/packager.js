/**
 * run react native metro to start a packager server
 */

'use strict';

const proc = require('child_process');
const fs = require('fs');
const path = require('path');

function getOpenSSLConfig(projectDir) {
  const keyPemPath = path.resolve(projectDir, 'key.pem');
  if (!fs.existsSync(keyPemPath)) {
    console.log(`Key pem not exist in ${keyPemPath}, try creating new...`);
    proc.execSync(`openssl genrsa 2048 > key.pem`, {
      cwd: projectDir,
      stdio: 'inherit',
    });
    if (!fs.existsSync(keyPemPath)) {
      throw new Error('Failed to create key pem for openssl!');
    }
  }

  const certPemPath = path.resolve(projectDir, 'cert.pem');
  if (!fs.existsSync(certPemPath)) {
    console.log(`Cert Pem not exist in ${certPemPath}, try creating new...`);
    proc.execSync(
      `openssl req -x509 -days 1000 -new -key key.pem -out cert.pem`,
      {
        cwd: projectDir,
        stdio: 'inherit',
      },
    );
    if (!fs.existsSync(certPemPath)) {
      throw new Error('Failed to create cert pem for openssl!');
    }
  }

  return {
    keyPemPath,
    certPemPath,
  };
}

function checkBridge(projectDir) {
  console.log("Checking bridge file setting...")
  const indexPath = path.resolve(projectDir, 'index.html');
  let contents = null
  try {
    contents = fs.readFileSync(indexPath, 'utf8');
  } catch (e) {
    console.log("Can't find index.html, skip the bridge file setting...");
    return;
  }
  if (contents.indexOf('bridgeFile') < 0) {
    console.log("Not using bridge file, skip the bridge file setting...");
    return;
  }

  const bridgetPath = path.resolve(projectDir, 'NonBlobBridge.js');
  if (fs.existsSync(bridgetPath)) {
    console.log("Bridge file already set.");
  } else {
    require('./install-bridge');
    console.log("Bridge file copied.");
  }
}

function runPackager() {
  const projectDir =
    process.env.PROJECT_LOCATION || path.resolve('');

  checkBridge(projectDir);
  
  const options = {};
  const args = process.argv.slice(2);
  let protocol = "http";
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--https') {
      const config = getOpenSSLConfig(projectDir);
      options['https'] = null;
      options['key'] = config.keyPemPath;
      options['cert'] = config.certPemPath;
      protocol = "https";
    } else if (args[i] === '--reset-cache') {
      options['reset-cache'] = null;
    }
  }

  console.log(`open browser at ${protocol}://localhost:8081/index.html\n\n`);
  console.log('Starting React Native Packager...');
  // Allow overriding the CLI location with an env variable
  const cliLocation =
    process.env.RN_CLI_LOCATION ||
    path.resolve('node_modules', 'react-native', 'local-cli', 'cli.js');

  const node_args = [cliLocation, 'start'];
  for (const opt in options) {
    node_args.push(`--${opt}`);
    if (options[opt] != null) {
      node_args.push(String(options[opt]));
    }
  }

  return new Promise((resolve, reject) => {
    const npm = proc.spawn(
      /^win/.test(process.platform) ? 'node.exe' : 'node',
      node_args,
      {stdio: 'inherit', cwd: projectDir},
    );
    npm.on('close', code => {
      if (code !== 0) {
        reject(code);
      }
      resolve();
    });
  });
}

runPackager()
  .catch(err => {
    console.log(
      'An error occurred during the packager process. Exited with code ' +
        err +
        '.\nLook at the packager output above to see what went wrong.',
    );
    process.exit(1);
  });
