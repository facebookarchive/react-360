


## Containers

The `<Text>` element is special when it comes to layout. Everything inside a `<Text>` element uses text layout instead of the flexbox layout. This means elements inside `<Text>` are no longer rectangles, but instead wrap when they see the end of the line.

```
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

```
<View>
  <Text>First part and </Text>
  <Text>second part</Text>
</View>
// View container: each text is its own block
// |First part |
// |and        |
// |second part|
```

## Limited Style Inheritance

**You must wrap all text nodes inside a `<Text>` component**. You cannot have a text node directly under a `<View>`.
On the web, it is not unusual to set a font family and size for the entire document. But in React VR, we are more strict about it.

```
// BAD: will raise exception, can't have a text node as child of a <View>
<View>
  Some text
</View>
```

```
// GOOD
<View>
  <Text>
    Some text
  </Text>
</View>
```

You also lose the ability to set up a default font for an entire subtree. To keep fonts and font sizes consistent across your application, you can create a `MyAppText` component that includes them and use this component across your app. You can also extend this component to make specific components such as `MyAppHeaderText` for other kinds of text.

```
<View>
  <MyAppText>Text styled with the default font for the entire application</MyAppText>
  <MyAppHeaderText>Text styled as a header</MyAppHeaderText>
</View>
```

Assuming that `MyAppText` is a component that simply renders out its children into a `Text` component with styling, then `MyAppHeaderText` can be defined as follows:

```
class MyAppHeaderText extends Component {
  render() {
    <MyAppText>
      <Text style={{fontSize: 1}}>
        {this.props.children}
      </Text>
    </MyAppText>
  }
}
```

Composing `MyAppText` in this way ensures that we get the styles from a top-level component, but leaves us the ability to add or override them in specific use cases.

React VR does not yet support the React Native style inheritance of text subtrees.
