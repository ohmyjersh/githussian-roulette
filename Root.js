import { StackNavigator } from 'react-navigation'; 
import React from 'react';

import Search from './Search';
import Labels from './Labels';
import Main from './Main';

const RootStack = StackNavigator(
    {
      Search: {
        screen: Search,
      },
      Labels: {
        screen: Labels,
      },
      Main: {
        screen: Main,
      },
    },
    {
      initialRouteName: 'Main',
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
  