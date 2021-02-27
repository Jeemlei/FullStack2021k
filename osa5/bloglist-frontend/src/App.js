import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import NewBlogForm from './components/NewBlogForm'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
	const [blogs, setBlogs] = useState([])
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

	if (user === null) {
		return <LoginForm setUser={setUser} />
	}

	return (
		<div>
			<h2>blogs</h2>
			<LogoutForm user={user} setUser={setUser} />
			<NewBlogForm blogs={blogs} setBlogs={setBlogs} />
			{blogs.map(blog => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	)
}

export default App
