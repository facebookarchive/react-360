---
id: vr-browsers
title: VR Browsers
layout: docs
category: The Basics
permalink: docs/vr-browsers.html
next: colors
---

### Viewing your project on a mobile phone

Clicking and dragging your way around the 360 world isn't the most exciting experience. You can view your world in more depth on a mobile device or through the Samsung Gear VR headset. Simply launch your phone's web browser and point it to your project's web site on your development computer. Locally, you access your project by visiting `http://localhost:8081/vr/index.html`. If your phone is on the same wireless network, you can replace “localhost” with your development computer's IP address on the network. So, if your computer has the IP of `192.168.1.100`, you should be able to access it on your phone by going to `http://192.168.1.100:8081/vr/index.html`.

If the phone is setup for Android developer mode and is connected to your development computer by USB; it is also possible to make use of `adb reverse` using the command line:
```
adb reverse tcp:8081 tcp:8081
```
This lets you navigate directly to `http://localhost:8081/vr/index.html` on your browser.

Once it loads, you can explore your 3d world by moving your phone around. If you have a Gear VR headset and you've [installed the Carmel Developer Preview browser from Oculus](https://www.oculus.com/experiences/gear-vr/1290985657630933/), you can also view your world on your mobile headset. Tap the “View in VR” button on your app, and it will ask you to insert your phone into the headset. Put it on, and you'll be transported into your VR world. Take it off, and you'll be back to the web browser where you started.

The "View in VR" button is always displayed in development builds on Android devices, so that you can deep-link to Carmel. In production builds, it will only be displayed if you are viewing the app in a browser that supports the WebVR API. You can force this button to appear in production Android builds by passing `allowCarmelDeeplink: true` to the `VRInstance` in your `client.js` file.
