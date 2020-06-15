import React from 'react'
import Person from './Person'

const Persons = ({ persons, deletePersonHandler }) => {
  return (
    <div>
				{persons.map((person, i) =>
					<Person key={person.name} person={person} deletePerson={() => deletePersonHandler(person.id)}/>
				)}
			</div>
  )
}

export default Persons