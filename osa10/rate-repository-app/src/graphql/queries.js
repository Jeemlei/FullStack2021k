import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
	query {
		repositories {
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
		}
	}
`

export const ME = gql`
	query {
		me {
			id
		}
	}
`
