import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
	query {
		repositories {
			edges {
				node {
					ownerName
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
