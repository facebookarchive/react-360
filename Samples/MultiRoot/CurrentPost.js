import * as React from 'react';
import {StyleSheet, Text, View, VrButton} from 'react-360';
import {connect} from './Store';

/**
 * Render a description of the currently-selected model.
 * Connected to the global store to receive inputs.
 */
const CurrentPost = props => {
  if (!props.posts) {
    return <View style={styles.wrapper} />;
  }
  if (props.current < 0) {
    return (
      <View style={styles.wrapper}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>Select a Model</Text>
        </View>
      </View>
    );
  }
  const post = props.posts[props.current];
  return (
    <View style={styles.wrapper}>
      <Text style={styles.name}>{post.name}</Text>
      <Text style={styles.author}>{post.author}</Text>
      <Text style={styles.description}>{post.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 300,
    height: 600,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: '#303050',
    borderWidth: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 10,
  },
  name: {
    fontSize: 30,
    textAlign: 'center',
  },
  author: {
    fontSize: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
  },
});

const ConnectedCurrentPost = connect(CurrentPost);

export default ConnectedCurrentPost;
