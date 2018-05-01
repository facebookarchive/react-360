/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const TextureLoads = {};

const MockTextureLoader = function() {};
MockTextureLoader.prototype.load = function(url, onLoad, onProgress, onError) {
  TextureLoads[url] = {
    onLoad,
    onProgress,
    onError,
  };
};
MockTextureLoader.prototype.setCrossOrigin = function() {};

const MockVector2 = function(x, y) {
  this.x = x;
  this.y = y;
};
MockVector2.prototype.set = function(x, y) {
  this.x = x;
  this.y = y;
};

const MockTexture = function(source) {
  this.map = source;
  this._disposed = false;
  this.repeat = new MockVector2(1, 1);
};
MockTexture.prototype.dispose = function() {
  this._disposed = true;
};
MockTexture.prototype.clone = function() {
  return new MockTexture(this.map);
};

jest.mock('three', () => {
  return {
    TextureLoader: MockTextureLoader,
    Texture: MockTexture,
    ShaderMaterial: jest.fn(() => {
      return {dispose() {}};
    }),
    MeshBasicMaterial: jest.fn(() => {
      return {dispose() {}};
    }),
    MeshPhongMaterial: jest.fn(() => {
      return {dispose() {}};
    }),
    BufferGeometry: jest.fn(() => ({})),
    Vector3: jest.fn(() => ({})),
    Vector4: jest.fn(() => ({})),
    Matrix4: jest.fn(() => ({})),
    Ray: jest.fn(() => ({})),
    Sphere: jest.fn(() => ({})),
    RepeatWrapping: 1000,
  };
});

jest
  .dontMock('../BaseMesh')
  .dontMock('../BaseView')
  .dontMock('../../Utils/extractURL')
  .dontMock('../../Utils/RefCountCache')
  .dontMock('../../Utils/TextureManager');

const BaseMesh = require('../BaseMesh').default;
const TextureManager = require('../../Utils/TextureManager').default;

describe('RCTBaseMesh', () => {
  beforeEach(() => {
    const keys = Object.keys(TextureLoads);
    keys.forEach(k => {
      delete TextureLoads[k];
    });
  });

  it('loads a texture', done => {
    const manager = new TextureManager();
    const mesh = new BaseMesh({}, {TextureManager: manager});
    const path = 'http://example.net/img.png';
    mesh.props.texture = {uri: path};
    expect(mesh._loadingURL).toBe(path);
    expect(mesh._textureURL).toBe(null);
    expect(manager.isTextureReferenced(path)).toBe(true);
    expect(manager.isTextureLoading(path)).toBe(true);
    expect(manager.isTextureCached(path)).toBe(false);
    expect(TextureLoads[path]).toBeTruthy();
    const tex = new MockTexture();
    TextureLoads[path].onLoad(tex);
    Promise.resolve()
      .then(() => {
        expect(mesh._loadingURL).toBe(null);
        expect(mesh._textureURL).toBe(path);
        expect(manager.isTextureLoading(path)).toBe(false);
        expect(manager.isTextureCached(path)).toBe(true);
      })
      .then(() => {
        done();
      });
  });

  it('sets texture repeat mode', done => {
    const repeatWrappingMock = 1000;
    const repeatX = 4;
    const repeatY = 4;
    const manager = new TextureManager();
    const mesh = new BaseMesh({}, {TextureManager: manager});
    const path = 'http://example.net/img.png';
    mesh.props.texture = {uri: path, repeat: [repeatX, repeatY]};
    const tex = new MockTexture();
    TextureLoads[path].onLoad(tex);
    Promise.resolve()
      .then(() => {
        expect(mesh._texture.wrapS).toBe(repeatWrappingMock);
        expect(mesh._texture.wrapT).toBe(repeatWrappingMock);
        expect(mesh._texture.repeat.x).toBe(repeatX);
        expect(mesh._texture.repeat.y).toBe(repeatY);
      })
      .then(() => {
        done();
      });
  });

  it('releases a texture when the source is removed', done => {
    const manager = new TextureManager();
    const mesh = new BaseMesh({}, {TextureManager: manager});
    const path = 'http://example.net/img.png';
    mesh.props.texture = {uri: path};
    expect(mesh._loadingURL).toBe(path);
    expect(mesh._textureURL).toBe(null);
    expect(manager.isTextureReferenced(path)).toBe(true);
    expect(manager.isTextureLoading(path)).toBe(true);
    expect(manager.isTextureCached(path)).toBe(false);
    expect(TextureLoads[path]).toBeTruthy();
    const tex = new MockTexture();
    TextureLoads[path].onLoad(tex);
    Promise.resolve()
      .then(() => {
        expect(mesh._loadingURL).toBe(null);
        expect(mesh._textureURL).toBe(path);
        expect(manager.isTextureLoading(path)).toBe(false);
        expect(manager.isTextureCached(path)).toBe(true);
        mesh.props.texture = null;
        expect(mesh._texture).toBe(null);
        expect(mesh._textureURL).toBe(null);
        expect(mesh._loadingURL).toBe(null);
        expect(manager.isTextureReferenced(path)).toBe(false);
      })
      .then(() => {
        done();
      });
  });

  it('releases a texture when the source is changed', done => {
    const manager = new TextureManager();
    const mesh = new BaseMesh({}, {TextureManager: manager});
    const path = 'http://example.net/img.png';
    const path2 = 'http://example.net/img2.png';
    mesh.props.texture = {uri: path};
    expect(mesh._loadingURL).toBe(path);
    expect(mesh._textureURL).toBe(null);
    expect(manager.isTextureReferenced(path)).toBe(true);
    expect(manager.isTextureLoading(path)).toBe(true);
    expect(manager.isTextureCached(path)).toBe(false);
    expect(TextureLoads[path]).toBeTruthy();
    const tex = new MockTexture();
    const tex2 = new MockTexture();
    TextureLoads[path].onLoad(tex);
    Promise.resolve()
      .then(() => {
        expect(mesh._loadingURL).toBe(null);
        expect(mesh._textureURL).toBe(path);
        expect(manager.isTextureLoading(path)).toBe(false);
        expect(manager.isTextureCached(path)).toBe(true);
        mesh.props.texture = {uri: path2};
        expect(mesh._textureURL).toBe(path);
        expect(mesh._loadingURL).toBe(path2);
        expect(manager.isTextureReferenced(path)).toBe(true);
        expect(manager.isTextureReferenced(path2)).toBe(true);
        TextureLoads[path2].onLoad(tex2);
      })
      .then(() => {
        expect(manager.isTextureReferenced(path)).toBe(false);
        expect(manager.isTextureReferenced(path2)).toBe(true);
        expect(mesh._textureURL).toBe(path2);
        expect(mesh._loadingURL).toBe(null);
      })
      .then(() => {
        done();
      });
  });

  it('releases a texture when the source is changed before loading completes', done => {
    const manager = new TextureManager();
    const mesh = new BaseMesh({}, {TextureManager: manager});
    const path = 'http://example.net/img.png';
    const path2 = 'http://example.net/img2.png';
    mesh.props.texture = {uri: path};
    expect(mesh._loadingURL).toBe(path);
    expect(mesh._textureURL).toBe(null);
    expect(manager.isTextureReferenced(path)).toBe(true);
    expect(manager.isTextureLoading(path)).toBe(true);
    expect(manager.isTextureCached(path)).toBe(false);
    expect(TextureLoads[path]).toBeTruthy();
    const tex = new MockTexture();
    const tex2 = new MockTexture();
    mesh.props.texture = {uri: path2};
    TextureLoads[path2].onLoad(tex2);
    TextureLoads[path].onLoad(tex);
    Promise.resolve()
      .then(() => {
        expect(mesh._loadingURL).toBe(null);
        expect(mesh._textureURL).toBe(path2);
        expect(manager.isTextureReferenced(path2)).toBe(true);
        expect(manager.isTextureReferenced(path)).toBe(false);
        expect(manager.isTextureCached(path)).toBe(true);
        expect(manager.isTextureCached(path2)).toBe(true);
        expect(manager.isTextureInEjectionQueue(path)).toBe(true);
      })
      .then(() => {
        done();
      });
  });
});
