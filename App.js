import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow'
  //   alignItems: 'center',
  //   justifyContent: 'center'
  }
});

const getUsers = function (since = '', perPage = '') {
  const url = `https://api.github.com/users?per_page=${perPage}&since=${since}`;
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json());
};

let counter = 0;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      perPage: 1,
      error: null,
      refreshing: false,
      text: ''
    };
  }

  componentDidMount() {
    alert('mounted');
    // setInterval(() => this.setState({
    //   data: [{
    //     html_url: 'https://github.com/mojombo',
    //      login: 'mojombo', 
    //      avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4', 
    //      counter: counter++
    //   },
    //   {
    //     html_url: 'https://github.com/mojombo',
    //      login: 'mojombo', 
    //      avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4', 
    //      counter: counter++
    //   },
    //   {
    //     html_url: 'https://github.com/mojombo',
    //      login: 'mojombo', 
    //      avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4', 
    //      counter: counter++
    //   }]
    // }), 1000);
    this.fetchData();
  }

  componentWillUnmount() {
    alert('will unmount!');
  }

  fetchData() {
    const { page, perPage } = this.state;
    this.setState({ loading: true });
    getUsers(page, perPage)
      // .then(res => { alert(JSON.stringify(res)); return res; })
      .then(res => this.setState({
        data: page === 1 ? res : [...this.state.data, ...res],
        error: res.error || null,
        loading: false,
        refreshing: false
      }))
      .catch(error => this.setState({ error, loading: false }));
  }

  renderSeparator = () => (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    )

  render() {
    alert(JSON.stringify(this.state.data));
    //  if (this.state.data.length > 0) return null;
    return (
      <View style={styles.container}>
        <List style={{ backgroundColor: 'green'}} containerStyle={{ width: '100%', borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.state.data}
            extraData={this.state.data}
            keyExtractor={item => item.login}
            ItemSeparatorComponent={this.renderSeparator}
            refreshing={this.state.refreshing}
            horizontal
            renderItem={({ item }) => {
              //console.warn(JSON.stringify(item));
              return (<ListItem
                roundAvatar
                title={item.login}
                subtitle={item.html_url}
                avatar={{ uri: item.avatar_url }}
                containerStyle={{ width: '100%', borderBottomWidth: 0 }}
              />);
            }}
          />
        </List>
      </View>
    );
  }
}
