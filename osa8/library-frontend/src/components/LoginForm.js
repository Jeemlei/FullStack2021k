import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken, setPage }) => {
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')

	const [login, result] = useMutation(LOGIN)

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value
			setToken(token)
			localStorage.setItem('user-token', token)
            setPage('add')
		}
	}, [result.data]) // eslint-disable-line

	if (!show) {
		return null
	}

	const submit = async event => {
		event.preventDefault()

		login({ variables: { name, password } })

		setName('')
		setPassword('')
	}

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					name
					<input
						value={name}
						onChange={({ target }) => setName(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

export default LoginForm
