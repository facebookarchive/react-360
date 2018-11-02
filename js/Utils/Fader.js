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

export type FadeEndState = 'finished' | 'interrupted';

export type onFadeEndCallback = (state: FadeEndState) => void;

export type FadeJob = {
  targetLevel: number,
  duration: number, // duration of the fade in ms
  onFadeEnd?: onFadeEndCallback,
};

const MAX_DELTA = 1; // as FadeLevel is in [0, 1] range

function clampFade(value: number): number {
  return Math.max(0, Math.min(1, value));
}

/**
 * RefCountCache is a basic cache that stores entries as long as there is an
 * external reference to them. When no objects remain referencing the cached
 * value, the entry is ejected.
 */
export default class Fader {
  _currentFadeLevel: number;
  _targetFadeLevel: number;
  _delta: number;
  _onFadeEnd: ?onFadeEndCallback;
  _jobs: Array<FadeJob>;

  constructor(initialFadeLevel: number = 1) {
    const fadeLevel = clampFade(initialFadeLevel);
    this._currentFadeLevel = fadeLevel;
    this._targetFadeLevel = fadeLevel;
    this._delta = 0;
    this._jobs = [];
  }

  _startFadeJob(job: FadeJob) {
    const newFade = clampFade(job.targetLevel);
    if (newFade == this._currentFadeLevel) {
      job.onFadeEnd && job.onFadeEnd('finished');
      return;
    }
    this._delta = job.duration > 0 ? 
      (newFade - this._currentFadeLevel) / job.duration : MAX_DELTA;
    this._targetFadeLevel = newFade;
    this._onFadeEnd = job.onFadeEnd;
  }

  getCurrentLevel(): number {
    return this._currentFadeLevel;
  }

  fadeImmediate(job: FadeJob) {
    // clean up pending fade jobs
    for (const job of this._jobs) {
      job.onFadeEnd && job.onFadeEnd('interrupted');
    }
    this._onFadeEnd && this._onFadeEnd('interrupted');
    
    this._jobs = [];
    this._startFadeJob(job);
  }

  queueFade(job: FadeJob) {
    if (this._delta === 0 && this._jobs.length === 0) {
      this._startFadeJob(job);
    } else {
      this._jobs.push(job);
    }
  }

  fadeFrame(deltaMs: number): boolean {
    if (this._delta === 0) {
      return false;
    }

    const step = this._delta * deltaMs;
    let newFadeLevel = this._currentFadeLevel + step;
    if ((step > 0 && newFadeLevel > this._targetFadeLevel)
      || (step < 0 && newFadeLevel < this._targetFadeLevel)) {
      newFadeLevel = this._targetFadeLevel;
    }
    this._currentFadeLevel = newFadeLevel;
    if (this._currentFadeLevel === this._targetFadeLevel) {
      this._delta = 0;
      this._onFadeEnd && this._onFadeEnd('finished');
      while (this._jobs.length > 0 && this._delta === 0) {
        this._startFadeJob(this._jobs.shift());
      }
    }

    return true;
  }
}
