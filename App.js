import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

getUsers(since = '', perPage = '') {
  const url = `https://api.github.com/users?per_page=${perPage}&since=${since}`;
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json());
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      perPage: 20,
      error: null,
      refreshing: false,
      text: ''
    };

    setTimeout(() => this.fetchData(), 3000);
  }

  fetchData() {
    const { page, perPage } = this.state;
    this.setState({ loading: true });
    this.getUsers(page, perPage)
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.error}</Text>
        <List>
          <FlatList
            data={this.state.data}
            renderItem={({ user }) => {
              console.warn(JSON.stringify(user));
              return (<ListItem
                roundAvatar
                title={`${user.login}`}
                subtitle={user.html_url}
                avatar={{ uri: user.avatar_url }}
              />);
            }}
          />
        </List>
      </View>
    );
  }
}
