const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs')
	response.json(users)
})

usersRouter.post('/', async (request, response) => {
	const body = request.body

	if (body.password.length < 3) {
        const e = new Error('password min length 3')
        e.name = 'ValidationError'
        throw e
    }

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash,
	})

	const savedUser = await user.save()

	response.json(savedUser)
})

module.exports = usersRouter
