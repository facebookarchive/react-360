---
id: text
title: Text
sidebar_label: Text
---

Text is a React component for displaying strings. It supports nesting, and styling through size, weight, and color. All strings displayed by your app must be wrapped within Text components – you cannot have a string as the direct child of a View.

## Layout

The Text component is special when it comes to layout. Everything inside a Text element uses text layout instead of flexbox layout. This means elements inside Text are no longe rectangles, but instead wrap when they reach the end of a line.

```html
<Text>
  <Text>First part and </Text>
  <Text>second part</Text>
</Text>
// Text container: all the text flows as if it was one
// |First part |
// |and second |
// |part       |
```

As opposed to

```html
<View>
  <Text>First part and </Text>
  <Text>second part</Text>
</View>
// View container: each text is its own block
// |First part |
// |and        |
// |second part|
```

## Props

### `style? Style | Object`
### color `color`
### fontSize `number`
### fontWeight ```'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'```
### lineHeight `number`
### textAlign ``` 'auto' | 'left' | 'center' | 'right' | 'justify' ```
