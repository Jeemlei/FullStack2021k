import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState({})

  useEffect(() => {
    personsService
      .getAll()
      .then(returnedPersons =>
        setPersons(returnedPersons)
      )
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setNewFilter={setNewFilter} />

      <h3>add a new</h3>
      <Notification notification={notification} />
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} filter={filter} setNotification={setNotification} />
    </div>
  )
}

export default App