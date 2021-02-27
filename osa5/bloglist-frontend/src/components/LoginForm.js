import React, { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ setUser }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async event => {
		event.preventDefault()

		try {
			const userDetails = await loginService.login({ username, password })
			setUsername('')
			setPassword('')
			setUser(userDetails)
		} catch (error) {}
	}

	const handleUsernameInput = ({ target }) => setUsername(target.value)
	const handlePsswdInput = ({ target }) => setPassword(target.value)

	return (
		<form onSubmit={handleLogin}>
			<div>
				username&nbsp;
				<input value={username} onChange={handleUsernameInput} />
			</div>
			<div>
				password&nbsp;
				<input type="password" value={password} onChange={handlePsswdInput} />
			</div>
			<div>
				<button type="submit">login</button>
			</div>
		</form>
	)
}

export default LoginForm
