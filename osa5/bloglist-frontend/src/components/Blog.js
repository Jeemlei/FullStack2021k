import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete }) => {
	const [view, setView] = useState(false)

	const user = window.localStorage.getItem('loggedUserDetails')
		? JSON.parse(window.localStorage.getItem('loggedUserDetails'))
		: { username: '' }

	const titleView = { display: view ? 'none' : '' }
	const fullView = { display: view ? '' : 'none' }

	const blogStyle = {
		padding: 10,
		marginTop: 5,
		border: 'solid',
		borderWidth: 1,
	}

	return (
		<div style={blogStyle}>
			<div style={titleView} className="titleView">
				{blog.title} {blog.author}{' '}
				<button
					id={`show-${blog.title.replace(/\s/g, '')}`}
					onClick={() => setView(true)}
				>
					show
				</button>
			</div>
			<div
				id={`${blog.title.replace(/\s/g, '')}`}
				style={fullView}
				className="fullView"
			>
				{blog.title} {blog.author}{' '}
				<button onClick={() => setView(false)}>hide</button>
				<br />
				{blog.url}
				<br />
				likes {blog.likes}{' '}
				<button
					id={`like-${blog.title.replace(/\s/g, '')}`}
					onClick={() => handleLike(blog)}
				>
					like
				</button>
				<br />
				{blog.user.name}
				{blog.user.username === user.username && (
					<div>
						<button
							id={`delete-${blog.title.replace(/\s/g, '')}`}
							onClick={() => handleDelete(blog)}
						>
							delete
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	handleLike: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
}

export default Blog
