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
        case Types.LOAD_POPULAR_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...[action.storeName],
                    items: action.items,
                    isLoading: false
                }
            };
        case Types.POPULAR_REFRESH:
            return {
                ...state,
                [action.storeName]: {
                    ...[action.storeName],

                    isLoading: true
                }
            };
        case Types.POPULAR_REFRESH_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...[action.storeName],
                    isLoading: false
                }
            };
        default:
            return state;
    }
}