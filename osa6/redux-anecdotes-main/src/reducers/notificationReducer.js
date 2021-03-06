const reducer = (state = '', action) => {
	switch (action.type) {
		case 'NOTIFY':
			return action.data
		default:
			return ''
	}
}

export const notify = msg => {
	return {
		type: 'NOTIFY',
		data: msg,
	}
}

export const resetNotification = () => {
	return {
		type: 'RESET',
	}
}

export default reducer
