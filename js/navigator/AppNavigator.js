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
import {connect} from 'react-redux'
import {
    createReactNavigationReduxMiddleware,
    createReduxContainer
} from 'react-navigation-redux-helpers'

export const rootCom = 'Init';//设置根路由

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
        navigationOptions: {}
    },
});
export const RootNavigator =  createAppContainer(createSwitchNavigator(
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
//1、初始化react-navigation与redux的中间件
export const middleware = createReactNavigationReduxMiddleware(

        state=>state.nav,    'root',
);
//2、将根导航器组件传递给reduxifyNavigator函数
const AppWithNavigationState = createReduxContainer(RootNavigator,'root');

const mapStateToProps = state=>({state:state.nav})

//3、连接react组件和redux store
export default connect(mapStateToProps)(AppWithNavigationState)