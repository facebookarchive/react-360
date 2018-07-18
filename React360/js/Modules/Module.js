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

export type ModuleDescription = [
  string,
  {
    [const: string]: any,
  },
  Array<string>,
  Array<number>,
  Array<number>,
];

/**
 * Modules are platform-specific implementations of functionality that can
 * be asynchronously called across the bridge.
 * This class serves as a base for all Modules, and provides the _describe
 * method used to extract attributes and send them to the web worker.
 * This React and runtime handshake can only be done once
 * The type and first character of the name of the attribute is used to
 * determine how the attribute is reflected
 *
 * - '_' denotes a hidden attribute and should not be reflected
 * - '$' is a function which is async in react code, for the runtime the fucntion
 *   take two automatic callback ids, success and reject, one of which must be called
 * - any other functions are added in the functionmap with a corresponding ID used by React code
 * - all other attributes are determined to be constants
 *
 * @class Module
 */

export default class Module {
  name: string;
  __functionMap: Array<() => any>;

  /**
   * Constructs a Module with a map of unique identifiers to its publicly
   * accessible member functions.
   * Take the unique name of the module as its only argument. This name will
   * be used to call the module across the bridge.
   */
  constructor(name: string) {
    if (name.startsWith('RCT')) {
      name = name.substr(3);
    }
    this.name = name;
    this.__functionMap = [];
  }

  /**
   * Return the human-friendly name of this module
   */
  getName(): string {
    return this.name;
  }

  /**
   * Extract the prototype methods that can be called across the bridge, as well
   * as any instance variables.
   * Returns an array containing the module name, as well as information on
   * the methods and constants it exports, according to the format expected by
   * the bridge.
   * Note: If the prototype of the method is changed, this function is not
   * guaranteed to be idempotent. Since this function is not manually called,
   * this should not be a problem, but it may be a candidate for restructuring
   * in the future.
   */
  __describe(): ModuleDescription {
    const constants = {};
    const functions = [];
    const promiseFunctions = [];
    const syncFunctions = []; // Not currently supported

    let methodID = 0;
    // Record prototype methods
    const proto: any = Object.getPrototypeOf(this);
    const protoMembers = Object.getOwnPropertyNames(proto);
    for (const attr of protoMembers) {
      const member = proto[attr];
      // Skip any "private" entries prefixed with an underscore
      if (attr[0] === '_' || attr === 'constructor' || typeof member !== 'function') {
        continue;
      }
      let name = attr;

      // by default functions are denoted as remote
      // by prepending a $ onto the name the function is denoted as a special,
      // async function that uses Promises
      // the $ is removed from the name before registering with the react code
      if (name[0] === '$') {
        name = name.substring(1);
        promiseFunctions.push(methodID);
      }

      // record the mapping from ID used by React to the real function
      this.__functionMap[methodID] = member;
      functions.push(name);
      methodID++;
    }

    // Record local properties
    for (const attr in this) {
      const member = (this: any)[attr];
      if (attr[0] === '_' || typeof member === 'function') {
        continue;
      }
      if (attr[0] === '$' && attr.indexOf('_') > -1) {
        // Handle custom babel transform where private methods are renamed to:
        //   $ClassName_methodName
        // We only do the check on constants to avoid conflicting with promise-
        // returning methods that also start with $
        continue;
      }
      constants[attr] = member;
    }

    return [this.name, constants, functions, promiseFunctions, syncFunctions];
  }
}
