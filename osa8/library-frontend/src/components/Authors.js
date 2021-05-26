import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const Authors = props => {
	const result = useQuery(ALL_AUTHORS)
	const [authors, setAuthors] = useState([])

	const [name, setName] = useState('')
	const [born, setBorn] = useState('')

	useEffect(() => {
		if (result.data) {
			setAuthors(result.data.allAuthors)
			if (!name) {
				setName(result.data.allAuthors[0].name)
			}
		}
	}, [result]) // eslint-disable-line

	const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	})

	if (!props.show) {
		return null
	}

	const submit = async event => {
		event.preventDefault()

		const year = parseInt(born, 10)
		updateAuthor({ variables: { name, year } })

		setBorn('')
	}

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map(a => (
						<tr key={a.id}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<h3>Set birthyear</h3>
			<form onSubmit={submit}>
				<div>
					name
					<select value={name} onChange={({ target }) => setName(target.value)}>
						{authors.map(a => (
							<option key={a.id} value={a.name}>
								{a.name}
							</option>
						))}
					</select>
				</div>
				<div>
					born
					<input
						value={born}
						onChange={({ target }) => setBorn(target.value)}
					/>
				</div>
				<button type="submit">update author</button>
			</form>
		</div>
	)
}

export default Authors
