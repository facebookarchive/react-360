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
import MobileVREffect from './MobileVREffect';

type Callback = (...any) => mixed;

/**
 * State management for VR Display
 */

function isVRBrowser(): boolean {
  return 'VRDisplay' in window;
}

export default class VRState {
  vrDisplay: ?VRDisplay;
  _displayChangeCallbacks: Array<Callback>;
  _enterCallbacks: Array<Callback>;
  _exitCallbacks: Array<Callback>;

  constructor(glRenderer) {
    this._displayChangeCallbacks = [];
    this._enterCallbacks = [];
    this._exitCallbacks = [];
    this.glRenderer = glRenderer;
    (this: any).onDisplayActivate = this.onDisplayActivate.bind(this);
    (this: any).onDisplayDeactivate = this.onDisplayDeactivate.bind(this);
    (this: any).onDisplayConnect = this.onDisplayConnect.bind(this);
    (this: any).onDisplayDisconnect = this.onDisplayDisconnect.bind(this);
    (this: any).onDisplayPresentChange = this.onDisplayPresentChange.bind(this);
    // Listen for headsets that connect / disconnect after the page has loaded
    window.addEventListener('vrdisplayconnect', this.onDisplayConnect);
    window.addEventListener('vrdisplaydisconnect', this.onDisplayDisconnect);
    // Listen for presentation changes to catch external triggers (like the back button)
    window.addEventListener(
      'vrdisplaypresentchange',
      this.onDisplayPresentChange,
    );
    if (typeof navigator.getVRDisplays === 'function') {
      navigator.getVRDisplays().then(displays => {
        if (displays.length) {
          this.setCurrentDisplay(displays[0]);
        } else if (displays.length === 0) {
          const effect = new MobileVREffect(this.glRenderer);
          this.setCurrentDisplay(effect)
        }
      });
    } else {
      const effect = new MobileVREffect(this.glRenderer);
      this.setCurrentDisplay(effect)
    }
  }

  _callEnterCallbacks() {
    for (let i = 0; i < this._enterCallbacks.length; i++) {
      this._enterCallbacks[i]();
    }
  }

  _callExitCallbacks() {
    for (let i = 0; i < this._exitCallbacks.length; i++) {
      this._exitCallbacks[i]();
    }
  }

  _callDisplayChangeCallbacks() {
    for (let i = 0; i < this._displayChangeCallbacks.length; i++) {
      this._displayChangeCallbacks[i](this.vrDisplay);
    }
  }

  onEnter(cb: Callback) {
    this._enterCallbacks.push(cb);
  }

  onExit(cb: Callback) {
    this._exitCallbacks.push(cb);
  }

  onDisplayChange(cb: Callback) {
    this._displayChangeCallbacks.push(cb);
  }

  setCurrentDisplay(display: ?VRDisplay) {
    this.vrDisplay = display;
    this._callDisplayChangeCallbacks();
  }

  getCurrentDisplay(): ?VRDisplay {
    return this.vrDisplay;
  }

  isPresenting(): boolean {
    return !!this.vrDisplay && this.vrDisplay.isPresenting;
  }

  onDisplayActivate({ display }: VRDisplayEvent) {
    if (display === this.vrDisplay) {
      // May need to do something here for vr-to-vr navigation
    }
  }

  onDisplayDeactivate({ display }: VRDisplayEvent) {
    if (display === this.vrDisplay) {
      // May need to do something here for vr-to-vr navigation
    }
  }

  onDisplayConnect({ display }: VRDisplayEvent) {
    if (this.vrDisplay) {
      return;
    }
    this.setCurrentDisplay(display);
  }

  onDisplayDisconnect({ display }: VRDisplayEvent) {
    // If `display` is not the current display, return.
    // If presenting, exit presenting, clean up.
    // Query remaining displays.
    // If display list is not empty, set the current display to the first one
    // Else, clear the current display, set state to disconnected
    if (display !== this.vrDisplay) {
      return;
    }
    if (typeof navigator.getVRDisplays === 'function') {
      navigator.getVRDisplays().then(displays => {
        if (displays.length === 0) {
          this.setCurrentDisplay(displays[0]);
        } else {
          this.setCurrentDisplay(null);
        }
      });
    }
  }

  onDisplayPresentChange({ display }: VRDisplayEvent) {
    if (
      this.vrDisplay &&
      display &&
      display.displayId === this.vrDisplay.displayId
    ) {
      if (!display.isPresenting) {
        this._callExitCallbacks();
      }
    }
  }
}
