import React, { Component, PropTypes as T } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { ComplexListActions } from '../../redux/modules'
import { UserList, Pagination } from '../../components'
import './style.scss'

const PAGE_LIMIT = 6

// 加载列表项，分页
class ComplexDemo extends Component {

  componentDidMount () {
    this.props.fetchUser(PAGE_LIMIT, 0)
  }

  render () {
    const { users, currentPage, sum, listLoading } = this.props
    return (
      <div>
        <Link to="/">Back to index</Link>
        <h2>ComplexDemo</h2>
        <div className="content">
          {listLoading ?
            <div className="spinner">
              Loading...
            </div> :
            <UserList data={users} />
          }
        </div>
        <Pagination
          currentPage={currentPage} sum={sum} limit={PAGE_LIMIT}
          onChange={::this._onChange}
          />
      </div>
    )
  }

  _onChange (i) {
    this.props.fetchUser(PAGE_LIMIT, i)
  }
}

// <i className="glyphicon glyphicon-refresh animated infinite rotateIn"></i>

const mapStateToProps = ({ complexList }) => ({ ...complexList })
const mapActionsToProps = {
  ...ComplexListActions
}

export default connect(mapStateToProps, mapActionsToProps)(ComplexDemo)
