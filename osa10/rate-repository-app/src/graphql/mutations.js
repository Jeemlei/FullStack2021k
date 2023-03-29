import { gql } from '@apollo/client'

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
