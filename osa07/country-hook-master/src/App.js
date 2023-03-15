import React, { useState } from 'react'
import { useCountry, useField } from './hooks/index'

const Country = ({ country }) => {

	if (!country) {
		return <div>not found...</div>
	}

	return (
		<div>
			<h3>{country.name} </h3>
			<div>capital {country.capital} </div>
			<div>population {country.population}</div>
			<img
				src={country.flag}
				height="100"
				alt={`flag of ${country.name}`}
			/>
		</div>
	)
}

const App = () => {
	const nameInput = useField('text')
	const [name, setName] = useState('')
	const search = useCountry(name)

	const fetch = e => {
		e.preventDefault()
		setName(nameInput.value)
	}

	return (
		<div>
			<form onSubmit={fetch}>
				<input {...nameInput} />
				<button type='submit'>find</button>
			</form>

			<Country country={search.country} />
		</div>
	)
}

export default App
