import React, { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
	const [view, setView] = useState(false)

	const titleView = { display: view ? 'none' : '' }
	const fullView = { display: view ? '' : 'none' }

	const blogStyle = {
		padding: 10,
		marginTop: 5,
		border: 'solid',
		borderWidth: 1,
	}

	const handleLike = async () => {
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

	const handleDelete = async () => {
		if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
			const response = await blogsService.remove(blog.id)
			console.log(response)
			const updatedBlogs = blogs.filter(b => blog.id !== b.id)
			setBlogs(updatedBlogs)
		}
	}

	return (
		<div style={blogStyle}>
			<div style={titleView}>
				{blog.title} {blog.author}{' '}
				<button onClick={() => setView(true)}>show</button>
			</div>
			<div style={fullView}>
				{blog.title} {blog.author}{' '}
				<button onClick={() => setView(false)}>hide</button>
				<br />
				{blog.url}
				<br />
				likes {blog.likes} <button onClick={handleLike}>like</button>
				<br />
				{blog.user.name}
				{blog.user.username ===
					JSON.parse(window.localStorage.getItem('loggedUserDetails'))
						.username && (
					<div>
						<button onClick={handleDelete}>delete</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Blog
