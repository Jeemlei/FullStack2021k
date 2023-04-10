import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (orderBy, orderDirection) => {
	const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
		variables: {
			orderBy: orderBy,
			orderDirection: orderDirection,
		},
		fetchPolicy: 'cache-and-network',
	})

	return { repositories: data ? data.repositories : data, loading, refetch }
}

export default useRepositories
