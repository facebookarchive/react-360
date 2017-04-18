---
id: animations
title: Animations
layout: docs
category: Guides
permalink: docs/animations.html
next: timers
previous: images
---

Fluid, meaningful animations are essential to the VR Web user experience.

### Animated ###

The **`Animated`** library is designed to make it easy to concisely express a
wide variety of interesting animation and interaction patterns while providing
efficient performance. **`Animated`** focuses on declarative relationships between
inputs and outputs, with configurable transforms in between, and simple
**start** and **stop** methods to control time-based animation execution.

For example, a complete component with a simple spring bounce on mount looks
like this:

```
class Playground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    };
  }
  render() {
    return (
      <Animated.Image                         // Base: Image, Text, View
        source={{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
        style={{
          flex: 1,
          width: 1,
          height: 1,
          transform: [                        // `transform` is an ordered array
            {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
          ]
        }}
      />
    );
  }
  componentDidMount() {
    this.state.bounceValue.setValue(1.5);     // Start large
    Animated.spring(                          // Base: spring, decay, timing
      this.state.bounceValue,                 // Animate `bounceValue`
      {
        toValue: 0.8,                         // Animate to smaller size
        friction: 1,                          // Bouncier spring
      }
    ).start();                                // Start the animation
  }
}
```

In the code example, **`bounceValue`** is initialized as part of **`state`** in
the constructor and mapped to the scale transform on the image.  Behind the
scenes, the code extracts the numeric value and uses it to set the scale.  After
the component mounts, the code sets the scale to 1.5 and then starts a spring
animation on **`bounceValue`**. All the dependent mappings get updated on each
frame as the spring animates (in this case, only the scale). This is done in an
optimized way that is faster than calling **`setState`** and re-rendering.

Because the entire configuration is
declarative, we could implement further optimizations that serialize the
configuration and run the animation on a high-priority thread.

#### Core API

Most everything you need hangs directly off the **`Animated`** module.  This
includes:

* two value types:
**`Value`** for single values and **`ValueXY`** for vectors.

* three animation types:
**`spring`**, **`decay`**, and **`timing`**.

* three component types:
**`View`**, **`Text`**, and **`Image`**.

You can make any other component animated with
`Animated.createAnimatedComponent`.

The three animation types can be used to create almost any animation curve you
want because each can be customized:

* **`spring`**: Simple single-spring physics model that matches [Origami](https://facebook.github.io/origami/).
 * **`friction`**: Controls "bounciness"/overshoot.  Default 7.
 * **`tension`**: Controls speed.  Default 40.
* **`decay`**: Starts with an initial velocity and gradually slows to a stop.
 * **`velocity`**: Initial velocity.  Required.
 * **`deceleration`**: Rate of decay.  Default 0.997.
* **`timing`**: Maps time range to easing value.
 * **`duration`**: Length of animation (milliseconds).  Default 500.
 * **`easing`**: Easing function to define a curve. See the **`Easing`** module for several
 predefined functions. The iOS default is **`Easing.inOut(Easing.ease)`**.
 * **`delay`**: Starts the animation after a delay (milliseconds).  Default 0.

Start animations by calling **`start()`**. There is a completion callback for
**`start()`** called when the animation ends.  If the animation ends
because it finished running normally, the completion callback is invoked
with **`{finished: true}`**. But, if the animation ends because **`stop`** was called
on it before it could finish (for example, if it was interrupted by a
gesture or another animation), then it receives **`{finished: false}`**.

#### Composing Animations

Animations can also be composed with **`parallel`**, **`sequence`**, **`stagger`**, and
**`delay`**. Each simply takes an array of animations to execute as input and
automatically calls **start** and **stop** as appropriate.  For example:

```javascript
Animated.sequence([            // spring to start and twirl after decay finishes
  Animated.decay(position, {   // coast to a stop
    velocity: {x: gestureState.vx, y: gestureState.vy}, // velocity from gesture release
    deceleration: 0.997,
  }),
  Animated.parallel([          // after decay, in parallel:
    Animated.spring(position, {
      toValue: {x: 0, y: 0}    // return to start
    }),
    Animated.timing(twirl, {   // and twirl
      toValue: 360,
    }),
  ]),
]).start();                    // start the sequence group
```

If one animation is stopped or interrupted, the default behavior is to stop all
other animations in the group. Parallel has a **`stopTogether`** option
that can be set to **`false`** to change this behavior.

#### Interpolation

Another powerful part of the **`Animated`** API is the **`interpolate`** function.  It
allows input ranges to map to different output ranges.  For example, here is a
simple mapping to convert a 0-1 range to a 0-100 range:

```javascript
value.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 100],
});
```

**`interpolate`** supports multiple range segments as well, which is handy for
defining dead zones and other handy tricks.  The following example creates a negation
relationship at -300 that goes to 0 at -100, to 1 at 0, to 0 at 100,
and then creates a dead-zone that remains at 0 for all input beyond that:

```javascript
value.interpolate({
  inputRange: [-300, -100, 0, 100, 101],
  outputRange: [300,    0, 1,   0,   0],
});
```

Which would map like so:

Input | Output
------|-------
  -400|    450
  -300|    300
  -200|    150
  -100|      0
   -50|    0.5
     0|      1
    50|    0.5
   100|      0
   101|      0
   200|      0

**`interpolate`** also supports mapping to strings, allowing you to animate colors as well as values with units. This example animates a rotation:

```javascript
value.interpolate({
  inputRange: [0, 360],
  outputRange: ['0deg', '360deg']
})
```

**`interpolation`** also supports arbitrary easing functions, many of which are
already implemented in the
[`Easing`](https://github.com/facebook/react-vr/blob/master/Libraries/Animation/Animated/Easing.js)
class. This includes quadratic, exponential, and bezier curves as well as functions
such as **`step`** and **`bounce`**. **`interpolation`** also has configurable behavior for
extrapolating the **`outputRange`**. You can set the extrapolation by setting the **`extrapolate`**,
**`extrapolateLeft`**, or **`extrapolateRight`** options. The default value is
**`extend`** but you can use **`clamp`** to prevent the output value from exceeding
**`outputRange`**.

#### Tracking Dynamic Values

Animated values can also track other values. Instead of setting the **`toValue`** of an
animation to a static value, you can set it to an animated value. For example, to
spring physics for an interaction like "Chat Heads", or to **`timing`** with
**`duration: 0`** for rigid/instant tracking.  You can also compose dynamic values through
interpolation:

```javascript
Animated.spring(follower, {toValue: leader}).start();
Animated.timing(opacity, {
  toValue: pan.x.interpolate({
    inputRange: [0, 300],
    outputRange: [1, 0],
  }),
}).start();
```

**`ValueXY`** is a handy way to deal with 2D interactions such as panning or dragging.
It is a simple wrapper that contains two **`Animated.Value`**
instances and some helper functions that call through to them. **`ValueXY`**
is a drop-in replacement for **`Value`** in many cases.  For example, in the code
snippet above, **`leader`** and **`follower`** could both be of type **`ValueXY`** and the x
and y values would track as you expect.

#### Responding to the Current Animation Value

You might have noticed there is no obvious way to read the current value in mid-animation.
Due to the effects of optimizations, only the native runtime knows the current value.
If you need to run JavaScript in response to the current
value, there are two approaches:

- **`spring.stopAnimation(callback)`** stops the animation and invokes **`callback`**
with the final value - this is useful when making gesture transitions.
- **`spring.addListener(callback)`** invokes **`callback`** asynchronously while the
animation is running, providing a recent value.  This is useful for triggering
state changes such as snapping a bobble to a new option as the user drags
it closer. This is the preferred method for large state changes as they are less
sensitive to a few frames of lag compared to continuous gestures like panning
which need to run at 60fps.

### requestAnimationFrame

**`requestAnimationFrame`** is a polyfill from the browser you might be
familiar with. It accepts a function as its only argument and calls that
function before the next repaint. It is an essential building block for
animations and underlies all of the JavaScript-based animation APIs.  In
general, you shouldn't need to call this yourself - the animation APIs will
manage frame updates for you.

#### A sidenote about setNativeProps

**`setNativeProps`** allows us to modify properties of native-backed
components (components that are actually backed by native views, unlike
composite components) directly, without having to **`setState`** and
re-render the component hierarchy.

We could use this in the Rebound example to update the scale. This
might be helpful if the component that we are updating is deeply nested
and hasn't been optimized with **`shouldComponentUpdate`**.

```
// Back inside of the App component, replace the scrollSpring listener
// in componentWillMount with this:
this._scrollSpring.addListener({
  onSpringUpdate: () => {
    if (!this._photo) { return }
    var v = this._scrollSpring.getCurrentValue();
    var newProps = {style: {transform: [{scaleX: v}, {scaleY: v}]}};
    this._photo.setNativeProps(newProps);
  },
});

// Lastly, we update the render function to no longer pass in the
// transform via style (avoid clashes when re-rendering) and to set the
// photo ref
render() {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPressIn={this._onPressIn} onPressOut={this._onPressOut}>
        <Image ref={component => this._photo = component}
               source={{uri: "img/ReboundExample.png"}}
               style={{width: 250, height: 200}} />
      </TouchableWithoutFeedback>
    </View>
  );
}
```

It would not make sense to use **`setNativeProps`** with react-tween-state
because the updated tween values are set on the state automatically by
the library. Rebound, on the other hand, gives us an updated value for
each frame with the **`onSpringUpdate`** function.

If your animations are dropping frames and performing below 60
frames per second, look into using **`setNativeProps`** or
**`shouldComponentUpdate`** to optimize them.

### LayoutAnimation

**`LayoutAnimation`** lets you globally configure **`create`** and **`update`**
animations used for all views in the next render/layout cycle. This is useful
for performing flexbox layout updates without needing to measure or calculate
specific properties to animate them directly. It is especially useful when
layout changes might affect ancestors.

A good example is a "see more" expansion that increases the size of the
parent and pushes down the row below. Without using **`LayoutAnimation`**, this
would require explicit coordination between the components to synchronize their
animations.

While **`LayoutAnimation`** is very powerful and can be quite useful,
it provides much less control than **`Animated`** and other animation libraries.
If you can't get **`LayoutAnimation`** to do what you want, you may need to use
another approach.

See LayoutAnimation.js for more information.
