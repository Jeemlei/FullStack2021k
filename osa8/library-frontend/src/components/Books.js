import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = props => {
	const result = useQuery(ALL_BOOKS)
	const [books, setBooks] = useState([])
	const [genres, setGenres] = useState([])
	const [genre, setGenre] = useState('')

	useEffect(() => {
		if (result.data) {
			setBooks(result.data.allBooks)
			setGenres(
				result.data.allBooks.reduce((allGenres, b) => {
					b.genres.forEach(booksGenre => {
						if (!allGenres.includes(booksGenre)) {
							allGenres = allGenres.concat(booksGenre)
						}
					})
					return allGenres
				}, [])
			)
		}
	}, [result])

	if (!props.show) {
		return null
	}

	let genreIndicator
	if (genre) {
		genreIndicator = (
			<p>
				in genre <b>{genre}</b>
			</p>
		)
	}

	return (
		<div>
			<h2>books</h2>

			{genreIndicator}

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books
						.filter(b =>
							b.genres.reduce(
								(previous, g) => previous || g.includes(genre),
								false
							)
						)
						.map(b => (
							<tr key={b.title}>
								<td>{b.title}</td>
								<td>{b.author.name}</td>
								<td>{b.published}</td>
							</tr>
						))}
				</tbody>
			</table>
			<div>
				{genres.map(g => (
					<button key={g} onClick={() => setGenre(g)}>{g}</button>
				))}
				<button onClick={() => setGenre('')}>all genres</button>
			</div>
		</div>
	)
}

export default Books
