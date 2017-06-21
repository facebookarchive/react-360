/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * HPano
 * This is an implementation of a hierarchical cube map style pano where at each level a
 * face is split into 2x2 sub quad and thereby doubling the resolution
 * images are streamed in and discarded as required
 * an aproximate texel to pixel ratio is computed to determine if a split is worth while
 *
 * This geometry type only makes sense as a full, surrounding pano
 */
import * as THREE from 'three';

function sign(value) {
  return value < 0;
}

function clipLinePlane(plane, p0, p1, uv0, uv1) {
  const d0 = p0.x * plane[0] + p0.y * plane[1] + p0.z * plane[2] + p0.w * plane[3];
  const d1 = p1.x * plane[0] + p1.y * plane[1] + p1.z * plane[2] + p1.w * plane[3];
  if (d0 < 0 && d1 < 0) {
    return true;
  }
  if (sign(d0) !== sign(d1)) {
    if (d0 < 0) {
      const dx = p1.x - p0.x;
      const dy = p1.y - p0.y;
      const dz = p1.z - p0.z;
      const dw = p1.w - p0.w;
      const du = uv1[0] - uv0[0];
      const dv = uv1[1] - uv0[1];
      const f = -d0 / (d1 - d0);
      p0.x += dx * f;
      p0.y += dy * f;
      p0.z += dz * f;
      p0.w += dw * f;
      uv0[0] += du * f;
      uv0[1] += dv * f;
    } else {
      const dx = p0.x - p1.x;
      const dy = p0.y - p1.y;
      const dz = p0.z - p1.z;
      const dw = p0.w - p1.w;
      const du = uv0[0] - uv1[0];
      const dv = uv0[1] - uv1[1];
      const f = -d1 / (d0 - d1);
      p1.x += dx * f;
      p1.y += dy * f;
      p1.z += dz * f;
      p1.w += dw * f;
      uv1[0] += du * f;
      uv1[1] += dv * f;
    }
  }
  return false;
}

/*
 * clip to the unit homogeneous positions which allows clipping against a unit frustum
 * returns true if any portion of the line would be outsize of the frustum by clipping
 * to the left, right, top and bottom planes
 */
const clipLineToFrustum = (function() {
  const p0 = new THREE.Vector4();
  const p1 = new THREE.Vector4();

  return function(ctx, pnt0, pnt1, uv0, uv1, projectionMatrix) {
    p0.fromArray([pnt0[0], pnt0[1], pnt0[2], 1]);
    p0.applyMatrix4(projectionMatrix);
    p1.fromArray([pnt1[0], pnt1[1], pnt1[2], 1]);
    p1.applyMatrix4(projectionMatrix);
    let clipped = false;
    clipped = clipped || clipLinePlane([1, 0, 1, 0], p0, p1, uv0, uv1);
    clipped = clipped || clipLinePlane([-1, 0, 1, 0], p0, p1, uv0, uv1);
    clipped = clipped || clipLinePlane([0, 1, 1, 0], p0, p1, uv0, uv1);
    clipped = clipped || clipLinePlane([0, -1, 1, 0], p0, p1, uv0, uv1);
    if (!clipped) {
      const px0 = [p0.x / p0.w * 512, p0.y / p0.w * 512];
      const px1 = [p1.x / p1.w * 512, p1.y / p1.w * 512];
      const dpxX = px1[0] - px0[0];
      const dpxY = px1[1] - px0[1];
      const px = Math.sqrt(dpxX * dpxX + dpxY * dpxY);
      const dU = uv1[0] - uv0[0];
      const dV = uv1[1] - uv0[1];
      const uv = Math.sqrt(dU * dU + dV * dV);
      const texelPerPixel = uv / px;
      ctx.texelPerPixel = Math.min(ctx.texelPerPixel, texelPerPixel);
    }
    return clipped;
  };
})();

/*
 * helper to propend a leading zero
 */
function zeroPrepend(str) {
  if (str.length === 1) {
    return '0' + str;
  }
  return str;
}

// states of loading of the textures
const HPANO_MAP_UNLOADED = 0;
const HPANO_MAP_LOADING = 1;
const HPANO_MAP_LOADED = 2;

export function HPanoBufferGeometry(rad, maxLevels, baseurl) {
  THREE.BufferGeometry.call(this);

  this.dirty = true;
  this.type = 'HPanoBufferGeometry';
  this.material = [];
  this.materialsCached = {};
  this.rad = rad;
  this.baseurl = baseurl;

  this.update(maxLevels);
}

HPanoBufferGeometry.prototype = Object.assign(Object.create(THREE.BufferGeometry.prototype), {
  constructor: HPanoBufferGeometry,

  isHPanoBufferGeometry: true,

  dispose: function() {
    THREE.BufferGeometry.prototype.dispose();
    for (let i = 0; i < this.material.length; i++) {
      this.material[i].map && this.material[i].map.dispose();
      this.material[i].map = null;
      this.material[i].dispose();
    }
    this.material = [];
    this.materialsCached = {};
  },

  update: function(maxLevels, projectionMatrix) {
    this.dirty = false;

    if (this.boundingSphere === null) {
      this.boundingSphere = new THREE.Sphere();
    }
    this.boundingSphere.radius = Math.sqrt(3 * this.rad * this.rad);

    const quadCount = Math.pow(4, maxLevels) * 6;
    const vertCount = quadCount * 4;
    if (this.quadCount !== quadCount) {
      this.quadCount = quadCount;
      this.positions = new Float32Array(vertCount * 3);
      this.uvs = new Float32Array(vertCount * 2);
      this.indices = new Uint16Array(quadCount * 6);
      this.setIndex(new THREE.BufferAttribute(this.indices, 1).setDynamic(true));
      this.addAttribute('position', new THREE.BufferAttribute(this.positions, 3).setDynamic(true));
      this.addAttribute('uv', new THREE.BufferAttribute(this.uvs, 2).setDynamic(true));
    }
    const positions = this.positions;
    const uvs = this.uvs;
    const indices = this.indices;

    const context = {
      offsetPosition: 0,
      offsetUV: 0,
      offsetIndices: 0,
    };

    for (let i = 0; i < this.material.length; i++) {
      this.material[i].referenced = false;
    }

    // at each update we will reset the groups
    this.clearGroups();
    const geom = this;
    // process the quad made up of the four coordinates
    // tl - topLeft
    // tr - topRight
    // bl - bottomLeft
    // br - bottomRight
    function fillQuad(ctx, tl, tr, bl, br, tile, side, level) {
      // replace markup for texture url
      const file = geom.baseurl
        .replace('%l', (level + 1).toString())
        .replace('%s', side)
        .replace('%h', (tile[0] + 1).toString())
        .replace('%v', (tile[1] + 1).toString())
        .replace('%0h', zeroPrepend((tile[0] + 1).toString()))
        .replace('%0v', zeroPrepend((tile[1] + 1).toString()))
        .replace('%t0', (tile[0] + 1).toString())
        .replace('%t1', (tile[1] + 1).toString())
        .replace('%0t0', zeroPrepend((tile[0] + 1).toString()))
        .replace('%0t1', zeroPrepend((tile[1] + 1).toString()));
      let mtr = geom.materialsCached[file];
      let divide = false;
      if (projectionMatrix) {
        // very basic test to see if edges clip frustum
        // and calculates a rough pixel per meter ratio
        // which is used to determine if it is worth dividing the tiles
        const ctx = {texelPerPixel: 1};
        let anyVisible = false;
        anyVisible |= !clipLineToFrustum(
          ctx,
          tl,
          br,
          [0, 0],
          [tileSize, tileSize],
          projectionMatrix
        );
        anyVisible |= !clipLineToFrustum(ctx, tl, tr, [0, 0], [0, tileSize], projectionMatrix);
        anyVisible |= !clipLineToFrustum(
          ctx,
          tr,
          br,
          [tileSize, 0],
          [tileSize, tileSize],
          projectionMatrix
        );
        anyVisible |= !clipLineToFrustum(
          ctx,
          br,
          bl,
          [tileSize, tileSize],
          [0, 0],
          projectionMatrix
        );
        anyVisible |= !clipLineToFrustum(ctx, bl, tl, [0, 0], [0, tileSize], projectionMatrix);
        if (anyVisible) {
          divide = ctx.texelPerPixel < 1;
        }
      }
      if (!mtr) {
        // create the material for this quad
        // setup to be in unloaded texture state
        mtr = new THREE.MeshBasicMaterial({
          wireframe: false,
          depthWrite: false,
          color: ['white', 'green', 'blue'][level],
          side: THREE.DoubleSide,
        });
        mtr.loadState = HPANO_MAP_UNLOADED;
        geom.materialsCached[file] = mtr;
        mtr.index = geom.material.length;
        mtr.level = level;
        geom.material.push(mtr);
      }

      let addQuad = false;
      if (mtr.loadState !== HPANO_MAP_LOADED || level === maxLevels || !divide) {
        // only issue load requests if not already in progress
        if (mtr.loadState === HPANO_MAP_UNLOADED) {
          mtr.loadState = HPANO_MAP_LOADING;
          const loader = new THREE.TextureLoader();
          loader.load(
            file,
            function(texture) {
              texture.wrapS = THREE.ClampToEdgeWrapping;
              texture.wrapT = THREE.ClampToEdgeWrapping;
              texture.minFilter = THREE.LinearFilter;
              // may have been marked to unload
              if (mtr.loadState === HPANO_MAP_LOADING) {
                mtr.map = texture;
                mtr.needsUpdate = true;
                mtr.loadState = HPANO_MAP_LOADED;
              }
              geom.dirty = true;
            },
            undefined,
            function() {
              console.log('failed to load ' + file);
            }
          );
        }
        mtr.referenced = true;
        addQuad = true;
      } else {
        // quad  should be subdivided, calculate the corners
        const mid_tlbr = [(tl[0] + br[0]) / 2, (tl[1] + br[1]) / 2, (tl[2] + br[2]) / 2];
        const mid_tltr = [(tl[0] + tr[0]) / 2, (tl[1] + tr[1]) / 2, (tl[2] + tr[2]) / 2];
        const mid_blbr = [(bl[0] + br[0]) / 2, (bl[1] + br[1]) / 2, (bl[2] + br[2]) / 2];
        const mid_tlbl = [(tl[0] + bl[0]) / 2, (tl[1] + bl[1]) / 2, (tl[2] + bl[2]) / 2];
        const mid_trbr = [(tr[0] + br[0]) / 2, (tr[1] + br[1]) / 2, (tr[2] + br[2]) / 2];
        let valid = true;
        valid &= fillQuad(
          ctx,
          tl,
          mid_tltr,
          mid_tlbl,
          mid_tlbr,
          [tile[0] * 2, tile[1] * 2],
          side,
          level + 1
        );
        valid &= fillQuad(
          ctx,
          mid_tltr,
          tr,
          mid_tlbr,
          mid_trbr,
          [tile[0] * 2 + 1, tile[1] * 2],
          side,
          level + 1
        );
        valid &= fillQuad(
          ctx,
          mid_tlbl,
          mid_tlbr,
          bl,
          mid_blbr,
          [tile[0] * 2, tile[1] * 2 + 1],
          side,
          level + 1
        );
        valid &= fillQuad(
          ctx,
          mid_tlbr,
          mid_trbr,
          mid_blbr,
          br,
          [tile[0] * 2 + 1, tile[1] * 2 + 1],
          side,
          level + 1
        );

        mtr.referenced = true;
        // if any child is not fully loaded also render this parent quad
        if (!valid) {
          addQuad = true;
        }
      }

      // draw the quad, this should only happen if
      // - the mtr is loaded
      // - any child quad is not ready to draw
      if (addQuad && mtr.loadState === HPANO_MAP_LOADED) {
        geom.addGroup(ctx.offsetIndices, 6, mtr.index);
        positions[ctx.offsetPosition + 0] = tl[0];
        positions[ctx.offsetPosition + 1] = tl[1];
        positions[ctx.offsetPosition + 2] = tl[2];

        positions[ctx.offsetPosition + 3] = tr[0];
        positions[ctx.offsetPosition + 4] = tr[1];
        positions[ctx.offsetPosition + 5] = tr[2];

        positions[ctx.offsetPosition + 6] = bl[0];
        positions[ctx.offsetPosition + 7] = bl[1];
        positions[ctx.offsetPosition + 8] = bl[2];

        positions[ctx.offsetPosition + 9] = br[0];
        positions[ctx.offsetPosition + 10] = br[1];
        positions[ctx.offsetPosition + 11] = br[2];

        uvs[ctx.offsetUV + 0] = 0;
        uvs[ctx.offsetUV + 1] = 1;

        uvs[ctx.offsetUV + 2] = 1;
        uvs[ctx.offsetUV + 3] = 1;

        uvs[ctx.offsetUV + 4] = 0;
        uvs[ctx.offsetUV + 5] = 0;

        uvs[ctx.offsetUV + 6] = 1;
        uvs[ctx.offsetUV + 7] = 0;

        const index = ctx.offsetPosition / 3;
        indices[ctx.offsetIndices + 0] = index + 0;
        indices[ctx.offsetIndices + 1] = index + 1;
        indices[ctx.offsetIndices + 2] = index + 3;

        indices[ctx.offsetIndices + 3] = index + 0;
        indices[ctx.offsetIndices + 4] = index + 3;
        indices[ctx.offsetIndices + 5] = index + 2;

        ctx.offsetPosition += 12;
        ctx.offsetUV += 8;
        ctx.offsetIndices += 6;
      }
      return mtr.loadState === HPANO_MAP_LOADED;
    }
    const tileSize = 1024;
    const rad = this.rad;
    fillQuad(
      context,
      [-rad, rad, -rad],
      [rad, rad, -rad],
      [-rad, -rad, -rad],
      [rad, -rad, -rad],
      [0, 0],
      'f',
      0
    );
    fillQuad(
      context,
      [rad, rad, rad],
      [-rad, rad, rad],
      [rad, -rad, rad],
      [-rad, -rad, rad],
      [0, 0],
      'b',
      0
    );
    fillQuad(
      context,
      [rad, rad, -rad],
      [rad, rad, rad],
      [rad, -rad, -rad],
      [rad, -rad, rad],
      [0, 0],
      'r',
      0
    );
    fillQuad(
      context,
      [-rad, rad, rad],
      [-rad, rad, -rad],
      [-rad, -rad, rad],
      [-rad, -rad, -rad],
      [0, 0],
      'l',
      0
    );
    fillQuad(
      context,
      [-rad, -rad, -rad],
      [rad, -rad, -rad],
      [-rad, -rad, rad],
      [rad, -rad, rad],
      [0, 0],
      'd',
      0
    );
    fillQuad(
      context,
      [-rad, rad, rad],
      [rad, rad, rad],
      [-rad, rad, -rad],
      [rad, rad, -rad],
      [0, 0],
      'u',
      0
    );
    // buffers are reused so flag for three.js to update the gl versions
    this.getAttribute('position').needsUpdate = true;
    this.getAttribute('uv').needsUpdate = true;
    this.getIndex().needsUpdate = true;
    // unload any textures no longer required
    for (const i in this.materialsCached) {
      const mtr = this.materialsCached[i];
      if (mtr.level > 0 && !mtr.referenced && mtr.map) {
        mtr.map && mtr.map.dispose();
        mtr.map = null;
        mtr.loadState = HPANO_MAP_UNLOADED;
      }
    }
  },
});
