import Types from '../types'
import DataStore from '../../expand/dao/DataStore'

/**
 * 获取最热数据的异步action
 * action一般都是同步的，如果异步则需要redux-thunk插件
 * 因为是网络请求，所以不能同步
 * */
export function onRefreshPopular(storeName, url, pageSize) {
    return dispatch => {
        dispatch({type: Types.POPULAR_REFRESH, storeName})
        let dataStore = new DataStore();
        dataStore.fetchData(url) //异步action与数据流
            .then(data => {
                handleData(dispatch, storeName, data, pageSize)
            })
            .catch(error => {
                console.log(error)
                dispatch({type: Types.POPULAR_REFRESH_FAIL, error, storeName})
            })
    }
}


/**
 * 加载更多
 * @param storeName
 * @param pageIndex 第几页
 * @param pageSize 每页展示条数
 * @param dataArray 原始数据
 * @param callBack 回调函数，可以通过回调函数来向调用页面通信：比如异常信息的展示，没有更多等待
 * @param favoriteDao
 * @returns {function(*)}
 */
export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], favoriteDao, callBack) {
    return dispatch => {
        setTimeout(() => {//模拟网络请求
            if ((pageIndex - 1) * pageSize >= dataArray.length) {//已加载完全部数据
                if (typeof callBack === 'function') {
                    callBack('no more')
                }
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_FAIL,
                    error: 'no more',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                    projectModules:dataArray
                })
            } else {
                //本次和载入的最大数量
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModels: dataArray.slice(0,max),
                })
            }
        }, 500);
    }
}


function handleData(dispatch, storeName, data, pageSize) {
    let fixItems = [];
    if (data && data.data && data.data.items) {
        fixItems = data.data.items;
    }
    dispatch({
        type: Types.POPULAR_REFRESH_SUCCESS,
        items:fixItems,
        projectModels: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
        storeName,
        pageIndex: 1
    })
}