import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogsReducer'

const BlogDetails = () => {
	const id = useParams().id
	const blog = useSelector(state => state.blogs).find(b => b.id === id)
	if (!blog) {
		return <h2>404 blog not found</h2>
	}

	const dispatch = useDispatch()
	const handleLike = async blog => {
		dispatch(likeBlog(blog))
	}

	return (
		<div>
			<h2>{blog.title}</h2>
			<a href={blog.url}>{blog.url}</a>
			<div>
				{blog.likes} likes{' '}
				<button id={`like-${blog.id}`} onClick={() => handleLike(blog)}>
					like
				</button>
			</div>
			<div>added by {blog.user.name}</div>
		</div>
	)
}

export default BlogDetails
