import blogsService from '../services/blogs'

/* eslint-disable indent */
const reducer = (state = [], action) => {
	let blogs = null
	switch (action.type) {
		case 'INIT':
			return action.data
		case 'CREATE':
			return state.concat(action.data)
		case 'LIKE':
			blogs = state.map(blog =>
				blog.id !== action.data.id ? blog : action.data
			)
			blogs.sort((a, b) => {
				if (a.likes > b.likes) {
					return -1
				}
				if (a.likes < b.likes) {
					return 1
				}
				return 0
			})
			return blogs
		case 'DELETE':
			return state.filter(blog => blog.id !== action.data)
		default:
			return state
	}
}

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogsService.getAll()
		blogs.sort((a, b) => {
			if (a.likes > b.likes) {
				return -1
			}
			if (a.likes < b.likes) {
				return 1
			}
			return 0
		})
		dispatch({
			type: 'INIT',
			data: blogs,
		})
	}
}

export const createBlog = blog => {
	return async dispatch => {
		const newBlog = await (await blogsService.create(blog)).data
		dispatch({
			type: 'CREATE',
			data: newBlog,
		})
	}
}

export const likeBlog = blog => {
	return async dispatch => {
		blog.likes += 1
		const updatedBlog = await (await blogsService.update(blog.id, blog)).data
		dispatch({
			type: 'LIKE',
			data: updatedBlog,
		})
	}
}

export const removeBlog = id => {
	return async dispatch => {
		const response = await blogsService.remove(id)
        console.log(response)
		dispatch({
			type: 'DELETE',
			data: id,
		})
	}
}

export default reducer
