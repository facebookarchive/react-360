/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/**
 * Create an SVG version of the gyroscope glyph, an indicator of 360 content
 */

const SVG_NS = 'http://www.w3.org/2000/svg';

/* eslint-disable max-len */
const GYRO_PATHS = [
  'M30,60 C46.5685425,60 60,46.5685425 60,30 C60,13.4314575 46.5685425,0 30,0 C13.4314575,0 0,13.4314575 0,30 C0,46.5685425 13.4314575,60 30,60 Z M30,56 C44.3594035,56 56,44.3594035 56,30 C56,15.6405965 44.3594035,4 30,4 C15.6405965,4 4,15.6405965 4,30 C4,44.3594035 15.6405965,56 30,56 Z',
  'M30,56 C38.2842712,56 45,44.3594035 45,30 C45,15.6405965 38.2842712,4 30,4 C21.7157288,4 15,15.6405965 15,30 C15,44.3594035 21.7157288,56 30,56 Z M30,52 C36.0751322,52 41,42.1502645 41,30 C41,17.8497355 36.0751322,8 30,8 C23.9248678,8 19,17.8497355 19,30 C19,42.1502645 23.9248678,52 30,52 Z',
  'M30,42 C44.3594035,42 56,36.627417 56,30 C56,23.372583 44.3594035,18 30,18 C15.6405965,18 4,23.372583 4,30 C4,36.627417 15.6405965,42 30,42 Z M30,38 C42.1502645,38 52,34.418278 52,30 C52,25.581722 42.1502645,22 30,22 C17.8497355,22 8,25.581722 8,30 C8,34.418278 17.8497355,38 30,38 Z',
];

const FULLSCREEN_PATHS = [
  'M0,20 L0,0 L20,0 L20,10 L10,10 L10,20 Z',
  'M40,0 L60,0 L60,20 L50,20 L50,10 L40,10 Z',
  'M60,40 L60,60 L40,60 L40,50 L50,50 L50,40 Z',
  'M20,60 L0,60 L0,40 L10,40 L10,50 L20,50 Z',
];

const COMPASS_PATHS = [
  'M30,60 C46.5685425,60 60,46.5685425 60,30 C60,13.4314575 46.5685425,0 30,0 C13.4314575,0 0,13.4314575 0,30 C0,46.5685425 13.4314575,60 30,60 Z M30,58 C45.463973,58 58,45.463973 58,30 C58,14.536027 45.463973,2 30,2 C14.536027,2 2,14.536027 2,30 C2,45.463973 14.536027,58 30,58 Z',
  'M42.7174074,12.0460131 C39.1265957,9.49790578 34.7382252,8 30,8 C25.2617748,8 20.8734043,9.49790578 17.2825926,12.0460131 L25.3754882,23.4712775 C26.6812379,22.544693 28.277009,22 30,22 C31.722991,22 33.3187621,22.544693 34.6245118,23.4712775 L42.7174074,12.0460131 Z',
  'M26,30 a4,4 0 1,1 8,0 a4,4 0 1,1 -8,0',
];

const VIEW_VR_PATHS = [
  'M17.9,26.2c-2.7,0-4.8,2.1-4.8,4.8s2.1,4.8,4.8,4.8s4.8-2.1,4.8-4.8S20.5,26.2,17.9,26.2z M41.9,12.9H18.1C8.1,12.9,0,21,0,31s8.1,18.1,18.1,18.1H42c10,0,18-8.1,18-18.1S52,12.9,41.9,12.9z M41.9,41.8h-3.6c-4,0-5.5-6.7-8.3-6.7s-4.1,6.7-8.3,6.7h-3.6c-6,0-10.9-4.9-10.9-10.9s4.9-10.9,10.9-10.9H42c6,0,10.9,4.9,10.9,10.9C52.8,37,48,41.8,41.9,41.8zM41.9,26.2c-2.7,0-4.8,2.1-4.8,4.8s2.1,4.8,4.8,4.8c2.7,0,4.8-2.1,4.8-4.8S44.5,26.2,41.9,26.2z',
];
/* eslint-enable max-len */

function createGlyph(width: number, height: number, color: string, paths: Array<string>) {
  if (!width) {
    throw new Error('No width specified!');
  }
  if (!height) {
    throw new Error('No height specified!');
  }
  const group = document.createElementNS(SVG_NS, 'g');
  group.setAttributeNS(null, 'fill', color);
  group.setAttributeNS(null, 'stroke', 'none');
  group.setAttributeNS(null, 'fill-rule', 'evenodd');
  for (let i = 0; i < paths.length; i++) {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttributeNS(null, 'd', paths[i]);
    group.appendChild(path);
  }
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttributeNS(null, 'width', width + 'px');
  svg.setAttributeNS(null, 'height', height + 'px');
  svg.setAttributeNS(null, 'viewBox', '0 0 60 60');
  svg.appendChild(group);
  return svg;
}

export function createGyroGlyph(width: number, height: number, color: string = '#ffffff') {
  return createGlyph(width, height, color, GYRO_PATHS);
}

export function createFullscreenGlyph(width: number, height: number, color: string = '#ffffff') {
  return createGlyph(width, height, color, FULLSCREEN_PATHS);
}

export function createCompassGlyph(width: number, height: number, color: string = '#ffffff') {
  return createGlyph(width, height, color, COMPASS_PATHS);
}

export function createViewInVrGlyph(width: number, height: number, color: string = '#ffffff') {
  return createGlyph(width, height, color, VIEW_VR_PATHS);
}
