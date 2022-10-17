import React from 'react'

function TableView({populateTable}) {
  return (
    <div>
        <table caption="page 1" className="table table-bordered border-dark">
        <tbody className="table-dark">
          <tr>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Homeworld</th>
            <th>Species</th>
          </tr>
        </tbody>
        {populateTable}
      </table>
    </div>
  )
}

export default TableView
