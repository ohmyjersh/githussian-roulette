import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


export default class IssueList extends React.Component {
    // static navigationOptions = ({ navigation, navigationOptions }) => {
    //     const { params } = navigation.state;

    //     return {
    //         title: params ? params.otherParam : 'Login',
    //         /* These values are used instead of the shared configuration! */
    //         headerStyle: {
    //             backgroundColor: navigationOptions.headerTintColor,
    //         },
    //         headerTintColor: navigationOptions.headerStyle.backgroundColor,
    //     };
    // };
    render() {
        return (
            <View Style={styles.container}>
                <Text>
                    this is where the issue list is at.
                    </Text>    
            </View>
        )
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