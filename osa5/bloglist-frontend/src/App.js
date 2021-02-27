import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
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
  
  useEffect(() => {
    const loggedUserString = window.localStorage.getItem('loggedUserDetails')
    if (loggedUserString) {
      const userDetails = JSON.parse(loggedUserString)
      setUser(userDetails)
    }
  }, [])

	const loginForm = () => {
		return (
			<LoginForm
				username={username}
				setUsername={setUsername}
				password={password}
				setPassword={setPassword}
				setUser={setUser}
			/>
		)
	}

	const bloglist = () => {
		return (
			<div>
				<h2>blogs</h2>
        <LogoutForm user={user} setUser={setUser} />
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
