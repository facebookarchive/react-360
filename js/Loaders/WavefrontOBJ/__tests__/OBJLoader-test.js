/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/* eslint-disable */

'use strict';

jest
  .dontMock('../OBJLoader')
  .dontMock('../../../Utils/RefCountCache')
  .mock('../OBJParser', () => ({
    readOBJFile: jest.fn(() => ({})),
  }))
  .mock('../../../Utils/fetchResource', () => {
    const deferred = new Deferred();
    const mock = jest.fn(() => deferred);
    mock.deferred = deferred;
    return mock;
  })
  .mock(
    'three',
    () => ({
      MeshBasicMaterial: jest.fn(),
      DoubleSide: 'DoubleSide',
      ClampToEdgeWrapping: 'ClampToEdgeWrapping',
      LinearFilter: 'LinearFilter',
    }),
    {virtual: true}
  );

const OBJLoader = require('../OBJLoader');

function Deferred() {
  this._promise = new Promise((res, rej) => {
    this.resolve = res;
    this.reject = rej;
  });
  this.then = (...args) => this._promise.then.apply(this._promise, args);
}

describe('OBJLoader', () => {
  it('only runs one fetch for parallel calls', () => {
    OBJLoader.fetchAndCacheOBJ('objpath');
    expect(require('../../../Utils/fetchResource').mock.calls).toEqual([['objpath']]);
    OBJLoader.fetchAndCacheOBJ('objpath');
    expect(require('../../../Utils/fetchResource').mock.calls).toEqual([['objpath']]);
  });

  it('uses cached results for object loading', done => {
    OBJLoader.fetchAndCacheOBJ('doubleload')
      .then(state1 => {
        OBJLoader.fetchAndCacheOBJ('doubleload')
          .then(state2 => {
            expect(state2).toBe(state1);
            done();
          })
          .catch(e => console.error(e));
      })
      .catch(e => console.error(e));
    const deferred = require('../../../Utils/fetchResource').deferred;
    deferred.resolve({text: () => Promise.resolve('OBJ DATA')});
  });

  it('will reject cache entry when all references have been removed', done => {
    const fetchResource = require('../../../Utils/fetchResource');
    fetchResource.mockClear();
    OBJLoader.fetchAndCacheOBJ('refmath')
      .then(state1 => {
        expect(fetchResource.mock.calls.length).toBe(1);
        OBJLoader.removeOBJReference('refmath');
        const secondLoad = OBJLoader.fetchAndCacheOBJ('refmath');
        expect(fetchResource.mock.calls.length).toBe(2);
        secondLoad
          .then(state2 => {
            expect(state2).not.toBe(state1);
            done();
          })
          .catch(e => console.error(e));
      })
      .catch(e => console.error(e));
    fetchResource.deferred.resolve({text: () => Promise.resolve('OBJ DATA')});
  });
});
