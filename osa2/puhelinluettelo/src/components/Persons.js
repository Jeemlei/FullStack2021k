import React from 'react'
import personsService from '../services/persons'

const Persons = ({ persons, setPersons, filter }) => {

    const deletePerson = (person) => {
        if (window.confirm(`Delete ${person.name}`)) {
            personsService
                .remove(person.id)
                .then(setPersons(persons.filter(p => p.id !== person.id)))
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