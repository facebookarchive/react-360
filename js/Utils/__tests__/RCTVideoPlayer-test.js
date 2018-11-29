/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

jest
  .dontMock('../RCTVideoPlayer')
  .mock('../../Video/getSupportedFormats', () => () => ['mp4', 'mkv']);

const RCTVideoPlayer = require('../RCTVideoPlayer').default;
const rnctx = {
  VideoModule: {
    _addMediaEventListener: jest.fn(),
    addHandle: jest.fn(),
    setUrl: jest.fn(),
    setMetaData: jest.fn(),
    load: jest.fn(),
    unload: jest.fn(),
    setMuted: jest.fn(),
    setVolume: jest.fn(),
    setFormat: jest.fn(),
  },
};

describe('RCTVideoPlayer', () => {
  it('set source to null', () => {
    const player = new RCTVideoPlayer(rnctx, '');
    player.setSource({uri: '1.mp4'});
    player.setSource(null);
    expect(player._source).toEqual(null);
  });

  it('set source to an empty array', () => {
    const player = new RCTVideoPlayer(rnctx, '');
    player.setSource([]);
    expect(player._source).toEqual(null);
  });

  it('set source to a valid source', () => {
    const player = new RCTVideoPlayer(rnctx, '');
    player.setSource({uri: '1.mp4'});
    expect(player._source).toEqual({uri: '1.mp4'});
  });

  it('choose supported formats from source', () => {
    const player = new RCTVideoPlayer(rnctx, '');
    player.setSource([{uri: '1.webm', format: 'webm'}, null, {uri: '1.mp4', format: 'mp4'}]);
    expect(player._source).toEqual({uri: '1.mp4', format: 'mp4'});
  });

  it('order of choosing supported formats from source', () => {
    const player = new RCTVideoPlayer(rnctx, '');
    player.setSource([
      {uri: '1.mkv', format: 'mkv', layout: 'SPHERE'},
      {uri: '1.mp4', format: 'mp4'},
    ]);
    expect(player._source).toEqual({uri: '1.mkv', format: 'mkv', layout: 'SPHERE'});
  });

  it('none of the formats from source is supported', () => {
    const player = new RCTVideoPlayer(rnctx, '');
    player.setSource([{uri: '1.webm', format: 'webm'}, {uri: '1.ogg', format: 'ogg'}]);
    expect(player._source).toEqual(null);
  });

  it('one of the source has not specify the format', () => {
    const player = new RCTVideoPlayer(rnctx, '');
    player.setSource([{uri: '1.webm', format: 'webm'}, {uri: '1.mov'}]);
    expect(player._source).toEqual({uri: '1.mov'});
  });
});
