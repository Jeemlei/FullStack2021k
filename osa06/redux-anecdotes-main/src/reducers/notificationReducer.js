const reducer = (state = '', action) => {
	switch (action.type) {
		case 'SET':
			return action.data
		default:
			return state
	}
}

let timeout
export const notify = (msg, seconds) => {
	return async dispatch => {
		if (timeout) {
			clearTimeout(timeout)
			timeout = null
		}
		dispatch({
			type: 'SET',
			data: msg,
		})
		timeout = await setTimeout(() => {
			dispatch({
				type: 'SET',
				data: '',
			})
		}, seconds * 1000)
	}
}

export default reducer
