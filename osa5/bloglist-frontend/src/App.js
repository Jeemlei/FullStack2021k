import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
	const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({message: null, type: null})

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
		return <LoginForm setUser={setUser} notification={notification} setNotification={setNotification} />
	}

	return (
		<div>
			<h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />
			<LogoutForm user={user} setUser={setUser} />
			<NewBlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} />
			{blogs.map(blog => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	)
}

export default App
