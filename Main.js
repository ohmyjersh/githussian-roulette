import React from 'react';
import Labels from './Labels';
import { StyleSheet, Text, View, Button } from 'react-native';


export default class Main extends React.Component {
  render() {
    return (
      <View>
        <Labels />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
