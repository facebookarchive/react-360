/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Utilities for interacting with a VR player that supports the `ovrweb`
 * protocol
 */

// Basic browser detection
const isChrome = !!window.chrome;
const isFirefox = !!window.sidebar;
const isEdge = !!navigator.msLaunchUri;

// This is only used on Chrome, so we only need the webkit prefix
const visibilityEvent = 'hidden' in document ? 'visibilitychange' : 'webkitvisibilitychange';

/**
 * Attempt to open a link with the `ovrweb:` protocol.
 *   On Edge, protocol opening and failure cases are pretty straightforward.
 *   On Firefox, we detect it with an iframe, and catch an error if it fails
 * @return A promise that is resolved if launching the external application is
 *   successful, and rejected if it fails.
 */
export function attemptOculusPlayer() {
  const url = 'ovrweb:' + window.location.toString();
  return new Promise((resolve, reject) => {
    if (isEdge) {
      msLaunchUri(
        url,
        () => {
          resolve();
        },
        () => {
          reject();
        }
      );
    } else if (isFirefox) {
      const iframe = document.createElement('iframe');
      iframe.src = 'about:blank';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      let success = false;
      try {
        iframe.contentWindow.location = url;
        success = true;
      } catch (e) {
        reject();
      }
      if (success) {
        // keep resolve out of the try block, that can silence errors elsewhere
        resolve();
      }
    } else if (isChrome) {
      let topNode = window;
      // In case the current window is an iframe, move up to the top window
      while (topNode !== topNode.parent) {
        topNode = topNode.parent;
      }
      let timeout = setTimeout(function() {
        topNode.removeEventListener('blur', blurHandler);
        document.removeEventListener(visibilityEvent, blurHandler);
        reject();
      }, 2000);
      const blurHandler = function(e) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        topNode.removeEventListener('blur', blurHandler);
        document.removeEventListener(visibilityEvent, blurHandler);
        resolve();
      };

      // Blur event is for desktop, visibility change is for Android
      topNode.addEventListener('blur', blurHandler);
      document.addEventListener(visibilityEvent, blurHandler);
      window.location = url;
    } else {
      reject();
    }
  });
}
