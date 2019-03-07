import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View, TextInput
} from 'react-native';
import DataStore from "../js/expand/dao/DataStore";

export default class DataStoreDemoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: ''
        };
        this.dataStore = new DataStore();
    }

    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.vaule}`;
        this.dataStore.fetchData(url)
            .then(data => {
                console.log('myData:', data)
                let showData = `初次加载时间${new Date(data.timestamp)}
                \n${JSON.stringify(data.data)}`
                this.setState({
                    showText: showData
                })
            }).catch(error => {
            error && console.log(error)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>离线缓冲 demo</Text>
                <TextInput style={styles.input}
                           onChangeText={text => {
                               this.value = text;
                           }}/>
                <Text onPress={() => {
                    this.loadData()
                }}>获取</Text>
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
