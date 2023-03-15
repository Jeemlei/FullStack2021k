import React from 'react'
import personsService from '../services/persons'

const PersonsForm = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons, setNotification }) => {

    const addPerson = (event) => {
        event.preventDefault()

        const existingPerson = persons.find(person => person.name === newName)

        if (typeof existingPerson !== 'undefined') {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const newPerson = { ...existingPerson, number: newNumber }
                personsService
                    .update(existingPerson.id, newPerson)
                    .then(() => {
                        setPersons(persons.map(person => person.id !== newPerson.id ? person : newPerson))
                        setNewName('')
                        setNewNumber('')
                        setNotification({text: `Updated ${newPerson.name}`, type: 'success'})
                        setTimeout(() => {
                            setNotification({})
                        }, 3000)
                    })
                    .catch(error => {
                        setPersons(persons.filter(person => person.id !== newPerson.id))
                        setNewName('')
                        setNewNumber('')
                        setNotification({text: `Information of ${newPerson.name} has already been removed from server`, type: 'error'})
                        setTimeout(() => {
                            setNotification({})
                        }, 3000)
                    })
            }

        } else {
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
                    setNotification({text: `Added ${returnedPerson.name}`, type: 'success'})
                    setTimeout(() => {
                        setNotification({})
                    }, 3000)
                })
                .catch(error => {
                    setNotification({text: `${error.response.data.error}`, type: 'error'})
                    setTimeout(() => {
                        setNotification({})
                    }, 10000)
                })
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