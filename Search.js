import React from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
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
    static navigationOptions = {
        headerTitle: <LogoTitle />,
        headerRight: (
          <Button
            onPress={() => alert('This is a button!')}
            title="Filters"
            color="#fff"
          />
        ),
        headerLeft: (
            <Button
              onPress={() => alert('This is a button!')}
              title="Favorites"
              color="#fff"
            />
          ),
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
