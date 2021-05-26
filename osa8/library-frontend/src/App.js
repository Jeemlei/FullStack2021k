import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import LoginForm from './components/LoginForm'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
	const [page, setPage] = useState('authors')
	const [token, setToken] = useState(localStorage.getItem('user-token'))
	const client = useApolloClient()

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
				{addBookButton}
			</div>

			<Authors show={page === 'authors'} />

			<Books show={page === 'books'} />

			<NewBook show={page === 'add'} setPage={setPage} />

			<LoginForm
				show={page === 'login'}
				setToken={setToken}
				setPage={setPage}
			/>
		</div>
	)
}

export default App
