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
import PopularPage from '../../pages/PopularPage'
import TrendingPage from '../../pages/TrendingPage'
import FavoritePage from '../../pages/FavoritePage'
import MyPage from '../../pages/MyPage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import NavigationUtil from './NavigationUtil'

import {BottomTabBar}from 'react-navigation-tabs'
const TABS = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: '最热',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons name={'whatshot'}
                               size={26}
                               style={{color: tintColor}}/>
            )
        }
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions:
            {
                tabBarLabel: '趋势',
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons name={'md-trending-up'}
                              size={26}
                              style={{color: tintColor}}/>
                )
            }
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions:
            {
                tabBarLabel: '收藏',
                tabBarIcon: ({tintColor, focused}) => (
                    <MaterialIcons name={'favorite'}
                                   size={26}
                                   style={{color: tintColor}}/>
                )
            }
    },
    MyPage: {
        screen: MyPage,
        navigationOptions:
            {
                tabBarLabel: '我的',
                tabBarIcon: ({tintColor, focused}) => (
                    <Entypo name={'user'}
                            size={26}
                            style={{color: tintColor}}/>
                )
            }
    }
}


/**
 * 动态配置
 * 可以根据后端返回数据决定显示多少个
 * 并且可以修改默认配置TABS
 * */
export default class DynamicTabNavigator extends Component {
    constructor(props) {
        super(props);
        //禁止警告
        console.disableYellowBox = true
    }

    _tabNavigator() {
        const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS;
        const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage};//根据需要配置
        //tabBarIcon的小括号可以省略return
        return createAppContainer(createBottomTabNavigator(tabs, {
            tabBarComponent: TabBarComponent
        }))
    }

    render() {
        //储存外层navigation
        NavigationUtil.navigation = this.props.navigation
        const Tab = this._tabNavigator();
        return <Tab/>
    }
}

class TabBarComponent extends React.Component {
    constructor(props) {
        super(props)
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime:new Date().getTime(),
        }
    }
    render(){
        //更新主题
        const {routes,index} = this.props.navigation.state;
        if(routes[index].params){
            const {theme} = routes[index].params;
            if(theme&&theme.updateTime>this.theme.updateTime){
                this.theme = theme;
            }
        }
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.theme.tintColor||this.props.activeTintColor}
        />
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
