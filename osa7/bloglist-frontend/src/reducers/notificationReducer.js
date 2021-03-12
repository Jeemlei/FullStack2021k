/* eslint-disable indent */
const reducer = (state = { type: 'success', message: '' }, action) => {
	switch (action.type) {
		case 'SET':
			return action.data
		default:
			return state
	}
}

let timeout
export const notify = (msg, type, seconds) => {
	return async dispatch => {
		if (timeout) {
			clearTimeout(timeout)
			timeout = null
		}
		dispatch({
			type: 'SET',
			data: { type: type, message: msg },
		})
		timeout = await setTimeout(() => {
			dispatch({
				type: 'SET',
				data: { type: 'success', message: '' },
			})
		}, seconds * 1000)
	}
}

export default reducer
