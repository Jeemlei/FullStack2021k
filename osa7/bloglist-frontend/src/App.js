import React, { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.user)

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [])

	useEffect(() => {
		const loggedUserString = window.localStorage.getItem('loggedUserDetails')
		if (loggedUserString) {
			const userDetails = JSON.parse(loggedUserString)
			dispatch(setUser(userDetails))
		}
	}, [])

	const createNewBlog = async blog => {
		try {
			await dispatch(createBlog(blog))
			blogFormRef.current.toggleVisibility()
			dispatch(
				notify(
					`${blog.title} by ${blog.author} added`,
					'success',
					5
				)
			)
		} catch (error) {
			dispatch(notify(error.message, 'error', 5))
		}
	}

	const handleLike = async blog => {
		dispatch(likeBlog(blog))
	}

	const handleDelete = async blog => {
		if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
			dispatch(removeBlog(blog.id))
		}
	}

	const blogFormRef = useRef()

	if (user === null) {
		return <LoginForm />
	}

	return (
		<div>
			<h2>blogs</h2>
			<Notification />
			<LogoutForm />
			<Togglable
				buttonLabel={'new note'}
				hideLabel={'cancel'}
				ref={blogFormRef}
			>
				<NewBlogForm createNewBlog={createNewBlog} />
			</Togglable>
			<div id="blogs">
				{blogs.map(blog => (
					<Blog
						key={blog.id}
						blog={blog}
						handleLike={handleLike}
						handleDelete={handleDelete}
					/>
				))}
			</div>
		</div>
	)
}

export default App
