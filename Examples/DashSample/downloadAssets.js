var fs = require('fs');
var tar = require('tar-fs')
var request = require('request');
var zlib = require('zlib');

request('https://www.dropbox.com/s/4h5iuryd3myfha8/asset.tar.gz?dl=1')
  .pipe(zlib.createGunzip())
  .pipe(tar.extract('./static_assets'));