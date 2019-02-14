/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/* eslint-disable import/no-commonjs */

jest.dontMock('../AtlasNode');

const AtlasNode = require('../AtlasNode').default;

describe('AtlasNode', () => {
  test('perfect fit', () => {
    const root = new AtlasNode(0, 0, 100, 60);
    const result = root.insert(100, 60);
    expect(result).toBe(root);
  });

  test('does not fit', () => {
    const root = new AtlasNode(0, 0, 100, 100);
    expect(root.insert(120, 50)).toBe(null);
    expect(root.insert(30, 110)).toBe(null);
  });

  test('fits vertically', () => {
    const root = new AtlasNode(0, 0, 100, 55);
    const result = root.insert(40, 55);
    expect(result).toBeTruthy();
    expect(result.x).toBe(0);
    expect(result.y).toBe(0);
    expect(result.width).toBe(40);
    expect(result.height).toBe(55);
    expect(root.left).toBe(result);
    expect(root.right.x).toBe(40);
    expect(root.right.y).toBe(0);
    expect(root.right.width).toBe(60);
    expect(root.right.height).toBe(55);
  });

  test('fits horizontally', () => {
    const root = new AtlasNode(0, 0, 100, 60);
    const result = root.insert(100, 20);
    expect(result).toBeTruthy();
    expect(result.x).toBe(0);
    expect(result.y).toBe(0);
    expect(result.width).toBe(100);
    expect(result.height).toBe(20);
    expect(root.left).toBe(result);
    expect(root.right.x).toBe(0);
    expect(root.right.y).toBe(20);
    expect(root.right.width).toBe(100);
    expect(root.right.height).toBe(40);
  });

  test('split vertically', () => {
    const root = new AtlasNode(0, 0, 100, 90);
    const result = root.insert(20, 60);
    expect(result).toBeTruthy();
    expect(result.x).toBe(0);
    expect(result.y).toBe(0);
    expect(result.width).toBe(20);
    expect(result.height).toBe(60);
    expect(root.right.x).toBe(20);
    expect(root.right.y).toBe(0);
    expect(root.right.width).toBe(80);
    expect(root.right.height).toBe(90);
    expect(root.left.x).toBe(0);
    expect(root.left.y).toBe(0);
    expect(root.left.width).toBe(20);
    expect(root.left.height).toBe(90);
    expect(root.left.left).toBe(result);
    const lowerLeft = root.left.right;
    expect(lowerLeft.x).toBe(0);
    expect(lowerLeft.y).toBe(60);
    expect(lowerLeft.width).toBe(20);
    expect(lowerLeft.height).toBe(30);
  });

  test('split horizontally', () => {
    const root = new AtlasNode(0, 0, 100, 90);
    const result = root.insert(60, 20);
    expect(result).toBeTruthy();
    expect(result.x).toBe(0);
    expect(result.y).toBe(0);
    expect(result.width).toBe(60);
    expect(result.height).toBe(20);
    expect(root.left.x).toBe(0);
    expect(root.left.y).toBe(0);
    expect(root.left.width).toBe(100);
    expect(root.left.height).toBe(20);
    expect(root.left.left).toBe(result);
    const upperRight = root.left.right;
    expect(upperRight.x).toBe(60);
    expect(upperRight.y).toBe(0);
    expect(upperRight.width).toBe(40);
    expect(upperRight.height).toBe(20);
    expect(root.right.x).toBe(0);
    expect(root.right.y).toBe(20);
    expect(root.right.width).toBe(100);
    expect(root.right.height).toBe(70);
  });

  test('inserting multiple nodes', () => {
    const root = new AtlasNode(0, 0, 100, 100);
    const first = root.insert(30, 50);
    first.key = 'one';
    const second = root.insert(60, 70);
    second.key = 'two';
    const third = root.insert(25, 30);
    third.key = 'three';

    expect(first.x).toBe(0);
    expect(first.y).toBe(0);
    expect(first.width).toBe(30);
    expect(first.height).toBe(50);
    expect(second.x).toBe(30);
    expect(second.y).toBe(0);
    expect(second.width).toBe(60);
    expect(second.height).toBe(70);
    expect(third.x).toBe(0);
    expect(third.y).toBe(50);
    expect(third.width).toBe(25);
    expect(third.height).toBe(30);
    const fourth = root.insert(30, 30);
    fourth.key = 'four';
    expect(fourth.x).toBe(30);
    expect(fourth.y).toBe(70);
    expect(fourth.width).toBe(30);
    expect(fourth.height).toBe(30);
    const fifth = root.insert(30, 30);
    fifth.key = 'five';
    expect(fifth.x).toBe(60);
    expect(fifth.y).toBe(70);
    expect(fifth.width).toBe(30);
    expect(fifth.height).toBe(30);
    expect(root.insert(30, 31)).toBe(null);
  });

  test('resize empty space', () => {
    const empty = new AtlasNode(0, 0, 40, 50);
    const wider = empty.resize(60, 50);
    expect(wider).toBe(empty);
    expect(empty.width).toBe(60);
    expect(empty.height).toBe(50);
    const taller = empty.resize(60, 70);
    expect(taller).toBe(empty);
    expect(empty.width).toBe(60);
    expect(empty.height).toBe(70);
    const bigger = empty.resize(90, 100);
    expect(bigger).toBe(empty);
    expect(empty.width).toBe(90);
    expect(empty.height).toBe(100);
  });

  test('resize single node width', () => {
    const root = new AtlasNode(0, 0, 40, 50);
    root.key = 'root';
    const newRoot = root.resize(60, 50);
    expect(newRoot.x).toBe(0);
    expect(newRoot.y).toBe(0);
    expect(newRoot.width).toBe(60);
    expect(newRoot.height).toBe(50);
    expect(newRoot.left).toBe(root);
    expect(newRoot.left.width).toBe(40);
    expect(newRoot.left.height).toBe(50);
    expect(newRoot.right.x).toBe(40);
    expect(newRoot.right.y).toBe(0);
    expect(newRoot.right.width).toBe(20);
    expect(newRoot.right.height).toBe(50);
  });

  test('resize single node height', () => {
    const root = new AtlasNode(0, 0, 40, 50);
    root.key = 'root';
    const newRoot = root.resize(40, 70);
    expect(newRoot.x).toBe(0);
    expect(newRoot.y).toBe(0);
    expect(newRoot.width).toBe(40);
    expect(newRoot.height).toBe(70);
    expect(newRoot.left).toBe(root);
    expect(newRoot.left.width).toBe(40);
    expect(newRoot.left.height).toBe(50);
    expect(newRoot.right.x).toBe(0);
    expect(newRoot.right.y).toBe(50);
    expect(newRoot.right.width).toBe(40);
    expect(newRoot.right.height).toBe(20);
  });

  test('resize single node in both dimensions', () => {
    const root = new AtlasNode(0, 0, 40, 50);
    root.key = 'root';
    const newRoot = root.resize(60, 60);
    expect(newRoot.width).toBe(60);
    expect(newRoot.height).toBe(60);
    expect(newRoot.right.x).toBe(40);
    expect(newRoot.right.y).toBe(0);
    expect(newRoot.right.width).toBe(20);
    expect(newRoot.right.height).toBe(60);
    const left = newRoot.left;
    expect(left.x).toBe(0);
    expect(left.y).toBe(0);
    expect(left.width).toBe(40);
    expect(left.height).toBe(60);
    expect(left.left).toBe(root);
    expect(root.x).toBe(0);
    expect(root.y).toBe(0);
    expect(root.width).toBe(40);
    expect(root.height).toBe(50);
    expect(left.right.x).toBe(0);
    expect(left.right.y).toBe(50);
    expect(left.right.width).toBe(40);
    expect(left.right.height).toBe(10);
  });

  test('resize empty horizontal space', () => {
    const root = new AtlasNode(0, 0, 40, 40);
    root.insert(30, 40).key = 'key';
    const newRoot = root.resize(50, 40);
    expect(newRoot).toBe(root);
    expect(root.left.width).toBe(30);
    expect(root.left.height).toBe(40);
    expect(root.right.width).toBe(20);
    expect(root.right.height).toBe(40);
  });

  test('resize empty vertical space', () => {
    const root = new AtlasNode(0, 0, 40, 40);
    root.insert(40, 20).key = 'key';
    const newRoot = root.resize(40, 60);
    expect(newRoot).toBe(root);
    expect(root.left.width).toBe(40);
    expect(root.left.height).toBe(20);
    expect(root.right.width).toBe(40);
    expect(root.right.height).toBe(40);
  });
});
