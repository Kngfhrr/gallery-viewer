import { combineReducers } from 'redux'
import { mainReducer } from './root/reducer'



export default combineReducers({
  data: mainReducer,

})
