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

export const initializeAnecdotes = anecdotes => {
	return {
		type: 'INIT_ANECDOTES',
		data: anecdotes
	}
}

export const createAnecdote = anecdote => {
	return {
		type: 'CREATE',
		data: {
			content: anecdote.content,
			id: anecdote.id,
			votes: anecdote.votes,
		},
	}
}

export const voteAnecdote = id => {
	return {
		type: 'VOTE',
		data: { id },
	}
}

export default reducer
