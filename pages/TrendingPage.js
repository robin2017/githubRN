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

export default class TrendingPage extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text>TrendingPage</Text>
                <Button title='改变主题色'
                        onPress={() => {
                            navigation.setParams({
                                theme: {
                                    tintColor: 'red',
                                    updateTime: new Date().getTime()
                                }
                            })
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
