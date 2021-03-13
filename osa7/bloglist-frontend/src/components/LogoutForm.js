import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'

const LogoutForm = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	const handleLogout = () => {
		dispatch(logout())
	}

	return (
		<p>
			{user.name} logged in <button onClick={handleLogout}>logout</button>
		</p>
	)
}

export default LogoutForm
