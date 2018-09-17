import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ActivityIndicator,
    StyleSheet,
    Image
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import GridView from 'react-native-super-grid';

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  }
});

class List extends Component {
  static propTypes = {
    navigateToPage: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired,
    error: PropTypes.object
  };

  componentDidMount() {
    this.props.fetchUsers(1, 20);
  }

  goToList(login) {
    this.props.navigateToPage('listView', {login});
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
    const items = [
      { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
      { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
      { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
      { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' },
      { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
      { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
      { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
      { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
      { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
      { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
    ];
      const { followers } = this.props;

    return (
      <GridView
        itemDimension={130}
        items={followers}
        style={styles.gridView}
        renderItem={item => (
          <View style={[styles.itemContainer, { backgroundColor: 'grey' }]}>
            <View style={{ position: 'absolute', top:0, left: 0, right: 0, bottom: 0}}>
              <Image
                  style={{ flex: 1 }}
                  source={{uri: item.avatar_url}} />
            </View>
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
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
