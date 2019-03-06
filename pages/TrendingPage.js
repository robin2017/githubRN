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
import {connect} from 'react-redux'
import actions from '../js/action'

class TrendingPage extends Component {
    render() {

        return (
            <View style={styles.container}>
                <Text>TrendingPage</Text>
                <Button title='改变主题色'
                        onPress={() => {
                            this.props.onThemeChange('#096')
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

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendingPage)