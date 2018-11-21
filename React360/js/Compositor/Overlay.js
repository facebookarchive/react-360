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

import { type Quaternion } from '../Controls/Types';
import { createCompassGlyph, createViewInVrGlyph } from './Glyphs';
import { isMobileBrowser } from '../Utils/util';

type Handler = () => mixed;

// Apply a set of styles to a DOM node
function setStyles(node: Element, styles: { [style: string]: any }) {
  // Cast style, since Flow thinks SVG nodes are generic Elements
  const style: CSSStyleDeclaration = (node: any).style;
  for (const property in styles) {
    let destination = property;
    // Handle prefixed properties
    if (!style.hasOwnProperty(destination)) {
      const uppercase = destination[0].toUpperCase() + destination.substr(1);
      if (style.hasOwnProperty(`moz${uppercase}`)) {
        destination = `moz${uppercase}`;
      } else if (style.hasOwnProperty(`webkit${uppercase}`)) {
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
const COMPASS_WRAPPER_STYLES = {
  backgroundColor: 'rgba(0,0,0,0.7)',
  borderRadius: '100%',
  height: '30px',
  marginTop: '-20px',
  padding: '5px',
  position: 'absolute',
  right: '20px',
  top: '50%',
  width: '30px',
};
const COMPASS_STYLES = {
  cursor: 'pointer',
  pointerEvents: 'initial',
  transformOrigin: '50% 50%',
};
const VR_BUTTON_STYLES = {
  background: 'rgba(0, 0, 0, 0.7)',
  border: '2px solid #ffffff',
  borderRadius: '5px',
  bottom: '20px',
  color: '#ffffff',
  cursor: 'pointer',
  // display: 'none',
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontSize: '16px',
  fontWeight: 'normal',
  height: '38px',
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

export interface OverlayInterface {
  hide(): void;
  setCameraRotation(quat: Quaternion): void;
  setVRButtonState(visible: boolean, text: string, handler: ?Handler): void;
  show(): void;
}

export default class Overlay implements OverlayInterface {
  _compass: Element;
  _vrButton: HTMLElement;
  _vrButtonHandler: ?Handler;
  _vrButtonText: Text;
  _wrapper: HTMLElement;

  constructor(frame: HTMLElement, resetAngles: Handler) {
    this._wrapper = document.createElement('div');
    setStyles(this._wrapper, WRAPPER_STYLES);
    frame.appendChild(this._wrapper);
    const frameStyle = window.getComputedStyle(frame);
    if (frameStyle.position === 'static' || frameStyle.position === '') {
      frame.style.position = 'relative';
    }
    this._vrButton = document.createElement('a');
    setStyles(this._vrButton, VR_BUTTON_STYLES);
    const vrGlyph = createViewInVrGlyph(38, 38, '#ffffff');
    this._vrButton.appendChild(vrGlyph);
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
    const compassWrapper = document.createElement('div');
    setStyles(compassWrapper, COMPASS_WRAPPER_STYLES);
    this._compass = createCompassGlyph(30, 30, '#ffffff');
    this._compass.addEventListener('click', () => {
      resetAngles();
    });
    setStyles(this._compass, COMPASS_STYLES);
    compassWrapper.appendChild(this._compass);
    this._wrapper.appendChild(compassWrapper);
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
    if (visible && !isMobileBrowser()) {
      this.enableVRButton();
    } else {
      this.disableVRButton();
    }
    this.setVRButtonText(text);
    this.setVRButtonHandler(handler);
  }

  setCameraRotation(quat: Quaternion) {
    // Rotate compass by rotating <0, 0, -1> by the camera quaternion, then
    // computing the angle between that vector (projected onto the xz plane)
    // and the original via dot-product.
    const x = quat[0];
    const y = quat[1];
    const z = quat[2];
    const w = quat[3];
    const xx = x * x;
    const yy = y * y;
    const s = 1 / (xx + yy + z * z + w * w);
    const projectX = -2 * s * (x * z + y * w);
    const projectZ = -1 + 2 * s * (xx + yy);
    const projectMag = Math.sqrt(projectX * projectX + projectZ * projectZ);
    const compassAngle =
      (projectX > 0 ? 1 : -1) * Math.acos(-1 * projectZ / projectMag);
    (this._compass: any).style.transform = `rotate(${compassAngle}rad)`;
  }

  hide() {
    this._wrapper.style.display = 'none';
  }

  show() {
    this._wrapper.style.display = 'block';
  }
}
