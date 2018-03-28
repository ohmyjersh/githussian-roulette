import React from 'react';
import {AuthSession} from 'expo';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Main from './Main';

const GH_URL = 'https://github.com/login/oauth/authorize?scope=user:email'
const CLIENT_ID = ''
const CLIENT_SECRET = ''


export default class App extends React.Component {
  state = {
    result: null,
  };
  render() {
    return (
      <View style={styles.container}>
        {!this.state.result ? <Button class="" title="Login with GitHub" onPress={this._handlePressAsync} /> : null }
        {this.state.result ? (
          <ApolloProvider client={new ApolloClient({
            uri: 'https://api.github.com/graphql',
            fetchOptions: {
              credentials: 'include', 
              request: (operation) => {
                //const token = await AsyncStorage.getItem('token');
                operation.setContext({
                  headers: {
                    Authorization: `bearer ${this.state.result.access_token}`
                  }
                });
              },
            }
          })}>
          <Main />
        </ApolloProvider>
        ) : null}
        </View>
    );
  }
 
  _getToken = accessToken => {
    const token = `bearer ${accessToken}`
    console.log('call github with this', token);
    return token;
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
    console.log(access);
    //await AsyncStorage.setItem('token', access.access_token);
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
