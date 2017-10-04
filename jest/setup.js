/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

const mockComponent = require.requireActual('react-native/jest/mockComponent');

global.__DEV__ = true;

jest
  .mock('AmbientLight', () => mockComponent('AmbientLight'))
  .mock('Box', () => mockComponent('Box'))
  .mock('Cylinder', () => mockComponent('Cylinder'))
  .mock('CylindricalPanel', () => mockComponent('CylindricalPanel'))
  .mock('DirectionalLight', () => mockComponent('DirectionalLight'))
  .mock('Model', () => mockComponent('Model'))
  .mock('Pano', () => mockComponent('Pano'))
  .mock('Plane', () => mockComponent('Plane'))
  .mock('PointLight', () => mockComponent('PointLight'))
  .mock('Scene', () => mockComponent('Scene'))
  .mock('Sound', () => mockComponent('Sound'))
  .mock('Sphere', () => mockComponent('Sphere'))
  .mock('SpotLight', () => mockComponent('SpotLight'))
  .mock('Video', () => mockComponent('Video'));

const mockNativeModules = {
  AudioModule: {
    addHandle: jest.fn(),
    setUrl: jest.fn(),
    load: jest.fn(),
    play: jest.fn(),
    pause: jest.fn(),
    stop: jest.fn(),
  },
  AsyncLocalStorage: {
    multiGet: jest.fn((keys, callback) => process.nextTick(() => callback(null, []))),
    multiSet: jest.fn((entries, callback) => process.nextTick(() => callback(null))),
    multiRemove: jest.fn((keys, callback) => process.nextTick(() => callback(null))),
    multiMerge: jest.fn((entries, callback) => process.nextTick(() => callback(null))),
    clear: jest.fn(callback => process.nextTick(() => callback(null))),
    getAllKeys: jest.fn(callback => process.nextTick(() => callback(null, []))),
  },
  BlobModule: {
    BLOB_URI_SCHEME: 'content',
    BLOB_URI_HOST: null,
    enableBlobSupport: jest.fn(),
    disableBlobSupport: jest.fn(),
    createFromParts: jest.fn(),
    sendBlob: jest.fn(),
    release: jest.fn(),
  },
  ExternalAssets: {
    assetRoot: './',
  },
  History: {
    length: jest.fn(),
    state: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    pushState: jest.fn(),
    replaceState: jest.fn(),
  },
  LinkingManager: {
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn(),
  },
  Location: {
    reload: jest.fn(),
    replace: jest.fn(),
  },
  Timing: {
    createTimer: jest.fn(),
    deleteTimer: jest.fn(),
  },
  UIManager: {
    blur: jest.fn(),
    createView: jest.fn(),
    dispatchViewManagerCommand: jest.fn(),
    focus: jest.fn(),
    setChildren: jest.fn(),
    manageChildren: jest.fn(),
    updateView: jest.fn(),
    removeSubviewsFromContainerWithID: jest.fn(),
    replaceExistingNonRootView: jest.fn(),
    customBubblingEventTypes: {},
    customDirectEventTypes: {},
  },
  VideoModule: {
    addHandle: jest.fn(),
    setUrl: jest.fn(),
    getVideoTexture: jest.fn(),
    load: jest.fn(),
    play: jest.fn(),
    pause: jest.fn(),
    muted: jest.fn(),
    unload: jest.fn(),
    frame: jest.fn(),
  },
};

Object.keys(mockNativeModules).forEach(module => {
  jest.doMock(module, () => mockNativeModules[module], {virtual: true});
});

jest.doMock('NativeModules', () => mockNativeModules);
