import React, { Component } from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';

function mapStateToProps(state) {
  return {
    loading: state.dataReducer.loading
  };
}
const mapDispatchToProps = dispatch => ({ dispatch });

export default function withLoader(WrappedComponent, apiAction) {
  return connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    componentDidMount() {
      if (apiAction) this.props.dispatch(apiAction);
    }

    render() {
      if (this.props.loading) {
        return (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator animating />
          </View>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  });
}
