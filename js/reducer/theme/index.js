import Types from '../../action/types'

const defaultStatus = {
    theme: 'blue'
}
export default function onAction(state = defaultStatus, action) {
    switch (action.type) {
        case Types.THEME_CHANGE:
            return {
                ...state,
                theme: action.theme,
            }
        default:
            return state;
    }
}