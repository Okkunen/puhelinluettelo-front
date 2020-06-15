import React from 'react'

const Filter = ({ newFilter, handler }) => {
  return (
    <div>
      Filter shown with <input value={newFilter} onChange={handler} />
    </div>
  )
}

export default Filter