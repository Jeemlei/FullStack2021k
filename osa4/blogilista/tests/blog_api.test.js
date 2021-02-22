const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../src/app')

const api = supertest(app)

const Blog = require('../src/models/blog')

describe('With many blogs in the db', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		await Blog.insertMany(helper.listWithManyBlogs)
	})

	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(helper.listWithManyBlogs.length)
	})

	test('a specific blog is within the returned blogs', async () => {
		const response = await api.get('/api/blogs')

		const titles = response.body.map(r => r.title)

		expect(titles).toContain('React patterns')
	})

	test('returned blogs have id field with correct name', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body[0].id).toBeDefined()
	})

	test('a valid blog can be added', async () => {
		const newBlog = {
			title: 'Test title',
			author: 'Test author',
			url: 'http://www.testurl.wtf',
			likes: 1337,
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length + 1)

		const titles = blogsAtEnd.map(n => n.title)

		expect(titles).toContainEqual('Test title')
	})

	test('blog can not be added without title and url', async () => {
		const newBlog = {
			author: 'Test author',
			likes: 1337,
		}

		await api.post('/api/blogs').send(newBlog).expect(400)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
