import React from 'react'
import personsService from '../services/persons'

const Persons = ({ persons, setPersons, filter, setNotification }) => {

    const deletePerson = (person) => {
        if (window.confirm(`Delete ${person.name}`)) {
            personsService
                .remove(person.id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id))
                    setNotification({text: `Deleted ${person.name}`, type: 'success'})
                    setTimeout(() => {
                        setNotification({})
                    }, 3000)
                })
        }
    }

    return (
        <div>
            {persons.filter(person =>
                person.name.toLowerCase().includes(filter.toLowerCase())
            ).map(person =>
                <div key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></div>
            )}
        </div>
    )
}

export default Persons