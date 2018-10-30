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

import * as Flexbox from '../Renderer/FlexboxImplementation';
import type RenderRoot from '../Renderer/RenderRoot';

import {
  Image,
  RawText,
  Text,
  View,
  ShadowViewWebGL,
  SDFTextImplementation,
  type ShadowView,
  type Dispatcher,
  type TextImplementation,
} from 'webgl-ui';

import Module from '../Modules/Module';
import type ReactContext from './ReactContext';

type Attributes = {[attr: string]: any};
type ViewCreator = (...any) => any;

const ROOT_TAG_INCREMENT = 10;

function recursiveLayout(view: ShadowViewWebGL<any>) {
  view.presentLayout();
  for (const child of view.children) {
    if (child) {
      recursiveLayout((child: any));
    }
  }
}

export default class UIManager extends Module {
  _ctx: ReactContext;
  _nextRootTag: number;
  _renderRoots: Array<RenderRoot>;
  _rootViews: Array<ShadowViewWebGL<any>>;
  _textImplementation: TextImplementation;
  _views: Array<ShadowViewWebGL<any>>;
  _viewTypes: Array<string>;
  _viewTypeCreators: {[t: string]: ViewCreator};
  _viewDispatchers: {[name: string]: Dispatcher};

  constructor(ctx: ReactContext, ti?: TextImplementation) {
    super('UIManager');
    this._ctx = ctx;
    this._nextRootTag = 1;
    this._rootViews = [];
    this._renderRoots = [];
    this._views = [];
    this._viewTypes = [];
    this._viewTypeCreators = {};
    this._viewDispatchers = {};

    this._textImplementation = ti || new SDFTextImplementation();

    (this: any).customDirectEventTypes = {
      topLayout: {registrationName: 'onLayout'},
      topLoadStart: {registrationName: 'onLoadStart'},
      topLoad: {registrationName: 'onLoad'},
      topLoadEnd: {registrationName: 'onLoadEnd'},
      topEnter: {registrationName: 'onEnter'},
      topExit: {registrationName: 'onExit'},
      topMove: {registrationName: 'onMove'},
      // Media Events
      topDurationChange: {registrationName: 'onDurationChange'},
      topEnded: {registrationName: 'onEnded'},
      topTimeUpdate: {registrationName: 'onTimeUpdate'},
      topPlayStatusChange: {registrationName: 'onPlayStatusChange'},
    };
    (this: any).customBubblingEventTypes = {
      topChange: {
        phasedRegistrationNames: {
          bubbled: 'onChange',
          captured: 'onChangeCapture',
        },
      },
      topInput: {
        phasedRegistrationNames: {
          bubbled: 'onInput',
          captured: 'onInputCapture',
        },
      },
      topHeadPose: {
        phasedRegistrationNames: {
          bubbled: 'onHeadPose',
          captured: 'onHeadPoseCapture',
        },
      },
    };

    this.registerViewType('RCTView', View.registerBindings.bind(View), () => new View());
    this.registerViewType(
      'RCTImageView',
      Image.registerBindings.bind(Image),
      () => new Image(ctx.TextureManager)
    );
    this.registerViewType(
      'RCTText',
      Text.registerBindings.bind(Text),
      () => new Text(this._textImplementation)
    );
    this.registerViewType(
      'RCTRawText',
      RawText.registerBindings.bind(RawText),
      () => new RawText()
    );
  }

  registerViewType(name: string, registerBindings: Dispatcher => void, viewCreator: ViewCreator) {
    const dispatch = {};
    registerBindings(dispatch);
    this._viewDispatchers[name] = dispatch;
    const NativeProps = {};
    for (const key in dispatch) {
      NativeProps[key] = true;
    }
    // $FlowFixMe - Computed property
    this[name] = {NativeProps};
    this._viewTypeCreators[name] = viewCreator;
  }

  createView(tag: number, type: string, rootTag: number, attr: Attributes) {
    const newView = this._viewTypeCreators[type]();
    this._views[tag] = newView;
    this._viewTypes[tag] = type;
    newView.tag = tag;
    newView.rootTag = rootTag;
    if (newView instanceof ShadowViewWebGL) {
      this._renderRoots[rootTag].addView(newView);
    }

    this.updateView(tag, type, attr);
    return newView;
  }

  createRootView(tag: number, renderRoot: RenderRoot) {
    this._renderRoots[tag] = renderRoot;
    const view = this.createView(tag, 'RCTView', tag, {});
    this._rootViews[tag] = view;
    renderRoot.replaceRootView(view);
  }

  removeRootView(tag: number) {
    const view = this._views[tag];
    if (!view) {
      return;
    }
    delete this._rootViews[tag];
    this.purgeView(view);
  }

  purgeView(view: ShadowView) {
    this._renderRoots[view.rootTag].removeView(view.tag);
    view.dispose();
    delete this._viewTypes[view.tag];
    delete this._views[view.tag];
    for (let i = 0; i < view.children.length; i++) {
      this.purgeView(view.children[i]);
    }
  }

  setChildren(tag: number, childrenTags: Array<number>) {
    const parent = this._views[tag];
    for (let i = 0; i < childrenTags.length; i++) {
      const child = this._views[childrenTags[i]];
      if (!child) {
        continue;
      }
      const root = this._renderRoots[parent.rootTag];
      root.setChildAtIndex(parent, i, child);
    }
  }

  updateView(tag: number, type: string, attr: Attributes) {
    const view = this._views[tag];
    const dispatchers = this._viewDispatchers[type];
    for (const a in attr) {
      const dispatcher = dispatchers[a];
      if (dispatcher) {
        dispatcher.call(view, attr[a]);
      } else {
        // $FlowFixMe - Computed Property
        const styleSetter = view[`__setStyle_${a}`];
        if (typeof styleSetter === 'function') {
          styleSetter.call(view, attr[a]);

          if (a === 'zIndex') {
            // Special handling for z-index, since it dirties the render order
            const root = this._renderRoots[view.rootTag];
            if (root) {
              root.setRenderOrderDirty(true);
            }
          }
        }
      }
    }
  }

  manageChildren(
    tag: number,
    moveFrom: ?Array<number>,
    moveTo: ?Array<number>,
    addChildTags: Array<number>,
    addAtIndices: Array<number>,
    removeFrom: Array<number>
  ) {
    const parent = this._views[tag];
    if (!parent) {
      return;
    }
    const numToMove = moveFrom ? moveFrom.length : 0;

    const viewsToAdd = [];
    const indicesToRemove = [];
    const tagsToRemove = [];
    const tagsToDelete = [];

    // moves are based on a series of adds after removes
    if (moveFrom && moveTo) {
      for (let i = 0; i < moveFrom.length; i++) {
        const moveFromIndex = moveFrom[i];
        const childToMove = parent.getChild(moveFromIndex);
        if (!childToMove) {
          continue;
        }
        const tagToMove = childToMove.getTag();
        viewsToAdd[i] = {
          tag: tagToMove,
          index: moveTo[i],
        };
        indicesToRemove[i] = moveFromIndex;
        tagsToRemove[i] = tagToMove;
      }
    }

    if (addChildTags) {
      for (let i = 0; i < addChildTags.length; i++) {
        const viewTagToAdd = addChildTags[i];
        const indexToAddAt = addAtIndices[i];
        viewsToAdd[numToMove + i] = {
          tag: viewTagToAdd,
          index: indexToAddAt,
        };
      }
    }

    if (removeFrom) {
      for (let i = 0; i < removeFrom.length; i++) {
        const indexToRemove = removeFrom[i];
        const childToRemove = parent.getChild(indexToRemove);
        if (!childToRemove) {
          continue;
        }
        const tagToRemove = childToRemove.getTag();
        indicesToRemove[numToMove + i] = indexToRemove;
        tagsToRemove[numToMove + i] = tagToRemove;
        tagsToDelete[i] = tagToRemove;
      }
    }

    viewsToAdd.sort((a, b) => {
      return a.index - b.index;
    });
    indicesToRemove.sort((a, b) => {
      return a - b;
    });

    const renderRoot = this._renderRoots[parent.rootTag];

    for (let i = indicesToRemove.length - 1; i >= 0; i--) {
      renderRoot.removeChildAtIndex(parent, indicesToRemove[i]);
    }

    for (let i = 0; i < viewsToAdd.length; i++) {
      const viewAtIndex = viewsToAdd[i];
      const nodeToAdd = this._views[viewAtIndex.tag];
      renderRoot.setChildAtIndex(parent, viewAtIndex.index, nodeToAdd);
      nodeToAdd.setParent(parent);
    }

    for (let i = 0; i < tagsToDelete.length; i++) {
      this.purgeView(this._views[tagsToDelete[i]]);
    }
  }

  frame() {
    for (const root of this._rootViews) {
      if (!root) {
        continue;
      }
      root.YGNode.calculateLayout(Flexbox.UNDEFINED, Flexbox.UNDEFINED, Flexbox.DIRECTION_LTR);
      // Layout children recursively in root-to-leaf order, so that parents
      // are guaranteed to update before their children
      recursiveLayout(root);
      const renderRoot = this._renderRoots[root.tag];
      renderRoot.updateRenderOrder();
    }
  }

  createRootTag(): number {
    let next = this._nextRootTag;
    while (next in this._rootViews) {
      this._nextRootTag += ROOT_TAG_INCREMENT;
      next = this._nextRootTag;
    }
    this._nextRootTag += ROOT_TAG_INCREMENT;
    return next;
  }
}
