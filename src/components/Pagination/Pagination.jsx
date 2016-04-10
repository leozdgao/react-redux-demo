import React from 'react'
import cx from 'classnames'

const noop = _ => { }

export default ({ onChange = noop, currentPage, sum, limit }) => {
  const count = Math.ceil(sum / limit)
  const items = []
  for (let i = 0, l = count; i < l; i ++) {
    items.push(
      <li className={cx({ "active": currentPage == i })} key={i}>
        <a href="javascript:;" onClick={e => onChange(i, e)}>{i + 1}</a>
      </li>
    )
  }

  return (
    <ul className="pagination">{items}</ul>
  )
}
