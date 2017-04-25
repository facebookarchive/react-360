const fs = require('fs');
const path = require('path');

const LICENSE =
`/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
`;
function prependFile(source) {
  const contents = LICENSE + fs.readFileSync(source).toString().replace(LICENSE, '');
  fs.writeFileSync(source, contents);
}


function findFiles(dir) {
  const files = fs.readdirSync(dir);

  files.map((file) => {
    const fileSrc = path.join(dir, file);
    const stats = fs.statSync(fileSrc);
    if (!stats.isDirectory()) {
      prependFile(fileSrc);
    } else {
      findFiles(fileSrc);
    }
  });
}
findFiles(path.join('.', 'lib'));
findFiles(path.join('.', 'dist'));
