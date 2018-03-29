import React from 'react';
import { AuthSession } from 'expo';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';

const CLIENT_ID = 'e848da2589e533ae73aa'
const CLIENT_SECRET = 'f901570bc7b8e039a93c0b16159ea94ccb57ea8b'
const GH_URL = 'https://github.com/login/oauth/authorize?'


export default class App extends React.Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
    
        return {
          title: params ? params.otherParam : 'A Nested Details Screen',
          /* These values are used instead of the shared configuration! */
          headerStyle: {
            backgroundColor: navigationOptions.headerTintColor,
          },
          headerTintColor: navigationOptions.headerStyle.backgroundColor,
        };
      };
    render() {
        this.props.navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'First Details',
          });
        <View style={styles.container}>
            {!this.state.result ? <Button class="" title="Login with GitHub" onPress={this._handlePressAsync} /> : null}
            {this.state.result ? (
                <Text>hi</Text>
            ) : null}
        </View>
    }
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
    AsyncStorage.setItem('access_token', access.access_token);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});