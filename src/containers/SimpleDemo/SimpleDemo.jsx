import React, { Component, PropTypes as T } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { SimpleListActions } from '../../redux/modules'
import { EditableText } from '../../components'

// 简单的添加、删除、编辑一个列表项
class SimpleDemo extends Component {
  render () {
    const {
      simpleList, // data
      startEdit, endEdit // actions
    } = this.props

    return (
      <div>
        <Link to="/">Back to index</Link>
        <h2>SimpleDemo</h2>
        <input onKeyDown={::this._onAddEntry} />
        <ul>
          {simpleList.map(({ entry, editing }, i) => {
            return (
              <li key={i}>
                <EditableText value={entry} editing={editing}
                  onClick={e => startEdit(i) }
                  onChange={::this._onChange(i)}
                  onBlur={e => endEdit(i)}
                  onKeyDown={e => { if (e.keyCode === 13) endEdit(i) } }/>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  _onAddEntry (e) {
     if (e.keyCode === 13) {
       const { addEntry } = this.props

       addEntry(e.target.value)
       e.target.value = ''
     }
  }

  _onChange (i) {
    const { editEntry, removeEntry } = this.props

    return e => {
      const val = e.target.value
      if (val) editEntry(i, val)
      else removeEntry(i)
    }
  }
}

const mapStateToProps = ({ simpleList }) => ({ simpleList })
const mapActionsToProps = {
  ...SimpleListActions
}

export default connect(mapStateToProps, mapActionsToProps)(SimpleDemo)
