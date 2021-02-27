import React from 'react'

const LogoutForm = ({ user, setUser }) => {
	const handleLogout = () => {
		window.localStorage.removeItem('loggedUserDetails')
		setUser(null)
	}

	return (
		<p>
			{user.name} logged in <button onClick={handleLogout}>logout</button>
		</p>
	)
}

export default LogoutForm
