import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = async event => {
		event.preventDefault()
		if (event.target.anecdote.value !== '') {
			const newAnecdote = await anecdoteService.create({
				content: event.target.anecdote.value,
				votes: 0,
			})
			event.target.anecdote.value = ''
			dispatch(createAnecdote(newAnecdote))
		}
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input name="anecdote" />
				</div>
				<button>create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
