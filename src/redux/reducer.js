import { combineReducers } from 'redux'
import simpleListReducer from './modules/simpleList'

const rootReducer = combineReducers({
  simpleList: simpleListReducer
})

export default rootReducer
