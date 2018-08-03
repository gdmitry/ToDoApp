import React from 'react';
import { StyleSheet, View, FlatList, Text, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

const callGithubAPI = function (url, since = 1, perPage = 1) {
  return fetch(`${url}?per_page=${perPage}&since=${since}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json());
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      perPage: 2,
      error: null,
      refreshing: false,
      text: ''
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { page, perPage } = this.state;
    this.setState({ loading: true });
    const url = 'https://api.github.com/users';

    callGithubAPI(url, page, perPage)
      .then(res => this.setState({
        data: page === 1 ? res : [...this.state.data, ...res],
        error: res.error || null,
        loading: false,
        refreshing: false
      }))
      .catch(error => this.setState({ error, loading: false }));
  }

  openFollowers(url) {
    alert(`Click${url}`);
    callGithubAPI(url, 1, 1)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <List containerStyle={{
 width: '100%', borderTopWidth: 0, backgroundColor: 'green', borderBottomWidth: 0
}}
        >
          {this.state.data.map((item, index) => (
            <TouchableOpacity
              onPress={() => this.openFollowers(item.followers_url)}
              style={{
              backgroundColor: '#fff',
               flexDirection: 'row',
                alighItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#CED0CE',
                padding: 10
                }}
              key={index}
            >
              <Image
                style={{
                    width: 50, height: 50, borderRadius: 25, marginRight: 10
                  }}
                source={{ uri: item.avatar_url }}
              />
              <View style={{ justifyContent: 'center', flexDirection: 'column' }}>
                <Text>{item.login}</Text>
                <Text>{item.html_url}</Text>
              </View>
            </TouchableOpacity >
          ))}
        </List>
      </ScrollView>
    );
  }
}
