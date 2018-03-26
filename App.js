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
              headers: {
                authorization: `Bearer ${this.state.result.params.code}`,
              }
            }
          })}>
          <Main />
        </ApolloProvider>
        ) : null}
        </View>
    );
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
    console.log(result.params.code);
    this.setState({ result });
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
