import { gql } from '@apollo/client'

export const ME = gql`
	query {
		me {
			id
		}
	}
`

export const GET_REPOSITORIES = gql`
	query ($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
		repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
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
			}
		}
	}
`
export const GET_REPOSITORY_BY_ID = gql`
	query ($id: ID!) {
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
			reviews {
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
				}
			}
		}
	}
`
