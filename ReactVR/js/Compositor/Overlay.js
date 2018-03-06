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

type Handler = () => mixed;

// Apply a set of styles to a DOM node
function setStyles(node: HTMLElement, styles: {[style: string]: any}) {
  for (const property in styles) {
    let destination = property;
    // Handle prefixed properties
    if (!node.style.hasOwnProperty(destination)) {
      const uppercase = destination[0].toUpperCase() + destination.substr(1);
      if (node.style.hasOwnProperty(`moz${uppercase}`)) {
        destination = `moz${uppercase}`;
      } else if (node.style.hasOwnProperty(`webkit${uppercase}`)) {
        destination = `webkit${uppercase}`;
      }
    }
    // $FlowFixMe - Some confusing error about the left side being a number
    node.style[destination] = styles[property];
  }
}

const WRAPPER_STYLES = {
  bottom: 0,
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
  pointerEvents: 'none',
  userSelect: 'none',
};
const VR_BUTTON_STYLES = {
  background: 'rgba(0, 0, 0, 0.7)',
  border: '2px solid #ffffff',
  borderRadius: '5px',
  bottom: '20px',
  color: '#ffffff',
  cursor: 'pointer',
  display: 'none',
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontSize: '16px',
  fontWeight: 'normal',
  left: '18px',
  padding: '0 10px',
  pointerEvents: 'initial',
  position: 'absolute',
};
const VR_BUTTON_LABEL_STYLES = {
  display: 'inline-block',
  lineHeight: '38px',
  marginLeft: '10px',
  verticalAlign: 'top',
};

export default class Overlay {
  _vrButton: HTMLElement;
  _vrButtonHandler: ?Handler;
  _vrButtonText: Text;
  _wrapper: HTMLElement;

  constructor(frame: HTMLElement) {
    this._wrapper = document.createElement('div');
    setStyles(this._wrapper, WRAPPER_STYLES);
    frame.appendChild(this._wrapper);
    if (frame.style.position === 'static' || frame.style.position === '') {
      frame.style.position = 'relative';
    }
    this._vrButton = document.createElement('a');
    setStyles(this._vrButton, VR_BUTTON_STYLES);
    const vrButtonLabel = document.createElement('span');
    setStyles(vrButtonLabel, VR_BUTTON_LABEL_STYLES);
    this._vrButton.appendChild(vrButtonLabel);
    this._vrButtonText = document.createTextNode('View in VR');
    vrButtonLabel.appendChild(this._vrButtonText);
    this._vrButton.addEventListener('click', () => {
      if (this._vrButtonHandler) {
        this._vrButtonHandler();
      }
    });
    this._vrButton.addEventListener('touchend', () => {
      if (this._vrButtonHandler) {
        this._vrButtonHandler();
      }
    });
    this._vrButton.style.display = 'none';
    this._wrapper.appendChild(this._vrButton);
  }

  enableVRButton() {
    this._vrButton.style.display = 'block';
  }

  disableVRButton() {
    this._vrButton.style.display = 'none';
  }

  setVRButtonText(text: string) {
    this._vrButtonText.nodeValue = text;
  }

  setVRButtonHandler(handler: ?Handler) {
    this._vrButtonHandler = handler;
  }

  setVRButtonState(visible: boolean, text: string, handler: ?Handler) {
    if (visible) {
      this.enableVRButton();
    } else {
      this.disableVRButton();
    }
    this.setVRButtonText(text);
    this.setVRButtonHandler(handler);
  }
}
