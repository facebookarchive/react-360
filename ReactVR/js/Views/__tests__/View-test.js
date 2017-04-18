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
  setResizeMode: jest.fn(),
  setInset: jest.fn(),
  setInsetSize: jest.fn(),
  setTextureCrop: jest.fn(),
  setPointerEvents: jest.fn(),
  setHitSlop: jest.fn(),
  setBorderWidth: jest.fn(),
  setBorderRadius: jest.fn(),
}));

jest
  .dontMock('../View')
  .dontMock('../BaseView')
  .dontMock('../../Utils/merge')
  .dontMock('../../Utils/isPositive')
  .dontMock('../../Utils/Yoga.bundle')
  .mock(
    'ovrui',
    () => ({
      UIView: MockUIView,
    }),
    {virtual: true}
  )
  .mock('ovr-audio', () => ({}), {virtual: true})
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
      BufferGeometry: jest.fn(() => ({})),
      Vector3: jest.fn(() => ({})),
      Vector4: jest.fn(() => ({})),
      Matrix4: jest.fn(() => ({})),
      Ray: jest.fn(() => ({})),
      Sphere: jest.fn(() => ({})),
      DoubleSide: 'DoubleSide',
      TextureLoader: jest.fn(() => ({})),
      ClampToEdgeWrapping: 'ClampToEdgeWrapping',
      LinearFilter: 'LinearFilter',
    }),
    {virtual: true}
  );
const View = require('../View').default;

describe('RCTView', () => {
  it('can specify hitSlop', () => {
    const v = new View();
    v.props.hitSlop = 4;
    expect(v.view.setHitSlop.mock.calls[0]).toEqual([4, 4, 4, 4]);
    v.props.hitSlop = {
      left: 4,
      top: 3,
      right: 2,
      bottom: 1,
    };
    expect(v.view.setHitSlop.mock.calls[1]).toEqual([4, 3, 2, 1]);
  });

  it('dirties the border radius when set', () => {
    const v = new View();
    v.style.borderRadius = 5;
    expect(v._borderRadius).toBe(5);
    expect(v._borderRadiusDirty).toBe(true);

    v._borderRadiusDirty = false;
    v.style.borderTopLeftRadius = 0;
    expect(v._borderTopLeftRadius).toBe(0);
    expect(v._borderRadiusDirty).toBe(true);

    v._borderRadiusDirty = false;
    v.style.borderTopRightRadius = 1;
    expect(v._borderTopRightRadius).toBe(1);
    expect(v._borderRadiusDirty).toBe(true);

    v._borderRadiusDirty = false;
    v.style.borderBottomLeftRadius = 2;
    expect(v._borderBottomLeftRadius).toBe(2);
    expect(v._borderRadiusDirty).toBe(true);

    v._borderRadiusDirty = false;
    v.style.borderBottomRightRadius = 3;
    expect(v._borderBottomRightRadius).toBe(3);
    expect(v._borderRadiusDirty).toBe(true);
  });

  it('sets the border radius on the underlying view when presenting', () => {
    const v = new View();
    v.presentLayout();
    expect(v.view.setBorderRadius.mock.calls.length).toBe(0);
    v.style.borderRadius = 5;
    v.presentLayout();
    expect(v.view.setBorderRadius.mock.calls[0][0]).toEqual([5, 5, 5, 5]);
    v.style.borderTopLeftRadius = 2;
    v.presentLayout();
    expect(v.view.setBorderRadius.mock.calls[1][0]).toEqual([5, 2, 5, 5]);
    v.style.borderRadius = undefined;
    v.presentLayout();
    expect(v.view.setBorderRadius.mock.calls[2][0]).toEqual([0, 2, 0, 0]);
  });
});
