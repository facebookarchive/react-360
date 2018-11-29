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

import ReactExecutor, {type ExecutorOptions} from './ReactExecutor';

export default class ReactExecutorWebWorker extends ReactExecutor {
  _worker: Worker;

  constructor(options: ExecutorOptions = {}) {
    super();

    const bridgeCodeBlob = new Blob([
      `var Status = undefined;

__DEVTOOLS__ = ${options.enableDevTools ? 'true' : 'false'};

__postMessage = postMessage;

__loadBundle = function(bundle) {
  importScripts(bundle);
};

onmessage = function(e) {
${ReactExecutor.BRIDGE_HANDLER_CODE}
}`,
    ]);
    const bridgeCodeURL = URL.createObjectURL(bridgeCodeBlob);
    this._worker = new Worker(bridgeCodeURL);
    this._worker.onmessage = e => {
      const msg = e.data;
      if (!msg || !(msg instanceof Object)) {
        return;
      }
      this._messageQueue.push(msg);
    };
  }

  moduleConfig(moduleDescription: Array<any>) {
    const msg = JSON.stringify(
      {
        cmd: 'moduleConfig',
        moduleConfig: {remoteModuleConfig: moduleDescription},
      },
      ReactExecutor.replaceHiddenAttributes,
    );
    this._worker.postMessage(msg);
  }

  setConstant(key: string, value: void | null | boolean | number | string) {
    const msg = JSON.stringify({
      cmd: 'setConstant',
      key,
      value,
    });
    this._worker.postMessage(msg);
  }

  exec(url: string) {
    const msg = JSON.stringify({cmd: 'bundle', bundleName: url});
    this._worker.postMessage(msg);
  }

  call(module: string, fn: string, args: Array<any>) {
    const msg = JSON.stringify({
      cmd: 'exec',
      module,
      function: fn,
      args,
    });
    this._worker.postMessage(msg);
  }

  invoke(id: number, args: Array<any>) {
    const msg = JSON.stringify({
      cmd: 'invoke',
      id,
      args,
    });
    this._worker.postMessage(msg);
  }

  flush() {
    const msg = JSON.stringify({
      cmd: 'flush',
    });
    this._worker.postMessage(msg);
  }
}
