import { createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise'
import combineActionsMiddleware from 'redux-combine-actions'
import rootReducer from './reducer'

// 组合一些 Store Enhancer
//
// 所谓的 Store Enhancer 指的是满足签名 `createStore => createStore'` 的函数
const finalCreateStore = compose(
  applyMiddleware(combineActionsMiddleware, promiseMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

export default function configureStore (initialState) {
  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
