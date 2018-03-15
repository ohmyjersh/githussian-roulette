import React from 'react';
import {AuthSession} from 'expo';
import { StyleSheet, Text, View, Button } from 'react-native';


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
        <Button title="Login with GitHub" onPress={this._handlePressAsync} />
        {this.state.result ? (
          <Text>{JSON.stringify(this.state.result)}</Text>
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
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });
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
