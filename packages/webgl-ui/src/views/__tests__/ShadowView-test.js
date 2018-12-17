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

  test('child add and remove', () => {
    const parent = new ShadowView();
    const children = [new ShadowView(), new ShadowView(), new ShadowView(), new ShadowView()];
    parent.appendChild(children[0]);
    parent.appendChild(children[1]);
    expect(parent.getChild(0)).toBe(children[0]);
    expect(parent.getChild(1)).toBe(children[1]);
    expect(parent.getChildCount()).toBe(2);
    parent.insertBefore(children[2], children[1]);
    expect(parent.getChild(1)).toBe(children[2]);
    expect(parent.getChild(2)).toBe(children[1]);
    parent.addChild(0, children[3]);
    expect(parent.getChildCount()).toBe(4);
    expect(parent.getChild(0)).toBe(children[3]);
    expect(parent.getIndexOf(children[0])).toBe(1);
    expect(parent.getIndexOf(children[1])).toBe(3);
    expect(parent.getIndexOf(children[2])).toBe(2);
    expect(parent.getIndexOf(children[3])).toBe(0);
    expect(children[0].getParent()).toBe(parent);
    expect(children[1].getParent()).toBe(parent);
    expect(children[2].getParent()).toBe(parent);
    expect(children[3].getParent()).toBe(parent);
    expect(parent.getParent()).toBe(null);
    parent.removeChild(2);
    expect(parent.getIndexOf(children[1])).toBe(2);
    expect(parent.getChildCount()).toBe(3);
    expect(children[2].getParent()).toBe(null);
  });

  test('events', () => {
    const view = new ShadowView();
    expect(view.hasEvents()).toBe(false);
    let callCount = 0;
    const cb = () => {
      callCount++;
    };
    view.addEventListener('click', cb);
    expect(view.hasEvents()).toBe(true);
    view.dispatchEvent('click');
    expect(callCount).toBe(1);
    view.removeEventListener('click', cb);
    expect(view.hasEvents()).toBe(false);
    view.dispatchEvent('click');
    expect(callCount).toBe(1);
    view.addEventListener('click', cb);
    view.clearEventListeners('click');
    expect(view.hasEvents()).toBe(false);
  });
});
