---
id: timers
title: Timers
layout: docs
category: Guides
permalink: docs/timers.html
next: debugging
previous: animations
---

Timers are an important part of an application and React VR implements the [browser timers](https://developer.mozilla.org/en-US/Add-ons/Code_snippets/Timers).

## Timers

- setTimeout, clearTimeout
- setInterval, clearInterval
- setImmediate, clearImmediate
- requestAnimationFrame, cancelAnimationFrame

`requestAnimationFrame(fn)` is not the same as `setTimeout(fn, 0)`. The former fires after all of the frame has flushed, whereas the latter fires as quickly as possible (over 1000x per second on a iPhone 5S).

`setImmediate` is executed at the end of the current JavaScript execution block, right before sending the batched response back to native. Note that if you call `setImmediate` within a `setImmediate` callback, it will be executed right away, and it won't yield back to native in between.

Note: The `Promise` implementation uses `setImmediate` as its asynchronicity primitive.



## TimerMixin

We discovered that the primary cause of fatal system errors in React VR apps was timers firing after a component was unmounted. To solve this recurring issue, we introduced `TimerMixin`. If you include `TimerMixin`, you can replace your calls to `setTimeout(fn, 500)` with `this.setTimeout(fn, 500)` and everything is properly cleaned up for you when the component unmounts.

This library does not ship with React VR. To use it in your project, install it with `npm i react-timer-mixin --save` from your project directory.

```javascript
import TimerMixin from 'react-timer-mixin';

var Component = React.createClass({
  mixins: [TimerMixin],
  componentDidMount: function() {
    this.setTimeout(
      () => { console.log('I do not leak!'); },
      500
    );
  }
});
```

Using this library mitigates some of the hard work tracking down system crashes.

Note: If you use ES6 classes for your React components [there is no built-in API for mixins](https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#mixins). To use `TimerMixin` with ES6 classes, we recommend [react-mixin](https://github.com/brigand/react-mixin).
