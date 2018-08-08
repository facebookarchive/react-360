const fs = require('fs');
const tar = require('tar-fs');
const request = require('request');
const zlib = require('zlib');

request('https://www.dropbox.com/s/4h5iuryd3myfha8/asset.tar.gz?dl=1')
  .pipe(zlib.createGunzip())
  .pipe(tar.extract('./static_assets'));
