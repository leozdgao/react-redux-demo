import React, { Component, PropTypes as T } from 'react'

class EditableText extends Component {
  static propTypes = {
    editing: T.bool,
    onChange: T.func,
    onKeyDown: T.func,
    value: T.string
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.editing && !prevProps.editing) {
      this.refs.input.focus()
    }
  }

  render () {
    // 在这里可以筛选出所有适用于 input 的事件，其他事件扔给根，这不就不全部列出来了
    const { value, editing, onChange, onKeyDown, onBlur, ...others } = this.props

    return (
      <div {...others}>
        {editing ?
          <input ref="input" value={value}
            onKeyDown={onKeyDown} onChange={onChange} onBlur={onBlur} /> :
          value
        }
      </div>
    )
  }
}

export default EditableText
