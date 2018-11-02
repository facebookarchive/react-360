/**
 * Copyright 2015-present Oculus VR, LLC. All Rights Reserved.
 *
 * Video Module is the wrapper of native video module
 *
 * @flow
 * @providesModule VideoModule
 */

import {NativeModules} from 'react-native';
import EventEmitter from 'EventEmitter';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

import type EmitterSubscription from 'EmitterSubscription';

const NativeVideoModule = NativeModules.VideoModule || {};
// This represents the maximum number of video players available on the platform
// a value of -1 indicates it supports an infinite number of players.
const maxPlayers = NativeVideoModule.maxPlayers || 1;

// same types as Compositor/Video/Types
export type VideoPlayerStatus =
  | 'closed' // No session.
  | 'closing' // Session is being closed.
  | 'failed' // Session had an error.
  | 'finished' // Session has finished playing video
  | 'paused' // Session is paused.
  | 'playing' // Session is playing a video.
  | 'seeking' // Session is seeking a position
  | 'ready' // Session is ready to play a video.
  | 'stopped'; // Session is stopped (ready to play)

export type VideoStereoFormat = '2D' | '3DLR' | '3DTB' | '3DBT' | 'UNKNOWN';
export type VideoLayout = 'RECT' | 'SPHERICAL';

export type VideoRotation = {
  yaw: number,
};

export type VideoSource = {
  fileFormat?: string,
  url: string,
};

export type VideoPlayOptions = {
  fadeLevel?: number,
  fadeSpeed?: number,
  forceMono?: boolean,
  layout?: VideoLayout,
  muted?: boolean,
  rotation?: VideoRotation,
  stereo?: VideoStereoFormat,
  volume?: number,
};

export type VideoOptions = VideoPlayOptions & {
  source: VideoSource | Array<VideoSource>,
  startPosition?: number,
  autoPlay?: boolean,
};

export type VideoEvent = {
  player: string,
};

export type VideoStatusEvent = VideoEvent & {
  duration: number,
  error?: string,
  isBuffering: boolean,
  isMuted: boolean,
  position: number,
  status: VideoPlayerStatus,
  volume: number,
};

export type onVideoStatusChangedCallback = (event: VideoStatusEvent) => void;

/**
 * JS wrapper of native module `VideoModule`
 * Example of usage:
 * const player = VideoModule.getPlayer('default');
 * const player.play({
 *   source: {
 *     url: "http://www.xxx.xx/video.mp4",
 *   },
 *   volume: 0.7,
 *   stereo: '3DLR',
 * });
 * player.pause();
 * player.resume();
 * player.seek(5000);
 * player.stop();
 */
class VideoModuleImpl {
  maxPlayers: number = maxPlayers;
  _players: {[string]: VideoPlayerInstance};
  _nextPlayerNameId: number = 0;

  constructor() {
    this._players = {};
  }

  createPlayer(name?: string) {
    if (maxPlayers !== -1 && Object.keys(this._players).length >= maxPlayers) {
      throw new Error(
        `Unable to create another video player, this platform only supports a maximum of ${maxPlayers} players at once.`
      );
    }
    if (!name) {
      name = `auto_video_player_${this._nextPlayerNameId++}`;
    }
    if (name in this._players) {
      throw new Error(
        `Unable to create video player with name ${name} because a player already exists with that name.`
      );
    }
    NativeVideoModule.createPlayer(name);
    this._players[name] = new VideoPlayerInstance(name);
    return this._players[name];
  }

  destroyPlayer(name: string) {
    if (name === 'default') {
      throw new Error('The default video player cannot be destroyed.');
    }
    if (!(name in this._players)) {
      throw new Error(
        `Unable to delete video player with name ${name} because it does not exist.`
      );
    }
    NativeVideoModule.destroyPlayer(name);
    delete this._players[name];
  }

  // Get a video player instance to play video
  getPlayer(name?: string): VideoPlayerInstance {
    name = name || 'default';
    if (this._players[name]) {
      return this._players[name];
    } else {
      throw new Error(`Unable to find video player with name "${name}".`);
    }
  }

  // play a video for player
  // Don't use this directly, please use VideoPlayerInstance methods instead
  play(player: string, options: VideoOptions) {
    NativeVideoModule.play(player, options);
  }

  // pause the video
  // Don't use this directly, please use VideoPlayerInstance methods instead
  pause(player: string) {
    NativeVideoModule.pause(player);
  }

  // resume the video
  // Don't use this directly, please use VideoPlayerInstance methods instead
  resume(player: string) {
    NativeVideoModule.resume(player);
  }

  // stop the video
  // Don't use this directly, please use VideoPlayerInstance methods instead
  stop(player: string) {
    NativeVideoModule.stop(player);
  }

  // seek the video
  // Don't use this directly, please use VideoPlayerInstance methods instead
  seek(player: string, timeMs: number) {
    NativeVideoModule.seek(player, timeMs);
  }

  // set the parameters of video
  // Don't use this directly, please use VideoPlayerInstance methods instead
  setParams(player: string, options: VideoPlayOptions) {
    NativeVideoModule.setParams(player, options);
  }

  _onVideoEvents(eventType: string, event: VideoEvent) {
    if (this._players[event.player]) {
      this._players[event.player]._emitter.emit(eventType, event);
    }
  }

  _initializeDefaultPlayer() {
    this.createPlayer('default');
  }
}

const VideoModule = new VideoModuleImpl();
const VideoEventTypes = ['onVideoStatusChanged'];
for (const eventType of VideoEventTypes) {
  RCTDeviceEventEmitter.addListener(eventType, (event: VideoEvent) => {
    VideoModule._onVideoEvents(eventType, event);
  });
}

class VideoPlayerInstance {
  _player: string;
  _emitter = new EventEmitter();

  constructor(player: string) {
    this._player = player;
  }

  // play a video for player
  play(options: VideoOptions) {
    VideoModule.play(this._player, options);
  }

  // pause the video
  pause() {
    VideoModule.pause(this._player);
  }

  // resume the video
  resume() {
    VideoModule.resume(this._player);
  }

  // stop the video
  stop() {
    VideoModule.stop(this._player);
  }

  // seek the video
  seek(timeMs: number) {
    VideoModule.seek(this._player, timeMs);
  }

  setVolume(volume: number) {
    VideoModule.setParams(this._player, {
      volume,
    });
  }

  setMuted(muted: boolean) {
    VideoModule.setParams(this._player, {
      muted,
    });
  }

  // set the parameters of video
  setParams(options: VideoPlayOptions) {
    VideoModule.setParams(this._player, options);
  }

  destroy() {
    VideoModule.destroyPlayer(this._player);
  }

  addListener(
    eventType: string,
    listener: onVideoStatusChangedCallback
  ) {
    return this._emitter.addListener(eventType, listener);
  }

  removeSubscription(subscription: EmitterSubscription) {
    this._emitter.removeSubscription(subscription);
  }
}

VideoModule._initializeDefaultPlayer();
export const DefaultVideoPlayer = VideoModule.getPlayer();

export default VideoModule;
