import React, { useState } from 'react'
import blogsService from '../services/blogs'

const NewBlogForm = ({ blogs, setBlogs, setNotification, blogFormRef }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleNewBlog = async event => {
		event.preventDefault()

		try {
			const newBlog = await blogsService.create({
				title: title,
				author: author,
				url: url,
				likes: 0,
			})
			setTitle('')
			setAuthor('')
			setUrl('')
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

	const handleTitleInput = ({ target }) => setTitle(target.value)
	const handleAuthorInput = ({ target }) => setAuthor(target.value)
	const handleUrlInput = ({ target }) => setUrl(target.value)

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={handleNewBlog}>
				<div>
					title:&nbsp;
					<input value={title} onChange={handleTitleInput} />
				</div>
				<div>
					author:&nbsp;
					<input value={author} onChange={handleAuthorInput} />
				</div>
				<div>
					url:&nbsp;
					<input value={url} onChange={handleUrlInput} />
				</div>
				<div>
					<button type="submit">create</button>
				</div>
			</form>
		</div>
	)
}

export default NewBlogForm
