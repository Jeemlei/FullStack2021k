import React, { useState } from 'react'
import BookTbl from './BookTbl'

const Books = props => {
	const [genre, setGenre] = useState('')

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

			<BookTbl books={props.books} genre={genre} />
			
			<div>
				{props.genres.map(g => (
					<button key={g} onClick={() => setGenre(g)}>{g}</button>
				))}
				<button onClick={() => setGenre('')}>all genres</button>
			</div>
		</div>
	)
}

export default Books
