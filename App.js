import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  // https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
  getUsers(since, perPage) {
    return fetch(`https://api.github.com/users?per_page=${perPage || ''}&since=${since || ''}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <List>
          <FlatList
            data={this.state.data}
          />
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
