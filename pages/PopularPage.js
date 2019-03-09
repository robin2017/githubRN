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
    RefreshControl, ActivityIndicator
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
//作者开发的组件
import Toast from 'react-native-easy-toast'
import {onLoadMorePopular} from "../js/action/popular";

let url = `https://api.github.com/search/repositories?q=`;
const QUERY_STR = '&sort=stars';
const THEME_COLOR = 'red';
const pageSize = 10;

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

    /**
     * 获取与当前页面有关的数据
     * @returns {*}
     * @private
     */
    _store() {
        const {popular} = this.props;
        let store = popular[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: [],//要显示的数据
                hideLoadingMore: true,//默认隐藏加载更多
            }
        }
        return store;
    }

    genFetchUrl(storeName) {
        return url + storeName + QUERY_STR
    }

    loadData(loadMore) {
        const {onRefreshPopular, onLoadMorePopular} = this.props;
        const store = this._store()
        const url = this.genFetchUrl(this.storeName);
        if (loadMore) {
            onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
                this.refs.toast.show('没有更多了')
            })
        } else {
            onRefreshPopular(this.storeName, url, pageSize)

        }
    }

    renderItem(data) {
        const item = data.item;
        return <PopularItem
            item={item}
            onSelect={() => {

            }}
        />
    }

    genIndicator() {

        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View>
    }

    render() {

        let store = this._store()
        console.log('读取时：', NavigationUtil.navigation)
        return (
            <View style={styles.container}>
                <FlatList data={store.projectModels}
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
                          ListFooterComponent={() => this.genIndicator()}
                          //优化：一次滚动，只加载一次
                          onEndReached={() => {
                              setTimeout(() => {
                                  if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                                      this.loadData(true);
                                //      this.canLoadMore = false;
                                  }
                              }, 100);
                          }}
                          onEndReachedThreshold={0.5}
                          onMomentumScrollBegin={() => {
                              this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
                              console.log('---onMomentumScrollBegin-----')
                          }}
                />
                <Toast ref={'toast'}
                       position={'center'}/>

            </View>
        );
    }
}

const mapStateToProps = state => ({
    popular: state.popular
});
const mapDispatchToProps = dispatch => ({
    onRefreshPopular: (storeName, url) => dispatch(actions.onRefreshPopular(storeName, url,pageSize)),
    onLoadMorePopular: (storeName, url) => dispatch(actions.onLoadMorePopular(storeName, url,pageSize))
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
    },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
    }
});
