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

export default class DetailPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>DetailPage</Text>
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
