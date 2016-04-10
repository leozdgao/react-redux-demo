import React, { Component, PropTypes as T } from 'react'
import { Link } from 'react-router'
import './style.scss'

class App extends Component {
  render () {
    return (
      <div>
        <h2>React Redux Demo</h2>
        <ul>
          <li>
            <Link to="/simple-demo">SimpleDemo</Link>
          </li>
          <li>
            <Link to="/complex-demo">ComplexDemo</Link>
          </li>
          <li>
            <Link to="/animation-demo">AnimationDemo</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default App
