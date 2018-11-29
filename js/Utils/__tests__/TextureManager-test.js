/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

jest.dontMock('../RefCountCache').dontMock('../TextureManager');

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

const MockTexture = function(source) {
  this.map = source;
  this._disposed = false;
};
MockTexture.prototype.dispose = function() {
  this._disposed = true;
};

jest.mock('three', () => {
  return {
    TextureLoader: MockTextureLoader,
    Texture: MockTexture,
  };
});

const TextureManager = require('../TextureManager').default;

describe('TextureManager', () => {
  beforeEach(() => {
    const keys = Object.keys(TextureLoads);
    keys.forEach(k => {
      delete TextureLoads[k];
    });
  });

  it('adds items to the reference counter when explicitly referenced', () => {
    const manager = new TextureManager();
    const path = 'http://example.net/img.jpg';
    expect(manager.isTextureReferenced(path)).toBe(false);
    manager.addReference(path);
    expect(manager.isTextureReferenced(path)).toBe(true);
  });

  it('does not add custom textures to the ref counter', () => {
    const manager = new TextureManager();
    const path = 'texture://abc123';
    expect(manager.isTextureReferenced(path)).toBe(false);
    manager.addReference(path);
    expect(manager.isTextureReferenced(path)).toBe(false);
  });

  it('moves items to the queue when they are no longer referenced', () => {
    const manager = new TextureManager();
    const path = 'http://example.net/img.jpg';
    manager.addReference(path);
    expect(manager.isTextureInEjectionQueue(path)).toBe(false);
    manager.removeReference(path);
    expect(manager.isTextureReferenced(path)).toBe(false);
    expect(manager.isTextureInEjectionQueue(path)).toBe(true);
  });

  it('promotes re-referenced items out of the queue', () => {
    const manager = new TextureManager();
    const path = 'http://example.net/img.jpg';
    manager.addReference(path);
    expect(manager.isTextureInEjectionQueue(path)).toBe(false);
    manager.removeReference(path);
    expect(manager.isTextureReferenced(path)).toBe(false);
    expect(manager.isTextureInEjectionQueue(path)).toBe(true);
    manager.addReference(path);
    expect(manager.isTextureReferenced(path)).toBe(true);
    expect(manager.isTextureInEjectionQueue(path)).toBe(false);

    const path2 = 'http://example.net/img2.jpg';
    const path3 = 'http://example.net/img3.jpg';
    manager.addReference(path2);
    manager.addReference(path3);
    // Set the queue order to be path2, path, path3
    manager.removeReference(path2);
    manager.removeReference(path);
    manager.removeReference(path3);
    expect(manager.isTextureReferenced(path)).toBe(false);
    expect(manager.isTextureInEjectionQueue(path)).toBe(true);
    expect(manager.isTextureReferenced(path2)).toBe(false);
    expect(manager.isTextureInEjectionQueue(path2)).toBe(true);
    expect(manager.isTextureReferenced(path3)).toBe(false);
    expect(manager.isTextureInEjectionQueue(path3)).toBe(true);
    // promote path from the middle of the queue
    manager.addReference(path);
    expect(manager.isTextureReferenced(path)).toBe(true);
    expect(manager.isTextureInEjectionQueue(path)).toBe(false);
    expect(manager.isTextureReferenced(path2)).toBe(false);
    expect(manager.isTextureInEjectionQueue(path2)).toBe(true);
    expect(manager.isTextureReferenced(path3)).toBe(false);
    expect(manager.isTextureInEjectionQueue(path3)).toBe(true);
  });

  it('caches loaded textures', done => {
    const manager = new TextureManager();
    const path = 'http://example.net/img.jpg';
    manager
      .getTextureForURL(path)
      .then(t => {
        expect(manager.isTextureCached(path)).toBe(true);
        expect(manager.isTextureLoading(path)).toBe(false);
        expect(manager.isTextureReferenced(path)).toBe(false);
        done();
      })
      .catch(err => console.error(err));

    expect(manager.isTextureCached(path)).toBe(false);
    expect(manager.isTextureLoading(path)).toBe(true);
    TextureLoads[path].onLoad(new MockTexture(path));
  });

  it('uses a single request for parallel requests', () => {
    const manager = new TextureManager();
    const path = 'http://example.net/img.jpg';
    const firstLoad = manager.getTextureForURL(path);
    expect(manager.isTextureLoading(path)).toBe(true);
    const secondLoad = manager.getTextureForURL(path);
    expect(manager.isTextureLoading(path)).toBe(true);
    expect(firstLoad).toBe(secondLoad);
  });

  it('disposes textures when they are pushed off of the queue', done => {
    const manager = new TextureManager(5); // Queue size of 5
    const path = 'http://example.net/img.jpg';
    manager
      .getTextureForURL(path)
      .then(t => {
        manager.addReference(path);
        manager.removeReference(path);
        expect(manager.isTextureCached(path)).toBe(true);
        expect(manager.isTextureInEjectionQueue(path)).toBe(true);
        for (let i = 0; i < 5; i++) {
          const p = `http://example.net/img_${i}.jpg`;
          manager.addReference(p);
          manager.removeReference(p);
          expect(manager.isTextureInEjectionQueue(p)).toBe(true);
        }
        // path should have been kicked off the queue and disposed
        expect(manager.isTextureCached(path)).toBe(false);
        expect(manager.isTextureInEjectionQueue(path)).toBe(false);
        expect(t._disposed).toBe(true);
        done();
      })
      .catch(err => console.error(err));

    expect(manager.isTextureCached(path)).toBe(false);
    expect(manager.isTextureLoading(path)).toBe(true);
    TextureLoads[path].onLoad(new MockTexture(path));
  });

  it('can register local sources', () => {
    const manager = new TextureManager();
    const source = document.createElement('canvas');
    manager.registerLocalTextureSource('mytex', source);
    expect(manager.isTextureCached('texture://mytex')).toBe(true);
    expect(manager.isTextureReferenced('texture://mytex')).toBe(false);
  });

  it('resolves requests that occur before a local source is registered', done => {
    const manager = new TextureManager();
    const source = document.createElement('canvas');
    const path = 'texture://latetexture';
    manager
      .getTextureForURL(path)
      .then(t => {
        expect(t.needsUpdate).toBe(true);
        expect(t.map).toBe(source);
        expect(manager.isTextureCached(path)).toBe(true);
        expect(manager.isTextureLoading(path)).toBe(false);
        done();
      })
      .catch(err => console.error(err));
    expect(manager.isTextureCached(path)).toBe(false);
    expect(manager.isTextureLoading(path)).toBe(true);
    manager.registerLocalTextureSource('latetexture', source);
  });

  it('updates textures on each frame when specified', done => {
    const manager = new TextureManager();
    const source = document.createElement('canvas');
    const path = 'texture://updatetexture';
    manager
      .getTextureForURL(path)
      .then(t => {
        expect(t.needsUpdate).toBe(true);
        t.needsUpdate = false;
        manager.frame();
        expect(t.needsUpdate).toBe(true);
        done();
      })
      .catch(err => console.error(err));
    expect(manager.isTextureCached(path)).toBe(false);
    expect(manager.isTextureLoading(path)).toBe(true);
    manager.registerLocalTextureSource('updatetexture', source, {updateOnFrame: true});
  });
});
