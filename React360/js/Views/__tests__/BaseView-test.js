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

jest
  .dontMock('../BaseView')
  .dontMock('../../Renderer/FlexboxImplementation')
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
      Object3D: jest.fn(() => ({})),
      Color: jest.fn(() => ({})),
      Texture: jest.fn(() => ({})),
    }),
    {virtual: true},
  )
  .dontMock('../../Utils/Yoga.bundle');

const BaseView = require('../BaseView').default;
const Yoga = require('../../Utils/Yoga.bundle');

describe('RCTBaseView', () => {
  it('establishes a setter for renderGroup', () => {
    const bv = new BaseView();
    bv.view = {};
    bv.style.renderGroup = 2;
    expect(bv.view.renderGroup).toBe(2);
  });

  it('establishes setters for interaction events', () => {
    const bv = new BaseView();
    bv.view = {
      setIsMouseInteractable: jest.fn(),
      setIsInteractable: jest.fn(),
      forceRaycastTest: jest.fn(),
      setBorderWidth: jest.fn(),
    };
    const fn = () => {};
    bv.props.onInput = fn;
    expect(bv.interactableCount).toBe(1);
    expect(bv.mouseInteractableCount).toBe(1);
    expect(bv.view.setIsMouseInteractable.mock.calls.length).toBe(1);
    expect(bv.view.setIsInteractable.mock.calls.length).toBe(1);
    expect(bv.view.forceRaycastTest.mock.calls.length).toBe(1);
    expect(bv.props._onInput).toBe(fn);

    bv.props.onEnter = fn;
    expect(bv.interactableCount).toBe(2);
    expect(bv.mouseInteractableCount).toBe(2);
    expect(bv.view.setIsMouseInteractable.mock.calls.length).toBe(2);
    expect(bv.view.setIsInteractable.mock.calls.length).toBe(2);
    expect(bv.view.forceRaycastTest.mock.calls.length).toBe(2);
    expect(bv.props._onEnter).toBe(fn);

    bv.props.onInput = null;
    expect(bv.interactableCount).toBe(1);
    expect(bv.mouseInteractableCount).toBe(1);
    expect(bv.view.setIsMouseInteractable.mock.calls.length).toBe(3);
    expect(bv.view.setIsInteractable.mock.calls.length).toBe(3);
    expect(bv.view.forceRaycastTest.mock.calls.length).toBe(3);
    expect(bv.props._onInput).toBe(null);
  });

  it('can manage children', () => {
    const bv = new BaseView();
    bv.view = {
      add: jest.fn(),
      remove: jest.fn(),
    };
    const c1 = new BaseView();
    c1.view = {};
    bv.addChild(0, c1);
    expect(bv.children).toEqual([c1]);
    expect(bv.view.add.mock.calls[0][0]).toBe(c1.view);
    expect(bv.getChildCount()).toBe(1);
    const c2 = new BaseView();
    c2.view = {};
    bv.addChild(1, c2);
    expect(bv.children).toEqual([c1, c2]);
    expect(bv.view.add.mock.calls[1][0]).toBe(c2.view);
    expect(bv.getChildCount()).toBe(2);
    const c3 = new BaseView();
    c3.view = {};
    bv.addChild(1, c3);
    expect(bv.children).toEqual([c1, c3, c2]);
    expect(bv.view.add.mock.calls[2][0]).toBe(c3.view);
    expect(bv.getChildCount()).toBe(3);
    const c4 = new BaseView();
    c4.view = {};
    bv.addChild(0, c4);
    expect(bv.children).toEqual([c4, c1, c3, c2]);
    expect(bv.view.add.mock.calls[3][0]).toBe(c4.view);
    expect(bv.getChildCount()).toBe(4);

    bv.removeChild(1);
    expect(bv.children).toEqual([c4, c3, c2]);
    expect(bv.view.remove.mock.calls[0][0]).toBe(c1.view);
    expect(bv.getChildCount()).toBe(3);
    bv.removeChild(0);
    expect(bv.children).toEqual([c3, c2]);
    expect(bv.view.remove.mock.calls[1][0]).toBe(c4.view);
    expect(bv.getChildCount()).toBe(2);
  });

  it('fires onLayout events', () => {
    const bv = new BaseView();
    const cf = jest.fn();
    bv.UIManager = {
      _rnctx: {
        callFunction: cf,
      },
    };
    bv.view = {
      setBorderWidth: jest.fn(),
    };
    bv.props.onLayout = () => {};
    bv.tag = 4;
    bv._width(200);
    bv._height(100);
    bv._top(5);
    bv._left(50);
    bv.YGNode.calculateLayout(
      Yoga.UNDEFINED,
      Yoga.UNDEFINED,
      Yoga.DIRECTION_LTR,
    );
    bv.presentLayout();
    expect(bv.YGNode.getComputedLeft()).toBe(50);
    expect(bv.YGNode.getComputedTop()).toBe(5);
    expect(bv.YGNode.getComputedWidth()).toBe(200);
    expect(bv.YGNode.getComputedHeight()).toBe(100);
    bv.presentLayout();
    expect(cf.mock.calls[0]).toEqual([
      'RCTEventEmitter',
      'receiveEvent',
      [4, 'topLayout', {x: 50, y: 5, width: 200, height: 100}],
    ]);

    bv.style.layoutOrigin = [0.5, 0.5];
    // call present to check layout is only sent when necessary
    bv.presentLayout();
    // force a change
    bv._top(10);
    bv.YGNode.calculateLayout(
      Yoga.UNDEFINED,
      Yoga.UNDEFINED,
      Yoga.DIRECTION_LTR,
    );
    bv.presentLayout();
    expect(bv.YGNode.getComputedTop()).toBe(10);
    expect(cf.mock.calls.length).toEqual(2);
  });

  it('applies transforms to views', () => {
    const bv = new BaseView();
    bv.view = {
      setLocalTransform: jest.fn(),
      setBorderWidth: jest.fn(),
    };
    bv.style.transform = [{translate: [1, 1, 1]}];
    bv.presentLayout();
    expect(bv.view.setLocalTransform.mock.calls[0][0]).toBe(bv.style.transform);
    expect(bv.view.owner).toBe(bv);
  });

  it('sets the frame on compatible views', () => {
    const bv = new BaseView();
    bv.view = {
      setFrame: jest.fn(),
      setBorderWidth: jest.fn(),
    };
    bv.UIManager = {};
    bv.style.layoutOrigin = [0.5, 0.5];
    bv._width(40);
    bv._height(60);
    bv._top(100);
    bv._left(100);
    bv.YGNode.calculateLayout(
      Yoga.UNDEFINED,
      Yoga.UNDEFINED,
      Yoga.DIRECTION_LTR,
    );
    bv.presentLayout();

    expect(bv.view.setFrame.mock.calls[0]).toEqual([
      80,
      -70,
      40,
      60,
      undefined,
    ]);
    expect(bv.view.owner).toBe(bv);
  });

  it('supports percentage', () => {
    const bv = new BaseView();
    const child = new BaseView();
    function setupView(v) {
      v.view = {
        add: jest.fn(),
        setFrame: jest.fn(),
        setBorderWidth: jest.fn(),
      };
      v.UIManager = {};
    }
    setupView(bv);
    setupView(child);
    bv.style.layoutOrigin = [0.5, 0.5];
    bv._width(40);
    bv._height(60);
    bv._top(100);
    bv._left(100);

    bv.addChild(0, child);
    child._width('50%');
    child._height('70%');

    bv.YGNode.calculateLayout(
      Yoga.UNDEFINED,
      Yoga.UNDEFINED,
      Yoga.DIRECTION_LTR,
    );
    bv.presentLayout();
    child.presentLayout();
    expect(bv.view.setFrame.mock.calls[0]).toEqual([
      80,
      -70,
      40,
      60,
      undefined,
    ]);
    expect(bv.view.owner).toBe(bv);
    expect(child.view.setFrame.mock.calls[0]).toEqual([
      0,
      -0,
      20,
      42,
      undefined,
    ]);
    expect(child.view.owner).toBe(child);
  });
});
