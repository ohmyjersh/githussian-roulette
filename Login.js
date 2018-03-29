import React from 'react';
import { AuthSession, Font } from 'expo';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import { SocialIcon } from 'react-native-elements'

const CLIENT_ID = ''
const CLIENT_SECRET = ''
const GH_URL = 'https://github.com/login/oauth/authorize?'


export default class App extends React.Component {
    state = {
        result: null,
        error: false
    }
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.otherParam : 'Login',
            /* These values are used instead of the shared configuration! */
            headerStyle: {
                backgroundColor: navigationOptions.headerTintColor,
            },
            headerTintColor: navigationOptions.headerStyle.backgroundColor,
        };
    };
    render() {
        // this.props.navigation.navigate('Details', {
        //     itemId: 86,
        //     otherParam: 'First Details',
        //   });
        return (<View style={styles.container}>
            {!this.state.result ?
                <SocialIcon
                title='Sign In With Github'
                button
                type='github'
                onPress={this._handlePressAsync}
              /> : null}
            {this.state.error ? (
                <Text>Something happened, please try again...</Text>
            ) : null}
        </View>)
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
            try {
                let access = await accessCall();
                await AsyncStorage.setItem('access_token', access.access_token);
                this.props.navigation.navigate('Search');
            }
            catch(e) {
                this.setState({error:true})
            }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});