/**
 * RCTWorkInProgressSurface is work in progress custom native view to support 
 * configuration a Surface from react side. So you can simple use a <WorkInProgressSurface>
 * component on react side to create and position a surface in the space.
 */

import UIView from 'react-360-web/js/OVRUI/UIView/UIView';
import merge from 'react-360-web/js/Utils/merge';
import * as THREE from 'three';

import type GuiSys from 'react-360-web/js/OVRUI/UIView/GuiSys';
import RCTBaseView from 'react-360-web/js/Views/BaseView';
import Surface from 'react-360-web/js/Compositor/Surface';

const DEFAULT_SURFACE_WIDTH = 400;
const DEFAULT_SURFACE_HEIGHT = 300;
const DEFAULT_SURFACE_SHAPE = {type: 'quad'};
const DEFAULT_SURFACE_ANGLE = {yaw: 0, pitch: 0, roll: 0};
let DEFAULT_SURFACE_NAME_INDEX = 0;

const PROPS = ['surfaceWidth', 'surfaceHeight', 'shape', 'transform'];

export default class RCTWorkInProgressSurface extends RCTBaseView {
  static __reactInstance = null;

  __surfaceWidth = null;
  __surfaceHeight = null;
  __surfaceSizeDirty = false;
  __surfaceShape = null;
  __surfaceName = null;
  __surfaceDepth = 4;
  __surface = null;
  __surfaceAngle = DEFAULT_SURFACE_ANGLE;
  __rootViewTag = 0;


  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys: GuiSys) {
    super();
    this.view = new UIView(guiSys);
    this.isRoot = true;
    this.__surfaceName = `Surface_surface${DEFAULT_SURFACE_NAME_INDEX++}`;

    PROPS.forEach(element => {
      const func = this['_' + element];
      if (typeof func === 'function') {
        Object.defineProperty(
          this.props,
          element.toString(),
          ({
            set: value => func.apply(this, [value]),
          }: Object)
        );
      }
    });
  }

  _surfaceWidth(value: any): void {
    this.__surfaceWidth = value;
    this.__surfaceSizeDirty = true;
  }

  _surfaceHeight(value: any): void {
    this.__surfaceHeight = value;
    this.__surfaceSizeDirty = true;
  }

  _shape(value: any): void {
    if (this.__surface !== null) {
      console.warn(`RCTWorkInProgressSurface: you can't change 'shape' of surface after it's created`);
      return;
    }
    this.__surfaceShape = value;
  }

  _transform(value: any): void {
    if (value == null) {
      this.__surfaceAngle = DEFAULT_SURFACE_ANGLE;
    } else {
      const mat = new THREE.Matrix4().fromArray(value);
      const position = new THREE.Vector3();
      const rotation = new THREE.Quaternion();
      const scale = new THREE.Vector3();
      mat.decompose(position, rotation, scale);
      const euler = new THREE.Euler(0, 0, 0).setFromQuaternion(rotation, 'YXZ');
      this.__surfaceAngle = {
        yaw: -euler.y,
        pitch: euler.x,
        roll: -euler.z,
      };
      this.__surfaceDepth = position.length(); 
    }
  }

  /**
   * Create surface and resize/repostion
   */
  presentLayout() {
    const width = this.__surfaceWidth != null ? this.__surfaceWidth : DEFAULT_SURFACE_WIDTH;
    const height = this.__surfaceHeight != null ? this.__surfaceHeight : DEFAULT_SURFACE_HEIGHT;
    const shape = this.__surfaceShape != null ? this.__surfaceShape : DEFAULT_SURFACE_SHAPE;

    // we only support this two type of surface shape for now.
    const surfaceShape = shape.type === 'cylinder' ? 'Cylinder' : 'Flat';
    
    if (!this.__surface) {
      this.__surfaceSizeDirty = false;

      this.__surface = new Surface(width, height, 'Flat');
      if (surfaceShape === 'Cylinder') {
        this.__surface.setRadius(shape.radius);
      }
      const r360 = RCTWorkInProgressSurface.__reactInstance;
      const offscreenRenderUID = r360.runtime.guiSys.registerOffscreenRender(
          this.__surface.getScene(),
          this.__surface.getCamera(),
          this.__surface.getRenderTarget()
        );
      r360.compositor.showSurface(this.__surface);
      r360.compositor.registerSurface(this.__surfaceName, this.__surface);
      this.__surface.getScene().add(this.view);
    }

    if (this.__surfaceSizeDirty) {
      const width = this.__surfaceWidth != null ? this.__surfaceWidth : DEFAULT_SURFACE_WIDTH;
      const height = this.__surfaceHeight != null ? this.__surfaceHeight : DEFAULT_SURFACE_HEIGHT;
      this.__surface.resize(width, height);
      this.__surfaceSizeDirty = false;
    }

    // process transform
    const {yaw, pitch, roll} = this.__surfaceAngle;
    this.__surface.setAngle(yaw, pitch, roll);
    if (surfaceShape === 'Flat') {
      this.__surface.setRadius(this.__surfaceDepth);
    }
  }

  /**
   * dispose the surface
   */
  dispose(): void {
    if (this.__surface) {
      const r360 = RCTWorkInProgressSurface.__reactInstance;
      r360.compositor.hideSurface(this.__surface);
      r360.compositor.unregisterSurface(this.__surfaceName);
      this.__surface = null;
    }
    super.dispose();
  }

  getViewRootID(): ?string {
    return this.__surfaceName;
  }

  /**
   * Describes the properties representable by this view type and merges
   * with super type
   */
  static describe(): any {
    return merge(super.describe(), {
      NativeProps: {
        surfaceWidth: 'number',
        surfaceHeight: 'number',
        shape: 'string',
      },
    });
  }
}
