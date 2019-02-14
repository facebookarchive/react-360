/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/**
 * Implements space partitioning as a binary tree. Left and right in this case
 * refer to the tree nodes as they would be traditionally displayed.
 * A node is empty if its key is null. An atlas starts off as a single large,
 * empty node.
 * To insert a node into the tree, the first empty node with enough space is
 * split into two partitions - one will be used for the new entry, one will
 * contain the remaining empty space. However, since we are allocating space
 * in two dimensions, the "used" partition itself needs to potentially be split
 * to account for remaining empty space.
 *
 * In the following example, the node is inserted into the top-left corner by
 * first splitting horizontally, and then splitting the new node vertically to
 * leave remaining space on the right.
 *
 *   10x10 node                 first split    second split
 *   +-------+  insert 6x2 node  +-------+      +----,--+
 *   |       |      ====>        |-------|  =>  |----'--|
 *   |       |                   |       |      |       |
 *   +-------+                   +-------+      +-------+
 *
 * Once a node is inserted, it is imperative that the calling code attaches a
 * key to the returned node. Otherwise that space will remain marked as empty,
 * and potentially re-allocated in a future insert request.
 *
 * If there is no available space that can fit the requested width and height,
 * null will be returned. In this scenario, the caller can resize the root node,
 * which will expand the empty space in the tree. Increasing the width and
 * height of a node will extend empty space to the right and bottom, keeping
 * previous contents aligned with the top-left corner.
 */
export default class AtlasNode {
  x: number;
  y: number;
  width: number;
  height: number;
  left: ?AtlasNode;
  right: ?AtlasNode;
  key: ?string;

  constructor(x: number, y: number, width: number, height: number) {
    if (x < 0 || y < 0) {
      throw new Error('AtlasNode must be positioned in positive coordinate space');
    }
    if (width < 0 || height < 0) {
      throw new Error('AtlasNode dimensions cannot be negative');
    }
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  insert(width: number, height: number): ?AtlasNode {
    const {left, right} = this;
    if (left && right) {
      const inserted = left.insert(width, height);
      if (inserted) {
        return inserted;
      }
      return right.insert(width, height);
    }
    if (this.key != null) {
      // couldn't fit in any descendants, find another location
      return null;
    }
    // below here, assume the current node is empty space
    if (width > this.width || height > this.height) {
      return null;
    }
    // split the current space into two halves, one of which perfectly fits the
    // needed space in at least one dimension
    const emptyHoriz = this.width - width;
    const emptyVert = this.height - height;
    if (emptyHoriz === 0 && emptyVert === 0) {
      // no need to split, it fits perfectly
      // eventually all splitting ends up here after 2 cuts
      return this;
    }
    if (emptyVert > emptyHoriz) {
      // split the space horizontally, putting the rectangle in the upper child
      this.left = new AtlasNode(this.x, this.y, this.width, height);
      this.right = new AtlasNode(this.x, this.y + height, this.width, this.height - height);
    } else {
      // split the space vertically, putting the rectangle in the left child
      this.left = new AtlasNode(this.x, this.y, width, this.height);
      this.right = new AtlasNode(this.x + width, this.y, this.width - width, this.height);
    }
    return this.left.insert(width, height);
  }

  resize(newWidth: number, newHeight: number): AtlasNode {
    const {left, right} = this;
    if (left && right) {
      // nodes are stacked vertically
      if (left.width === this.width) {
        this.left = left.resize(newWidth, left.height);
        this.right = right.resize(newWidth, newHeight - this.left.height);
        this.width = newWidth;
        this.height = newHeight;
        return this;
      }
      // nodes are stacked horizontally
      this.left = left.resize(left.width, newHeight);
      this.right = right.resize(newWidth - this.left.width, newHeight);
      this.width = newWidth;
      this.height = newHeight;
      return this;
    }
    if (this.key == null) {
      // empty space
      this.width = newWidth;
      this.height = newHeight;
      return this;
    }
    if (newWidth < this.width || newHeight < this.height) {
      throw new Error('Cannot shrink an AtlasNode');
    }
    if (this.width === newWidth && this.height === newHeight) {
      return this;
    }
    if (this.width === newWidth) {
      // expand height below
      const empty = new AtlasNode(
        this.x,
        this.y + this.height,
        this.width,
        newHeight - this.height
      );
      const parent = new AtlasNode(this.x, this.y, this.width, newHeight);
      parent.left = this;
      parent.right = empty;
      return parent;
    }
    if (this.height === newHeight) {
      // expand width to the right
      const empty = new AtlasNode(this.x + this.width, this.y, newWidth - this.width, this.height);
      const parent = new AtlasNode(this.x, this.y, newWidth, this.height);
      parent.left = this;
      parent.right = empty;
      return parent;
    }
    // expand by width, then by height
    return this.resize(newWidth, this.height).resize(newWidth, newHeight);
  }
}
