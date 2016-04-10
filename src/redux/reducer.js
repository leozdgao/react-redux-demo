import { combineReducers } from 'redux'
import simpleListReducer from './modules/simpleList'
import complexListReducer from './modules/complexList'

const rootReducer = combineReducers({
  simpleList: simpleListReducer,
  complexList: complexListReducer
})

export default rootReducer
