/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule asset
 * @flow
 */

export type AssetSource = {uri: string};

import {NativeModules} from 'react-native';

const {assetRoot} = NativeModules.ExternalAssets;

function asset(localPath: string, sourceExtra: Object = {}): AssetSource {
  let uri = localPath;
  if (assetRoot) {
    if (localPath.startsWith('/')) {
      uri = assetRoot + localPath.substr(1);
    } else {
      uri = assetRoot + localPath;
    }
  }
  return {
    ...sourceExtra,
    uri: uri,
  };
}

module.exports = asset;
