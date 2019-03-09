import Types from '../../action/types'

const defaultStatus = {};
/**
 * state树设计:可以横向扩展（难点）
 *
 * pupular:{
 *  java:{
 *      items:[],
 *      isLoading:false
 *  },
 *  ios:{
 *      items:[],
 *      isLoading:false
 *  }
 * }
 * */
export default function (state = defaultStatus, action) {
    switch (action.type) {
        case Types.POPULAR_REFRESH_SUCCESS://下拉刷新成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items:action.items,
                    projectModels: action.projectModels,
                    isLoading: false,
                    hideLoadingMore:false,
                    pageIndex:action.pageIndex
                }
            };
        case Types.POPULAR_REFRESH://下拉刷新成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],

                    isLoading: true
                }
            };
        case Types.POPULAR_REFRESH_FAIL://下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false
                }
            };
        case Types.POPULAR_LOAD_MORE_SUCCESS:
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    projectModels:action.projectModels,
                    hideLoadingMore:false,
                    pageIndex:action.pageIndex
                }
            }
        case Types.POPULAR_LOAD_MORE_FAIL:
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    hideLoadingMore:true,
                    pageIndex:action.pageIndex
                }
            }
        default:
            return state;
    }
}