import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'
import LoginForm from './components/LoginForm'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'

const App = () => {
	const result = useQuery(ALL_BOOKS)
	const [books, setBooks] = useState([])
	const [genres, setGenres] = useState([])
	const [page, setPage] = useState('authors')
	const [token, setToken] = useState(localStorage.getItem('user-token'))
	const client = useApolloClient()

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

	let addBookButton
	if (!token) {
		addBookButton = <button onClick={() => setPage('login')}>login</button>
	} else {
		const logout = () => {
			localStorage.removeItem('user-token')
			setToken(null)
			setPage('login')
			client.resetStore()
		}
		addBookButton = (
			<>
				<button onClick={() => setPage('add')}>add book</button>
				<button onClick={logout}>logout</button>
			</>
		)
	}

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('recommendations')}>recommend</button>
				{addBookButton}
			</div>

			<Authors show={page === 'authors'} />

			<Books show={page === 'books'} books={books} genres={genres} />

			<NewBook show={page === 'add'} setPage={setPage} />

			<LoginForm
				show={page === 'login'}
				setToken={setToken}
				setPage={setPage}
			/>

			<Recommendations show={page === 'recommendations'} books={books} />
		</div>
	)
}

export default App
