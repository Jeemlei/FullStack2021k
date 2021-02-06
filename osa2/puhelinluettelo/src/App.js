import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [filter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (typeof persons.find(person => person.name === newName) === 'undefined') {
      const personObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleFilter = (event) => setNewFilter(event.target.value)

  const handleNameInput = (event) => setNewName(event.target.value)

  const handleNumberInput = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <input
          value={filter}
          onChange={handleFilter}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          <div>name:
            <input
              value={newName}
              onChange={handleNameInput}
            />
          </div>
          <div>number:
            <input
              value={newNumber}
              onChange={handleNumberInput}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(person =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        ).map(person =>
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )
}

export default App