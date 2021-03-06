import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
	mutation createBook(
		$title: String!
		$published: Int!
		$author: String!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			title
		}
	}
`

export const ALL_BOOKS = gql`
	query allBooks($genre: String) {
		allBooks(genre: $genre) {
			title
			author {
			  name
			}
			published
			genres
		}
	}
`

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			id
			name
			born
			bookCount
		}
	}
`

export const ME = gql`
	query {
		me {
			username
			favoriteGenre
			id
		}
	}
`

export const UPDATE_AUTHOR = gql`
	mutation updateAuthor($name: String!, $year: Int!) {
		editAuthor(name: $name, setBornTo: $year) {
			name
			born
			bookCount
		}
	}
`

export const LOGIN = gql`
	mutation login($name: String!, $password: String!) {
		login(username: $name, password: $password) {
			value
		}
	}
`
