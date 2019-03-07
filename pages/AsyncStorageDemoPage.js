import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    AsyncStorage,
    View, TextInput
} from 'react-native';

const KEY = "SAVE_KEY";
export default class AsyncStorageDemoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: ''
        }
    }

    doSave() {
        AsyncStorage.setItem(KEY, this.value, error => {
            error && console.log(error.toString())
        })
    }

    doRemove() {
        AsyncStorage.removeItem(KEY)
    }

    getData() {
        AsyncStorage.getItem(KEY, (error, value) => {
            this.setState({
                showText: value
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>asyncstoreage demo</Text>
                <TextInput style={styles.input}
                           onChangeText={text => {
                               this.value = text;
                           }}/>
                <View style={styles.input_container}>
                    <Text onPress={() => {
                        this.doSave()
                    }}>存储</Text>
                    <Text onPress={() => {
                        this.doRemove()
                    }}>删除</Text>
                    <Text onPress={() => {
                        this.getData()
                    }}>获取</Text>
                </View>
                <Text>
                    {this.state.showText}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    input: {
        height: 40,

        borderColor: 'black',
        borderWidth: 1,
        marginRight: 10
    },
    input_container: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});
