import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GridView from 'react-native-super-grid';
import * as Actions from '../actions';

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600'
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff'
  }
});

class List extends Component {
  goToList(login) {
    this.props.navigateToPage('listView', { login });
  }

  render() {
    if (this.props.error) {
      return <Text>{this.props.error}</Text>;
    }

    const { followers } = this.props;

    return (
      <GridView
        itemDimension={130}
        items={followers}
        style={styles.gridView}
        renderItem={item => (
          <View style={[styles.itemContainer, { backgroundColor: 'grey' }]}>
            <ActivityIndicator animating style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />
            <Image
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
              }}
              source={{ uri: item.avatar_url }}
            />
            <Text style={styles.itemName}>{item.login}</Text>
            <Text style={styles.itemCode}>{item.html_url}</Text>
          </View>
        )}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.dataReducer.loading,
    followers: state.dataReducer.followers,
    error: state.dataReducer.error
  };
}

List.propTypes = {
  navigateToPage: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  error: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
