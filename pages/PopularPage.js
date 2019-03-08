/**
 * Created by robin on 2019/3/3
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Button,
    Text,
    View,
    FlatList,
    RefreshControl
} from 'react-native';
import {connect} from 'react-redux'
import actions from '../js/action'
import {
    createAppContainer,
    createMaterialTopTabNavigator
} from 'react-navigation'
import NavigationUtil from '../js/navigator/NavigationUtil'
import DynamicTabNavigator from "../js/navigator/DynamicTabNavigator";
import PopularItem from '../js/common/PopularItem'

let url = `https://api.github.com/search/repositories?q=`;
const QUERY_STR = '&sort=stars';
const THEME_COLOR = 'red';


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
                screen: props => <PopularTabPage {...props} tabLabel={item}/>,
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
    constructor(props) {
        super(props)
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }

    componentDidMount() {
        this.loadData()
    }

    genFetchUrl(storeName) {
        return url + storeName + QUERY_STR
    }

    loadData() {
        const {onLoadPopularData} = this.props;
        const url = this.genFetchUrl(this.storeName);

        onLoadPopularData(this.storeName, url)
    }

    renderItem(data) {
        const item = data.item;
        return <PopularItem
            item={item}
            onSelect={() => {

            }}
        />
    }

    render() {
        const {popular} = this.props;
        let store = popular[this.storeName];//动态获取
        if (!store) {
            store = {
                items: [],
                isLoading: false
            }
        }
        console.log('读取时：', NavigationUtil.navigation)
        return (
            <View style={styles.container}>
                <FlatList data={store.items}
                          renderItem={data => this.renderItem(data)}
                          keyExtractor={item => "" + item.id}
                          refreshControl={
                              <RefreshControl
                                  title='loading'
                                  titleColor={THEME_COLOR}
                                  colors={[THEME_COLOR]}
                                  refreshing={store.isLoading}
                                  onRefresh={() => this.loadData()}
                                  tintColor={THEME_COLOR}
                              />


                          }
                />

            </View>
        );
    }
}

const mapStateToProps = state => ({
    popular: state.popular
});
const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url))
})

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)

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
