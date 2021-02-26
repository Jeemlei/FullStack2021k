import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs))
	}, [])

	const loginForm = () => {
		return (
			<LoginForm
				username={username}
				setUsername={setUsername}
				password={password}
				setPassword={setPassword}
				user={user}
				setUser={setUser}
			/>
		)
	}

	const bloglist = () => {
		return (
			<div>
				<h2>blogs</h2>
        <p>{user.name} logged in</p>
				{blogs.map(blog => (
					<Blog key={blog.id} blog={blog} />
				))}
			</div>
		)
	}

	return (
    <div>
      {user === null ? loginForm() : bloglist()}
    </div>
  )
}

export default App
