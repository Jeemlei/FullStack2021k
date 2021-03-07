import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_ANECDOTES':
			return action.data
		case 'CREATE':
			return [...state, action.data]
		case 'VOTE':
			const anecdote = state.find(a => a.id === action.data.id)
			const newState = state
				.map(a =>
					a.id !== anecdote.id ? a : { ...anecdote, votes: anecdote.votes + 1 }
				)
				.sort((a, b) => {
					if (a.votes > b.votes) {
						return -1
					}
					if (a.votes < b.votes) {
						return 1
					}
					return 0
				})
			return newState
		default:
			return state
	}
}

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		anecdotes.sort((a, b) => {
			if (a.votes > b.votes) {
				return -1
			}
			if (a.votes < b.votes) {
				return 1
			}
			return 0
		})
		dispatch({
			type: 'INIT_ANECDOTES',
			data: anecdotes,
		})
	}
}

export const createAnecdote = anecdote => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.create(anecdote)
		dispatch({
			type: 'CREATE',
			data: {
				content: newAnecdote.content,
				id: newAnecdote.id,
				votes: newAnecdote.votes,
			},
		})
	}
}

export const voteAnecdote = anecdote => {
	return async dispatch => {
		await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
		dispatch({
			type: 'VOTE',
			data: { id: anecdote.id },
		})
	}
}

export default reducer
