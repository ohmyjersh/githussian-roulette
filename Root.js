import { StackNavigator } from 'react-navigation'; 
import React from 'react';

import Search from './Search';
import Labels from './Labels';
import Login from './Login';

const RootStack = StackNavigator(
    {
      Login: {
        screen: Login,
      },
      Search: {
        screen: Search,
      },
      Labels: {
        screen: Labels,
      }
    },
    {
      initialRouteName: 'Login',
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    }
  );

export default class Root extends React.Component {
    render() {
      return <RootStack />;
    }
  }
  