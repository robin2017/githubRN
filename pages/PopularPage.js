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
import {
    createAppContainer,
    createMaterialTopTabNavigator
} from 'react-navigation'
import NavigationUtil from '../js/navigator/NavigationUtil'
import DynamicTabNavigator from "../js/navigator/DynamicTabNavigator";

export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        //动态配置tabs名称
        this.tabNames = ['JAVA', 'ANDROID', 'IOS', 'REACT', 'REACT NATIVE', 'PHP']

    }

    /**
     PopularTab1: {
        screen: PopularTab,
        navigationOptions: {
            title: 'Tab1'
        }
    },
     PopularTab2: {
        screen: PopularTab,
        navigationOptions: {
            title: 'Tab2'
        }
    }*/
    //类似于DynamicTabNavigator的TABS，具体格式见上
    _getTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props =><PopularTab {...props} tabLabel={item}/>,
                navigationOptions: {
                    title: item,
                }
            }
        });
        return tabs;
    }

    render() {
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
            this._getTabs(), {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false,
                    scrollEnabled: true,//可以滚动，很重要属性
                    style: {
                        backgroundColor: '#678'
                    },
                    indicatorStyle: styles.indicatorStyle,//标签指示器样式
                    labelStyle: styles.labelStyle
                }
            }
        ));
        return <View style={{flex: 1, marginTop: 0}}>
            <TabNavigator/>
        </View>
    }
}

//复用的组件
class PopularTab extends Component {
    render() {
        const {tabLabel} = this.props;
        console.log('读取时：',NavigationUtil.navigation)
        return (
            <View style={styles.container}>
                <Text>{tabLabel}</Text>
                <Text onPress={() => {
                    NavigationUtil.goPage({
                        navigation: this.props.navigation
                    }, 'DetailPage')
                }}>跳转到详情页</Text>
                <Button title={'fetch 使用'}
                    onPress={() => {
                    NavigationUtil.goPage({
                        navigation: this.props.navigation
                    }, 'FetchDemoPage')
                }}/>
                <Button title={'asyncStorage 使用'}
                        onPress={() => {
                            NavigationUtil.goPage({
                                navigation: this.props.navigation
                            }, 'AsyncStorageDemoPage')
                        }}/>
                <Button title={'dataStore 使用'}
                        onPress={() => {
                            NavigationUtil.goPage({
                                navigation: this.props.navigation
                            }, 'DataStoreDemoPage')
                        }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    tabStyle: {
        minWidth: 50
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white'
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6
    }
});
