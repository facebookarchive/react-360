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

import * as React from 'react';
import {Image, type ViewStyles} from './Primitives'; // eslint-disable-line no-unused-vars

type Props = {|
  source?: string,
  style?: ViewStyles,
|};

export default class Video extends React.PureComponent<Props> {
  render() {
    const {source, style} = this.props;
    const uri = source ? `video://${source}` : '';
    return <Image style={style} source={{uri}} />;
  }
}
