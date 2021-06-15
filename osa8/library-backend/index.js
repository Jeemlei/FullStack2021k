const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const User = require('./models/user')
const Book = require('./models/book')
const Author = require('./models/author')
const pubsub = new PubSub()
require('dotenv').config()
const jwt = require('jsonwebtoken')

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch(error => {
		console.log('error connection to MongoDB:', error.message)
	})

const typeDefs = gql`
	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Author {
		name: String!
		id: ID!
		born: Int
		bookCount: Int!
	}

	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String!]!
		id: ID!
	}

	type Query {
		me: User
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
	}

	type Mutation {
		createUser(username: String!, favoriteGenre: String!): User
		login(username: String!, password: String!): Token
		addBook(
			title: String!
			published: Int!
			author: String!
			genres: [String!]!
		): Book
		editAuthor(name: String!, setBornTo: Int!): Author
	}

	type Subscription {
		bookAdded: Book!
	}
`

const resolvers = {
	Author: {
		bookCount: async root => {
			const books = await Book.find({ author: root._id })
			return books.length
		},
	},
	Query: {
		bookCount: () => Book.count(),
		authorCount: () => Author.count(),
		allBooks: async (root, args) => {
			let books = await Book.find({}).populate('author')
			if (args.author) {
				books = books.filter(b => b.author.name === args.author)
			}
			if (args.genre) {
				books = books.filter(b => b.genres.includes(args.genre))
			}
			return books
		},
		allAuthors: () => Author.find({}),
		me: (root, args, context) => {
			return context.currentUser
		},
	},
	Mutation: {
		createUser: (root, args) => {
			const user = new User({
				username: args.username,
				favoriteGenre: args.favoriteGenre,
			})
			return user.save().catch(error => {
				throw new UserInputError(error.message)
			})
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })

			if (!user || args.password !== process.env.TEST_PASSWORD) {
				throw new UserInputError('wrong credentials')
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
		},
		addBook: async (root, args, context) => {
			if (!context.currentUser) {
				throw new AuthenticationError('User not logged in!')
			}
			let author = await Author.findOne({ name: args.author })
			if (!author) {
				try {
					author = await new Author({ name: args.author }).save()
				} catch (error) {
					throw new UserInputError(error.message)
				}
			}

			let book = new Book({ ...args, author: author._id })
			try {
				await book.save()
				book = await Book.findById(book._id).populate('author')
			} catch (error) {
				throw new UserInputError(error.message)
			}

			pubsub.publish('BOOK_ADDED', {bookAdded: book})

			return book
		},
		editAuthor: async (root, args, context) => {
			if (!context.currentUser) {
				throw new AuthenticationError('User not logged in!')
			}
			try {
				const author = await Author.findOneAndUpdate(
					{ name: { $in: args.name } },
					{ born: args.setBornTo }
				)
				return Author.findById(author._id)
			} catch (error) {
				throw new UserInputError(error.message)
			}
		},
	},
	Subscription: {
	  bookAdded: {
		subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
	  },
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null
		if (auth && auth.toLowerCase().startsWith('bearer ')) {
			const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
			const currentUser = await User.findById(decodedToken.id)
			return { currentUser }
		}
	},
})

server.listen().then(({ url, subscriptionsUrl }) => {
	console.log(`Server ready at ${url}`)
	console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
