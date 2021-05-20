const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
require('dotenv').config()

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
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
	}

	type Mutation {
		addBook(
			title: String!
			published: Int!
			author: String!
			genres: [String!]!
		): Book
		editAuthor(name: String!, setBornTo: Int!): Author
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
		allBooks: (root, args) => {
			return Book.find({}).populate('author')
		},
		allAuthors: () => Author.find({}),
	},
	Mutation: {
		addBook: async (root, args) => {
			let author = await Author.findOne({ name: args.author })
			if (!author) {
				try {
					author = await new Author({ name: args.author }).save()
				} catch (error) {
					throw new UserInputError(error.message)
				}
			}

			const book = new Book({ ...args, author: author._id })
			try {
				await book.save()
			} catch (error) {
				throw new UserInputError(error.message)
			}
			return book
		},
		editAuthor: async (root, args) => {
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
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
