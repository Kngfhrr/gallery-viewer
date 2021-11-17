import {SET_SHIPMENTS, SET_LOADING} from './actions'

const defaultState = {
    shipments: null,
    loading: false
}

export const mainReducer = (state = defaultState, action) => {

    switch (action.type) {
        case SET_LOADING:
            
            return {loading: action.payload}

        case SET_SHIPMENTS:
            return {...state, shipments: action.payload}

        default:
            return state
    }
}
