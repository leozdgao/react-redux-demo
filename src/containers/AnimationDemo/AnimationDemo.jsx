import React, { Component, PropTypes as T } from 'react'
import { Link } from 'react-router'

// 与服务器通信，添加、删除、编辑一个列表项
class AnimationDemo extends Component {
  render () {
    return (
      <div>
        <Link to="/">Back to index</Link>
        <h2>AnimationDemo</h2>
      </div>
    )
  }
}

export default AnimationDemo
