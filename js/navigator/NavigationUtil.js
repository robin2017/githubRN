/**
 * 所有的页面跳转都需要调用这个工具类，统一控制
 * 如同axios控制前后端交互
 * */
export default class NavigationUtil {
    /**
     * 首页
     * */
    static resetToHomePage(params) {
        const {navigation} = params;
        navigation.navigate('Main')
    }

    /**
     * 返回上一页
     * */
    static goBack(navigation) {
        navigation.goBack();
    }

    /**
     * 跳转指定页面
     * 页面跳转时带参数
     * */
    static goPage(params, page) {
        const navigation = NavigationUtil.navigation;
        if (!navigation) {
            console.log(' NavigationUtil.navigation can not be null')
            return;
        }
        navigation.navigate(page, {...params})
    }
}