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

/* eslint-disable import/order,no-console */

import RCTBox from '../Views/Box';
import RCTCylinder from '../Views/Cylinder';
import RCTPlane from '../Views/Plane';
import RCTSphere from '../Views/Sphere';
import RCTImage from '../Views/Image';
import RCTView from '../Views/View';
import RCTPano from '../Views/Pano';
import RCTLiveEnvCamera from '../Views/LiveEnvCamera';
import RCTModel from '../Views/Model';
import RCTScene from '../Views/Scene';
import RCTSound from '../Views/Sound';
import RCTText from '../Views/Text';
import RCTRawText from '../Views/RawText';
import RCTVideo from '../Views/Video';
import RCTVideoPano from '../Views/VideoPano';
import RCTAmbientLight from '../Views/AmbientLight';
import RCTDirectionalLight from '../Views/DirectionalLight';
import RCTPointLight from '../Views/PointLight';
import RCTSpotLight from '../Views/SpotLight';
import RCTCylindricalPanel from '../Views/CylindricalPanel';
import RCTQuadPanel from '../Views/QuadPanel';
import RCTPrefetch from '../Views/Prefetch';

import Module from './Module';
import * as THREE from 'three';
import * as SDFFont from '../OVRUI/SDFFont/SDFFont';
import * as Flexbox from '../Renderer/FlexboxImplementation';

import type GuiSys from '../OVRUI/UIView/GuiSys';
import type {ReactNativeContext} from '../ReactNativeContext';
import type RCTBaseView from '../Views/BaseView';

type Attributes = {[attr: string]: any};
export type CustomView = {
  name: string,
  view: Class<RCTBaseView>,
};
type ViewDescription = {
  NativeModules: {
    [key: string]: string,
  },
};

// the list of styles that don't invalidate layout uses black list as this is an optimization
// and given that it is better to be conservative.
const STYLES_THAT_DONT_ALTER_LAYOUT = {
  color: true,
  backgroundColor: true,
  transform: true,
  borderColor: true,
  opacity: true,
};

/**
 * Class that is used to receive React commands from JS and translate them into a
 * runtime native view hierarchy.
 * Some of the functions within this module are to be called externally and these
 * are marked public in their comment.
 * However the majority are to be called from React code through messages
 *
 * UIManager manages the view types available - which must be registered ahead on a react
 * context init - as well as being the module that handles the view and property
 * manipulations of React. The React version of the properties is considered to be the
 * source of truth and UIManager should respect these accordingly
 *
 * The asscociation of a view with the react version is via the react tag, a unique id
 * managed by the react code, the exeception is a root view tag which by contract is an
 * id which when divided by 10 there is a remainder of 1
 *
 * UIManager will also make the necessary calls to layout the views via css-layout
 * within the frame function. This is based on flexbox.
 * @class UIManager
 * @extends Module
 */
export default class UIManager extends Module {
  _rnctx: ReactNativeContext;
  _guiSys: GuiSys;
  customDirectEventTypes: {[event: string]: {registrationName: string}};
  customBubblingEventTypes: {
    [event: string]: {
      phasedRegistrationNames: {bubbled: string, captured: string},
    },
  };
  _views: {[tag: string]: RCTBaseView};
  _viewTypes: {[tag: string]: string};
  _viewCreator: {[name: string]: (...any) => any};
  _rootViews: {[tag: string]: RCTBaseView};
  _viewsOfType: {[name: string]: {[tag: string]: RCTBaseView}};
  _viewDispatchers: {[name: string]: {[props: string]: (...any) => void}};
  _layoutAnimation: any;
  _lastFrameStart: number;

  /**
   * Construct a UIManager with a React Native Context and an OVRUI GuiSys.
   */
  constructor(
    rnctx: ReactNativeContext,
    guiSys: GuiSys,
    customViews: Array<CustomView> = [],
    flags: {[key: string]: boolean} = {},
  ) {
    super('UIManager');
    this._rnctx = rnctx;
    this._guiSys = guiSys;

    this.customDirectEventTypes = {
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
    this.customBubblingEventTypes = {
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

    this._views = {};
    this._viewTypes = {};
    this._viewCreator = {};
    this._rootViews = {};
    this._viewsOfType = {};
    this._viewDispatchers = {};
    this._layoutAnimation = null;
    this.registerViewType('RCTView', RCTView.describe(), () => {
      return new RCTView(guiSys);
    });
    this.registerViewType('RCTImageView', RCTImage.describe(), () => {
      return new RCTImage(guiSys, rnctx);
    });
    this.registerViewType('LiveEnvCamera', RCTLiveEnvCamera.describe(), () => {
      return new RCTLiveEnvCamera(guiSys);
    });
    this.registerViewType('Pano', RCTPano.describe(), () => {
      return new RCTPano(guiSys, rnctx);
    });
    this.registerViewType('Model', RCTModel.describe(), () => {
      return new RCTModel(guiSys, rnctx);
    });
    this.registerViewType('Scene', RCTScene.describe(), () => {
      return new RCTScene(guiSys);
    });
    this.registerViewType('Sound', RCTSound.describe(), () => {
      return new RCTSound(guiSys, rnctx);
    });
    this.registerViewType('RCTText', RCTText.describe(), (options = {}) => {
      return new RCTText(guiSys, rnctx, !!options.inSurfaceContext);
    });
    this.registerViewType('RCTRawText', RCTRawText.describe(), () => {
      return new RCTRawText(guiSys);
    });
    this.registerViewType('Video', RCTVideo.describe(), () => {
      return new RCTVideo(guiSys, rnctx);
    });
    this.registerViewType('VideoPano', RCTVideoPano.describe(), () => {
      return new RCTVideoPano(guiSys, rnctx);
    });
    this.registerViewType('AmbientLight', RCTAmbientLight.describe(), () => {
      return new RCTAmbientLight(guiSys);
    });
    this.registerViewType(
      'DirectionalLight',
      RCTDirectionalLight.describe(),
      () => {
        return new RCTDirectionalLight(guiSys);
      },
    );
    this.registerViewType('PointLight', RCTPointLight.describe(), () => {
      return new RCTPointLight(guiSys);
    });
    this.registerViewType('SpotLight', RCTSpotLight.describe(), () => {
      return new RCTSpotLight(guiSys);
    });
    this.registerViewType(
      'CylindricalPanel',
      RCTCylindricalPanel.describe(),
      () => {
        return new RCTCylindricalPanel(guiSys);
      },
    );
    this.registerViewType('QuadPanel', RCTQuadPanel.describe(), () => {
      return new RCTQuadPanel(guiSys);
    });
    this.registerViewType('Box', RCTBox.describe(), () => {
      return new RCTBox(guiSys, rnctx);
    });
    this.registerViewType('Cylinder', RCTCylinder.describe(), () => {
      return new RCTCylinder(guiSys, rnctx);
    });
    this.registerViewType('Plane', RCTPlane.describe(), () => {
      return new RCTPlane(guiSys, rnctx);
    });
    this.registerViewType('Sphere', RCTSphere.describe(), () => {
      return new RCTSphere(guiSys, rnctx);
    });
    this.registerViewType('Prefetch', RCTPrefetch.describe(), () => {
      return new RCTPrefetch(guiSys);
    });

    customViews.forEach(({name, view}) => {
      this.registerViewType(name, view.describe(), () => {
        return new view(guiSys);
      });
    });
  }

  /**
   * Creates a new view of type under rootTag
   * @param tag - Unique react tag id to create view with
   * @param type - The type of view to create, must have been registered
   * @param rootTag - the root React Tag to create this view under
   * @param attr - object containing attributes to set
   */
  createView(tag: number, type: string, rootTag: number, attr: Attributes) {
    const rootView = this._rootViews[String(rootTag)];
    const inSurfaceContext = !!(rootView && rootView.inSurfaceContext);
    const newView = this._viewCreator[type]({inSurfaceContext});
    this._views[String(tag)] = newView;
    newView.UIManager = this;
    newView.tag = tag;
    // assign the tag to the three.js view if created
    if (newView.view) {
      newView.view.tag = tag;
    }
    newView.rootTag = rootTag;
    // record the type of view created
    this._viewTypes[String(tag)] = type;
    // record the tags associated with type for later lookup
    this._viewsOfType[type][String(tag)] = newView;
    // assign the default properties to the view
    this.updateView(tag, type, attr);
    // force the view to be marked as dirty
    this._views[String(tag)].makeDirty();
    return this._views[String(tag)];
  }

  /**
   * sets the children tags for tag
   * Fast path for initial creation of views
   * @param tag - Unique react tag id to allow look up of view object
   * @param childrenTags - array of the the tag ids that will be children of tag
   */
  setChildren(tag: number, childrenTags: Array<number>) {
    // look up the view
    const viewToManage = this._views[String(tag)];
    // iterate through the children
    for (let i = 0; i < childrenTags.length; i++) {
      // add viewToAdd as a child of viewToManage as index i
      const viewToAdd = this._views[String(childrenTags[i])];
      if (viewToAdd) {
        viewToManage.addChild(i, viewToAdd);
        viewToAdd.setParent(viewToManage);
        // make sure the view is marked as dirty
        viewToAdd.makeDirty();
      }
    }
  }

  /**
   * manages children of a specific tag
   * Handles moving, adding and removing with a specific order defined in
   * the react code
   * other than tag any value could be null
   * @param tag - Unique react tag id to allow look up of view object
   * @param moveFrom - array of indices of child of view tag to move from
   * @param moveTo - array of indices of child of view tag to move to
   * @param addChildTags - array of the tag ids that will be children of tag
   * @param addAtIndices - array of the indices to add children at
   * @param removeFrom - array of the indices in view of tag which should
   *                     be removed and purged
   */
  manageChildren(
    tag: number,
    moveFrom: ?Array<number>,
    moveTo: ?Array<number>,
    addChildTags: Array<number>,
    addAtIndices: Array<number>,
    removeFrom: Array<number>,
  ) {
    const cssNodeToManage = this._views[String(tag)];
    if (!cssNodeToManage) {
      return;
    }

    // determine counts with checks for null
    const numToMove = !moveFrom ? 0 : moveFrom.length;

    // We treat moves as an add and a delete
    const viewsToAdd = [];
    const indicesToRemove = [];
    const tagsToRemove = [];
    const tagsToDelete = [];

    // moves are based on a series of adds after removes
    if (moveFrom && moveTo) {
      for (let i = 0; i < moveFrom.length; i++) {
        const moveFromIndex = moveFrom[i];
        const tagToMove = cssNodeToManage.getChild(moveFromIndex).getTag();
        viewsToAdd[i] = {
          tag: tagToMove,
          index: moveTo[i],
        };
        indicesToRemove[i] = moveFromIndex;
        tagsToRemove[i] = tagToMove;
      }
    }

    // add the rest of the adds
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

    // now add the required removes
    if (removeFrom) {
      for (let i = 0; i < removeFrom.length; i++) {
        const indexToRemove = removeFrom[i];
        const tagToRemove = cssNodeToManage.getChild(indexToRemove).getTag();
        indicesToRemove[numToMove + i] = indexToRemove;
        tagsToRemove[numToMove + i] = tagToRemove;
        tagsToDelete[i] = tagToRemove;
      }
    }

    // NB: moveFrom and removeFrom are both relative to the starting state of the View's children.
    // moveTo and addAt are both relative to the final state of the View's children.
    //
    // 1) Sort the views to add and indices to remove by index
    // 2) Iterate the indices being removed from high to low and remove them. Going high to low
    //    makes sure we remove the correct index when there are multiple to remove.
    // 3) Iterate the views being added by index low to high and add them. Like the view removal,
    //    iteration direction is important to preserve the correct index.

    viewsToAdd.sort((a, b) => {
      return a.index - b.index;
    });
    indicesToRemove.sort((a, b) => {
      return a - b;
    });

    // Apply changes to node hierarchy
    // removing in the order last index to first index
    for (let i = indicesToRemove.length - 1; i >= 0; i--) {
      cssNodeToManage.removeChild(indicesToRemove[i]);
    }

    // add the new children
    for (let i = 0; i < viewsToAdd.length; i++) {
      const viewAtIndex = viewsToAdd[i];
      const cssNodeToAdd = this._views[String(viewAtIndex.tag)];
      cssNodeToManage.addChild(viewAtIndex.index, cssNodeToAdd);
      cssNodeToAdd.setParent(cssNodeToManage);
      cssNodeToAdd.makeDirty();
    }

    // finally purge the deleted views and their hierarchy
    for (let i = 0; i < tagsToDelete.length; i++) {
      this.purgeView(this._views[String(tagsToDelete[i])]);
    }
  }

  /**
   * registers the view type and the function to create the view
   * @param name - name of view type to create should correspond to react register view code
   * @param view - description of the view that includes the properties that it supports
   * @param viewCreator - function that returns a created view
   */
  registerViewType(
    name: string,
    view: ViewDescription,
    viewCreator: () => RCTBaseView,
  ) {
    // Flow doesn't like computed properties on classes
    (this: any)[name] = view;
    this._viewCreator[name] = viewCreator;
    this._viewsOfType[name] = {};
  }

  /**
   * applies the attributes in the attr object to the view
   * @param tag - react tag id
   * @param type - view type
   * @param attr - object contained attributes to set
   */
  updateView(tag: number, type: string, attr: Attributes) {
    const view = this._views[String(tag)];
    let forceLayout = false;
    for (const a in attr) {
      // use the declaration of the NativeProps to determine if this
      // attribute is a style type or property
      if ((this: any)[type] && (this: any)[type].NativeProps[a]) {
        view.props[a] = attr[a];
      } else {
        /* $FlowFixMe */
        if (typeof view[`_${a}`] === 'function') {
          /* $FlowFixMe */
          view[`_${a}`](attr[a]);
        } else {
          view.style[a] = attr[a];
        }
        // check attribute is not in black list before forcing layout
        forceLayout = forceLayout || !STYLES_THAT_DONT_ALTER_LAYOUT[a];
      }
    }
    // force a layout if any layout styles are applied
    if (forceLayout) {
      view.makeDirty();
    }
    // call update of view if required
    if (typeof view.updateView === 'function') {
      view.updateView();
    }
  }

  /**
   * removes the view and the hierarchy of child views under it
   * @param param0 -
   */
  purgeView(view: RCTBaseView) {
    // make sure any parent views are marked as dirty
    view.makeDirty();
    // shutdown the view making sure any resources are released
    view.dispose();
    // delete entries in looks
    const type = this._viewTypes[String(view.tag)];
    delete this._viewTypes[String(view.tag)];
    delete this._views[String(view.tag)];
    delete this._viewsOfType[type][String(view.tag)];
    // purge children
    for (let i = 0; i < view.children.length; i++) {
      this.purgeView(view.children[i]);
    }
    // clear the array
    view.children = [];
  }

  /**
   * creates a root view, this should be called by the context to
   * ensure the strict tag ID is used
   * root view tags IDs are always (multiples of ten + one)
   * @param tag - react tag to use
   */
  createRootView(
    tag: number,
    container?: SceneGraphNode | THREE.Scene,
    inSurfaceContext?: boolean,
  ) {
    // create a View with defaults
    const view = this.createView(tag, 'RCTView', tag, {});
    if (inSurfaceContext) {
      view.inSurfaceContext = true;
    }
    view.isRoot = true;
    this._rootViews[String(tag)] = view;
    this._guiSys.add(view.view, container);
  }

  /**
   * remove root view and all child views
   * @param tag - react tag to delete
   */
  removeRootView(tag: number) {
    const view = this._views[String(tag)];
    if (!view) {
      return;
    }

    // delete entry in lookup
    delete this._rootViews[String(tag)];
    this.purgeView(view);
  }

  /**
   * moves a view newReactTag to the space filled by reactTag
   * add remove reactTag
   * @param reactTag - react tag to remove
   * @param newReactTag - react tag to move to location of reactTag
   */
  replaceExistingNonRootView(reactTag: number, newReactTag: number) {
    const view = this._views[String(reactTag)];
    if (!view) {
      return;
    }
    view.makeDirty();

    const superView = view.getParent();
    if (!superView) {
      return;
    }

    const indexOfView = superView.getIndexOf(view);
    if (indexOfView === -1) {
      return;
    }

    // call through to manageChildren to do the general work
    this.manageChildren(
      superView.getTag(),
      null,
      null,
      [newReactTag],
      [indexOfView],
      [indexOfView],
    );
  }

  /**
   * removes all the children of view tag
   * @param tag - read Tag of view
   */
  removeSubviewsFromContainerWithID(tag: number) {
    const view = this._views[String(tag)];
    if (!view) {
      return;
    }
    // make sure view at it's parents are marked dirty to cause relayout
    view.makeDirty();

    const removeIndex = [];
    for (let childIndex = 0; childIndex < view.getChildCount(); childIndex++) {
      removeIndex.push(childIndex);
    }

    for (let i = removeIndex.length - 1; i >= 0; i--) {
      const childView = view.getChild(removeIndex[i]);
      this.purgeView(childView);
      childView.setParent(null);
      view.removeChild(removeIndex[i]);
    }
  }

  /**
   * Apply the computed layout to the view and it's parents
   * @param view - view object to operate on
   */
  presentLayout(view: RCTBaseView) {
    // apply the view specific layout changes
    if (view.presentLayout) {
      view.presentLayout();
    }
    view.isDirty = false;
    for (let i = 0; i < view.children.length; i++) {
      this.presentLayout(view.children[i]);
    }
  }

  /**
   * frame update for the UI
   */
  frame(frameStart: number) {
    // call frame function for each view
    // optimization is to register interest in update
    if (this._lastFrameStart < 0) {
      this._lastFrameStart = frameStart;
    }
    const deltaTime = frameStart - this._lastFrameStart;
    this._lastFrameStart = frameStart;
    for (const tag in this._views) {
      this._views[tag].frame(frameStart, deltaTime);
    }
    // layout the views
    this.layout();
  }

  /**
   * layout the views using css-layout
   */
  layout() {
    // loop through all root views
    for (const tag in this._rootViews) {
      // This relies on css-layout.js, which is a subset of flexbox layout algorithm (based on comments).
      // Called recursively to layout subtrees of flexbox tree. Uses node.style.
      const rootView = this._rootViews[tag];
      // use css-layout flex box to apply new flow
      rootView.YGNode.calculateLayout(
        Flexbox.UNDEFINED,
        Flexbox.UNDEFINED,
        Flexbox.DIRECTION_LTR,
      );
      // present the layout to the view implementations from root to child
      this.presentLayout(rootView);
    }
  }

  /**
   * Returns the transform for the first ReactVR <Scene> within the rootTag,
   * or null if there is no <Scene> or the <Scene> has no transform property.
   * @param rootTag - root view tag to look for Scene under
   */
  getSceneCameraTransform(rootTag: number) {
    const sceneViews = this._viewsOfType.Scene;
    if (!sceneViews || Object.keys(sceneViews).length === 0) {
      return null;
    }
    const scene = (function(scenes: any) {
      for (const tag in scenes) {
        const item = scenes[tag];
        if (item.rootTag === rootTag) {
          return item;
        }
      }
      return null;
    })(sceneViews);
    return scene && scene.style && scene.style.transform;
  }

  /**
   * Returns the layers view
   * @param rootTag - root view tag to look for Scene under
   */
  getLayers() {
    const CylindricalPanels = this._viewsOfType.CylindricalPanel;
    return CylindricalPanels;
  }

  /**
   * Configure the cursor
   */
  setCursorVisibility(visibility: boolean) {
    this._guiSys.setCursorVisibility(visibility);
  }

  /**
   * Util function that given text requirements returns the height of the text
   */
  measureTextHeight(
    text: string,
    fontSize: number,
    width: number,
    maxLineCount: number,
    callbackID: number,
  ) {
    const wordWrapped = SDFFont.wrapLines(
      this._guiSys.font,
      text,
      fontSize,
      width,
      undefined,
      maxLineCount,
    );
    const dim = SDFFont.measureText(this._guiSys.font, wordWrapped, fontSize);
    this._rnctx.invokeCallback(callbackID, [dim.maxHeight]);
  }

  /**
   * Attach or remove a bounding box mesh. This is used by React Devtools to
   * show the currently-highlighted component.
   */
  setBoundingBoxVisible(tag: number, visible: boolean) {
    const view = this._views[String(tag)];
    const uiView = view.view;
    if (!uiView) {
      return;
    }
    let previous = null;
    uiView.children.forEach(c => {
      if (c.__REACT_VR_BOUNDING) {
        previous = c;
      }
    });
    if (visible) {
      if (previous) {
        return;
      }
      const bounds = new THREE.Box3();
      bounds.setFromObject(uiView);
      const boundViz = new THREE.Mesh(
        new THREE.BoxGeometry(
          bounds.max.x - bounds.min.x,
          bounds.max.y - bounds.min.y,
          bounds.max.z - bounds.min.z,
          1,
          1,
          1,
        ),
        new THREE.MeshBasicMaterial({wireframe: true, color: 0xe44dd9}),
      );
      (boundViz: any).__REACT_VR_BOUNDING = true;
      uiView.add(boundViz);
    } else {
      if (!previous) {
        return;
      }
      uiView.remove(previous);
    }
  }

  /**
   * Determines the location on screen, width, and height of the given view and returns the values
   * via an async callback.
   */
  measure(reactTag: number, callback: number) {
    let view = this._views[String(reactTag)];
    if (!view) {
      this._rnctx.invokeCallback(callback, []);
      return;
    }
    let x = 0;
    let y = 0;
    const w = view.YGNode.getComputedWidth();
    const h = view.YGNode.getComputedHeight();
    while (view) {
      x +=
        view.YGNode.getComputedLeft() -
        view.YGNode.getComputedWidth() * view.style.layoutOrigin[0];
      y +=
        view.YGNode.getComputedTop() -
        view.YGNode.getComputedHeight() * view.style.layoutOrigin[1];
      view = view.getParent();
    }
    // [x, y, w, h, left, top]
    this._rnctx.invokeCallback(callback, [0, 0, w, h, x, y]);
  }

  /**
   * Determines the location on screen, width, and height of the given view relative to the device
   * screen and returns the values via an async callback.  This is the absolute position including
   * things like the status bar
   */
  measureInWindow(reactTag: number, callback: number) {
    let view = this._views[String(reactTag)];
    if (!view || !view.view) {
      this._rnctx.invokeCallback(callback, []);
      return;
    }
    const uiView = view.view;
    const bounds = new THREE.Box3();
    bounds.setFromObject(uiView);
    const x = bounds.min.x;
    const y = bounds.min.y;
    const w = bounds.max.x - bounds.min.x;
    const h = bounds.max.y - bounds.min.y;
    this._rnctx.invokeCallback(callback, [x, y, w, h]);
  }

  /**
   * Measures the view specified by tag relative to the given ancestorTag. This means that the
   * returned x, y are relative to the origin x, y of the ancestor view. Results are stored in the
   * given outputBuffer. We allow ancestor view and measured view to be the same, in which case
   * the position always will be (0, 0) and method will only measure the view dimensions.
   *
   * NB: Unlike {@link #measure}, this will measure relative to the view layout, not the visible
   * window which can cause unexpected results when measuring relative to things like ScrollViews
   * that can have offset content on the screen.
   */
  measureLayout(
    reactTag: number,
    ancestorTag: number,
    errorCallback: number,
    successCallback: number,
  ) {
    let view = this._views[String(reactTag)];
    if (!view) {
      this._rnctx.invokeCallback(errorCallback, []);
      return;
    }
    let x = 0;
    let y = 0;
    const w = view.YGNode.getComputedWidth();
    const h = view.YGNode.getComputedHeight();
    while (view && view.tag !== ancestorTag) {
      x +=
        view.YGNode.getComputedLeft() -
        view.YGNode.getComputedWidth() * view.style.layoutOrigin[0];
      y +=
        view.YGNode.getComputedTop() -
        view.YGNode.getComputedHeight() * view.style.layoutOrigin[1];
      view = view.getParent();
    }
    this._rnctx.invokeCallback(successCallback, [x, y, w, h]);
  }

  /**
   * Like {@link #measure} and {@link #measureLayout} but measures relative to the immediate parent.
   *
   * NB: Unlike {@link #measure}, this will measure relative to the view layout, not the visible
   * window which can cause unexpected results when measuring relative to things like ScrollViews
   * that can have offset content on the screen.
   */
  measureLayoutRelativeToParent(
    reactTag: number,
    errorCallback: number,
    successCallback: number,
  ) {
    const view = this._views[String(reactTag)];
    if (!view) {
      this._rnctx.invokeCallback(successCallback, []);
      return;
    }
    const x =
      view.YGNode.getComputedLeft() -
      view.YGNode.getComputedWidth() * view.style.layoutOrigin[0];
    const y =
      view.YGNode.getComputedTop() -
      view.YGNode.getComputedHeight() * view.style.layoutOrigin[1];
    const w = view.YGNode.getComputedWidth();
    const h = view.YGNode.getComputedHeight();
    this._rnctx.invokeCallback(successCallback, [x, y, w, h]);
  }

  /**
   * Configure an animation to be used for the native layout changes, and native views
   * creation. The animation will only apply during the current batch operations.
   *
   * callbacks are not supported, this feature will likely be killed.
   *
   * @param config the configuration of the animation for view addition/removal/update.
   * @param success not supported
   * @param error not supported
   */
  configureNextLayoutAnimation(config: any, finished: any, error: any) {
    this._layoutAnimation = config;
  }

  /**
   * Dispatch a command to a specific native view. This can be called from JS side to invoke
   * function on a native view.
   *
   * @param reactTag - react tag id
   * @param commandId - the command id for the native view to invoke different functions
   * @param commandArgs - the arguments of the command
   */
  dispatchViewManagerCommand(
    reactTag: number,
    commandId: number,
    commandArgs: Array<any>,
  ) {
    const view = this._views[String(reactTag)];
    if (!view) {
      console.warn(
        `UIManager.dispatchViewManagerCommand: dispatching command on a nonexistent view: ${reactTag}`,
      );
      return;
    }
    view.receiveCommand(commandId, commandArgs);
  }

  /**
   * Get the root id of a component, this can be used for video
   * playing to know the attached surface
   *
   * @param reactTag - react tag id
   */
  $getViewRootID(reactTag: number, success: number, error: number) {
    let view = this._views[String(reactTag)];
    if (!view) {
      this._rnctx.invokeCallback(error, [`Failed to get rootID, view doesn't exist.`]);
      return;
    }
    const rootID = view.getViewRootID();
    if (!rootID) {
      this._rnctx.invokeCallback(error, [`Failed to get rootID.`]);
      return;
    }
    this._rnctx.invokeCallback(success, [rootID]);
  }

  /**
   * get a view from certain tag
   */
  getViewForTag(reactTag: number) {
    return this._views[String(reactTag)];
  }

  // TODO:
  // findSubviewIn
}
