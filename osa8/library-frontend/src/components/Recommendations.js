import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ME } from '../queries'
import BookTbl from './BookTbl'

const Recommendations = props => {
	const result = useQuery(ME)
	const [user, setUser] = useState({})

	useEffect(() => {
		if (result.data) {
			setUser(result.data.me)
		}
	}, [result])

	if (!props.show) {
		return null
	}

	return (
		<div>
			<h2>recommendations</h2>

			<p>
				books in your favorite genre <b>{user.favoriteGenre}</b>
			</p>

			<BookTbl books={props.books} genre={user.favoriteGenre} />
		</div>
	)
}

export default Recommendations
