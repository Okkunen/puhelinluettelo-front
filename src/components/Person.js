import React from 'react'

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      <p>{person.name} {person.number}</p>
      <button onClick={deletePerson}>delete</button>
    </div>
  )
}

export default Person