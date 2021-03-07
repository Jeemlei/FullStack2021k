import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = async event => {
		event.preventDefault()
		const content = event.target.anecdote.value
		if  (content !== '') {
			event.target.anecdote.value = ''
			dispatch(
				createAnecdote({
					content: content,
					votes: 0,
				})
			)
			dispatch(notify(`new anecdote '${content}'`, 5))
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
