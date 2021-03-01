import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ createNewBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleNewBlog = async event => {
		event.preventDefault()

		createNewBlog({
			title: title,
			author: author,
			url: url,
			likes: 0,
		})
		setTitle('')
		setAuthor('')
		setUrl('')
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
					<input id="title" value={title} onChange={handleTitleInput} />
				</div>
				<div>
					author:&nbsp;
					<input id="author" value={author} onChange={handleAuthorInput} />
				</div>
				<div>
					url:&nbsp;
					<input id="url" value={url} onChange={handleUrlInput} />
				</div>
				<div>
					<button id='create-button' type="submit">create</button>
				</div>
			</form>
		</div>
	)
}

NewBlogForm.propTypes = {
	createNewBlog: PropTypes.func.isRequired,
}

export default NewBlogForm
