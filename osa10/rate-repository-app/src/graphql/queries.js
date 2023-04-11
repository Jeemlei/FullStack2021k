import { gql } from '@apollo/client'

export const ME = gql`
	query ($includeReviews: Boolean = false) {
		me {
			id
			reviews @include(if: $includeReviews) {
				edges {
					node {
						id
						text
						rating
						createdAt
						repository {
							id
							fullName
						}
					}
				}
			}
		}
	}
`

export const GET_REPOSITORIES = gql`
	query (
		$searchKeyword: String
		$orderBy: AllRepositoriesOrderBy
		$orderDirection: OrderDirection
		$after: String
		$first: Int
	) {
		repositories(
			searchKeyword: $searchKeyword
			orderBy: $orderBy
			orderDirection: $orderDirection
			after: $after
			first: $first
		) {
			edges {
				node {
					id
					fullName
					reviewCount
					ratingAverage
					forksCount
					stargazersCount
					description
					language
					ownerAvatarUrl
				}
				cursor
			}
			pageInfo {
				endCursor
				startCursor
				hasNextPage
			}
		}
	}
`
export const GET_REPOSITORY_BY_ID = gql`
	query ($id: ID!, $after: String, $first: Int) {
		repository(id: $id) {
			fullName
			reviewCount
			ratingAverage
			forksCount
			stargazersCount
			description
			language
			ownerAvatarUrl
			url
			reviews(after: $after, first: $first) {
				edges {
					node {
						id
						text
						rating
						createdAt
						user {
							id
							username
						}
					}
					cursor
				}
				pageInfo {
					endCursor
					startCursor
					hasNextPage
				}
			}
		}
	}
`
