/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

jest.dontMock('../StackingContext');

const {restack} = require('../StackingContext');

class MockView {
  constructor(z = 0) {
    this.children = [];
    this.zIndex = z;
    this.renderOrder = 0;
  }

  setRenderOrder(order) {
    this.renderOrder = order;
  }

  getRenderOrder() {
    return this.renderOrder;
  }

  getChildCount() {
    return this.children.length;
  }

  getChild(i) {
    return this.children[i];
  }

  getZIndex() {
    return this.zIndex;
  }

  addChild(index, child) {
    this.children.splice(index, 0, child);
  }
}

describe('StackingContext', () => {
  test('basic render order', () => {
    // Build a simple node tree:
    //      0
    //   1     2
    //  3 4
    const nodes = [new MockView(), new MockView(), new MockView(), new MockView(), new MockView()];
    nodes[0].addChild(0, nodes[1]);
    nodes[0].addChild(1, nodes[2]);
    nodes[1].addChild(0, nodes[3]);
    nodes[1].addChild(1, nodes[4]);

    restack(nodes[0]);
    expect(nodes[0].renderOrder).toBe(1);
    expect(nodes[1].renderOrder).toBe(2);
    expect(nodes[2].renderOrder).toBe(5);
    expect(nodes[3].renderOrder).toBe(3);
    expect(nodes[4].renderOrder).toBe(4);

    nodes.push(new MockView());
    nodes[3].addChild(0, nodes[5]);
    restack(nodes[0]);
    expect(nodes[0].renderOrder).toBe(1);
    expect(nodes[1].renderOrder).toBe(2);
    expect(nodes[2].renderOrder).toBe(6);
    expect(nodes[3].renderOrder).toBe(3);
    expect(nodes[4].renderOrder).toBe(5);
    expect(nodes[5].renderOrder).toBe(4);
  });

  test('render order with z-index', () => {
    const nodes = [new MockView(), new MockView(), new MockView(), new MockView(1), new MockView()];
    nodes[0].addChild(0, nodes[1]);
    nodes[0].addChild(1, nodes[2]);
    nodes[1].addChild(0, nodes[3]);
    nodes[1].addChild(1, nodes[4]);

    restack(nodes[0]);
    expect(nodes[0].renderOrder).toBe(1);
    expect(nodes[1].renderOrder).toBe(2);
    expect(nodes[2].renderOrder).toBe(4);
    expect(nodes[3].renderOrder).toBe(5);
    expect(nodes[4].renderOrder).toBe(3);

    nodes[4].zIndex = 10;
    restack(nodes[0]);
    expect(nodes[2].renderOrder).toBe(3);
    expect(nodes[3].renderOrder).toBe(4);
    expect(nodes[4].renderOrder).toBe(5);

    nodes[1].zIndex = 1;
    nodes[3].zIndex = 0;
    nodes[4].zIndex = 0;
    restack(nodes[0]);
    expect(nodes[0].renderOrder).toBe(1);
    expect(nodes[1].renderOrder).toBe(3);
    expect(nodes[2].renderOrder).toBe(2);
    expect(nodes[3].renderOrder).toBe(4);
    expect(nodes[4].renderOrder).toBe(5);
  });

  test('render order with nested zIndex', () => {
    const nodes = [
      new MockView(),
      new MockView(10),
      new MockView(),
      new MockView(1),
      new MockView(),
    ];
    nodes[0].addChild(0, nodes[1]);
    nodes[0].addChild(1, nodes[2]);
    nodes[1].addChild(0, nodes[3]);
    nodes[1].addChild(1, nodes[4]);

    restack(nodes[0]);
    expect(nodes[0].renderOrder).toBe(1);
    expect(nodes[1].renderOrder).toBe(3);
    expect(nodes[2].renderOrder).toBe(2);
    expect(nodes[3].renderOrder).toBe(5);
    expect(nodes[4].renderOrder).toBe(4);
  });

  test('render order with negative z-index', () => {
    const nodes = [
      new MockView(),
      new MockView(-1),
      new MockView(),
      new MockView(),
      new MockView(),
    ];
    nodes[0].addChild(0, nodes[1]);
    nodes[0].addChild(1, nodes[2]);
    nodes[1].addChild(0, nodes[3]);
    nodes[1].addChild(1, nodes[4]);

    restack(nodes[0]);
    expect(nodes[0].renderOrder).toBe(4);
    expect(nodes[1].renderOrder).toBe(1);
    expect(nodes[2].renderOrder).toBe(5);
    expect(nodes[3].renderOrder).toBe(2);
    expect(nodes[4].renderOrder).toBe(3);
  });

  test('render order with many z-index values', () => {
    const nodes = [
      new MockView(10),
      new MockView(5),
      new MockView(-2),
      new MockView(1),
      new MockView(1000),
      new MockView(7),
    ];
    nodes[0].addChild(0, nodes[1]);
    nodes[0].addChild(1, nodes[2]);
    nodes[0].addChild(2, nodes[3]);
    nodes[0].addChild(3, nodes[4]);
    nodes[0].addChild(4, nodes[5]);

    restack(nodes[0]);
    expect(nodes[0].renderOrder).toBe(2);
    expect(nodes[1].renderOrder).toBe(4);
    expect(nodes[2].renderOrder).toBe(1);
    expect(nodes[3].renderOrder).toBe(3);
    expect(nodes[4].renderOrder).toBe(6);
    expect(nodes[5].renderOrder).toBe(5);
  });

  test('render order with same z-index', () => {
    const nodes = [
      new MockView(),
      new MockView(5),
      new MockView(5),
      new MockView(),
      new MockView(),
    ];
    nodes[0].addChild(0, nodes[1]);
    nodes[0].addChild(1, nodes[2]);
    nodes[1].addChild(0, nodes[3]);
    nodes[1].addChild(1, nodes[4]);

    restack(nodes[0]);
    expect(nodes[0].renderOrder).toBe(1);
    expect(nodes[1].renderOrder).toBe(2);
    expect(nodes[2].renderOrder).toBe(5);
    expect(nodes[3].renderOrder).toBe(3);
    expect(nodes[4].renderOrder).toBe(4);
  });
});
