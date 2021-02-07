import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Result from './components/Result'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect-hook activated')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('countries retrieved')
        setCountries(response.data)
      })
  }, [])
  console.log(`${countries.length} countries in memory`)

  return (
    <div>
      <Filter text={'find countries '} filter={filter} setNewFilter={setNewFilter} />
      <Result countries={countries} filter={filter} setNewFilter={setNewFilter} />
    </div>
  )
}

export default App