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

/* global VRDisplayEvent */

type Callback = (display: ?VRDisplay) => void;

/**
 * State management for VR Display
 */
export default class VRState {
  vrDisplay: ?VRDisplay;
  _activateCallbacks: Array<Callback>;
  _deactivateCallbacks: Array<Callback>;
  _displayChangeCallbacks: Array<Callback>;
  _enterCallbacks: Array<Callback>;
  _exitCallbacks: Array<Callback>;

  constructor() {
    this._displayChangeCallbacks = [];
    this._enterCallbacks = [];
    this._exitCallbacks = [];
    this._activateCallbacks = [];
    this._deactivateCallbacks = [];

    // Listen for headsets that connect / disconnect after the page has loaded
    window.addEventListener('vrdisplayconnect', this.onDisplayConnect);
    window.addEventListener('vrdisplaydisconnect', this.onDisplayDisconnect);
    // Listen for headset activation / deactivation
    window.addEventListener('vrdisplayactivate', this.onDisplayActivate);
    window.addEventListener('vrdisplaydeactivate', this.onDisplayDeactivate);
    // Listen for presentation changes to catch external triggers (like the back button)
    window.addEventListener('vrdisplaypresentchange', this.onDisplayPresentChange);

    if (typeof navigator.getVRDisplays === 'function') {
      navigator.getVRDisplays().then(displays => {
        if (displays.length) {
          this.setCurrentDisplay(displays[0]);
        }
      });
    }
  }

  _callEnterCallbacks() {
    for (let i = 0; i < this._enterCallbacks.length; i++) {
      this._enterCallbacks[i](this.vrDisplay);
    }
  }

  _callExitCallbacks() {
    for (let i = 0; i < this._exitCallbacks.length; i++) {
      this._exitCallbacks[i](this.vrDisplay);
    }
  }

  _callDisplayChangeCallbacks() {
    for (let i = 0; i < this._displayChangeCallbacks.length; i++) {
      this._displayChangeCallbacks[i](this.vrDisplay);
    }
  }

  _callActivateCallbacks() {
    for (let i = 0; i < this._activateCallbacks.length; i++) {
      this._activateCallbacks[i](this.vrDisplay);
    }
  }

  _callDeactivateCallbacks() {
    for (let i = 0; i < this._deactivateCallbacks.length; i++) {
      this._deactivateCallbacks[i](this.vrDisplay);
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

  onActivate(cb: Callback) {
    this._activateCallbacks.push(cb);
  }

  onDeactivate(cb: Callback) {
    this._deactivateCallbacks.push(cb);
  }

  setCurrentDisplay(display: ?VRDisplay) {
    if (display === this.vrDisplay) {
      return;
    }
    this.vrDisplay = display;
    this._callDisplayChangeCallbacks();
  }

  getCurrentDisplay(): ?VRDisplay {
    return this.vrDisplay;
  }

  isPresenting(): boolean {
    return !!this.vrDisplay && this.vrDisplay.isPresenting;
  }

  onDisplayActivate = ({display}: VRDisplayEvent) => {
    if (display === this.vrDisplay) {
      this._callActivateCallbacks();
    }
  };

  onDisplayDeactivate = ({display}: VRDisplayEvent) => {
    if (display === this.vrDisplay) {
      this._callDeactivateCallbacks();
    }
  };

  onDisplayConnect = ({display}: VRDisplayEvent) => {
    if (this.vrDisplay) {
      return;
    }
    this.setCurrentDisplay(display);
  };

  onDisplayDisconnect = ({display}: VRDisplayEvent) => {
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
  };

  onDisplayPresentChange = ({display}: VRDisplayEvent) => {
    if (this.vrDisplay && display && display.displayId === this.vrDisplay.displayId) {
      if (display.isPresenting) {
        this._callEnterCallbacks();
      } else {
        this._callExitCallbacks();
      }
    }
  };
}
