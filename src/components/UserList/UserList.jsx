import React from 'react'

export default ({ data }) => {
  return (
    <div className="user-list">
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>UserName</th>
            <th>Motto</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, username, motto }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{username}</td>
              <td>{motto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
