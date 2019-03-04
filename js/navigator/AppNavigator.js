import {
    createAppContainer,
    createStackNavigator,
    createMaterialTopTabNavigator,
    createBottomTabNavigator,
    createSwitchNavigator
} from 'react-navigation'
//从欢迎页到首页不需要退回，则需要switchNavigator

import WelcomePage from '../../pages/WelcomePage'
import HomePage from '../../pages/HomePage'
import DetailPage from '../../pages/DetailPage'

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null,//禁用头部的bar，实现全屏显示
        }
    }
})

const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null,//禁用头部的bar，实现全屏显示
        }
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {

        }
    },
});
export default createAppContainer(createSwitchNavigator(
    {
        Init: InitNavigator,
        Main: MainNavigator,
    },
    {
        navigationOptions: {
            header: null,//禁用头部的bar，实现全屏显示
        }
    }
))