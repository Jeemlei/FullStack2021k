import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
	const id = useParams().id
	const user = useSelector(state => state.users).find(u => u.id === id)
	if (!user) {
		return <h2>404 user not found</h2>
	}
	return (
		<div>
			<h2>{user.name}</h2>
			<h3>added blogs</h3>
			<ul>
				{user.blogs.map(blog => {
					return <li key={blog.id}>{blog.title}</li>
				})}
			</ul>
		</div>
	)
}

export default User
