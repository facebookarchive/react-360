# transition-value - Implementing values that animate with a tweening function

The `transition-value` package implements value containers that smoothly
transition whenever the inner value is changed, similar to how CSS Transitions
work.

A Transition Value is a container with a custom tweening function. It stores
an inner value representing a continuous data point. At any point in time, the
current value can be fetched with the `getValue()` method. When the inner value
is changed, the results of `getValue()` will smoothly transition from the old
value to the new one for some duration of time. After the transition period, it
will always return the new value. The duration, and the tweening function used
to determine the intermediate value during this transition, are specific to each
Transition Value.

The tweening function computes where the "current" value is between the old and
new one, based on the current time of the transition. In order to work for any
duration and any output values, the tweening function takes an argument
representing the current time on a unitless interval from 0.0 to 1.0, and
outputs the position between the old value and the new value using a similar
unitless interval from 0.0 to 1.0.

For example, a simple linear transition function would look like this:

```js
function linearTransition(t) {
  // At t = 0, we are at the old value (return value 0)
  // At t = 1, we are at the new value (return value 1)
  // At any point in between, our progress towards the new value is equivalent
  // to how far in the transition duration we are
  return t;
}
```

A function that follows a quadratic curve from slow to fast transitioning might
look like:

```js
function quadraticTransition(t) {
  return t * t;
}
```

You can even implement a function that produces random noise between the two
positions:

```js
function randomTransition(t) {
  return Math.random();
}
```
