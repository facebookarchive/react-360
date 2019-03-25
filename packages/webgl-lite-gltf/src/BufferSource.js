/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow struct
 */

import type {BufferReference} from './FileTypes';
import base64ToArrayBuffer from './base64ToArrayBuffer';

export type LocalBufferSource = {
  type: 'local',
  data: ArrayBuffer,
};

export type ExternalBufferSource = {
  type: 'external',
  source: string,
  data: Promise<ArrayBuffer>,
};

export type BufferSource = LocalBufferSource | ExternalBufferSource;

const GLTF_BUFFER_PREFIX = 'data:application/gltf-buffer;base64,';
const OCTET_STREAM_PREFIX = 'data:application/octet-stream;base64,';

export function extractBufferSources(buffers: Array<BufferReference>): Array<BufferSource> {
  const sources = [];
  for (let i = 0; i < buffers.length; i++) {
    const ref = buffers[i];
    const {uri, byteLength} = ref;
    if (uri.startsWith(GLTF_BUFFER_PREFIX) || uri.startsWith(OCTET_STREAM_PREFIX)) {
      const raw = uri.substr(uri.indexOf('base64,') + 7);
      const data = base64ToArrayBuffer(raw);
      if (typeof byteLength === 'number') {
        if (byteLength !== data.byteLength) {
          throw new Error(
            `Error parsing buffer. Expected ${byteLength} bytes, got ${data.byteLength} instead.`
          );
        }
      }
      sources.push({
        type: 'local',
        data,
      });
    } else {
      throw new Error("External array buffers aren't supported yet");
    }
  }
  return sources;
}

export function getBufferData(source: BufferSource): Promise<ArrayBuffer> {
  switch (source.type) {
    case 'local':
      return Promise.resolve(source.data);
    case 'external':
      return source.data;
    default:
      throw new Error(`Unknown buffer source type: ${source.type}`);
  }
}
