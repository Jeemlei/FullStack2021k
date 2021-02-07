import React from 'react'
import Country from './Country'

const Result = ({ countries, filter }) => {

    const result = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

    console.log(result)
    if (result.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (result.length > 1) {
        return (
            <div>
                {result.map(country => <p>{country.name}</p>)}
            </div>
        )
    } else if (result.length === 1) {
        return (
            <Country country={result[0]} />
        )
    }

    return (
        <p>No matches</p>
    )
}

export default Result