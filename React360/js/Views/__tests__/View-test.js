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
  setOpacity: jest.fn(),
  setBackgroundColor: jest.fn(),
  setBorderColor: jest.fn(),
}));

const MockYGNode = jest.fn(() => ({
  setPosition: jest.fn(),
  setMargin: jest.fn(),
  setPadding: jest.fn(),
  setBorder: jest.fn(),
  setPositionType: jest.fn(),
  setAlignContent: jest.fn(),
  setAlignItems: jest.fn(),
  setAlignSelf: jest.fn(),
  setFlexDirection: jest.fn(),
  setFlexWrap: jest.fn(),
  setJustifyContent: jest.fn(),
  setOverflow: jest.fn(),
  setDisplay: jest.fn(),
  setFlex: jest.fn(),
  setFlexBasis: jest.fn(),
  setFlexGrow: jest.fn(),
  setFlexShrink: jest.fn(),
  setWidth: jest.fn(),
  setHeight: jest.fn(),
  setMinWidth: jest.fn(),
  setMinHeight: jest.fn(),
  setMaxWidth: jest.fn(),
  setMaxHeight: jest.fn(),
  setAspectRatio: jest.fn(),
}));

jest
  .dontMock('../View')
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
const View = require('../View').default;
const Yoga = require('../../Utils/Yoga.bundle');

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

  it('handles default values', () => {
    const v = new View();
    v.YGNode = new MockYGNode();
    expect(v.view.setOpacity.mock.calls.length).toBe(0);
    v.style.opacity = null;
    v.style.backgroundColor = null;
    v.style.borderColor = null;
    v._left(null);
    v._top(null);
    v._right(null);
    v._bottom(null);
    v._margin(null);
    v._marginVertical(null);
    v._marginHorizontal(null);
    v._marginTop(null);
    v._marginBottom(null);
    v._marginLeft(null);
    v._marginRight(null);
    v._padding(null);
    v._paddingVertical(null);
    v._paddingHorizontal(null);
    v._paddingTop(null);
    v._paddingBottom(null);
    v._paddingLeft(null);
    v._paddingRight(null);
    v._borderWidth(null);
    v._borderTopWidth(null);
    v._borderRightWidth(null);
    v._borderBottomWidth(null);
    v._borderLeftWidth(null);
    v._position(null);
    v._alignContent(null);
    v._alignItems(null);
    v._alignSelf(null);
    v._flexDirection(null);
    v._flexWrap(null);
    v._justifyContent(null);
    v._overflow(null);
    v._display(null);
    v._flex(null);
    v._flexBasis(null);
    v._flexGrow(null);
    v._flexShrink(null);
    v._width(null);
    v._height(null);
    v._minWidth(null);
    v._minHeight(null);
    v._maxWidth(null);
    v._maxHeight(null);
    v._aspectRatio(null);

    expect(v.view.setOpacity.mock.calls.length).toBe(1);
    expect(v.view.setOpacity.mock.calls[0][0]).toEqual(1);
    expect(v.view.setBackgroundColor.mock.calls.length).toBe(1);
    expect(v.view.setBackgroundColor.mock.calls[0][0]).toEqual(0);
    expect(v.view.setBorderColor.mock.calls.length).toBe(1);
    expect(v.view.setBorderColor.mock.calls[0][0]).toEqual(0xff000000);

    expect(v.YGNode.setPosition.mock.calls.length).toBe(4);
    expect(v.YGNode.setPosition.mock.calls[0][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setPosition.mock.calls[1][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setPosition.mock.calls[2][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setPosition.mock.calls[3][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setMargin.mock.calls.length).toBe(7);
    expect(v.YGNode.setMargin.mock.calls[0][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setMargin.mock.calls[1][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setMargin.mock.calls[2][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setMargin.mock.calls[3][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setMargin.mock.calls[4][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setMargin.mock.calls[5][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setMargin.mock.calls[6][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setPadding.mock.calls.length).toBe(7);
    expect(v.YGNode.setPadding.mock.calls[0][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setPadding.mock.calls[1][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setPadding.mock.calls[2][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setPadding.mock.calls[3][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setPadding.mock.calls[4][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setPadding.mock.calls[5][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setPadding.mock.calls[6][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setBorder.mock.calls.length).toBe(5);
    expect(v.YGNode.setBorder.mock.calls[0][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setBorder.mock.calls[1][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setBorder.mock.calls[2][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setBorder.mock.calls[3][1]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setBorder.mock.calls[4][1]).toEqual(Yoga.UNDEFINED);

    expect(v.YGNode.setPositionType.mock.calls.length).toBe(1);
    expect(v.YGNode.setPositionType.mock.calls[0][0]).toEqual(
      Yoga.POSITION_TYPE_RELATIVE,
    );
    expect(v.YGNode.setAlignContent.mock.calls.length).toBe(1);
    expect(v.YGNode.setAlignContent.mock.calls[0][0]).toEqual(Yoga.ALIGN_AUTO);
    expect(v.YGNode.setAlignItems.mock.calls.length).toBe(1);
    expect(v.YGNode.setAlignItems.mock.calls[0][0]).toEqual(Yoga.ALIGN_AUTO);
    expect(v.YGNode.setAlignSelf.mock.calls.length).toBe(1);
    expect(v.YGNode.setAlignSelf.mock.calls[0][0]).toEqual(Yoga.ALIGN_AUTO);

    expect(v.YGNode.setFlex.mock.calls.length).toBe(1);
    expect(v.YGNode.setFlex.mock.calls[0][0]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setFlexBasis.mock.calls.length).toBe(1);
    expect(v.YGNode.setFlexBasis.mock.calls[0][0]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setFlexDirection.mock.calls.length).toBe(1);
    expect(v.YGNode.setFlexDirection.mock.calls[0][0]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setFlexWrap.mock.calls.length).toBe(1);
    expect(v.YGNode.setFlexWrap.mock.calls[0][0]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setFlexGrow.mock.calls.length).toBe(1);
    expect(v.YGNode.setFlexGrow.mock.calls[0][0]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setFlexShrink.mock.calls.length).toBe(1);
    expect(v.YGNode.setFlexShrink.mock.calls[0][0]).toEqual(Yoga.UNDEFINED);

    expect(v.YGNode.setJustifyContent.mock.calls.length).toBe(1);
    expect(v.YGNode.setJustifyContent.mock.calls[0][0]).toEqual(
      Yoga.JUSTIFY_FLEX_START,
    );
    expect(v.YGNode.setOverflow.mock.calls.length).toBe(1);
    expect(v.YGNode.setOverflow.mock.calls[0][0]).toEqual(
      Yoga.OVERFLOW_VISIBLE,
    );
    expect(v.YGNode.setDisplay.mock.calls.length).toBe(1);
    expect(v.YGNode.setDisplay.mock.calls[0][0]).toEqual(Yoga.DISPLAY_FLEX);
    expect(v.YGNode.setWidth.mock.calls.length).toBe(1);
    expect(v.YGNode.setWidth.mock.calls[0][0]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setHeight.mock.calls.length).toBe(1);
    expect(v.YGNode.setHeight.mock.calls[0][0]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setMinWidth.mock.calls.length).toBe(1);
    expect(v.YGNode.setMinWidth.mock.calls[0][0]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setMinHeight.mock.calls.length).toBe(1);
    expect(v.YGNode.setMinHeight.mock.calls[0][0]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setMaxWidth.mock.calls.length).toBe(1);
    expect(v.YGNode.setMaxWidth.mock.calls[0][0]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setMaxHeight.mock.calls.length).toBe(1);
    expect(v.YGNode.setMaxHeight.mock.calls[0][0]).toEqual(Yoga.UNDEFINED);
    expect(v.YGNode.setAspectRatio.mock.calls.length).toBe(1);
    expect(v.YGNode.setAspectRatio.mock.calls[0][0]).toEqual(Yoga.UNDEFINED);
  });
});
