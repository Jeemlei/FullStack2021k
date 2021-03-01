import React, { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import blogsService from './services/blogs'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [notification, setNotification] = useState({
		message: null,
		type: null,
	})

	useEffect(() => {
		blogsService.getAll().then(blogs => {
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

	const createNewBlog = async blog => {
		try {
			const newBlog = await blogsService.create(blog)
			setBlogs(blogs.concat(newBlog.data))
			blogFormRef.current.toggleVisibility()
			setNotification({
				message: `${newBlog.data.title} by ${newBlog.data.author} added`,
				type: 'success',
			})
			setTimeout(() => {
				setNotification({ message: null, type: null })
			}, 5000)
		} catch (error) {
			setNotification({ message: error.message, type: 'error' })
			setTimeout(() => {
				setNotification({ message: null, type: null })
			}, 5000)
		}
	}

	const handleLike = async blog => {
		blog.likes += 1
		const updatedBlog = await blogsService.update(blog.id, blog)
		const updatedBlogs = blogs.map(b =>
			updatedBlog.id === b.id ? updatedBlog : b
		)
		updatedBlogs.sort((a, b) => {
			if (a.likes > b.likes) {
				return -1
			}
			if (a.likes < b.likes) {
				return 1
			}
			return 0
		})
		setBlogs(updatedBlogs)
	}

	const handleDelete = async blog => {
		if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
			const response = await blogsService.remove(blog.id)
			console.log(response)
			const updatedBlogs = blogs.filter(b => blog.id !== b.id)
			setBlogs(updatedBlogs)
		}
	}

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
				<NewBlogForm createNewBlog={createNewBlog} />
			</Togglable>
			{blogs.map(blog => (
				<Blog
					key={blog.id}
					blog={blog}
					handleLike={handleLike}
					handleDelete={handleDelete}
				/>
			))}
		</div>
	)
}

export default App
