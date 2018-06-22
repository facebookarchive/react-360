---
id: controller-info
title: ControllerInfo
sidebar_label: ControllerInfo
---

ControllerInfo exposes information about connected gamepads and controllers. It can be used to respond to controller connect / disconnect events, and extract static information about controllers (unique identifiers, button and axis counts, left vs right hand, etc). For listening to controller button states and poses, you should rely on React 360's input events instead.

## Methods

### `getControllers(): Promise`

Gets the current information from all connected controllers, returning a `Promise` that is resolved with an array of controller objects.
