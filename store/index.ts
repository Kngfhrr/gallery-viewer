import rootReducer from './rootReducer'
import thunkMiddleware from 'redux-thunk'
import {applyMiddleware, createStore} from 'redux'

function configureStore() {
    return createStore(rootReducer, applyMiddleware(thunkMiddleware))
}

export default configureStore
