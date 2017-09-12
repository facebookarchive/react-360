/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

import setStyles from './setStyles';
import {
  createCompassGlyph,
  createFullscreenGlyph,
  createGyroGlyph,
  createViewInVrGlyph,
} from './Glyphs';

let fullscreenMethod = null;
if ('requestFullscreen' in Element.prototype) {
  fullscreenMethod = 'requestFullscreen';
} else if ('webkitRequestFullscreen' in Element.prototype) {
  fullscreenMethod = 'webkitRequestFullscreen';
} else if ('mozRequestFullScreen' in Element.prototype) {
  fullscreenMethod = 'mozRequestFullScreen';
} else if ('msRequestFullscreen' in Element.prototype) {
  fullscreenMethod = 'msRequestFullscreen';
}

const RAD_TO_DEG = 180 / Math.PI;

const OVERLAY_STYLES = {
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
const FULLSCREEN_STYLES = {
  background: 'rgba(0, 0, 0, 0.7)',
  border: '2px solid #ffffff',
  borderRadius: '5px',
  bottom: '20px',
  cursor: 'pointer',
  display: 'inline-block',
  height: '30px',
  padding: '4px',
  pointerEvents: 'initial',
  position: 'absolute',
  right: '18px',
  verticalAlign: 'bottom',
  width: '30px',
};
const GYRO_WRAPPER_STYLES = {
  height: '40px',
  left: '50%',
  marginLeft: '-20px',
  marginTop: '-20px',
  position: 'absolute',
  top: '50%',
  width: '40px',
  transition: 'opacity 1s ease-out',
};
const SUPPORT_MESSAGE_STYLES = {
  background: 'rgba(0, 0, 0, 0.7)',
  border: '2px solid #ffffff',
  borderRadius: '5px',
  color: '#ffffff',
  cursor: 'default',
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontSize: '16px',
  fontWeight: 'normal',
  left: '50%',
  lineHeight: '20px',
  padding: '10px',
  pointerEvents: 'initial',
  position: 'absolute',
  textAlign: 'center',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '240px',
};
const SUPPORT_ACTIONS_STYLES = {
  paddingTop: '16px',
};
const SUPPORT_LEARN_MORE_STYLES = {
  color: '#ffffff',
  display: 'inline-block',
  marginRight: '40px',
  textDecoration: 'none',
};
const SUPPORT_CANCEL_STYLES = {
  color: '#ffffff',
  cursor: 'pointer',
};

type ButtonHandler = (...any) => any;

type OverlayOptions = {
  fullscreenButtonHandler?: ButtonHandler,
  hideCompass?: boolean,
  hideFullscreen?: boolean,
  resetAngles?: ?() => mixed,
  vrButtonHandler?: ButtonHandler,
};

/**
 * The overlaid controls for the WebVR Player.
 * It contains a 360 content indicator, and a "View in VR" button.
 * The functionality of the Overlay is entirely controlled by the Player,
 * it is a layout component with no real inner logic.
 */
export default class Overlay {
  compass: Element;
  domElement: HTMLDivElement;
  fullscreenButton: HTMLAnchorElement;
  fullscreenButtonHandler: ?ButtonHandler;
  gyro: ?Element;
  supportMessage: ?HTMLDivElement;
  vrButton: HTMLAnchorElement;
  vrButtonHandler: ?ButtonHandler;

  /**
   * Set up all of the DOM nodes around
   * @param options - Optional map of configuration options. The only currently
   *   supported option is vrButtonHandler, a callback that is triggered when
   *   the VR button is clicked on a browser supporting WebVR.
   */
  constructor(options: OverlayOptions = {}) {
    this.vrButtonHandler = options.vrButtonHandler;
    this.fullscreenButtonHandler = options.fullscreenButtonHandler;
    (this: any).handleVRButton = this.handleVRButton.bind(this);
    (this: any).handleFullscreenButton = this.handleFullscreenButton.bind(this);

    const overlayNode = document.createElement('div');
    setStyles(overlayNode, OVERLAY_STYLES);
    const vrButton = document.createElement('a');
    this.vrButton = vrButton;
    setStyles(vrButton, VR_BUTTON_STYLES);
    const vrGlyph = createViewInVrGlyph(38, 38, '#ffffff');
    vrButton.appendChild(vrGlyph);
    const vrButtonLabel = document.createElement('span');
    setStyles(vrButtonLabel, VR_BUTTON_LABEL_STYLES);
    vrButtonLabel.appendChild(document.createTextNode('View in VR'));
    vrButton.appendChild(vrButtonLabel);
    vrButton.addEventListener('click', this.handleVRButton);
    const fullscreenButton = document.createElement('a');
    this.fullscreenButton = fullscreenButton;
    setStyles(fullscreenButton, FULLSCREEN_STYLES);
    const fullscreenGlyph = createFullscreenGlyph(30, 30, '#ffffff');
    fullscreenButton.appendChild(fullscreenGlyph);
    fullscreenButton.title = 'Full Screen';
    fullscreenButton.style.display = fullscreenMethod && !options.hideFullscreen
      ? 'inline-block'
      : 'none';
    fullscreenButton.addEventListener('click', this.handleFullscreenButton);
    overlayNode.appendChild(vrButton);
    overlayNode.appendChild(fullscreenButton);

    const compassWrapper = document.createElement('div');
    setStyles(compassWrapper, COMPASS_WRAPPER_STYLES);
    compassWrapper.style.display = !options.hideCompass ? 'inline-block' : 'none';
    this.compass = createCompassGlyph(30, 30, '#ffffff');
    setStyles(this.compass, COMPASS_STYLES);
    if (typeof options.resetAngles === 'function') {
      this.compass.addEventListener('click', options.resetAngles);
    }
    compassWrapper.appendChild(this.compass);
    overlayNode.appendChild(compassWrapper);

    this.gyro = null;
    try {
      const gyro = createGyroGlyph(40, 40, '#ffffff');
      const gyroWrapper = document.createElement('div');
      setStyles(gyroWrapper, GYRO_WRAPPER_STYLES);
      gyroWrapper.appendChild(gyro);
      this.gyro = gyroWrapper;
      overlayNode.appendChild(gyroWrapper);
    } catch (e) {
      // If SVG construction fails, don't show the glyph
    }

    this.domElement = overlayNode;
  }

  /**
   * Allow the VR button to be clicked
   */
  enableVRButton() {
    this.vrButton.style.display = 'inline-block';
    this.vrButton.style.color = '#ffffff';
    this.vrButton.style.borderColor = '#ffffff';
    this.vrButton.style.cursor = 'pointer';
  }

  /**
   * Disable the VR button
   */
  disableVRButton() {
    this.vrButton.style.color = '#a0a0a0';
    this.vrButton.style.borderColor = '#a0a0a0';
    this.vrButton.style.cursor = 'inherit';
  }

  /**
   * Hide the VR button
   */
  hideVRButton() {
    this.vrButton.style.display = 'none';
  }

  /**
   * Set the text of the VR button
   */
  setVRButtonText(text: string) {
    this.vrButton.childNodes[1].childNodes[0].nodeValue = text;
  }

  /**
   * Set a new callback for the VR button
   */
  setVRButtonHandler(cb: ?ButtonHandler) {
    this.vrButtonHandler = cb;
  }

  /**
   * Run the VR button callback provided by the Player. We wrap the callback
   * so that we can always ensure that the handler we remove is the same as
   * the one we attached.
   */
  handleVRButton() {
    if (this.vrButtonHandler) {
      this.vrButtonHandler();
    }
  }

  /**
   * Attempt to enter fullscreen mode, if it's supported by the browser
   */
  handleFullscreenButton() {
    if (this.fullscreenButtonHandler) {
      this.fullscreenButtonHandler(fullscreenMethod);
    }
  }

  /**
   * Show the gyroscope glyph
   */
  showGyro() {
    if (this.gyro) {
      (this.gyro: any).style.opacity = 1;
    }
  }

  /**
   * Hide the gyroscope glyph
   */
  hideGyro() {
    if (this.gyro) {
      (this.gyro: any).style.opacity = 0;
    }
  }

  /**
   * Show a message to the user about using GearVR and Rift to experience the
   * scene in VR.
   */
  showSupportMessage() {
    // Only construct the message once
    if (this.supportMessage) {
      this.domElement.appendChild(this.supportMessage);
      return;
    }
    const message = document.createElement('div');
    setStyles(message, SUPPORT_MESSAGE_STYLES);
    this.supportMessage = message;

    const text = document.createElement('div');
    text.appendChild(
      document.createTextNode('Install a WebVR-enabled browser to experience VR on this device')
    );
    message.appendChild(text);

    const actions = document.createElement('div');
    setStyles(actions, SUPPORT_ACTIONS_STYLES);

    const learnMore = document.createElement('a');
    setStyles(learnMore, SUPPORT_LEARN_MORE_STYLES);
    learnMore.href = 'https://webvr.info/';
    learnMore.target = '_blank';
    learnMore.appendChild(document.createTextNode('Learn More'));

    const cancel = document.createElement('a');
    setStyles(cancel, SUPPORT_CANCEL_STYLES);
    cancel.appendChild(document.createTextNode('Cancel'));
    cancel.addEventListener('click', () => {
      this.hideSupportMessage();
    });
    actions.appendChild(learnMore);
    actions.appendChild(cancel);
    message.appendChild(actions);
    this.domElement.appendChild(message);
  }

  /**
   * Hide the message about Rift and GearVR
   */
  hideSupportMessage() {
    if (this.supportMessage) {
      this.domElement.removeChild(this.supportMessage);
    }
  }

  /**
   * Set the visibility of the Fullscreen button
   */
  setFullscreenButtonVisibility(show: boolean) {
    this.fullscreenButton.style.display = fullscreenMethod && show ? 'inline-block' : 'none';
  }

  /**
   * Set the orientation of the compass indicator
   */
  setCompassAngle(rad: number) {
    const deg = -1 * rad * RAD_TO_DEG;
    (this.compass: any).style.transform = 'rotate(' + deg + 'deg)';
  }
}
