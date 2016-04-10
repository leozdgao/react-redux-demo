import React from 'react'
import { IndexRoute, Route } from 'react-router'
import {
  App, SimpleDemo, ComplexDemo, AnimationDemo
} from './containers'

export default (
  <Route path='/'>
    <IndexRoute component={App}></IndexRoute>
    <Route path="simple-demo" component={SimpleDemo} />
    <Route path="complex-demo" component={ComplexDemo} />
    <Route path="animation-demo" component={AnimationDemo} />
    {/* <Route path="*" component={Page404}></Route> */}
  </Route>
)
