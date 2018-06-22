---
id: native-modules
title: Native Modules
sidebar_label: Native Modules
---

Native Modules provide the ability for React code to call back into your runtime, and provide functionality that's only available in the main browser environment. Examples include storing values between loads, requesting information about connected controllers, or manipulating the rendered environment.

## Custom Native Modules

### Creating New Native Modules

Native Modules are created in your runtime code (client.js), and need to be registered at startup time before React can use them. A sample application demonstrating the many uses of Native Modules is [available here](/react-360/docs/example-native-modules.html). Each aspect of Native Modules will be described below.

To create a Native Module, you need to extend `Module` and register it at initialization time.

```js
import {Module} from 'react-360-web';

class MyModule extends Module {
  constructor() {
    super('MyModule'); // Makes this module available at NativeModules.MyModule
  }

  // This method will be exposed to the React app
  doSomething() {

  }
}

const r360 = new ReactInstance(
  'MyApp.bundle?platform=vr',
  document.getElementById('container'),
  {
    // Register custom modules at init time
    nativeModules: [
      new MyModule(),
    ]
  }
);
```

The `nativeModules` array can either receive Native Module instances directly, or a function that will return a Native Module instance. This second case can be helpful if you need to supply values at construction time, as you'll see later on.

### Exposing Constants to React

The simplest use case for Native Modules is to pass constant values from the main browser window to React. These are values known at initialization time that do not change, like the browser's language or user agent string. Any values attached to your Native Module in the constructor *which do not start with an underscore* will be available in React.

```js
// in client.js
class MyModule extends Module {
  constructor() {
    super('MyModule');
    someConstant = 42;
  }
}
```

```js
// in index.js
import {NativeModules} from 'react-360';
const {MyModule} = NativeModules;

assert(MyModule.someConstant === 42);
```

### Simple Methods

To trigger an effect in the main browser window that doesn't require any feedback, simply add a method to your Native Module class. It can be called on the React side, and the arguments will be copied over to the Runtime. This effect can be seen in the Native Modules example with the method that sets the browser window title.

**NOTE:** if you need to add a method to your Native Module class that you don't want accessible on the React side, prefix it with an underscore.

### Methods with Callbacks

Often, a Native Module method is used to retrieve data from the main browser window. Due to the asynchronous communication between the React code and the Runtime, values cannot be returned from your Native Module methods. Instead, the value needs to be passed to a callback method, a standard JavaScript technique for asynchronous communication.

Once the Native Module has fetched the necessary data, it needs to invoke the callback using the `ReactNativeContext`. This requires a reference to that context, which can be provided at initialization time.

```js
// in client.js

import {Module} from 'react-360-web';

class MyModule extends Module {
  constructor(ctx) {
    super('MyModule');

    this._ctx = ctx;
  }

  getValueWithCallback(id) {
    ctx.invokeCallback(
      id, // callback id, passed to the method
      [42, 'hello'] // array of arguments passed to callback
    );
  }
}

const r360 = new ReactInstance(
  'MyApp.bundle?platform=vr',
  document.getElementById('container'),
  {
    // Register custom modules at init time
    nativeModules: [
      ctx => new MyModule(ctx), // Use the function initializer
                                // to get the context
    ]
  }
);
```

```js
// in index.js
import {NativeModules} from 'react-360';
const {MyModule} = NativeModules;

MyModule.getValueWithCallback((a, b) => {
  assert(a === 42);
  assert(b === 'hello');
});
```

### Methods Returning Promises

In modern JavaScript, Promises are often favored as a method of asynchronous communication. Instead of using callbacks directly, you can create Native Module methods that return Promises by appending their names with a dollar sign ($). The dollar sign will be ignored on the React side when the method is called. Two callback IDs will be automatically passed to the Runtime, representing the `resolve` and `reject` methods of the Promise.

```js
// in client.js

import {Module} from 'react-360-web';

class MyModule extends Module {
  constructor(ctx) {
    super('MyModule');

    this._ctx = ctx;
  }

  $getValueWithPromise(resolveID, rejectID) {
    // Resolve the Promise
    ctx.invokeCallback(
      resolveID,
      [42] // array of arguments passed to resolve method
    );
  }
}

const r360 = new ReactInstance(
  'MyApp.bundle?platform=vr',
  document.getElementById('container'),
  {
    // Register custom modules at init time
    nativeModules: [
      ctx => new MyModule(ctx),
    ]
  }
);
```

```js
// in index.js
import {NativeModules} from 'react-360';
const {MyModule} = NativeModules;

MyModule.getValueWithPromise().then(value => {
  assert(value === 42);
});
```