---
id: platform-specific-code
title: Platform Specific Code
layout: docs
category: Guides
permalink: docs/platform-specific-code.html
next: view
previous: debugging
---

When building a cross-platform app, you usually want to re-use as much code as possible. Scenarios may arise where it makes sense for the code to be different. For example you may want to implement separate visual components for iOS and Android.

React Native provides two ways to easily organize your code and separate it by platform:

* Using the [`Platform` module](docs/platform-specific-code.html#platform-module).
* Using [platform-specific file extensions](docs/platform-specific-code.html#platform-specific-extensions).

Certain components may have properties that work on one platform only. All of these props are annotated with `@platform` and have a small badge next to them on the website.


## Platform module

React Native provides a module that detects the platform in which the app is running. You can use the detection logic to implement platform-specific code. Use this option when only small parts of a component are platform-specific.

```javascript
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  height: (Platform.OS === 'vr') ? 1 : 100,
});
```

`Platform.OS` will be `vr` when running on WebVR.

There is also a `Platform.select` method available, that given an object containing Platform.OS as keys, returns the value for the platform you are currently running on.

```javascript
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'blue',
      },
      vr: {
        backgroundColor: 'orange',
      },
    }),
  },
});
```

This will result in a container having `flex: 1` on all platforms, a red background color on iOS, a blue background color on Android and an orange background color for VR.

## Platform-specific extensions

When your platform-specific code is more complex, consider splitting the code out into separate files. React Native detects when a file has a `.ios.`, `.android.` or `.vr.` extension and loads the relevant platform file from other components as required.

For example, say you have the following files in your project:

```sh
BigButton.ios.js
BigButton.android.js
BigButton.vr.js
```

You can then require the component as follows:

```javascript
const BigButton = require('./BigButton');
```

React Native automatically picks up the right file based on the running platform.
