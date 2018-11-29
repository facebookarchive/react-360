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

export type MessageHandler = (message: Object) => mixed;

export default class Bridge {
  _messageHandler: ?MessageHandler;

  setMessageHandler(handler: MessageHandler) {
    this._messageHandler = handler;
    return this;
  }

  postMessage(msg: string | Object) {
    throw new Error(
      'Subclasses of Bridge should implement their own postMessage()',
    );
  }
}
