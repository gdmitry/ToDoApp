import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import * as Actions from '../actions';
import { ListItem } from 'react-native-elements';
import orientation from '../helpers/orientation';

class Home extends Component {
  static propTypes = {
    navigateToPage: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired,
    followers: PropTypes.array.isRequired,
    error: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchUsers(1, 20);
  }

  goToAbout(login) {
    this.props.navigateToPage('gridView', { login });
  }

  render() {
    if (this.props.error) {
      return <Text>{this.props.error}</Text>
    }

    if (this.props.loading) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator animating={true}/>
        </View>
      );
    }

    return (
      <View style={{flex: 1, backgroundColor: '#F5F5F5', paddingTop: 20}}>
        <FlatList ref='listRef'
        data={this.props.users}
        renderItem={(...args) => this.renderItem(...args)}
        keyExtractor={(item, index) => index}/>
      </View>
    );
  }

  renderItem({item: l, index: i}) {
    // const {getFollowers} = this.props;
    return (
      <ListItem
        roundAvatar
        avatar={{uri: l.avatar_url}}
        key={i}
        title={l.login}
        subtitle={l.html_url}
        hideChevron
        onPress={() => {
          // getFollowers(l.login, 1, 20);
          this.goToAbout(l.login)
        }}/>
    )
  }
};

function mapStateToProps(state) {
  return {
    loading: state.dataReducer.loading,
    users: state.dataReducer.users,
    followers: state.dataReducer.followers,
    error: state.dataReducer.error
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);