/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule setupDevtools
 * @flow
 */
'use strict';

const NativeModules = require('NativeModules');
const UIManager = NativeModules.UIManager;

// Make sure we only print out the connection message once
let logged = false;

function setupDevtools() {
  // Only attemp the connection if `?devtools` has been appended to the url,
  // so that we don't flood every app with websocket connection failure messages
  if (!self.__DEVTOOLS__) {
    return;
  }
  const port = window.__REACT_DEVTOOLS_PORT__ || 8097;
  if (!logged) {
    console.log('Attempting to connect to React Inspector on :' + port);
    logged = true;
  }
  const messageListeners = [];
  const closeListeners = [];
  const hostname = 'localhost';
  const ws = new window.WebSocket('ws://' + hostname + ':' + port + '/devtools');
  // this is accessed by the eval'd backend code
  /* eslint-disable no-unused-vars */
  const FOR_BACKEND = {
    /* eslint-enable no-unused-vars */
    resolveRNStyle: require('flattenStyle'),
    wall: {
      listen(fn) {
        messageListeners.push(fn);
      },
      onClose(fn) {
        closeListeners.push(fn);
      },
      send(data) {
        ws.send(JSON.stringify(data));
      },
    },
  };
  ws.onclose = handleClose;
  ws.onerror = handleClose;
  ws.onopen = function() {
    tryToConnect();
  };

  let hasClosed = false;
  function handleClose() {
    if (!hasClosed) {
      hasClosed = true;
      setTimeout(setupDevtools, 2000);
      closeListeners.forEach(fn => fn());
    }
  }

  function tryToConnect() {
    ws.send('attach:agent');
    const _interval = setInterval(() => ws.send('attach:agent'), 500);
    ws.onmessage = evt => {
      if (evt.data.indexOf('eval:') === 0) {
        clearInterval(_interval);
        initialize(evt.data.slice('eval:'.length));
      }
    };
  }

  function initialize(text) {
    try {
      // FOR_BACKEND is used by the eval'd code
      eval(text); // eslint-disable-line no-eval
    } catch (e) {
      console.error('Failed to eval: ' + e.message);
      return;
    }
    const ReactNativeComponentTree = require('ReactNativeComponentTree');
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
      ComponentTree: {
        getClosestInstanceFromNode: function(node) {
          return ReactNativeComponentTree.getClosestInstanceFromNode(node);
        },
        getNodeFromInstance: function(inst) {
          // inst is an internal instance (but could be a composite)
          while (inst._renderedComponent) {
            inst = inst._renderedComponent;
          }
          if (inst) {
            return ReactNativeComponentTree.getNodeFromInstance(inst);
          } else {
            return null;
          }
        },
      },
      Mount: require('ReactNativeMount'),
      Reconciler: require('ReactReconciler'),
    });
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.on('react-devtools', attachToDevtools);
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent) {
      attachToDevtools(window.__REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent);
    }
    ws.onmessage = handleMessage;
  }

  let currentHighlight = null;

  function attachToDevtools(agent) {
    agent.sub('highlight', ({node, name, props}) => {
      currentHighlight = node;
      UIManager.setBoundingBoxVisible(node, true);
    });
    agent.sub('hideHighlight', () => {
      if (currentHighlight) {
        UIManager.setBoundingBoxVisible(currentHighlight, false);
        currentHighlight = null;
      }
    });
  }

  function handleMessage(evt) {
    // It's hard to handle JSON in a safe manner without inspecting it at
    // runtime, hence the any
    let data: any;
    try {
      data = JSON.parse(evt.data);
    } catch (e) {
      return console.error('failed to parse json: ' + evt.data);
    }
    // the devtools closed
    if (data.$close || data.$error) {
      closeListeners.forEach(fn => fn());
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__.emit('shutdown');
      tryToConnect();
      return;
    }
    if (data.$open) {
      return; // ignore
    }
    messageListeners.forEach(fn => {
      try {
        fn(data);
      } catch (e) {
        // jsc doesn't play so well with tracebacks that go into eval'd code,
        // so the stack trace here will stop at the `eval()` call. Getting the
        // message that caused the error is the best we can do for now.
        console.log(data);
        throw e;
      }
    });
  }
}

module.exports = setupDevtools;
