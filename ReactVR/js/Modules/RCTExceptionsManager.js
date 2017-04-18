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

type Stack = Array<{
  file?: string,
  methodName?: string,
  lineNumber?: string,
  column?: string,
}>;

/**
 * Module to handle reporting of exceptions so that they are displayed in a useful manner
 * The stack is reordered so that the bottom of the console contains the top of the stack and therefore minimizes
 * scrolling
 * @class RCTExceptionsManager
 * @extends Module
 */
export default class RCTExceptionsManager extends Module {
  hadFatal: void | number;

  constructor() {
    super('RCTExceptionsManager');
    this.hadFatal = undefined;
  }

  displayStackAndMessage(stack: Stack, message: string) {
    let output = '\n';
    if (
      message.indexOf('has not been registered') === -1 ||
      message.indexOf('AppRegistry.registerComponent') === -1
    ) {
      output += '-----\n';
      for (let i = 0; i < stack.length; i++) {
        const file = stack[i].file || '[unknown]';
        const methodName = stack[i].methodName || '[unknown]';
        const lineNumber = stack[i].lineNumber || 0;
        const column = stack[i].column || 0;
        output += '> ' + methodName + '@' + file + ' ' + lineNumber + ':' + column + '\n';
      }
      output += '-----\n';
    }
    output += message || '';
    console.error(output);
  }

  reportSoftException(message: string, stack: Stack, exceptionId: number) {
    // only report a single fatal
    if (this.hadFatal) {
      return;
    }
    const reverseStack = stack.slice();
    reverseStack.reverse();
    this.displayStackAndMessage(reverseStack, message);
  }

  reportFatalException(message: string, stack: Stack, exceptionId: number) {
    // only report a single fatal
    if (this.hadFatal) {
      return;
    }
    const reverseStack = stack.slice();
    reverseStack.reverse();
    this.displayStackAndMessage(reverseStack, message);
    this.hadFatal = exceptionId;
  }

  updateExceptionMessage(message: string, stack: Stack, exceptionId: number) {
    // if we have had a fatal exception only update that exception
    if (this.hadFatal && this.hadFatal !== exceptionId) {
      return;
    }
    const reverseStack = stack.slice();
    reverseStack.reverse();
    // attempt to prepend to file:/// so that we can directly click to the problem file within browser
    for (let i = 0; i < reverseStack.length; i++) {
      if (reverseStack[i].file && reverseStack[i].file.indexOf(':') <= 2) {
        reverseStack[i].file = 'file:///' + reverseStack[i].file;
      }
    }
    this.displayStackAndMessage(reverseStack, message);
  }

  reportUnhandledException(message: string, stack: Stack) {
    // only report a single fatal
    if (this.hadFatal) {
      return;
    }
    const reverseStack = stack.slice();
    reverseStack.reverse();
    this.displayStackAndMessage(reverseStack, message);
  }
}
