import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteForm = props => {
	const addAnecdote = async event => {
		event.preventDefault()
		const content = event.target.anecdote.value
		if (content !== '') {
			event.target.anecdote.value = ''
			props.createAnecdote({
				content: content,
				votes: 0,
			})

			props.notify(`new anecdote '${content}'`, 5)
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

const mapDispatchToProps = {
	createAnecdote,
	notify,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
