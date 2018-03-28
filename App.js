import React from 'react';
import {AuthSession} from 'expo';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory'
//import RootStack from './RootStack';
import Main from './Main';

const CLIENT_ID = ''
const CLIENT_SECRET = ''
const GH_URL = 'https://github.com/login/oauth/authorize?'


export default class App extends React.Component {
  state = {
    result: null,
  };
  render() {
    return (
      <View style={styles.container}>
        {!this.state.result ? <Button class="" title="Login with GitHub" onPress={this._handlePressAsync} /> : null }
        {this.state.result ? (
          <ApolloProvider client={this._createApolloClient(this.state.result.access_token)} > 
          <Main />
        </ApolloProvider>
        ) : null}
        </View>
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
