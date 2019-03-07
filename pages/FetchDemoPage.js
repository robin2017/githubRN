import React, {Component} from 'react';
import {
    StyleSheet,
    Button,
    Text,
    TextInput,
    View
} from 'react-native';

export default class FetchDemoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: ''
        }
    }

    loadData() {
        //https://api.github.com/search/repositories?q=java
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.text()
                }
                throw new Error('Network response is not ok')
            })
            .then(responseText => {
                this.setState({
                    showText: responseText
                })
            })
            .catch(e => {
                this.setState({
                    showText: e.toString()
                })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>FetchDemo</Text>
                <View style={styles.input_container}>
                    <TextInput style={styles.input}
                               onChangeText={text => {
                                   this.searchKey = text;
                               }}/>
                    <Button
                        title={"获取"}
                        onPress={() => {
                            this.loadData()
                        }}/>
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
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        marginRight: 10
    },
    input_container: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center'
    }
});
