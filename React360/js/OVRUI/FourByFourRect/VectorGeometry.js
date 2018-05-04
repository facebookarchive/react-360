/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import * as THREE from 'three';

/**
 * Util functions for generation of vector geomtry used typically used in css borders etc
 * Elements based on nanovg https://github.com/memononen/nanovg
 * Further functions based on work in shell
 **/

const VG_MOVETO = 0;
const VG_LINETO = 1;
const VG_BEZIERTO = 2;

const VG_KAPPA90 = 0.5522847493;

function vgAddPoint(geom, pt) {
  /*  if (geom.length > 0) {
    let last_pt = geom[geom.length - 1];
    let dx = last_pt[0] - pt[0];
    let dy = last_pt[1] - pt[1];
    let dist = (dx * dx) + (dy * dy);
    if (dist < 0.01) {
      return;
    }
  } */
  geom.positions.push(...pt);
  geom.positions.push(0);
}

function vgAddPointBorder(geom, ptA, ptB) {
  /*  if (geom.length > 0) {
    let last_pt = geom[geom.length - 2];
    let dx = last_pt[0] - ptA[0];
    let dy = last_pt[1] - ptA[1];
    let dist = (dx * dx) + (dy * dy);
    if (dist < 0.01) {
      return;
    }
  } */
  geom.positions.push(...ptA);
  geom.positions.push(0);
  geom.positions.push(...ptB);
  geom.positions.push(0);
}

function vgTesselateBezier(geom, x1, y1, x2, y2, x3, y3, x4, y4, level) {
  if (level > 10) {
    return;
  }

  const x12 = (x1 + x2) * 0.5;
  const y12 = (y1 + y2) * 0.5;
  const x23 = (x2 + x3) * 0.5;
  const y23 = (y2 + y3) * 0.5;
  const x34 = (x3 + x4) * 0.5;
  const y34 = (y3 + y4) * 0.5;
  const x123 = (x12 + x23) * 0.5;
  const y123 = (y12 + y23) * 0.5;

  const dx = x4 - x1;
  const dy = y4 - y1;
  const d2 = Math.abs((x2 - x4) * dy - (y2 - y4) * dx);
  const d3 = Math.abs((x3 - x4) * dy - (y3 - y4) * dx);

  const magSqD = (dx * dx + dy * dy) * 0.0001;

  if (magSqD <= 0 || (d2 + d3) * (d2 + d3) < magSqD) {
    vgAddPoint(geom, [x4, y4]);
    return;
  }

  const x234 = (x23 + x34) * 0.5;
  const y234 = (y23 + y34) * 0.5;
  const x1234 = (x123 + x234) * 0.5;
  const y1234 = (y123 + y234) * 0.5;

  vgTesselateBezier(
    geom,
    x1,
    y1,
    x12,
    y12,
    x123,
    y123,
    x1234,
    y1234,
    level + 1,
  );
  vgTesselateBezier(
    geom,
    x1234,
    y1234,
    x234,
    y234,
    x34,
    y34,
    x4,
    y4,
    level + 1,
  );
}

function vgTesselateBezierBorder(
  geom,
  x1A,
  y1A,
  x2A,
  y2A,
  x3A,
  y3A,
  x4A,
  y4A,
  x1B,
  y1B,
  x2B,
  y2B,
  x3B,
  y3B,
  x4B,
  y4B,
  level,
) {
  if (level > 10) {
    return;
  }

  const x12A = (x1A + x2A) * 0.5;
  const y12A = (y1A + y2A) * 0.5;
  const x23A = (x2A + x3A) * 0.5;
  const y23A = (y2A + y3A) * 0.5;
  const x34A = (x3A + x4A) * 0.5;
  const y34A = (y3A + y4A) * 0.5;
  const x123A = (x12A + x23A) * 0.5;
  const y123A = (y12A + y23A) * 0.5;

  const dxA = x4A - x1A;
  const dyA = y4A - y1A;
  const d2A = Math.abs((x2A - x4A) * dyA - (y2A - y4A) * dxA);
  const d3A = Math.abs((x3A - x4A) * dyA - (y3A - y4A) * dxA);

  const magSqD = (dxA * dxA + dyA * dyA) * 0.0001;

  if (magSqD <= 0 || (d2A + d3A) * (d2A + d3A) < magSqD) {
    vgAddPoint(geom, [x4A, y4A]);
    vgAddPoint(geom, [x4B, y4B]);
    return;
  }

  const x234A = (x23A + x34A) * 0.5;
  const y234A = (y23A + y34A) * 0.5;
  const x1234A = (x123A + x234A) * 0.5;
  const y1234A = (y123A + y234A) * 0.5;

  const x12B = (x1B + x2B) * 0.5;
  const y12B = (y1B + y2B) * 0.5;
  const x23B = (x2B + x3B) * 0.5;
  const y23B = (y2B + y3B) * 0.5;
  const x34B = (x3B + x4B) * 0.5;
  const y34B = (y3B + y4B) * 0.5;
  const x123B = (x12B + x23B) * 0.5;
  const y123B = (y12B + y23B) * 0.5;

  const x234B = (x23B + x34B) * 0.5;
  const y234B = (y23B + y34B) * 0.5;
  const x1234B = (x123B + x234B) * 0.5;
  const y1234B = (y123B + y234B) * 0.5;

  vgTesselateBezierBorder(
    geom,
    x1A,
    y1A,
    x12A,
    y12A,
    x123A,
    y123A,
    x1234A,
    y1234A,
    x1B,
    y1B,
    x12B,
    y12B,
    x123B,
    y123B,
    x1234B,
    y1234B,
    level + 1,
  );
  vgTesselateBezierBorder(
    geom,
    x1234A,
    y1234A,
    x234A,
    y234A,
    x34A,
    y34A,
    x4A,
    y4A,
    x1234B,
    y1234B,
    x234B,
    y234B,
    x34B,
    y34B,
    x4B,
    y4B,
    level + 1,
  );
}

function vgFlattenPaths(commands, w, h) {
  const geom = {positions: []};
  let i = 0;
  let p, last;
  let cp1, cp2;
  while (i < commands.length) {
    const cmd = commands[i];
    switch (cmd) {
      case VG_MOVETO:
        p = commands[i + 1];
        vgAddPoint(geom, p);
        i += 2;
        break;
      case VG_LINETO:
        p = commands[i + 1];
        vgAddPoint(geom, p);
        i += 2;
        break;
      case VG_BEZIERTO:
        last = geom.positions.length - 1 * 3;
        cp1 = commands[i + 1];
        cp2 = commands[i + 2];
        p = commands[i + 3];
        vgTesselateBezier(
          geom,
          geom.positions[last + 0],
          geom.positions[last + 1],
          cp1[0],
          cp1[1],
          cp2[0],
          cp2[1],
          p[0],
          p[1],
          0,
        );
        i += 4;
        break;
    }
  }
  if (geom.length > 1) {
    const last_pt = geom.positions.length - 1 * 3;
    const dx = geom.positions[last_pt + 0] - geom.positions[0];
    const dy = geom.positions[last_pt + 1] - geom.positions[1];
    const dist = dx * dx + dy * dy;
    if (dist < 0.001) {
      geom.length -= 1;
    }
  }

  const uvs = [];
  if (w > 0 && h > 0) {
    for (let i = 0; i < geom.positions.length; i += 3) {
      uvs.push(geom.positions[i + 0] / w + 0.5);
      uvs.push(geom.positions[i + 1] / h + 0.5);
    }
  } else {
    for (let i = 0; i < geom.positions.length; i += 3) {
      uvs.push(0);
      uvs.push(0);
    }
  }
  geom.uvs = uvs;
  return geom;
}

function vgFlattenPathsBorder(commands, w, h) {
  const geom = {positions: []};
  let i = 0;
  let pA, lastA;
  let pB, lastB;
  let cp1A, cp2A;
  let cp1B, cp2B;
  while (i < commands.length) {
    const cmd = commands[i];
    switch (cmd) {
      case VG_MOVETO:
        pA = commands[i + 1];
        i += 2;
        pB = commands[i + 1];
        vgAddPointBorder(geom, pA, pB);
        i += 2;
        break;
      case VG_LINETO:
        pA = commands[i + 1];
        i += 2;
        pB = commands[i + 1];
        vgAddPointBorder(geom, pA, pB);
        i += 2;
        break;
      case VG_BEZIERTO:
        lastA = geom.positions.length - 2 * 3;
        lastB = geom.positions.length - 1 * 3;
        cp1A = commands[i + 1];
        cp2A = commands[i + 2];
        pA = commands[i + 3];
        i += 4;
        cp1B = commands[i + 1];
        cp2B = commands[i + 2];
        pB = commands[i + 3];
        vgTesselateBezierBorder(
          geom,
          geom.positions[lastA + 0],
          geom.positions[lastA + 1],
          cp1A[0],
          cp1A[1],
          cp2A[0],
          cp2A[1],
          pA[0],
          pA[1],
          geom.positions[lastB + 0],
          geom.positions[lastB + 1],
          cp1B[0],
          cp1B[1],
          cp2B[0],
          cp2B[1],
          pB[0],
          pB[1],
          0,
        );
        i += 4;
        break;
    }
  }

  const uvs = [];
  if (w > 0 && h > 0) {
    for (let i = 0; i < geom.positions.length; i += 3) {
      uvs.push(geom.positions[i + 0] / w + 0.5);
      uvs.push(geom.positions[i + 1] / h + 0.5);
    }
  } else {
    for (let i = 0; i < geom.positions.length; i += 3) {
      uvs.push(0);
      uvs.push(0);
    }
  }
  geom.uvs = uvs;
  return geom;
}

function vgRect(x, y, w, h) {
  const vals = [
    VG_MOVETO,
    [x, y],
    VG_LINETO,
    [x, y + h],
    VG_LINETO,
    [x + w, y + h],
    VG_LINETO,
    [x + w, y],
  ];
  return vgFlattenPaths(vals, w, h);
}

function vgRoundedRectVarying(
  x,
  y,
  w,
  h,
  radBottomRight,
  radBottomLeft,
  radTopLeft,
  radTopRight,
) {
  if (
    radTopLeft < 0.001 &&
    radTopRight < 0.001 &&
    radBottomRight < 0.001 &&
    radBottomLeft < 0.001
  ) {
    return vgRect(x, y, w, h);
  } else {
    const halfw = Math.abs(w) * 0.5;
    const halfh = Math.abs(h) * 0.5;
    const rxBL = Math.min(radBottomLeft, halfw);
    const ryBL = Math.min(radBottomLeft, halfh);
    const rxBR = Math.min(radBottomRight, halfw);
    const ryBR = Math.min(radBottomRight, halfh);
    const rxTR = Math.min(radTopRight, halfw);
    const ryTR = Math.min(radTopRight, halfh);
    const rxTL = Math.min(radTopLeft, halfw);
    const ryTL = Math.min(radTopLeft, halfh);
    const vals = [
      VG_MOVETO,
      [x, y + ryTL],
      VG_LINETO,
      [x, y + h - ryBL],
      VG_BEZIERTO,
      [x, y + h - ryBL * (1 - VG_KAPPA90)],
      [x + rxBL * (1 - VG_KAPPA90), y + h],
      [x + rxBL, y + h],
      VG_LINETO,
      [x + w - rxBR, y + h],
      VG_BEZIERTO,
      [x + w - rxBR * (1 - VG_KAPPA90), y + h],
      [x + w, y + h - ryBR * (1 - VG_KAPPA90)],
      [x + w, y + h - ryBR],
      VG_LINETO,
      [x + w, y + ryTR],
      VG_BEZIERTO,
      [x + w, y + ryTR * (1 - VG_KAPPA90)],
      [x + w - rxTR * (1 - VG_KAPPA90), y],
      [x + w - rxTR, y],
      VG_LINETO,
      [x + rxTL, y],
      VG_BEZIERTO,
      [x + rxTL * (1 - VG_KAPPA90), y],
      [x, y + ryTL * (1 - VG_KAPPA90)],
      [x, y + ryTL],
    ];
    return vgFlattenPaths(vals, w, h);
  }
}

function vgGenerateIndicesConvex(length) {
  const indices = [];
  for (let i = 2; i < length; i++) {
    indices.push(0);
    indices.push(i - 1);
    indices.push(i);
  }
  return indices;
}

/*
 * Inner and Outer geometry
 * path vertices are always in pairs to simplify the tesselation
 */
export function vgRoundedBorderRectVarying(
  baseX,
  baseY,
  width,
  height,
  borderLeft,
  borderBottom,
  borderRight,
  borderTop,
  radBottomRight,
  radBottomLeft,
  radTopLeft,
  radTopRight,
) {
  const x = Math.min(width, borderLeft);
  const w = Math.max(x, width - borderRight) - x;
  const y = Math.min(height, borderTop);
  const h = Math.max(y, height - borderBottom) - y;
  if (
    radTopLeft < 0.001 &&
    radTopRight < 0.001 &&
    radBottomRight < 0.001 &&
    radBottomLeft < 0.001
  ) {
    const vals = [
      VG_MOVETO,
      [baseX, baseY],
      VG_MOVETO,
      [baseX + x, baseY + y],

      VG_LINETO,
      [baseX, baseY + height],
      VG_LINETO,
      [baseX + x, baseY + y + h],

      VG_LINETO,
      [baseX + width, baseY + height],
      VG_LINETO,
      [baseX + x + w, baseY + y + h],

      VG_LINETO,
      [baseX + width, baseY],
      VG_LINETO,
      [baseX + x + w, baseY + y],
    ];
    return vgFlattenPathsBorder(vals);
  } else {
    const halfWidth = width * 0.5;
    const halfHeight = height * 0.5;
    const halfW = w * 0.5;
    const halfH = h * 0.5;
    const rxBLOuter = Math.min(radBottomLeft, halfWidth);
    const ryBLOuter = Math.min(radBottomLeft, halfHeight);
    const rxBROuter = Math.min(radBottomRight, halfWidth);
    const ryBROuter = Math.min(radBottomRight, halfHeight);
    const rxTROuter = Math.min(radTopRight, halfWidth);
    const ryTROuter = Math.min(radTopRight, halfHeight);
    const rxTLOuter = Math.min(radTopLeft, halfWidth);
    const ryTLOuter = Math.min(radTopLeft, halfHeight);
    const rxBLInner = Math.min(radBottomLeft, halfW);
    const ryBLInner = Math.min(radBottomLeft, halfH);
    const rxBRInner = Math.min(radBottomRight, halfW);
    const ryBRInner = Math.min(radBottomRight, halfH);
    const rxTRInner = Math.min(radTopRight, halfW);
    const ryTRInner = Math.min(radTopRight, halfH);
    const rxTLInner = Math.min(radTopLeft, halfW);
    const ryTLInner = Math.min(radTopLeft, halfH);

    const vals = [
      VG_MOVETO,
      [baseX, baseY + ryTLOuter],
      VG_MOVETO,
      [baseX + x, baseY + y + ryTLInner],

      VG_LINETO,
      [baseX, baseY + height - ryBLOuter],
      VG_LINETO,
      [baseX + x, baseY + y + h - ryBLInner],

      VG_BEZIERTO,
      [baseX, baseY + height - ryBLOuter * (1 - VG_KAPPA90)],
      [baseX + rxBLOuter * (1 - VG_KAPPA90), baseY + height],
      [baseX + rxBLOuter, baseY + height],
      VG_BEZIERTO,
      [baseX + x, baseY + y + h - ryBLInner * (1 - VG_KAPPA90)],
      [baseX + x + rxBLInner * (1 - VG_KAPPA90), baseY + y + h],
      [baseX + x + rxBLInner, baseY + y + h],

      VG_LINETO,
      [baseX + width - rxBROuter, baseY + height],
      VG_LINETO,
      [baseX + x + w - rxBRInner, baseY + y + h],

      VG_BEZIERTO,
      [baseX + width - rxBROuter * (1 - VG_KAPPA90), baseY + height],
      [baseX + width, baseY + height - ryBROuter * (1 - VG_KAPPA90)],
      [baseX + width, baseY + height - ryBROuter],
      VG_BEZIERTO,
      [baseX + x + w - rxBRInner * (1 - VG_KAPPA90), baseY + y + h],
      [baseX + x + w, baseY + y + h - ryBRInner * (1 - VG_KAPPA90)],
      [baseX + x + w, baseY + y + h - ryBRInner],

      VG_LINETO,
      [baseX + width, baseY + ryTROuter],
      VG_LINETO,
      [baseX + x + w, baseY + y + ryTRInner],

      VG_BEZIERTO,
      [baseX + width, baseY + ryTROuter * (1 - VG_KAPPA90)],
      [baseX + width - rxTROuter * (1 - VG_KAPPA90), baseY],
      [baseX + width - rxTROuter, baseY],
      VG_BEZIERTO,
      [baseX + x + w, baseY + y + ryTRInner * (1 - VG_KAPPA90)],
      [baseX + x + w - rxTRInner * (1 - VG_KAPPA90), baseY + y],
      [baseX + x + w - rxTRInner, baseY + y],

      VG_LINETO,
      [baseX + rxTLOuter, baseY],
      VG_LINETO,
      [baseX + x + rxTLInner, baseY + y],

      VG_BEZIERTO,
      [baseX + rxTLOuter * (1 - VG_KAPPA90), baseY],
      [baseX, baseY + ryTLOuter * (1 - VG_KAPPA90)],
      [baseX, baseY + ryTLOuter],
      VG_BEZIERTO,
      [baseX + x + rxTLInner * (1 - VG_KAPPA90), baseY + y],
      [baseX + x, baseY + y + ryTLInner * (1 - VG_KAPPA90)],
      [baseX + x, baseY + y + ryTLInner],
    ];
    return vgFlattenPathsBorder(vals);
  }
}

export function vgGenerateIndicesBorder(offset, length) {
  const indices = [];
  for (let i = 0; i < length; i += 2) {
    const nexti = (i + 2) % length;
    indices.push(i + offset);
    indices.push(nexti + offset);
    indices.push(i + 1 + offset);
    indices.push(i + 1 + offset);
    indices.push(nexti + offset);
    indices.push(nexti + 1 + offset);
  }
  return indices;
}

export function VectorGeometry(
  dims,
  borderWidth,
  borderRadius,
  backgroundIndex,
  foregroundIndex,
  borderIndex,
) {
  THREE.BufferGeometry.apply(this);

  dims = dims || [1, 1];

  const geom = vgRoundedRectVarying(
    -dims[0] * 0.5,
    -dims[1] * 0.5,
    dims[0],
    dims[1],
    borderRadius[0],
    borderRadius[1],
    borderRadius[2],
    borderRadius[3],
  );
  let indices = vgGenerateIndicesConvex(geom.positions.length / 3);
  const baseIndices = indices.length;
  if (borderWidth) {
    const borderGeom = vgRoundedBorderRectVarying(
      -dims[0] * 0.5,
      -dims[1] * 0.5,
      dims[0],
      dims[1],
      borderWidth[0],
      borderWidth[1],
      borderWidth[2],
      borderWidth[3],
      borderRadius[0],
      borderRadius[1],
      borderRadius[2],
      borderRadius[3],
    );
    const borderIndices = vgGenerateIndicesBorder(
      geom.positions.length / 3,
      borderGeom.positions.length / 3,
    );
    geom.positions = geom.positions.concat(borderGeom.positions);
    geom.uvs = geom.uvs.concat(borderGeom.uvs);
    indices = indices.concat(borderIndices);
  }

  this.addAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(geom.positions), 3),
  );
  this.addAttribute(
    'uv',
    new THREE.BufferAttribute(new Float32Array(geom.uvs), 2),
  );
  this.addGroup(0, baseIndices, backgroundIndex);
  this.addGroup(0, baseIndices, foregroundIndex);
  if (borderWidth) {
    this.addGroup(baseIndices, indices.length - baseIndices, borderIndex);
  }
  this.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
  this.needsUpdate = true;
  this.computeBoundingSphere();
}

VectorGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
VectorGeometry.prototype.constructor = VectorGeometry;
