/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

const MockUIView = jest.fn(() => ({
  add: jest.fn(),
  remove: jest.fn(),
}));

const MockPointLight = function() {
  this.intensity = 0.5;
  this.castShadow = false;
  this.receiveShadow = false;
  this.shadow = {
    mapSize: {
      width: 512,
      height: 512,
    },
    camera: {
      near: 0.5,
      far: 500,
    },
  };
};

jest
  .dontMock('../BaseLight')
  .dontMock('../BaseView')
  .mock(
    'ovrui',
    () => ({
      UIView: MockUIView,
    }),
    {virtual: true}
  )
  .mock(
    'three',
    () => ({
      Group: jest.fn(),
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
      DoubleSide: 'DoubleSide',
      TextureLoader: jest.fn(() => ({})),
      PointLight: MockPointLight,
      ClampToEdgeWrapping: 'ClampToEdgeWrapping',
      LinearFilter: 'LinearFilter',
    }),
    {virtual: true}
  )
  .dontMock('../../Utils/Yoga.bundle');

const BaseLight = require('../BaseLight').default;

describe('RCTBaseLight', () => {
  it('sets light intensity', () => {
    const intensity = 0.8;
    const bl = new BaseLight();
    bl.light = new MockPointLight();
    bl.props.intensity = intensity;

    expect(bl.light.intensity).toBe(intensity);
  });

  it('sets cast and receive shadow option', () => {
    const bl = new BaseLight();
    bl.light = new MockPointLight();
    bl.props.shadow = {
      cast: true,
      receive: true,
    };

    expect(bl.light.castShadow).toBe(true);
    expect(bl.light.receiveShadow).toBe(true);
  });

  it('removes shadow when it is not defined', () => {
    const bl = new BaseLight();
    bl.light = new MockPointLight();
    bl.props.shadow = {
      cast: true,
      receive: true,
    };

    expect(bl.light.castShadow).toBe(true);
    expect(bl.light.receiveShadow).toBe(true);

    bl.props.shadow = null;

    expect(bl.light.castShadow).toBe(false);
    expect(bl.light.receiveShadow).toBe(false);
  });

  it('sets shadow advances options', () => {
    const bl = new BaseLight();
    bl.light = new MockPointLight();
    bl.props.shadow = {
      cast: true,
      mapSize: {
        width: 1024,
        height: 1024,
      },
      camera: {
        near: 0.7,
      },
    };

    expect(bl.light.shadow.mapSize.width).toBe(1024);
    expect(bl.light.shadow.camera.near).toBe(0.7);
    expect(bl.light.shadow.camera.far).toBe(500);
  });
});
