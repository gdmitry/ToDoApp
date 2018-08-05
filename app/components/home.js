import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    ActivityIndicator
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import * as Actions from '../actions';
import { List, ListItem } from 'react-native-elements';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        this.props.getUsers(1, 20);
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            ); 
        } else {
            return (
                <View style={{flex:1, backgroundColor: '#F5F5F5', paddingTop:20}}>
                    <FlatList
                        ref='listRef'
                        data={this.props.data}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}/>
                </View>
            );
        }
    }

    renderItem({ item: l, index: i }) {
return (
    <ListItem
    roundAvatar
    avatar={{uri:l.avatar_url}}
    key={i}
    title={l.login}
    subtitle={l.html_url}
    hideChevron
    onPress={() => this.getFollowers(l.login, 1, 20)}
          />
)
    }
};

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        users: state.dataReducer.users,
        followers: state.dataReducer.followers
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Home);