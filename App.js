import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './routes.js';
export default class App extends React.Component {
  state={
    post:{
      heading:"My first heading",
      content: "My first content"
    }
  }
  render() {
    return (
      <View style={styles.container}>
      <Routes />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
