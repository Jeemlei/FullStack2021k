import axios from 'axios'
import loginService from '../services/login'
const baseUrl = '/api/blogs'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = async newBlog => {
	const config = {
		headers: { Authorization: loginService.getToken() },
	}
	const response = await axios.post(baseUrl, newBlog, config)
	return response
}

const update = async (id, updatedBlog) => {
	const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
	return response
}

const remove = async (id) => {
	const config = {
		headers: { Authorization: loginService.getToken() },
	}
	const response = await axios.delete(`${baseUrl}/${id}`, config)
	return response
}

// eslint-disable-next-line
export default { getAll, create, update, remove }
