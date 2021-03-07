const reducer = (state = '', action) => {
	switch (action.type) {
		case 'SET':
			return action.data
		default:
			return state
	}
}

export const notify = (msg, seconds) => {
	return async dispatch => {
		await setTimeout(() => {
			dispatch({
				type: 'SET',
				data: '',
			})
		}, seconds * 1000)
		dispatch({
			type: 'SET',
			data: msg,
		})
	}
}

export default reducer
