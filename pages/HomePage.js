/**
 * Created by robin on 2019/3/3
 */
import React, {Component} from 'react';
import {createAppContainer, createBottomTabNavigator} from 'react-navigation'
import {
    Platform,
    StyleSheet,
    Button,
    Text,
    View
} from 'react-native';

import NavigationUtil from '../js/navigator/NavigationUtil'
import DynamicTabNavigator from '../js/navigator/DynamicTabNavigator'
export default class HomePage extends Component {


    render() {
        //储存外层navigation
        NavigationUtil.navigation = this.props.navigation

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
