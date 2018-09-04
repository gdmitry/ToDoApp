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
import GridView from 'react-native-gridview';

class List extends Component {
  static propTypes = {
    navigateToPage: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired,
    error: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchUsers(1, 20);
  }

  goToList(login) {
    this.props.navigateToPage('listView', { login });
  }

  render() {
    if (this.props.error) {
      return <Text>{this.props.error}</Text>
    }

    if (this.props.loading) {
      return (
        <View style={stycloneWithRowsles.activityIndicatorContainer}>
          <ActivityIndicator animating={true}/>
        </View>
      );
    }

    const randomData = Array(20)
      .fill(null)
      .map((item, index) => index + 1);

    const dataSource = new GridView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(randomData);

    return (
      <GridView
        data={dataSource}
        dataSource={dataSource}
        itemsPerRow={3}
        renderItem={this.renderItem}
      />
    );
  }

  renderItem(item, sectionID, rowID, itemIndex, itemID) {
    return (
      <View style={{ flex: 1, backgroundColor: '#8F8', borderWidth: 1 }}>
      <Text>{`${item} (${sectionID}-${rowID}-${itemIndex}-${itemID})`}</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.dataReducer.loading,
    followers: state.dataReducer.followers,
    error: state.dataReducer.error
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List);