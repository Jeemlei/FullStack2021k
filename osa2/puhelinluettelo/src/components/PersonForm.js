import React from 'react'
import personsService from '../services/persons'

const PersonsForm = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons }) => {

    const addPerson = (event) => {
        event.preventDefault()

        if (typeof persons.find(person => person.name === newName) === 'undefined') {
            const personObject = {
                name: newName,
                number: newNumber
            }

            personsService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
        } else {
            alert(`${newName} is already added to phonebook`)
        }
    }

    const handleNameInput = (event) => setNewName(event.target.value)

    const handleNumberInput = (event) => setNewNumber(event.target.value)

    return (
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
    )
}

export default PersonsForm