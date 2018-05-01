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

export default class ReactExecutorIframe extends ReactExecutor {
  _iframe: HTMLIFrameElement;

  constructor(options: ExecutorOptions = {}) {
    super();

    this._iframe = document.createElement('iframe');
    this._iframe.src = 'about:blank';
    this._iframe.style.display = 'none';
    if (document.body) {
      document.body.appendChild(this._iframe);
    }
    const bridgeCodeScript = document.createElement('script');
    bridgeCodeScript.innerHTML = `var Status = undefined;

window.global = window;

(function() {

window.__DEVTOOLS__ = ${options.enableDevTools ? 'true' : 'false'};

var __postMessage = function(msg) {
  window.parent.postMessage(msg, '*');
};

var _loading = false;
var _messagesWhileLoading = [];

var __loadBundle = function(bundle) {
  const script = document.createElement('script');
  script.src = bundle;
  _loading = true;
  script.onload = function() {
    _loading = false;
    for (var i = 0; i < _messagesWhileLoading.length; i++) {
      onMessage(_messagesWhileLoading[i]);
    }
  }
  document.body.appendChild(script);
}

var onMessage = function(e) {
${ReactExecutor.BRIDGE_HANDLER_CODE}
};

window.addEventListener('message', function(e) {
  if (_loading) {
    _messagesWhileLoading.push(e);
  } else {
    onMessage(e);
  }
});
})();
`;
    const contentDocument = this._iframe.contentDocument;
    if (contentDocument.body) {
      contentDocument.body.appendChild(bridgeCodeScript);
    }
    window.addEventListener('message', e => {
      const msg = e.data;
      if (!msg || !(msg instanceof Object)) {
        return;
      }
      this._messageQueue.push(msg);
    });
  }

  moduleConfig(moduleDescription: Array<any>) {
    const msg = JSON.stringify(
      {
        cmd: 'moduleConfig',
        moduleConfig: {remoteModuleConfig: moduleDescription},
      },
      ReactExecutor.replaceHiddenAttributes,
    );
    this._iframe.contentWindow.postMessage(msg, '*');
  }

  setConstant(key: string, value: void | null | boolean | number | string) {
    const msg = JSON.stringify({
      cmd: 'setConstant',
      key,
      value,
    });
    this._iframe.contentWindow.postMessage(msg, '*');
  }

  exec(url: string) {
    const msg = JSON.stringify({cmd: 'bundle', bundleName: url});
    this._iframe.contentWindow.postMessage(msg, '*');
  }

  call(module: string, fn: string, args: Array<any>) {
    const msg = JSON.stringify({
      cmd: 'exec',
      module,
      function: fn,
      args,
    });
    this._iframe.contentWindow.postMessage(msg, '*');
  }

  invoke(id: number, args: Array<any>) {
    const msg = JSON.stringify({
      cmd: 'invoke',
      id,
      args,
    });
    this._iframe.contentWindow.postMessage(msg, '*');
  }

  flush() {
    const msg = JSON.stringify({
      cmd: 'flush',
    });
    this._iframe.contentWindow.postMessage(msg, '*');
  }
}
