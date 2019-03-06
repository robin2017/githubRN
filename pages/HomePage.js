/**
 * Created by robin on 2019/3/3
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Button,
    Text,
    View
} from 'react-native';

import NavigationUtil from '../js/navigator/NavigationUtil'
import DynamicTabNavigator from '../js/navigator/DynamicTabNavigator'

import {BackHandler} from 'react-native'
import {NavigationActions} from 'react-navigation'
import {connect} from "react-redux";


class HomePage extends Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        const {dispatch, nav} = this.props;
        //if (nav.index === 0) {
        if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        //储存外层navigation
        NavigationUtil.navigation = this.props.navigation
        console.log('保存时：', NavigationUtil.navigation)
        return <DynamicTabNavigator/>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});


//订阅
const mapStateToProps = (state) => ({
    nav: state.nav
});


export default connect(mapStateToProps,)(HomePage)