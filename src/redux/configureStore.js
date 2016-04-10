import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducer'

// 组合一些 Store Enhancer
const finalCreateStore = compose(
  // applyMiddleware(),
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
