import React, { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [notification, setNotification] = useState({
		message: null,
		type: null,
	})

	useEffect(() => {
		blogService.getAll().then(blogs => {
			blogs.sort((a, b) => {
				if (a.likes > b.likes) {
					return -1
				}
				if (a.likes < b.likes) {
					return 1
				}
				return 0
			})
			setBlogs(blogs)
		})
	}, [])

	useEffect(() => {
		const loggedUserString = window.localStorage.getItem('loggedUserDetails')
		if (loggedUserString) {
			const userDetails = JSON.parse(loggedUserString)
			setUser(userDetails)
		}
	}, [])

	const blogFormRef = useRef()

	if (user === null) {
		return (
			<LoginForm
				setUser={setUser}
				notification={notification}
				setNotification={setNotification}
			/>
		)
	}

	return (
		<div>
			<h2>blogs</h2>
			<Notification message={notification.message} type={notification.type} />
			<LogoutForm user={user} setUser={setUser} />
			<Togglable
				buttonLabel={'new note'}
				hideLabel={'cancel'}
				ref={blogFormRef}
			>
				<NewBlogForm
					blogs={blogs}
					setBlogs={setBlogs}
					setNotification={setNotification}
					blogFormRef={blogFormRef}
				/>
			</Togglable>
			{blogs.map(blog => (
				<Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
			))}
		</div>
	)
}

export default App
