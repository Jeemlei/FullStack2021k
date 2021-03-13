import usersService from '../services/users'

/* eslint-disable indent */
const reducer = (state = [], action) => {
	switch (action.type) {
		case 'UPDATE':
			return action.data
		default:
			return state
	}
}

export const updateUsersList = () => {
	return async dispatch => {
		const users = await usersService.getAll()
		dispatch({
			type: 'UPDATE',
			data: users,
		})
	}
}

export default reducer
