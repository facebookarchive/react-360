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

import Module from './Module';

import type {ReactNativeContext} from '../ReactNativeContext';

type Timer = {
  callbackID: number,
  duration: number,
  jsSchedulingTime: number,
  repeats: boolean,
};

const IDLE_CALLBACK_THRESHOLD = 1; // Minimum idle execution time of 1ms

/**
 * The Timing Module allows the browser client to synchronize React timers with
 * the frame rate of the client.
 * This module is internal to the runtime and not designed to be called directly
 * Timers to the React code are distributed by event messages sent via the
 * WebWorker using the React Native Context
 * @class Timing
 * @extends Module
 */
export default class Timing extends Module {
  _rnctx: ReactNativeContext;
  _sendIdleEvents: boolean;
  _targetFrameDuration: number;
  _timers: {[id: string]: Timer};

  /**
   * Constructs a Timing Module with a React Native Context
   * The Context is used to trigger the registered timer callbacks on each frame
   */
  constructor(rnctx: ReactNativeContext) {
    super('Timing');
    this._timers = {};
    this._rnctx = rnctx;
    this._sendIdleEvents = false;
    // Ideal frame size, in milliseconds
    this._targetFrameDuration = 1000.0 / (rnctx.isLowLatency ? 90.0 : 60.0);
  }

  /**
   * Creates a new timer, and associates it with a specific callback.
   * @param callbackID - The callback triggered when this timer completes
   * @param duration - The time before the timer completes, in milliseconds
   * @param jsSchedulingTime - The baseline time to measure against
   * @param repeats - Whether the timer repeats, or runs once
   */
  createTimer(callbackID: number, duration: number, jsSchedulingTime: number, repeats: boolean) {
    const currentTimeMillis = Date.now();
    const currentDateNowTimeMillis = jsSchedulingTime + 1000 / 60;
    const adjustedDuration = Math.max(0.0, jsSchedulingTime - currentDateNowTimeMillis + duration);
    const initialTargetTime = currentTimeMillis + adjustedDuration;
    this._timers[String(callbackID)] = {
      callbackID: callbackID,
      duration: duration,
      jsSchedulingTime: initialTargetTime,
      repeats: repeats,
    };
  }

  /**
   * Removes the timer associated with a specific callback
   * @paramID - callbackID associated with React
   */
  deleteTimer(callbackID: number) {
    delete this._timers[String(callbackID)];
  }

  /**
   * Enable or disable the sending of idle events on each frame
   * When these are sent, they trigger requestIdleCallback callbacks on the
   * React side.
   * @param sendIdle - boolean flag to enable or disable sending idle events
   */
  setSendIdleEvents(sendIdle: boolean) {
    this._sendIdleEvents = sendIdle;
  }

  /**
   * Update all timers, triggering callbacks for timers that have completed,
   * and cleaning up those that are not repeating.
   */
  frame(frameStart: number) {
    const toRemove = [];
    const timers = [];
    const time = Date.now();
    for (const timer in this._timers) {
      const t = this._timers[timer];
      if (t.jsSchedulingTime <= time) {
        timers.push(this._timers[timer].callbackID);
        if (t.repeats) {
          t.jsSchedulingTime += t.duration;
        } else {
          toRemove.push(timer);
        }
      }
    }
    // timer information is distributed in a single message with mulitiple params
    // which minimizes the bridge traffic when many timers are used
    if (timers.length) {
      this._rnctx.callFunction('JSTimers', 'callTimers', [timers]);
    }

    for (const timer of toRemove) {
      delete this._timers[timer];
    }
  }

  /**
   * Check to see if there's enough time left in the frame execution to run
   * idle callbacks. If there is, trigger them across the bridge.
   * @param frameStart - A timestamp representing the start time of this frame,
   *   used to determine whether there is any idle time left
   */
  idle(frameStart: number) {
    if (!this._sendIdleEvents) {
      return;
    }
    const now = window.performance ? performance.now() : Date.now();
    const frameElapsed = now - frameStart;
    if (this._targetFrameDuration - frameElapsed >= IDLE_CALLBACK_THRESHOLD) {
      this._rnctx.callFunction('JSTimers', 'callIdleCallbacks', [
        Date.now() - frameElapsed,
      ]);
    }
  }
}
