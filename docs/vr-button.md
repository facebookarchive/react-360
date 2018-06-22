---
id: vr-button
title: VrButton
sidebar_label: VrButton
---

The VrButton is a utility class that detects click-type actions across a variety of input devices. It does this by implementing an internal state machine that listens to key-down events, followed by key-up events, while the cursor remains on the component. By default, a VrButton has no appearance and will only act as a wrapper to capture events, but it can be styled in the same ways as a View.

## Props

### **[View props...](view.md#props)**

### `disabled?: boolean`

If `true`, this component can't be interacted with

### `onButtonPress?: function`

Invoked when the button is focused an a confirmation button is pressed

### `onButtonRelease?: function`

Invoked when the button is focused an a confirmation button is released

### `onClick?: function`

Invoked when the button is clicked – a confirmation button is pressed, then released, while the button maintains the cursor's focus.

### `onLongClick?: function`

Invoked when the button is held after a long period of time