const fs = require('fs');
const path = require('path');

function copyFileSync( source, target ) {
  var targetFile = target;
  //if target is a directory a new file with the same name will be created
  if ( fs.existsSync( target ) ) {
    if ( fs.lstatSync( target ).isDirectory() ) {
      targetFile = path.join( target, path.basename( source ) );
    }
  }
  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target ) {
  var files = [];
  //check if folder needs to be created or integrated
  var targetFolder = path.join( target, path.basename( source ) );
  if ( !fs.existsSync( targetFolder ) ) {
    fs.mkdirSync( targetFolder );
  }
  //copy
  if ( fs.lstatSync( source ).isDirectory() ) {
    files = fs.readdirSync( source );
    files.forEach( function ( file ) {
      var curSource = path.join( source, file );
      if ( fs.lstatSync( curSource ).isDirectory() ) {
        copyFolderRecursiveSync( curSource, targetFolder );
      } else {
        copyFileSync( curSource, targetFolder );
      }
    } );
  }
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

const projectDir = process.env.PROJECT_LOCATION || findProjectDir(process.cwd());
const staticAssetsDir = path.join(projectDir, 'static_assets');
const buildDir = path.join(projectDir, 'build');

copyFolderRecursiveSync(staticAssetsDir, buildDir)
