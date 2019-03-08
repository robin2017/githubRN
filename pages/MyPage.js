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
import NavigationUtil from "../js/navigator/NavigationUtil";

export default class MyPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>MyPage</Text>
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
    }
});
