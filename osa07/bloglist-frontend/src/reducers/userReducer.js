import loginService from '../services/login'

/* eslint-disable indent */
const reducer = (state = null, action) => {
	switch (action.type) {
		case 'SET_USER':
			return action.data
        case 'LOGIN':
            return action.data
		case 'LOGOUT':
			return null
		default:
			return state
	}
}

export const setUser = user => {
	return {
		type: 'SET_USER',
		data: user,
	}
}

export const login = (username, password) => {
	return async dispatch => {
		const userDetails = await loginService.login({ username, password })
		dispatch({
			type: 'LOGIN',
			data: userDetails,
		})
	}
}

export const logout = () => {
	return async dispatch => {
		await loginService.logout()
		dispatch({
			type: 'LOGOUT',
		})
	}
}

export default reducer
