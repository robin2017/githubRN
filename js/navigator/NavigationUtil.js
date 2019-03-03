export default class NavigationUtil{
    /**
     * 首页
     * */
    static resetToHomePage(params){
        const {navigation} = params;
        navigation.navigate('Main')
    }

    /**
     * 返回上一页
     * */
    static resetLast(navigation){
        navigation.goBack();
    }
}