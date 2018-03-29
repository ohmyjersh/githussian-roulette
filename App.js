import React from 'react';
import {AuthSession} from 'expo';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory'
import Root from './Root';

const CLIENT_ID = ''
const CLIENT_SECRET = ''
const GH_URL = 'https://github.com/login/oauth/authorize?'


export default class App extends React.Component {
  state = {
    result: null,
  };
  render() {
    return (<Root />
      // <View style={styles.container}>
      //   {!this.state.result ? <Button class="" title="Login with GitHub" onPress={this._handlePressAsync} /> : null }
      //   {this.state.result ? (
      //     <ApolloProvider client={this._createApolloClient(this.state.result.access_token)} > 
      //       <Root />
      //   </ApolloProvider>
      //   ) : null}
      //   </View>
    );
  }
 

  _createApolloClient = (token) => {
    const httpLink = createHttpLink({
      uri: 'https://api.github.com/graphql',
    });
    
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    });
    
    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }

  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
      authUrl:
        `${GH_URL}` +
        `&client_id=${CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        `&scope=${encodeURIComponent(`user public_repo repo repo_deployment repo:status read:repo_hook read:org read:public_key read:gpg_key`)}`
    });
    let code = result.params.code;
    console.log(code);

    let accessCall = async () => await fetch('https://github.com/login/oauth/access_token' +
    `?client_id=${CLIENT_ID}` +
    `&client_secret=${CLIENT_SECRET}` +
    `&code=${code}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => response.json());
    let access = await accessCall();
    this.setState({ result:access });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// import React from 'react';
// import { Button, Image, View, Text } from 'react-native';
// import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json

// class LogoTitle extends React.Component {
//   render() {
//     return (
//       <Image
//         style={{ width: 30, height: 30 }}
//       />
//     );
//   }
// }

// class HomeScreen extends React.Component {
//   static navigationOptions = {
//     headerTitle: <LogoTitle />,
//   };

//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Home Screen</Text>
//         <Button
//           title="Go to Details"
//           onPress={() => {
//             /* 1. Navigate to the Details route with params */
//             this.props.navigation.navigate('Details', {
//               itemId: 86,
//               otherParam: 'First Details',
//             });
//           }}
//         />
//       </View>
//     );
//   }
// }

// class DetailsScreen extends React.Component {
//   static navigationOptions = ({ navigation, navigationOptions }) => {
//     const { params } = navigation.state;

//     return {
//       title: params ? params.otherParam : 'A Nested Details Screen',
//       /* These values are used instead of the shared configuration! */
//       headerStyle: {
//         backgroundColor: navigationOptions.headerTintColor,
//       },
//       headerTintColor: navigationOptions.headerStyle.backgroundColor,
//     };
//   };

//   render() {
//     /* 2. Read the params from the navigation state */
//     const { params } = this.props.navigation.state;
//     const itemId = params ? params.itemId : null;
//     const otherParam = params ? params.otherParam : null;

//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Details Screen</Text>
//         <Text>itemId: {JSON.stringify(itemId)}</Text>
//         <Text>otherParam: {JSON.stringify(otherParam)}</Text>
//         <Button
//           title="Update the title"
//           onPress={() =>
//             this.props.navigation.setParams({ otherParam: 'Updated!' })}
//         />
//         <Button
//           title="Go to Details... again"
//           onPress={() => this.props.navigation.navigate('Details')}
//         />
//         <Button
//           title="Go back"
//           onPress={() => this.props.navigation.goBack()}
//         />
//       </View>
//     );
//   }
// }

// const RootStack = StackNavigator(
//   {
//     Home: {
//       screen: HomeScreen,
//     },
//     Details: {
//       screen: DetailsScreen,
//     },
//   },
//   {
//     initialRouteName: 'Home',
//     navigationOptions: {
//       headerStyle: {
//         backgroundColor: '#f4511e',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     },
//   }
// );

// export default class App extends React.Component {
//   render() {
//     return <RootStack />;
//   }
// }
