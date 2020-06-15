import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/Persons'
import './App.css'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
		personService
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
			})
	}, [])

  const addName = (event) => {
    console.log(event)
    event.preventDefault()
    let nameIsDuplicate = persons.some( person => person.name === newName )

    if (nameIsDuplicate) {
      const r = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (r) {
        const personToUpdate = persons.find(person => person.name === newName)
        const changedPerson = { ...personToUpdate, number: newNumber }
    
        personService
          .update(personToUpdate.id, changedPerson)
          .then(returnedPerson => {        
            setPersons(persons.map(p => p.id !== personToUpdate.id ? p : changedPerson))
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
			.create(personObject)
			.then(returnedPerson => {        
				setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
			})
    }
  }

  const deletePersonHandler = id => {
		personService
      .deletePerson(id)
      .then(() => {        
				setPersons(persons.filter(person => person.id !== id))
			})
	}

	const handleNameChange = (event) => {
		console.log(event.target.value)
		setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
		console.log(event.target.value)
		setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
		console.log(event.target.value)
		setNewFilter(event.target.value)
  }

  
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handler={handleFilterChange}/>
      
      <h2>Add new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePersonHandler={deletePersonHandler}/>
    </div>
  )

}




export default App