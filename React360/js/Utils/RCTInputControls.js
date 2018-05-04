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

import type GuiSys from '../OVRUI/UIView/GuiSys';
import {GuiSysEventType} from '../OVRUI/UIView/GuiSysEvent';
import {type ReactNativeContext} from '../ReactNativeContext';

type EventPayload = {
  args: Object,
  eventType: string,
  type?: string,
};

/**
 * Input event manager for React Native. RCTInputControls emits input events to the current focused view.
 */
export class RCTInputControls {
  _guiSys: GuiSys;
  _rnctx: ReactNativeContext;

  constructor(rnctx: ReactNativeContext, guiSys: GuiSys) {
    this._rnctx = rnctx;
    this._guiSys = guiSys;

    guiSys.eventDispatcher.addEventListener(
      'GuiSysEvent',
      this._onInputEvent.bind(this),
    );
    guiSys.eventDispatcher.addEventListener(
      'InputChannelEvent',
      this._onInputChannelEvent.bind(this),
    );
  }

  _onInputEvent(event: EventPayload) {
    // This function only handle input events
    if (event.eventType !== GuiSysEventType.INPUT_EVENT) {
      return;
    }

    const target = this._rnctx.lastHit
      ? this._rnctx.getHitTag(this._rnctx.lastHit)
      : null;
    if (target) {
      const source = this._rnctx.lastSource;
      // Dispatch input event to hit view
      this._rnctx.callFunction('RCTEventEmitter', 'receiveEvent', [
        target,
        'topInput',
        {
          inputEvent: event.args.inputEvent,
          target: target,
          source: source,
        },
      ]);

      // TODO: Deprecate this, and use onInput to implement onClick
      // Dispatch the onChange event
      if (isConfirmEvent(event.args.inputEvent)) {
        this._rnctx.callFunction('RCTEventEmitter', 'receiveEvent', [
          target,
          'topChange',
          [],
        ]);
      }
    }

    // Dispatch event to registered callbacks
    this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [
      'onReceivedInputEvent',
      event.args.inputEvent,
      target,
    ]);
  }

  /**
   * Event handler for the updated runtime, with its configurable InputChannels
   */
  _onInputChannelEvent(event: EventPayload) {
    const target = this._rnctx.lastHit
      ? this._rnctx.getHitTag(this._rnctx.lastHit)
      : null;
    if (target) {
      const source = this._rnctx.lastSource;
      // Dispatch input event to hit view
      this._rnctx.callFunction('RCTEventEmitter', 'receiveEvent', [
        target,
        'topInput',
        {
          inputEvent: event.args,
          target: target,
          source: source,
        },
      ]);
    }

    // Dispatch event to registered callbacks
    this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [
      'onReceivedInputEvent',
      event.args,
      target,
    ]);
  }
}

/**
 * DEPRECATED: These input event will be treated as confirm in React:
 *  - A button on XBOX Gamepad
 *  - Space button on keyboard
 */
function isConfirmEvent(event: Object) {
  // Currently WebVR can only recognize XboxController as 'standard' mapping. But it seems key 0 is the primary key
  // for most gamepad controller. We should revisit this once the functionality of mapping is fully implemented.
  return (
    (event.type === 'GamepadInputEvent' &&
      event.button === 0 &&
      event.eventType === 'keyup') ||
    (event.type === 'KeyboardInputEvent' &&
      event.code === 'Space' &&
      event.eventType === 'keyup')
  );
}
