/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const Animated = require('animated');
const React = require('react');

function createAnimatedComponent(Component) {
  class AnimatedComponent extends React.Component {
    constructor(props) {
      super(props);
    }

    componentWillUnmount() {
      this._propsAnimated && this._propsAnimated.__detach();
    }

    setNativeProps(props) {
      this._component.setNativeProps(props);
    }

    UNSAFE_componentWillMount() {
      this._attachProps(this.props);
    }

    componentDidMount() {
      if (this._invokeAnimatedPropsCallbackOnMount) {
        this._invokeAnimatedPropsCallbackOnMount = false;
        this._animatedPropsCallback();
      }
    }

    _animatedPropsCallback = () => {
      if (this._component == null) {
        this._invokeAnimatedPropsCallbackOnMount = true;
      } else if (typeof this._component.setNativeProps !== 'function') {
        this.forceUpdate();
      } else {
        this._component.setNativeProps(this._propsAnimated.__getAnimatedValue());
      }
    };

    _attachProps(nextProps) {
      const oldPropsAnimated = this._propsAnimated;
      this._propsAnimated = new Animated.__PropsOnlyForTests(
        nextProps,
        this._animatedPropsCallback
      );
      oldPropsAnimated && oldPropsAnimated.__detach();
    }

    UNSAFE_componentWillReceiveProps(newProps) {
      this._attachProps(newProps);
    }

    render() {
      const props = this._propsAnimated.__getValue();
      return <Component {...props} ref={this._setComponentRef} />;
    }

    _setComponentRef = c => {
      this._prevComponent = this._component;
      this._component = c;
    };

    getNode() {
      return this._component;
    }
  }

  return AnimatedComponent;
}

module.exports = createAnimatedComponent;
