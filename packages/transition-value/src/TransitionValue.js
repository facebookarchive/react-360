/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow strict
 */

import type Transition from './Transition';

function interpolateNumber(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

export default class TransitionValue {
  _currentValue: number;
  _finalValue: number;
  _transition: Transition;
  _transitionStart: number;

  constructor(transition: Transition, initialValue: number) {
    this._currentValue = initialValue;
    this._finalValue = initialValue;
    this._transition = transition || null;
    this._transitionStart = 0;
  }

  isActive(): boolean {
    return this._transitionStart > 0;
  }

  isComplete(): boolean {
    if (this._transitionStart === 0) {
      return true;
    }
    const totalTime = this._transition.getDelay() + this._transition.getDuration();
    return totalTime < Date.now() - this._transitionStart;
  }

  cancelTransition() {
    this._transitionStart = 0;
  }

  getTransition(): Transition {
    return this._transition;
  }

  setTransition(t: Transition) {
    this._transition = t;
    this._transitionStart = 0;
  }

  setValue(value: number) {
    this._currentValue = this.getValue();
    this._finalValue = value;
    this._transitionStart = Date.now();
  }

  setImmediateValue(value: number) {
    this._currentValue = value;
    this._finalValue = value;
    this._transitionStart = 0;
  }

  getValue(): number {
    if (!this.isActive()) {
      return this._finalValue;
    }
    if (this.isComplete()) {
      this._transitionStart = 0;
      return this._finalValue;
    }
    const delta = Date.now() - this._transitionStart;
    const intervalValue = this._transition.getValueAtTime(delta);
    const start = this._currentValue;
    const end = this._finalValue;
    return interpolateNumber(start, end, intervalValue);
  }
}
