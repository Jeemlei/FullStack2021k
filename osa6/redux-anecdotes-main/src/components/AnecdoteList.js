import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify, resetNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './Notification'
import Filter from './Filter'

const AnecdoteList = () => {
	const anecdotes = useSelector(state => {
		if (state.filter === '') {
			return state.anecdotes
		}
		return state.anecdotes.filter(a =>
			a.content.toLowerCase().includes(state.filter)
		)
	})
	const dispatch = useDispatch()

	const vote = id => {
		dispatch(voteAnecdote(id))
		dispatch(notify(`you voted '${anecdotes.find(a => a.id === id).content}'`))
		setTimeout(() => {
			dispatch(resetNotification())
		}, 5000)
	}

	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification />
			<Filter />
			{anecdotes.map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default AnecdoteList
