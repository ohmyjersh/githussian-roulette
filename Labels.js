import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, StatusBar, TouchableHighlight } from 'react-native';
import { 
  Card, 
  ListItem, 
  Button
 } from 'react-native-elements';

export default class Labels extends Component {
  state = {
    labels:[
        {
            text:'beginner',
            isActive:true
        }
    ]
  }

  selectLabel = (interest) => {

  }

  saveInterests = () => {
    console.log('INTERESTS:', this.state.userInterests);
  }

  render() {
    return (
      <View Style={styles.container}>
      <ScrollView>
        <StatusBar barStyle='light-content'/>
          <Card>
          <ScrollView contentContainerStyle={styles.interestSection}>
          {
            this.state.labels.map((label, i) => {
              return (
                <TouchableHighlight key={i} underlayColor='transparent' onPress={() => {this.selectLabel(label)}}>
                  <View >
                    <Card containerStyle={[this.state[label] ? styles.interestOn : styles.interestOff]}>
                      <Text style={[this.state[label] ? styles.textOn : styles.textOff]}>
                        { label.text }
                      </Text>
                    </Card>
                  </View>
                </TouchableHighlight>
              );
            })
          }
           </ScrollView>
           {/* <Button
            raised
            fontSize = {26}
            containerViewStyle={{paddingTop: 20,paddingBottom: 20}}
            buttonStyle={styles.saveBtn}
            title = 'Save'
            onPress = {() => this.saveInterests()} /> */}
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  interestSection: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  interestOn: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FF5A5F',
  },
  interestOff: {
    margin: 10,
    padding: 10,
  },
  textOn: {
    fontSize: 16,
    color: 'white',
  },
  textOff: {
    fontSize: 16,
  },
  overlay: {
    alignItems:'center'
  },
  saveBtn: {
    borderRadius: 10,
    backgroundColor: '#FF5A5F',
  }
});
