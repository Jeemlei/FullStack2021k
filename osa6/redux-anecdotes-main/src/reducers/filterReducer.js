const reducer = (state = '', action) => {
	switch (action.type) {
		case 'UPDATE':
			return action.data
		default:
			return state
	}
}

export const updateFilter = content => {
	return {
		type: 'UPDATE',
		data: content,
	}
}

export default reducer
