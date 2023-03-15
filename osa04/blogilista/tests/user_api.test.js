const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../src/app')

const api = supertest(app)

const User = require('../src/models/user')

describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({
			username: 'test',
			name: 'testperson',
			passwordHash,
		})

		await user.save()
	})

	test('user with existing username can not be created', async () => {
		const newUser = {
			username: 'test',
			name: 'testperson',
			password: 'secretWord',
		}
		const response = await api.post('/api/users').send(newUser).expect(400)
		expect(response.body.error).toEqual(
			'User validation failed: username: Error, expected `username` to be unique. Value: `test`'
		)
	})

	test('user with too short username can not be created', async () => {
		const newUser = {
			username: 'te',
			name: 'testperson',
			password: 'secretWord',
		}
		const response = await api.post('/api/users').send(newUser).expect(400)
		expect(response.body.error).toEqual(
			'User validation failed: username: Path `username` (`te`) is shorter than the minimum allowed length (3).'
		)
	})

	test('user with too short password can not be created', async () => {
		const newUser = {
			username: 'testname',
			name: 'testperson',
			password: 'se',
		}
		const response = await api.post('/api/users').send(newUser).expect(400)
		expect(response.body.error).toEqual(
			'password min length 3'
		)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
