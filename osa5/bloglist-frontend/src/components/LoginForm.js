import React from 'react'
import loginService from '../services/login'

const LoginForm = ({ username, setUsername, password, setPassword, setUser }) => {
	const handleLogin = async event => {
        event.preventDefault()
        
        try {
            const userDetails = await loginService.login({ username, password })

            window.localStorage.setItem('loggedUserDetails', JSON.stringify(userDetails))

            setUser(userDetails)
            setUsername('')
            setPassword('')
        } catch (error) {
            
        }
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
				<input type='password' value={password} onChange={handlePsswdInput} />
			</div>
			<div>
				<button type="submit">login</button>
			</div>
		</form>
	)
}

export default LoginForm
