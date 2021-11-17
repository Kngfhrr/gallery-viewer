import { SET_IMAGE, LOAD_IMAGES } from './actions'

const defaultState = {
    images: null,
    selected: null,
}

export const mainReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case SET_IMAGE:
            return { ...state, selected: action.payload }

        case LOAD_IMAGES:
            return { ...state, images: action.payload }

        default:
            return state
    }
}
