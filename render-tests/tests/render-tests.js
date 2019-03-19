/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import * as tests from './tests';

const search = window.location.search;
const config = search ? tests[search.substr(1)] : null;
if (config) {
  const container = document.getElementById('mount');
  try {
    config.test()(container);
  } catch (e) {
    const error = document.getElementById('error');
    error.appendChild(document.createTextNode(e.toString()));
    error.style.display = 'block';
  }
} else {
  document.getElementById('invalid-test').style.display = 'block';
}
