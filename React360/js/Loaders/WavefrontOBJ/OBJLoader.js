/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

import {readOBJFile} from './OBJParser';
import RefCountCache from '../../Utils/RefCountCache';
import fetchResource from '../../Utils/fetchResource';

import type {OBJParserState} from './OBJTypes';

// We currently use OBJLoader as a singleton, but we may want to create one
// per ReactNativeContext later on
const objStateCache: RefCountCache<OBJParserState> = new RefCountCache();
const objLoaders: {[path: string]: Promise<OBJParserState>} = {};

export function fetchAndCacheOBJ(obj: string): Promise<OBJParserState> {
  if (objStateCache.has(obj)) {
    objStateCache.addReference(obj);
    return Promise.resolve(objStateCache.get(obj));
  }

  // Make sure we only load + parse parallel OBJ requests once
  let objLoader = objLoaders[obj];

  if (!objLoader) {
    objLoader = fetchResource(obj).then(text => readOBJFile(text));
    objLoaders[obj] = objLoader;
  }

  return objLoader.then(state => {
    if (objStateCache.has(obj)) {
      objStateCache.addReference(obj);
    } else {
      objStateCache.addEntry(obj, state);
    }
    // Perform cleanup of the Promise after adding an entry to the cache.
    // If cleanup were performed at the end of the original Loader promise,
    // there would be one event tick between removing the loader and adding
    // the cache entry, allowing a (slim) chance for an unnecessary second load.
    if (obj in objLoaders) {
      delete objLoaders[obj];
    }
    return state;
  });
}

export function removeOBJReference(key: string) {
  objStateCache.removeReference(key);
}
