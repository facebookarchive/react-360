/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const MockUIView = jest.fn(() => ({
  setResizeMode: jest.fn(),
  setInset: jest.fn(),
  setInsetSize: jest.fn(),
  setTextureCrop: jest.fn(),
  setPointerEvents: jest.fn(),
  setHitSlop: jest.fn(),
  setBorderWidth: jest.fn(),
  setBorderRadius: jest.fn(),
  setImage: jest.fn(),
}));

jest
  .dontMock('../Image')
  .dontMock('../BaseView')
  .dontMock('../../Utils/merge')
  .dontMock('../../Utils/isPositive')
  .dontMock('../../Utils/Yoga.bundle')
  .mock('ovr-audio', () => ({}), {virtual: true})
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
      ClampToEdgeWrapping: 'ClampToEdgeWrapping',
      LinearFilter: 'LinearFilter',
    }),
    {virtual: true},
  );
const Image = require('../Image').default;

describe('RCTImage', () => {
  it('handles setting the source', () => {
    const i = new Image();
    i.tag = 3;
    const cf = jest.fn();
    i.UIManager = {
      _rnctx: {
        callFunction: cf,
      },
    };
    i.props.source = {uri: 'http://example.com/img.jpg'};
    expect(i.view.setImage.mock.calls[0][0]).toBe('http://example.com/img.jpg');
    expect(cf.mock.calls[0]).toEqual([
      'RCTEventEmitter',
      'receiveEvent',
      [3, 'topLoadStart', []],
    ]);
    i.view.setImage.mock.calls[0][1](true, 320, 240);
    expect(cf.mock.calls[1]).toEqual([
      'RCTEventEmitter',
      'receiveEvent',
      [
        3,
        'topLoad',
        {
          url: 'http://example.com/img.jpg',
          source: {uri: 'http://example.com/img.jpg'},
          width: 320,
          height: 240,
        },
      ],
    ]);
    expect(cf.mock.calls[2]).toEqual([
      'RCTEventEmitter',
      'receiveEvent',
      [3, 'topLoadEnd', []],
    ]);
  });

  it('initializes inset at creation time', () => {
    const i = new Image();
    expect(i.view.setInset.mock.calls[0][0]).toEqual([0, 0, 0, 0]);
    expect(i.view.setInsetSize.mock.calls[0][0]).toEqual([0, 0, 0, 0]);
  });

  it('can specify hitSlop', () => {
    const i = new Image();
    i.props.hitSlop = 4;
    expect(i.view.setHitSlop.mock.calls[0]).toEqual([4, 4, 4, 4]);
    i.props.hitSlop = {
      left: 4,
      top: 3,
      right: 2,
      bottom: 1,
    };
    expect(i.view.setHitSlop.mock.calls[1]).toEqual([4, 3, 2, 1]);
  });

  it('dirties the border radius when set', () => {
    const i = new Image();
    i.style.borderRadius = 5;
    expect(i._borderRadius).toBe(5);
    expect(i._borderRadiusDirty).toBe(true);

    i._borderRadiusDirty = false;
    i.style.borderTopLeftRadius = 0;
    expect(i._borderTopLeftRadius).toBe(0);
    expect(i._borderRadiusDirty).toBe(true);

    i._borderRadiusDirty = false;
    i.style.borderTopRightRadius = 1;
    expect(i._borderTopRightRadius).toBe(1);
    expect(i._borderRadiusDirty).toBe(true);

    i._borderRadiusDirty = false;
    i.style.borderBottomLeftRadius = 2;
    expect(i._borderBottomLeftRadius).toBe(2);
    expect(i._borderRadiusDirty).toBe(true);

    i._borderRadiusDirty = false;
    i.style.borderBottomRightRadius = 3;
    expect(i._borderBottomRightRadius).toBe(3);
    expect(i._borderRadiusDirty).toBe(true);
  });

  it('sets the border radius on the underlying view when presenting', () => {
    const i = new Image();
    i.presentLayout();
    expect(i.view.setBorderRadius.mock.calls.length).toBe(0);
    i.style.borderRadius = 5;
    i.presentLayout();
    expect(i.view.setBorderRadius.mock.calls[0][0]).toEqual([5, 5, 5, 5]);
    i.style.borderTopLeftRadius = 2;
    i.presentLayout();
    expect(i.view.setBorderRadius.mock.calls[1][0]).toEqual([5, 2, 5, 5]);
    i.style.borderRadius = undefined;
    i.presentLayout();
    expect(i.view.setBorderRadius.mock.calls[2][0]).toEqual([0, 2, 0, 0]);
  });
});
