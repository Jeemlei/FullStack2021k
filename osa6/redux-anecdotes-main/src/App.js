import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		anecdoteService
			.getAll()
			.then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
	}, [dispatch])

	return (
		<div>
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	)
}

export default App
