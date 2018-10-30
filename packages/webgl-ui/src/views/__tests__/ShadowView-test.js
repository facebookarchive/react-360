/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

jest
  .dontMock('../../setStyle')
  .dontMock('../ShadowView')
  .dontMock('../../Math')
  .dontMock('../../vendor/Yoga.bundle.js');

const ShadowView = require('../../views/ShadowView').default;
const setStyle = require('../../setStyle').default;

describe('ShadowView', () => {
  test('setting size', () => {
    const view = new ShadowView();
    setStyle(view, {width: 120, height: 300});
    view.calculateLayout();
    expect(view.YGNode.getComputedHeight()).toBe(300);
    expect(view.YGNode.getComputedWidth()).toBe(120);
  });

  test('laying out children', () => {
    const parent = new ShadowView();
    setStyle(parent, {
      width: 500,
      height: 300,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    });
    const children = [new ShadowView(), new ShadowView(), new ShadowView()];
    for (const child of children) {
      setStyle(child, {width: 100, height: 100});
      parent.addChild(0, child);
    }
    parent.calculateLayout();
    expect(children[0].YGNode.getComputedLayout().top).toBe(100);
    expect(children[1].YGNode.getComputedLayout().top).toBe(100);
    expect(children[2].YGNode.getComputedLayout().top).toBe(100);
    expect(children[0].YGNode.getComputedLayout().left).toBe(400);
    expect(children[1].YGNode.getComputedLayout().left).toBe(200);
    expect(children[2].YGNode.getComputedLayout().left).toBe(0);
  });
});
