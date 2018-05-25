/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const MockUIView = jest.fn(() => ({
  add: jest.fn(),
  remove: jest.fn(),
}));

const loadTexMock = jest.fn();
const MockTextureLoader = jest.fn(() => ({
  load: loadTexMock,
}));

const loadOBJMock = jest.fn(() => Promise.resolve({objects: []}));
const loadMTLMock = jest.fn(() => Promise.resolve({}));
const removeOBJReferenceMock = jest.fn();
const removeMTLReferenceMock = jest.fn();

jest
  .dontMock('../Model')
  .dontMock('../BaseView')
  .dontMock('../BaseMesh')
  .dontMock('../../Utils/extractURL')
  .dontMock('../../Utils/Yoga.bundle')
  .dontMock('../../Loaders/ModelLoaderRegistry')
  .dontMock('../../Loaders/ObjModelLoader')
  .mock('../../Loaders/WavefrontOBJ/OBJLoader', () => ({
    fetchAndCacheOBJ: loadOBJMock,
    removeOBJReference: removeOBJReferenceMock,
  }))
  .mock('../../Loaders/WavefrontOBJ/MTLLoader', () => ({
    fetchAndCacheMTL: loadMTLMock,
    removeMTLReference: removeMTLReferenceMock,
  }))
  .mock('../../OVRUI/UIView/UIView', () => MockUIView)
  .mock(
    'three',
    () => ({
      Group: jest.fn(),
      MeshBasicMaterial: jest.fn(() => {
        return {dispose() {}};
      }),
      MeshPhongMaterial: jest.fn(() => {
        return {dispose() {}};
      }),
      ShaderMaterial: jest.fn(() => {
        return {dispose() {}};
      }),
      BufferGeometry: jest.fn(() => ({})),
      Vector3: jest.fn(() => ({})),
      Vector4: jest.fn(() => ({})),
      Matrix4: jest.fn(() => ({})),
      Ray: jest.fn(() => ({})),
      Sphere: jest.fn(() => ({})),
      DoubleSide: 'DoubleSide',
      TextureLoader: MockTextureLoader,
      ClampToEdgeWrapping: 'ClampToEdgeWrapping',
      LinearFilter: 'LinearFilter',
      Object3D: jest.fn(() => ({})),
      Color: jest.fn(() => ({})),
    }),
    {virtual: true},
  );

const Model = require('../Model').default;

describe('RCTModel', () => {
  it('loads the object upon setting the obj property', done => {
    const m = new Model();
    m.props.source = {obj: {uri: 'mesh.obj'}};
    // Wait for the loader
    setTimeout(() => {
      try {
        expect(loadOBJMock.mock.calls[0]).toEqual(['mesh.obj']);
        done();
      } catch (err) {
        done.fail(err);
      }
    }, 1);
  });

  it('removes any references when disposed', done => {
    const m = new Model();
    m.props.source = {
      obj: {uri: 'mesh.obj'},
      mtl: {uri: 'mesh.mtl'},
    };
    // Wait for the loader
    setTimeout(() => {
      try {
        m.dispose();
        expect(removeOBJReferenceMock.mock.calls[0]).toEqual(['mesh.obj']);
        expect(removeMTLReferenceMock.mock.calls[0]).toEqual(['mesh.mtl']);
        done();
      } catch (err) {
        done.fail(err);
      }
    }, 1);
  });
});
