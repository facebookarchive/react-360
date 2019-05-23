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

import * as ReactWebGL from 'react-webgl';
import * as WebGL from 'webgl-lite';
import {Math as GLMath, type TextImplementation} from 'webgl-ui';
import computeCylinderIntersection from './computeCylinderIntersection';
import computeFlatIntersection from './computeFlatIntersection';
import createSurfaceProgram from './createSurfaceProgram';
import generateCylinderSurface from './generateCylinderSurface';
import generateFlatSurface from './generateFlatSurface';

export type ShapeType = 'Cylinder' | 'Flat';

export const SurfaceShape = {
  Cylinder: 'Cylinder',
  Flat: 'Flat',
};

const DEFAULT_DENSITY = 4680;
const DEFAULT_RADIUS = 4;

const PM = new WebGL.ProgramManager(createSurfaceProgram);

const rotatedDirection = [0, 0, 0];
const rotatedOrigin = [0, 0, 0];

/**
 * Surface is an object used to place 2D layers in 3D space. It is optimized
 * for the resolution of that surface, and allows developers to think in pixels
 * instead of spatial coordinates. A surface is defined in terms of pixel size
 * and angular density, and the geometry is generated accordingly.
 * Surfaces are available in the following shapes:
 *  - Cylinder, places UI content on the inside of a cylinder wrapped around
 *    the user. This means that every pixel on the surface will be viewed
 *    straight-on, and not from an angled perspective.
 *    The default Cylinder has a radius of 4 meters, and a density of 4680px
 *    per 2π radians.
 *    NOTE: Due to WebGL 1.0 restrictions, the maximum width is 4096, so you
 *    need to reduce the density to create a UI that wraps all the way around.
 *  - Flat, places UI content on a quadrilateral panel. The panel is positioned
 *    tangent to a sphere, meaning that the center point will always be viewed
 *    straight-on. The position of the panel on the outside of the sphere is
 *    determined through yaw (rotation around the y axis) and pitch (rotation
 *    around the x axis) angles. Yaw rotation will move it horizontally around
 *    the sphere, and pitch rotation will move it vertically between the ground
 *    and the ceiling. The default sphere radius is 4 meters.
 * It is possible to re-shape a Surface without destroying it, allowing a main
 * React surface to be dynamically reshaped depending on the contents.
 */
export default class Surface {
  _density: number;
  _height: number;
  _pitch: number;
  _radius: number;
  _shape: ShapeType;
  _width: number;
  _yaw: number;
  // WebGL properties
  _node: WebGL.Node;
  _reactRoot: any;
  _rotationInverse: Array<number>;

  static DEFAULT_DENSITY = DEFAULT_DENSITY;
  static DEFAULT_RADIUS = DEFAULT_RADIUS;
  static DEFAULT_SHAPE = SurfaceShape.Cylinder;

  constructor(
    gl: WebGLRenderingContext,
    width: number,
    height: number,
    shape: ShapeType = SurfaceShape.Cylinder,
    text: ?TextImplementation
  ) {
    this._width = width;
    this._height = height;
    this._density = DEFAULT_DENSITY;
    this._radius = DEFAULT_RADIUS;
    this._shape = shape;
    this._yaw = 0;
    this._pitch = 0;

    const prog = PM.getProgram(gl);
    this._node = new WebGL.Node(gl, prog);
    this._node.addAttribute('a_position');
    this._node.addAttribute('a_uv');
    this._reactRoot = new ReactWebGL.RenderTargetRoot(gl, {width, height, text});
    this._node.setUniform('u_texture', this._reactRoot.getFrameBuffer().getTexture());
    // prettier-ignore
    this._node.setUniform('u_transform', [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);
    this._regenerateGeometry();
    // prettier-ignore
    this._rotationInverse = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];
  }

  /**
   * Set the pixel density of the surface, resizing the geometry as necessary.
   */
  setDensity(density: number) {
    if (density < 0) {
      throw new Error('Surface density cannot be negative');
    }
    this._density = density;
    this._regenerateGeometry();
  }

  /**
   * Set the radius of the cylinder or sphere used to position the surface,
   * and reposition it.
   */
  setRadius(radius: number) {
    if (radius < 0) {
      throw new Error('Surface radius cannot be negative');
    }
    this._radius = radius;
    this._regenerateGeometry();
  }

  /**
   * Change the shape of the surface, using a value from the SurfaceShape export
   */
  setShape(shape: ShapeType) {
    this._shape = shape;
    this._regenerateGeometry();
    this._recomputeOrientation();
  }

  /**
   * Set the angle of a Flat panel, positioned on the outside of a sphere.
   * The yaw angle moves the panel horizontally around the sphere within the
   * x-y plane; the pitch angle moves the panel vertically between the floor
   * and the ceiling.
   */
  setAngle(yaw: number, pitch: number) {
    this._yaw = yaw;
    this._pitch = pitch;
    this._recomputeOrientation();
  }

  /**
   * Return the local instance of a React WebGL root, used for mounting a
   * React tree
   */
  getReactRoot() {
    return this._reactRoot;
  }

  /**
   * Return the GL geometry node for the surface
   */
  getNode() {
    return this._node;
  }

  /**
   * Change the pixel dimensions of the surface, recomputing the geometry to
   * maintain the density.
   */
  resize(width: number, height: number) {
    this._width = width;
    this._height = height;
    this._reactRoot.getSurface().setViewport(width, height);
    const fb = this._reactRoot.getFrameBuffer();
    if (width !== fb.getWidth() || height !== fb.getHeight()) {
      fb.resize(width, height);
    }
    this._regenerateGeometry();
  }

  /**
   * Given a ray origin and direction, compute the pixel coordinates of the
   * intersection with the surface, relative to the top-left corner
   */
  computeIntersection(
    intersection: [number, number, number],
    origin: [number, number, number],
    direction: [number, number, number]
  ) {
    rotatedOrigin[0] = origin[0];
    rotatedOrigin[1] = origin[1];
    rotatedOrigin[2] = origin[2];
    rotatedDirection[0] = direction[0];
    rotatedDirection[1] = direction[1];
    rotatedDirection[2] = direction[2];
    GLMath.transformVector(rotatedDirection, this._rotationInverse);
    GLMath.transformVector(rotatedOrigin, this._rotationInverse);

    if (this._shape === SurfaceShape.Flat) {
      computeFlatIntersection(
        intersection,
        rotatedOrigin,
        rotatedDirection,
        this._width,
        this._height,
        this._radius,
        this._density
      );
    } else if (this._shape === SurfaceShape.Cylinder) {
      computeCylinderIntersection(
        intersection,
        rotatedOrigin,
        rotatedDirection,
        this._width,
        this._height,
        this._radius,
        this._density
      );
    }
    return (
      intersection[0] > 0 &&
      intersection[0] < this._width &&
      intersection[1] > 0 &&
      intersection[1] < this._height
    );
  }

  /**
   * Render a React WebGL Element to the Surface.
   * If an element was previously rendered, it will be replaced.
   */
  render(element: any) {
    ReactWebGL.render(element, this._reactRoot);
  }

  /**
   * Rebuilds the indexed geometry of the surface based on its shape and dims
   */
  _regenerateGeometry() {
    if (this._shape === SurfaceShape.Cylinder) {
      const {geometry, index} = generateCylinderSurface(
        this._width,
        this._height,
        this._density,
        this._radius
      );
      this._node.bufferData(geometry);
      this._node.bufferIndex(index);
    } else if (this._shape === SurfaceShape.Flat) {
      const {geometry, index} = generateFlatSurface(
        this._width,
        this._height,
        this._density,
        this._radius
      );
      this._node.bufferData(geometry);
      this._node.bufferIndex(index);
    }
  }

  /**
   * Update the surface geometry's local transform. The surface's vertices are
   * centered around (0, 0, 0), making it easy to rotate and position around
   * the origin.
   */
  _recomputeOrientation() {
    if (this._shape === SurfaceShape.Cylinder) {
      // only support y-axis rotation
      const sin = Math.sin(this._yaw);
      const cos = Math.cos(this._yaw);
      // prettier-ignore
      this._node.setUniform('u_transform', [
        cos, 0, sin, 0,
        0, 1, 0, 0,
        -sin, 0, cos, 0,
        0, 0, 0, 1,
      ]);
      // prettier-ignore
      this._rotationInverse = [
        cos, 0, -sin, 0,
        0, 1, 0, 0,
        sin, 0, cos, 0,
        0, 0, 0, 1,
      ];
    } else if (this._shape === SurfaceShape.Flat) {
      const sv = Math.sin(this._pitch);
      const cv = Math.cos(this._pitch);
      // prettier-ignore
      const vertical = [
        1, 0, 0, 0,
        0, cv, -sv, 0,
        0, sv, cv, 0,
        0, 0, 0, 1,
      ];
      // prettier-ignore
      const vertInverse = [
        1, 0, 0, 0,
        0, cv, sv, 0,
        0, -sv, cv, 0,
        0, 0, 0, 1,
      ];
      const sh = Math.sin(this._yaw);
      const ch = Math.cos(this._yaw);
      // prettier-ignore
      const horizontal = [
        ch, 0, sh, 0,
        0, 1, 0, 0,
        -sh, 0, ch, 0,
        0, 0, 0, 1,
      ];
      // prettier-ignore
      this._rotationInverse = [
        ch, 0, -sh, 0,
        0, 1, 0, 0,
        sh, 0, ch, 0,
        0, 0, 0, 1,
      ];
      GLMath.matrixMultiply4(vertical, horizontal);
      GLMath.matrixMultiply4(this._rotationInverse, vertInverse);
      this._node.setUniform('u_transform', vertical);
    }
  }
}
