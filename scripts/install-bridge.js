/**
 * Produces production builds of the React application (index.vr.js) and the
 * client-side implementation (client.js).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const projectPaths = require('./project-paths');

const {projectDir, react360WebDir} = projectPaths;

if (projectDir === undefined) {
  console.log('Could not find a React 360 project directory');
  process.exit(1);
}

function copyExecutorFile(root) {
  const bridgeFilePath = path.resolve(
    react360WebDir,
    'js',
    'Executor',
    'NonBlobBridge.js'
  );
  if (!fs.existsSync(bridgeFilePath)) {
    throw Error(`Can't find NonBlobBridge.js in react-360-web. Make sure you installed the right version of 
      react-360-web.(> 1.1.1)`);
  }
  const outputPath = path.resolve(root, 'NonBlobBridge.js');
  try {
    fs.copyFileSync(bridgeFilePath, outputPath);
  } catch (e) {
    throw Error(`Unable to copy ${bridgeFilePath} to ${outputPath}`);
  }
}

function updateHTML(root) {
  const indexPath = path.join(root, 'index.html');
  let contents = null;
  try {
    contents = fs.readFileSync(indexPath, 'utf8');
  } catch (e) {
    throw Error(`Could not find index.html in your project root.`);
  }
  // matching the 3 parameter of "React360.init"
  var regex = / *React360.init\(( *\n?)(.*, *\n)(.*,? *\n)( *{.*(.*\n)* *} *\n?)? *\);/;
  var found = contents.match(regex);
  if (!found || found.length < 6) {
    throw Error(`Could not find React360.init code in your index.html, please manually set the 'bridgeFile' in the options`);
  }

  const injectCode = "bridgeFile: 'NonBlobBridge.js'";
  let code = found[4];
  if (code) {
    if (code.indexOf('bridgeFile: ') >= 0) {
      console.log(`'bridgeFile' already set in the options.`);
      return;
    }
    const spaceBefore = code.indexOf('{');
    const firstLine = code.indexOf('\n');
    const breakPoint = firstLine ? firstLine + 1 : spaceBefore + 1;
    const newCode = code.substring(0, breakPoint)
      + code.substring(0, spaceBefore)
      + "  "
      + `${injectCode},\n`
      + code.substring(breakPoint, code.length);
    contents = contents.replace(code, newCode);
  } else {
    code = found[0];
    let breakPoint = 0;
    const spaceBefore = code.indexOf('R');
    let foundDot = true;
    for (let i = code.lastIndexOf(')') - 1; i >= 0; i--) {
      if (code.charAt(i) === ',') {
        breakPoint = i + 1;
        foundDot = true;
        break;
      } else if (code.charAt(i) !== ' ' && code.charAt(i) !== '\n') {
        breakPoint = i + 1;
        foundDot = false;
        break;
      } 
    }
    const newCode = code.substring(0, breakPoint)
      + (foundDot ? "" : ",") + "\n"
      + code.substring(0, spaceBefore) + "  {\n" 
      + code.substring(0, spaceBefore) + `    ${injectCode},\n` 
      + code.substring(0, spaceBefore) + "  }"
      + code.substring(breakPoint, code.length);
    contents = contents.replace(code, newCode);
  }
  
  try {
    fs.writeFileSync(indexPath, contents, 'utf8');
  } catch (e) {
    throw Error(`Unable to write update to index.html.`);
  }
}

copyExecutorFile(projectDir);
updateHTML(projectDir);
