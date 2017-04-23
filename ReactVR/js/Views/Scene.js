/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Defines RCTScene "derived" from RTCBaseView.
 * Assigns 'this.view' to OVRUI.UIView(guiSys),
 * @class RCTScene
 * @extends RCTBaseView
 */

import RCTBaseView from './BaseView';
import merge from '../Utils/merge';
import * as OVRUI from 'ovrui';

export default class RCTScene extends RCTBaseView {
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys) {
    super();
    this.view = new OVRUI.UIView(guiSys);
  }

  /**
   * override the handling of the transform to become a no op
   */
  presentLayout() {}

  /**
   * Describes the properties representable by this view type and merges
   * with super type
   */
  static describe() {
    return merge(super.describe(), {});
  }
}
