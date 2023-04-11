import { gql } from '@apollo/client'

export const SIGN_UP = gql`
	mutation Mutation($user: CreateUserInput) {
		createUser(user: $user) {
			id
			username
		}
	}
`

export const SIGN_IN = gql`
	mutation Authenticate($credentials: AuthenticateInput) {
		authenticate(credentials: $credentials) {
			accessToken
		}
	}
`

export const REVIEW = gql`
	mutation Authenticate($review: CreateReviewInput) {
		createReview(review: $review) {
			repositoryId
		}
	}
`

export const DELETE_REVIEW = gql`
	mutation DeleteReview($id: ID!) {
		deleteReview(id: $id)
	}
`
