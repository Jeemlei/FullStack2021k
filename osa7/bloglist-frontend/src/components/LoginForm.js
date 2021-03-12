import React, { useState } from 'react'
import loginService from '../services/login'
import Notification from './Notification'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'

const LoginForm = ({ setUser }) => {
	const dispatch = useDispatch()

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
			dispatch(notify('wrong username or password', 'error', 5))
		}
	}

	const handleUsernameInput = ({ target }) => setUsername(target.value)
	const handlePsswdInput = ({ target }) => setPassword(target.value)

	return (
		<div>
			<Notification />
			<form onSubmit={handleLogin}>
				<div>
					username&nbsp;
					<input
						id="username"
						value={username}
						onChange={handleUsernameInput}
					/>
				</div>
				<div>
					password&nbsp;
					<input
						id="password"
						type="password"
						value={password}
						onChange={handlePsswdInput}
					/>
				</div>
				<div>
					<button id="login-button" type="submit">
						login
					</button>
				</div>
			</form>
		</div>
	)
}

export default LoginForm
