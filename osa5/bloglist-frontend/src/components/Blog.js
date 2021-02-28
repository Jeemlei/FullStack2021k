import React, { useState } from 'react'

const Blog = ({ blog }) => {
	const [view, setView] = useState(false)

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
				likes {blog.likes} <button>like</button>
				<br />
				{blog.user.name}
			</div>
		</div>
	)
}

export default Blog
