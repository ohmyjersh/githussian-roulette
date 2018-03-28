import { StackNavigator } from 'react-navigation'; 
import React from 'react';

import Search from './Search';
import Labels from './Labels';

const RootStack = StackNavigator(
    {
      Search: {
        screen: Search,
      },
      Labels: {
        screen: Labels,
      },
    },
    {
      initialRouteName: 'Search',
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

  export default RootStack;
  