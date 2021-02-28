import React, { useState } from 'react'
import loginService from '../services/login'
import Notification from './Notification'

const LoginForm = ({ setUser, notification, setNotification }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async event => {
		event.preventDefault()

		try {
			const userDetails = await loginService.login({ username, password })
			setUsername('')
			setPassword('')
			setUser(userDetails)
		} catch (error) {
			setNotification({ message: 'wrong username or password', type: 'error' })
			setTimeout(() => {
				setNotification({ message: null, type: null })
			}, 5000)
		}
	}

	const handleUsernameInput = ({ target }) => setUsername(target.value)
	const handlePsswdInput = ({ target }) => setPassword(target.value)

	return (
		<div>
			<Notification message={notification.message} type={notification.type} />
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
		</div>
	)
}

export default LoginForm
