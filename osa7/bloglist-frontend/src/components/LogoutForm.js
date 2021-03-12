import React from 'react'
import loginService from '../services/login'

const LogoutForm = ({ user, setUser }) => {
	const handleLogout = () => {
		loginService.logout()
		setUser(null)
	}

	return (
		<p>
			{user.name} logged in <button onClick={handleLogout}>logout</button>
		</p>
	)
}

export default LogoutForm
