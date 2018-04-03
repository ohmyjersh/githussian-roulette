import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import {Icon} from 'react-native-elements';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const HelloWorld = gql`
query queryIssue {
    helpwanted: search( query:"label:help_wanted updated:>2017-04-30T00:00:00Z", type: ISSUE, first:1){
        edges{
        node{
            ... on Issue{
            title
            url
            labels(first:10) {
                edges {
                    node {
                        name
                        }
                    }
                }
            repository {
                name
                    primaryLanguage {
                        name
                        }
                    }
                }
            }
        }
    },
}
`;

class LogoTitle extends React.Component {
    render() {
        return (
            <Image
                style={{ width: 30, height: 30 }}
            />
        );
    }
}

export default class Search extends React.Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        return ({
        title: params ? params.otherParam : 'Githussian Roulette',    
        headerTitle: <LogoTitle />,
        headerRight: (
            <Icon
                raised
                name='list'
                type='font-awesome'
                color='#f50'
                size={18}
                onPress={() => navigation.navigate('IssueList')} />
        ),
        headerLeft: (
            <Icon
                raised
                name='filter'
                type='font-awesome'
                color='#f50'
                size={18}
                onPress={() => navigation.navigate('Labels')} />
        ),
    })
    };
    render() {
        return (
            <View>
                <Text>this is the search things</Text>
                {/* <Query query={HelloWorld}>
      {({ loading, error, data }) => {
        if (loading) return <Text>Loading...</Text>;
        if (error) return  <Text> error </Text>; 
        if(data) {
        return (
          <Text>{JSON.stringify(data)}</Text>
        )}
      }}
    </Query> */}
            </View>
        );
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
