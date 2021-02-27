import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const getToken = () => {
    return `bearer ${JSON.parse(window.localStorage.getItem('loggedUserDetails')).token}`
}

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    window.localStorage.setItem('loggedUserDetails', JSON.stringify(response.data))
	return response.data
}

const logout = () => {
    window.localStorage.removeItem('loggedUserDetails')
}

// eslint-disable-next-line
export default { getToken, login, logout }
