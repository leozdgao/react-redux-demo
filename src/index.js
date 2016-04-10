import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import createHistory from 'history/lib/createBrowserHistory'
import createStore from './redux/configureStore'
import routes from './routes'
import './style.scss'

const initData = {
  simpleList: [
    { entry: "React Redux Demo", editing: false }
  ]
}
const store = createStore(initData)
const root = (
  <Provider store={store} key="provider">
    <Router history={browserHistory} routes={routes} />
  </Provider>
)

render(root, document.getElementById('__react-content'))
