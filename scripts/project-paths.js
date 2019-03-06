const fs = require('fs');
const path = require('path');

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
      return undefined;
    }
    dir = path.join(dir, '..');
  }
  return dir;
}

// Allow overriding the project location with an env variable
const projectDir =
  process.env.PROJECT_LOCATION || findProjectDir(process.cwd());

const buildDir = projectDir ? path.join(projectDir, 'build') : undefined;

const react360WebDir = process.env.REACT_360_WEB_LOCATION ||
  path.join(projectDir, "node_modules", "react-360-web");

module.exports = {
  projectDir,
  buildDir,
  react360WebDir,
}
