/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * RCTImage: runtime implementation of the <Image source={{uri:URL}}>
 * @class RCTImage
 * @extends RCTBaseView
 * @flow
 */

import UIView from '../OVRUI/UIView/UIView';
import merge from '../Utils/merge';

import type GuiSys from '../OVRUI/UIView/GuiSys';
import type {ReactNativeContext} from '../ReactNativeContext';
import RCTBaseView from './BaseView';

export default class RCTImage extends RCTBaseView {
  _rnctx: ReactNativeContext;

  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys: GuiSys, rnctx: ReactNativeContext) {
    super();
    this.view = new UIView(guiSys);
    this._rnctx = rnctx;

    // assign the property function mappings
    Object.defineProperty(
      this.props,
      'source',
      ({
        set: value => {
          // call onLoadStart in React
          this.UIManager._rnctx.callFunction(
            'RCTEventEmitter',
            'receiveEvent',
            [this.getTag(), 'topLoadStart', []],
          );
          // only interested in the uri for the source
          if (value.uri.indexOf('texture://') === 0) {
            this._rnctx.TextureManager.getTextureForURL(value.uri)
              .then(tex => {
                this.view.setImageTexture(tex);
                const image = tex.image;
                let width;
                let height;
                if (image instanceof Image) {
                  width = image.naturalWidth;
                  height = image.naturalHeight;
                } else {
                  width = image.width || 0;
                  height = image.height || 0;
                }
                this.UIManager._rnctx.callFunction(
                  'RCTEventEmitter',
                  'receiveEvent',
                  [
                    this.getTag(),
                    'topLoad',
                    {
                      url: value.uri,
                      source: value,
                      width: width,
                      height: height,
                    },
                  ],
                );
                // call onLoadEvent in React
                this.UIManager._rnctx.callFunction(
                  'RCTEventEmitter',
                  'receiveEvent',
                  [this.getTag(), 'topLoadEnd', []],
                );
              })
              .catch(() => {
                // call onLoadEvent in React
                this.UIManager._rnctx.callFunction(
                  'RCTEventEmitter',
                  'receiveEvent',
                  [this.getTag(), 'topLoadEnd', []],
                );
              });
          } else {
            this.view.setImage(value.uri, (loaded, width, height) => {
              // call onLoad in React
              if (loaded) {
                this.UIManager._rnctx.callFunction(
                  'RCTEventEmitter',
                  'receiveEvent',
                  [
                    this.getTag(),
                    'topLoad',
                    {
                      url: value.uri,
                      source: value,
                      width: width,
                      height: height,
                    },
                  ],
                );
              }
              // call onLoadEvent in React
              this.UIManager._rnctx.callFunction(
                'RCTEventEmitter',
                'receiveEvent',
                [this.getTag(), 'topLoadEnd', []],
              );
            });
          }
        },
      }: Object),
    );
    Object.defineProperty(
      this.props,
      'resizeMode',
      ({
        set: value => {
          if (value === null) {
            value = 'stretch';
          }
          this.view.setResizeMode(value);
        },
      }: Object),
    );
    Object.defineProperty(
      this.props,
      'inset',
      ({
        set: value => {
          this.view.setInset(value);
        },
      }: Object),
    );
    Object.defineProperty(
      this.props,
      'insetSize',
      ({
        set: value => {
          this.view.setInsetSize(value);
        },
      }: Object),
    );
    Object.defineProperty(
      this.props,
      'crop',
      ({
        set: value => {
          this.view.setTextureCrop(value);
        },
      }: Object),
    );
    Object.defineProperty(
      this.props,
      'pointerEvents',
      ({
        set: value => {
          if (value === null) {
            value = 'auto';
          }
          this.view.setPointerEvents(value);
        },
      }: Object),
    );
    Object.defineProperty(
      this.props,
      'hitSlop',
      ({
        set: value => {
          if (value === null) {
            value = 0;
          }
          if (typeof value === 'number') {
            this.view.setHitSlop(value, value, value, value);
          } else {
            this.view.setHitSlop(
              value.left,
              value.top,
              value.right,
              value.bottom,
            );
          }
        },
      }: Object),
    );
    this.props.inset = [0.0, 0.0, 0.0, 0.0];
    this.props.insetSize = [0.0, 0.0, 0.0, 0.0];

    // assign the style property function mappings
    // setter for tintColor, this is applied as a tint to the image
    Object.defineProperty(
      this.style,
      'tintColor',
      ({
        set: value => {
          if (value === null) {
            value = 0xffffffff;
          }
          this.view.setImageColor(value);
        },
      }: Object),
    );
  }

  /**
   * Customised present layout so that the border settings can be updated
   */
  presentLayout() {
    super.presentLayout();
  }

  /**
   * Describes the properties representable by this view type and merges
   * with super type
   */
  static describe() {
    return merge(super.describe(), {
      // declare the supported properties send from react to native
      NativeProps: {
        source: 'string',
        resizeMode: 'string',
        inset: 'number',
        insetSize: 'number',
        crop: 'number',
        pointerEvents: 'string',
        hitSlop: 'number',
      },
    });
  }
}
